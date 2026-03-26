(function () {
  var marketData = {
    standards: {
      sbc_304: { label: "SBC 304 / Saudi practice", structuralFactor: 1.06, finishFactor: 1.02, mepFactor: 1.03, note: "Saudi baseline with moderate reinforcement and compliance allowance." },
      ibc_aci: { label: "IBC / ACI", structuralFactor: 1.08, finishFactor: 1.01, mepFactor: 1.04, note: "Typical international concrete and structural detailing uplift." },
      eurocode: { label: "Eurocode / EC2", structuralFactor: 1.1, finishFactor: 1.03, mepFactor: 1.04, note: "Higher structural conservatism and coordination overhead." },
      is_456: { label: "IS 456 / NBC style", structuralFactor: 1.03, finishFactor: 0.99, mepFactor: 1.01, note: "Balanced structural baseline with slightly leaner finish assumptions." }
    },
    projectTypes: {
      residential: { label: "Residential", areaRate: 2280, tradeMix: { concrete: 0.16, rebar: 0.09, masonry: 0.11, plaster_paint: 0.12, flooring: 0.09, ceilings: 0.04, doors_windows: 0.08, electrical: 0.1, plumbing: 0.08, hvac: 0.08, fire_fighting: 0.05 } },
      commercial: { label: "Commercial", areaRate: 2720, tradeMix: { concrete: 0.15, rebar: 0.09, masonry: 0.08, plaster_paint: 0.09, flooring: 0.08, ceilings: 0.06, doors_windows: 0.08, electrical: 0.12, plumbing: 0.07, hvac: 0.13, fire_fighting: 0.05 } },
      industrial: { label: "Industrial", areaRate: 2550, tradeMix: { concrete: 0.19, rebar: 0.11, masonry: 0.05, plaster_paint: 0.05, flooring: 0.07, ceilings: 0.02, doors_windows: 0.08, electrical: 0.12, plumbing: 0.05, hvac: 0.16, fire_fighting: 0.1 } },
      hospitality: { label: "Hospitality", areaRate: 3180, tradeMix: { concrete: 0.13, rebar: 0.08, masonry: 0.08, plaster_paint: 0.12, flooring: 0.11, ceilings: 0.07, doors_windows: 0.09, electrical: 0.11, plumbing: 0.08, hvac: 0.09, fire_fighting: 0.04 } },
      healthcare: { label: "Healthcare", areaRate: 3650, tradeMix: { concrete: 0.13, rebar: 0.08, masonry: 0.07, plaster_paint: 0.09, flooring: 0.08, ceilings: 0.07, doors_windows: 0.08, electrical: 0.13, plumbing: 0.08, hvac: 0.14, fire_fighting: 0.05 } }
    },
    qualities: {
      economy: { factor: 0.9, finishFactor: 0.9, mepFactor: 0.94 },
      standard: { factor: 1, finishFactor: 1, mepFactor: 1 },
      premium: { factor: 1.18, finishFactor: 1.25, mepFactor: 1.12 }
    },
    markets: {
      ksa_eastern: { label: "KSA Eastern Province", currency: "SAR", vat: 15, locationFactor: 1, labourFactor: 1, indirectFactor: 0.12, referenceRate: 2280, note: "Balanced baseline for Jubail, Dammam and Khobar industrial supply chains." },
      ksa_central: { label: "KSA Central Region", currency: "SAR", vat: 15, locationFactor: 1.03, labourFactor: 1.04, indirectFactor: 0.125, referenceRate: 2360, note: "Slight uplift for Riyadh delivery pressure and higher labour demand." },
      ksa_western: { label: "KSA Western Region", currency: "SAR", vat: 15, locationFactor: 1.06, labourFactor: 1.05, indirectFactor: 0.13, referenceRate: 2425, note: "Higher logistics and finishing premiums around Jeddah and Makkah corridors." },
      uae_dubai: { label: "UAE Dubai / Northern Emirates", currency: "AED", vat: 5, locationFactor: 1.14, labourFactor: 1.1, indirectFactor: 0.135, referenceRate: 2550, note: "Commercially competitive but specification-heavy market mix." },
      qatar_doha: { label: "Qatar Doha", currency: "QAR", vat: 0, locationFactor: 1.11, labourFactor: 1.08, indirectFactor: 0.13, referenceRate: 2480, note: "Moderate premium for import-dependent materials and project controls." }
    },
    trades: {
      concrete: { label: "Concrete Works", unit: "m3", materialShare: 0.64, labourShare: 0.24, quantityFactor: 0.28 },
      rebar: { label: "Reinforcement Steel", unit: "t", materialShare: 0.75, labourShare: 0.18, quantityFactor: 0.045 },
      masonry: { label: "Block / Masonry", unit: "m2", materialShare: 0.56, labourShare: 0.31, quantityFactor: 1.55 },
      plaster_paint: { label: "Plaster and Paint", unit: "m2", materialShare: 0.42, labourShare: 0.43, quantityFactor: 2.9 },
      flooring: { label: "Floor Finishes", unit: "m2", materialShare: 0.61, labourShare: 0.26, quantityFactor: 0.95 },
      ceilings: { label: "Ceilings", unit: "m2", materialShare: 0.58, labourShare: 0.27, quantityFactor: 0.78 },
      doors_windows: { label: "Doors and Windows", unit: "item", materialShare: 0.68, labourShare: 0.19, quantityFactor: 0.032 },
      electrical: { label: "Electrical", unit: "point", materialShare: 0.6, labourShare: 0.25, quantityFactor: 0.18 },
      plumbing: { label: "Plumbing", unit: "point", materialShare: 0.57, labourShare: 0.28, quantityFactor: 0.12 },
      hvac: { label: "HVAC", unit: "m2", materialShare: 0.66, labourShare: 0.19, quantityFactor: 0.95 },
      fire_fighting: { label: "Fire Fighting", unit: "point", materialShare: 0.59, labourShare: 0.24, quantityFactor: 0.06 }
    }
  };

  function round(value, digits) {
    var factor = Math.pow(10, digits || 0);
    return Math.round(value * factor) / factor;
  }

  function getAreaRate(marketKey, projectTypeKey, standardKey, qualityKey, hasBasement) {
    var market = marketData.markets[marketKey];
    var projectType = marketData.projectTypes[projectTypeKey];
    var standard = marketData.standards[standardKey];
    var quality = marketData.qualities[qualityKey];
    var basementFactor = hasBasement ? 1.08 : 1;
    var structuralBlend = (standard.structuralFactor + standard.finishFactor + standard.mepFactor) / 3;
    return round(projectType.areaRate * market.locationFactor * quality.factor * structuralBlend * basementFactor, 2);
  }

  function generateBoq(input) {
    var projectType = marketData.projectTypes[input.projectType];
    var market = marketData.markets[input.market];
    var standard = marketData.standards[input.standard];
    var quality = marketData.qualities[input.quality];
    var areaRate = getAreaRate(input.market, input.projectType, input.standard, input.quality, input.basement);
    var items = [];
    var total = 0;

    Object.keys(projectType.tradeMix).forEach(function (tradeKey) {
      var share = projectType.tradeMix[tradeKey];
      var trade = marketData.trades[tradeKey];
      var standardFactor = tradeKey === "concrete" || tradeKey === "rebar"
        ? standard.structuralFactor
        : tradeKey === "electrical" || tradeKey === "plumbing" || tradeKey === "hvac" || tradeKey === "fire_fighting"
          ? standard.mepFactor
          : standard.finishFactor;
      var qualityFactor = tradeKey === "plaster_paint" || tradeKey === "flooring" || tradeKey === "ceilings" || tradeKey === "doors_windows"
        ? quality.finishFactor
        : tradeKey === "electrical" || tradeKey === "plumbing" || tradeKey === "hvac" || tradeKey === "fire_fighting"
          ? quality.mepFactor
          : quality.factor;
      var amount = input.area * areaRate * share;
      var qty = trade.unit === "item"
        ? input.area * trade.quantityFactor * Math.max(input.floors, 1)
        : input.area * trade.quantityFactor * (input.basement ? 1.06 : 1);
      var marketRate = qty ? amount / qty : 0;

      items.push({
        key: tradeKey,
        label: trade.label,
        unit: trade.unit,
        qty: round(qty * standardFactor * qualityFactor, trade.unit === "t" ? 2 : 1),
        rate: round(marketRate, 2),
        amount: round(amount * standardFactor * qualityFactor, 2)
      });
    });

    items.forEach(function (item) {
      total += item.amount;
    });

    return {
      meta: {
        currency: market.currency,
        marketLabel: market.label,
        standardLabel: standard.label,
        areaRate: round(areaRate, 2),
        total: round(total, 2),
        marketNote: market.note,
        standardNote: standard.note
      },
      items: items
    };
  }

  function priceBoq(boq, overrides) {
    var market = marketData.markets[overrides.market];
    var standard = marketData.standards[overrides.standard];
    var rows = [];
    var directCost = 0;

    boq.items.forEach(function (item) {
      var trade = marketData.trades[item.key];
      var material = item.amount * trade.materialShare;
      var labour = item.amount * trade.labourShare * market.labourFactor;
      var direct = material + labour + (item.amount * (1 - trade.materialShare - trade.labourShare));
      direct *= (standard.structuralFactor + standard.finishFactor + standard.mepFactor) / 3;
      rows.push({
        label: item.label,
        qty: item.qty,
        material: round(material, 2),
        labour: round(labour, 2),
        direct: round(direct, 2)
      });
      directCost += direct;
    });

    var indirectRate = (Number(overrides.indirect) || 0) / 100;
    var contingencyRate = (Number(overrides.contingency) || 0) / 100;
    var vatRate = (Number(overrides.vat) || market.vat || 0) / 100;
    var indirectCost = directCost * indirectRate;
    var contingencyCost = (directCost + indirectCost) * contingencyRate;
    var preVat = directCost + indirectCost + contingencyCost;
    var vatAmount = preVat * vatRate;

    return {
      currency: market.currency,
      marketLabel: market.label,
      directCost: round(directCost, 2),
      indirectCost: round(indirectCost, 2),
      contingencyCost: round(contingencyCost, 2),
      preVat: round(preVat, 2),
      vatAmount: round(vatAmount, 2),
      finalCost: round(preVat + vatAmount, 2),
      rows: rows
    };
  }

  window.MARKET_DATA = marketData;
  window.generateBoqEstimate = generateBoq;
  window.priceBoqEstimate = priceBoq;
})();
