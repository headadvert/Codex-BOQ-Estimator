(function () {
  if (!window.MARKET_DATA || !document.getElementById("cost-form")) {
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

  populateSelect("cost-market", window.MARKET_DATA.markets, "label");
  populateSelect("cost-project-type", window.MARKET_DATA.projectTypes, "label");
  populateSelect("cost-standard", window.MARKET_DATA.standards, "label");

  var storedBoq = null;
  try {
    storedBoq = JSON.parse(localStorage.getItem("qs_latest_boq") || "null");
  } catch (error) {
    storedBoq = null;
  }

  byId("cost-market").value = storedBoq ? Object.keys(window.MARKET_DATA.markets).find(function (key) {
    return window.MARKET_DATA.markets[key].label === storedBoq.meta.marketLabel;
  }) || "ksa_eastern" : "ksa_eastern";
  byId("cost-project-type").value = "residential";
  byId("cost-standard").value = "sbc_304";

  function render() {
    var boq = storedBoq || window.generateBoqEstimate({
      market: byId("cost-market").value,
      standard: byId("cost-standard").value,
      projectType: byId("cost-project-type").value,
      quality: "standard",
      area: 1000,
      floors: 2,
      basement: false
    });

    var pricing = window.priceBoqEstimate(boq, {
      market: byId("cost-market").value,
      standard: byId("cost-standard").value,
      contingency: Number(byId("contingency").value),
      indirect: Number(byId("indirect").value),
      vat: Number(byId("vat").value)
    });

    byId("direct-cost").textContent = formatMoney(pricing.currency, pricing.directCost);
    byId("pre-vat-cost").textContent = formatMoney(pricing.currency, pricing.preVat);
    byId("final-cost").textContent = formatMoney(pricing.currency, pricing.finalCost);

    var body = byId("cost-table-body");
    body.innerHTML = "";
    pricing.rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + row.label + "</td>" +
        "<td>" + row.qty.toLocaleString("en-US") + "</td>" +
        "<td>" + formatMoney(pricing.currency, row.material) + "</td>" +
        "<td>" + formatMoney(pricing.currency, row.labour) + "</td>" +
        "<td>" + formatMoney(pricing.currency, row.direct) + "</td>";
      body.appendChild(tr);
    });
  }

  byId("cost-form").addEventListener("submit", function (event) {
    event.preventDefault();
    render();
  });

  byId("export-cost-pdf").addEventListener("click", function () {
    document.title = "Cost Estimate - PDF";
    window.print();
  });

  render();
})();
