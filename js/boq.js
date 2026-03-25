(function () {
  function isSubScopeAllowed(subScope, projectType) {
    return !subScope.onlyFor || subScope.onlyFor.indexOf(projectType) >= 0;
  }
  function getRoomArea(room) { return Number(room.qty || 0) * Number(room.length || 0) * Number(room.width || 0); }
  function getFloorArea(floor) { return floor.rooms.reduce(function (sum, room) { return sum + getRoomArea(room); }, 0); }
  function getProgramArea(floors) { return floors.reduce(function (sum, floor) { return sum + getFloorArea(floor); }, 0); }
  function getGrossArea(input, floors) {
    const programArea = getProgramArea(floors);
    const basementArea = programArea * Number(input.basement || 0) * 0.4;
    return ((programArea * Math.max(Number(input.floors || 1), 1)) + basementArea) / Math.max(Number(input.efficiency || 82) / 100, 0.55);
  }
  function getQuantity(subScope, grossArea, floorCount) {
    if (subScope.qtyMode === "grossArea") { return grossArea * subScope.qtyFactor; }
    if (subScope.qtyMode === "floorCount") { return floorCount * subScope.qtyFactor; }
    if (subScope.qtyMode === "percentage") { return 1; }
    return subScope.qtyFactor;
  }
  function groupTakeoffEntries(entries) {
    const groups = {};
    entries.forEach(function (entry) {
      if (!groups[entry.scope]) { groups[entry.scope] = []; }
      groups[entry.scope].push(entry);
    });
    return groups;
  }
  function generateBoq(input, floors, selectedSubScopes) {
    const country = BOQ_DATA.countries[input.country];
    const type = BOQ_DATA.projectTypes[input.projectType];
    const floorCount = floors.length;
    const grossArea = getGrossArea(input, floors);
    const programArea = getProgramArea(floors);
    const benchmarkRate = country.benchmark[input.projectType];
    const finishFactor = BOQ_DATA.finishFactors[input.finishLevel] || 1;
    const complexityFactor = Number(input.complexity || 1);
    const baseTradeCost = grossArea * benchmarkRate * finishFactor * complexityFactor;
    const items = [];
    const takeoffEntries = [];
    let tradeSubtotal = 0;
    let itemNo = 1;

    Object.keys(BOQ_DATA.scopeLibrary).forEach(function (scopeKey) {
      const scope = BOQ_DATA.scopeLibrary[scopeKey];
      const activeSubIds = (selectedSubScopes[scopeKey] || []).filter(function (id) {
        return scope.subScopes.some(function (sub) { return sub.id === id && isSubScopeAllowed(sub, input.projectType); });
      });
      if (!activeSubIds.length) { return; }
      const scopeItems = [];
      let scopeAmount = 0;

      scope.subScopes.forEach(function (subScope) {
        if (activeSubIds.indexOf(subScope.id) === -1 || !isSubScopeAllowed(subScope, input.projectType)) { return; }
        const quantity = getQuantity(subScope, grossArea, floorCount);
        let amount = baseTradeCost * subScope.weight;
        if (scopeKey === "commercial" && subScope.id === "overheads_profit") { amount = baseTradeCost * country.profitPct; }
        if (scopeKey === "commercial" && subScope.id === "contingency") { amount = baseTradeCost * country.contingencyPct; }
        if (scopeKey === "preliminaries") { amount = baseTradeCost * subScope.weight; }
        const rate = quantity > 0 ? amount / quantity : amount;
        scopeItems.push({ itemNumber: itemNo++, scopeKey: scopeKey, scopeName: scope.name, subScopeId: subScope.id, subScopeName: subScope.name, description: subScope.name + " - " + scope.description, unit: subScope.unit, quantity: quantity, rate: rate, amount: amount });
        scopeAmount += amount;

        subScope.materials.forEach(function (material) {
          takeoffEntries.push({ scope: scope.name, subScope: subScope.name, name: material.name, unit: material.unit, qty: quantity * material.factor });
        });
      });

      if (scopeItems.length) {
        items.push({ type: "scope", scopeName: scope.name, amount: scopeAmount });
        scopeItems.forEach(function (entry) { items.push(entry); });
        if (scopeKey !== "commercial") { tradeSubtotal += scopeAmount; }
      }
    });

    const preliminaries = (selectedSubScopes.preliminaries || []).length ? items.filter(function (item) { return item.scopeKey === "preliminaries"; }).reduce(function (sum, item) { return sum + item.amount; }, 0) : 0;
    const commercialAmount = (selectedSubScopes.commercial || []).length ? items.filter(function (item) { return item.scopeKey === "commercial"; }).reduce(function (sum, item) { return sum + item.amount; }, 0) : 0;
    const totalCost = tradeSubtotal + preliminaries + commercialAmount;

    return {
      mode: input.mode,
      country: country,
      projectType: type,
      grossArea: grossArea,
      programArea: programArea,
      items: items,
      tradeSubtotal: tradeSubtotal,
      preliminaries: preliminaries,
      profit: baseTradeCost * country.profitPct,
      contingency: baseTradeCost * country.contingencyPct,
      commercialAmount: commercialAmount,
      totalCost: totalCost,
      benchmarkRate: benchmarkRate,
      costPerSqm: totalCost / Math.max(grossArea, 1),
      takeoff: groupTakeoffEntries(takeoffEntries),
      notes: [
        "Project type: " + type.label,
        "Country standard: " + country.standard,
        "Floor-wise room schedule used as the quantity basis.",
        "Only selected scopes and sub-scopes are included in the estimate.",
        "Benchmark rate basis: " + BOQUtils.formatCurrency(benchmarkRate, country.currency) + " per m2 before adjustment factors."
      ]
    };
  }
  window.BOQEngine = { isSubScopeAllowed, getRoomArea, getFloorArea, getProgramArea, getGrossArea, generateBoq };
})();
