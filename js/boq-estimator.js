(function () {
  if (!window.MARKET_DATA || !document.getElementById("boq-form")) {
    return;
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function formatMoney(currency, value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    }).format(value);
  }

  function populateSelect(selectId, data, labelField) {
    var select = byId(selectId);
    Object.keys(data).forEach(function (key) {
      var option = document.createElement("option");
      option.value = key;
      option.textContent = data[key][labelField];
      select.appendChild(option);
    });
  }

  populateSelect("market", window.MARKET_DATA.markets, "label");
  populateSelect("standard", window.MARKET_DATA.standards, "label");
  populateSelect("project-type", window.MARKET_DATA.projectTypes, "label");

  byId("market").value = "ksa_eastern";
  byId("standard").value = "sbc_304";
  byId("project-type").value = "residential";

  var latestBoq = null;
  var exportButton = byId("export-boq-pdf");

  byId("boq-form").addEventListener("submit", function (event) {
    event.preventDefault();
    latestBoq = window.generateBoqEstimate({
      projectName: byId("project-name").value.trim(),
      market: byId("market").value,
      standard: byId("standard").value,
      projectType: byId("project-type").value,
      quality: byId("quality").value,
      area: Number(byId("area").value),
      floors: Number(byId("floors").value),
      basement: byId("basement").value === "yes",
      notes: byId("boq-notes").value.trim()
    });

    var body = byId("boq-table-body");
    body.innerHTML = "";
    latestBoq.items.forEach(function (item) {
      var row = document.createElement("tr");
      row.innerHTML =
        "<td>" + item.label + "</td>" +
        "<td>" + item.unit + "</td>" +
        "<td>" + item.qty.toLocaleString("en-US") + "</td>" +
        "<td>" + formatMoney(latestBoq.meta.currency, item.rate) + "</td>" +
        "<td>" + formatMoney(latestBoq.meta.currency, item.amount) + "</td>";
      body.appendChild(row);
    });

    byId("boq-rate").textContent = formatMoney(latestBoq.meta.currency, latestBoq.meta.areaRate) + " / m²";
    byId("boq-rate-note").textContent = latestBoq.meta.marketNote;
    byId("boq-total").textContent = formatMoney(latestBoq.meta.currency, latestBoq.meta.total);
    byId("boq-total-note").textContent = latestBoq.meta.standardLabel;
    byId("boq-factor").textContent = window.MARKET_DATA.standards[byId("standard").value].structuralFactor.toFixed(2) + "x";
    byId("boq-factor-note").textContent = latestBoq.meta.standardNote;

    localStorage.setItem("qs_latest_boq", JSON.stringify(latestBoq));
    byId("send-to-cost").disabled = false;
    exportButton.disabled = false;
  });

  byId("send-to-cost").addEventListener("click", function () {
    if (!latestBoq) {
      return;
    }
    window.location.href = "./cost-estimator.html";
  });

  exportButton.addEventListener("click", function () {
    if (!latestBoq) {
      return;
    }
    document.title = (byId("project-name").value.trim() || "BOQ Estimate") + " - PDF";
    window.print();
  });
})();
