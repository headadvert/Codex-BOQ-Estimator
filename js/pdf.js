(function () {
  function exportReport(payload) {
    const company = BOQ_DATA.company;
    const result = payload.result;
    const groupedTakeoff = Object.keys(result.takeoff).map(function (scopeName) {
      return "<div class='takeoff-block'><h3>" + scopeName + "</h3><table><thead><tr><th>Sub Scope</th><th>Material</th><th>Quantity</th></tr></thead><tbody>" + result.takeoff[scopeName].map(function (item) {
        return "<tr><td>" + item.subScope + "</td><td>" + item.name + "</td><td>" + BOQUtils.formatNumber(item.qty, 2) + " " + item.unit + "</td></tr>";
      }).join("") + "</tbody></table></div>";
    }).join("");

    const boqRows = result.items.map(function (item) {
      if (item.type === "scope") {
        return "<tr class='scope-row'><td colspan='8'>" + item.scopeName + "</td></tr>";
      }
      return "<tr><td>" + item.itemNumber + "</td><td>" + item.scopeName + "</td><td>" + item.subScopeName + "</td><td>" + item.description + "</td><td>" + item.unit + "</td><td>" + BOQUtils.formatNumber(item.quantity, 2) + "</td><td>" + BOQUtils.formatCurrency(item.rate, result.country.currency) + "</td><td>" + BOQUtils.formatCurrency(item.amount, result.country.currency) + "</td></tr>";
    }).join("");

    const summaryRows = BOQCost.getCostSummary(result).map(function (row) {
      return "<tr" + (row.emphasis ? " class='emphasis'" : "") + "><td>" + row.label + "</td><td>" + row.value + "</td></tr>";
    }).join("");

    const win = window.open("", "_blank", "width=1200,height=820");
    if (!win) { return; }
    win.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>BOQ Pro PDF</title><style>body{font-family:Roboto,Arial,sans-serif;color:#0B1F3A;margin:0;background:#fff;} .page{padding:32px;} h1,h2,h3{font-family:Inter,Arial,sans-serif;margin:0 0 10px;} table{width:100%;border-collapse:collapse;font-size:12px;} th,td{border:1px solid #d6deea;padding:9px;vertical-align:top;} th{background:#0B1F3A;color:#fff;} .hero{padding:32px;border-bottom:3px solid #F59E0B;background:#f9fbfd;} .meta{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:18px;} .meta div{background:#fff;border:1px solid #d6deea;padding:12px;} .block{margin:28px 0;} .summary{width:440px;margin-left:auto;} .scope-row td{background:#eef4fa;font-weight:700;color:#0B1F3A;} .emphasis td{font-weight:700;color:#0B1F3A;background:#fff7e8;} .takeoff-block{margin:0 0 24px;} .cta-page{page-break-before:always;min-height:100vh;background:linear-gradient(180deg,#0B1F3A 0%,#10294c 100%);color:#fff;display:flex;align-items:center;} .cta-wrap{padding:64px;max-width:900px;} .badge{display:inline-block;padding:8px 14px;border:1px solid rgba(255,255,255,.25);border-radius:999px;margin-bottom:20px;color:#F59E0B;} .cta-page h1,.cta-page h2,.cta-page h3,.cta-page p,.cta-page strong{color:#fff;} .cta-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px;} .cta-card{border:1px solid rgba(255,255,255,.16);padding:18px;border-radius:16px;background:rgba(255,255,255,.04);} .small{font-size:11px;color:#66788f;}</style></head><body>");
    win.document.write("<div class='hero'><h1>Measured Bill of Quantities and Commercial Summary</h1><p>Project: <strong>" + payload.projectName + "</strong></p><p class='small'>Prepared in " + payload.mode.toUpperCase() + " mode under " + result.country.standard + " using a floor-wise room schedule and selected scope / sub-scope model.</p><div class='meta'><div><strong>Project Type</strong><br>" + result.projectType.label + "</div><div><strong>Country</strong><br>" + result.country.label + "</div><div><strong>Gross Floor Area</strong><br>" + BOQUtils.formatNumber(result.grossArea, 0) + " m2</div><div><strong>Program Area</strong><br>" + BOQUtils.formatNumber(result.programArea, 0) + " m2</div></div></div>");
    win.document.write("<div class='page'><div class='block'><h2>Measured BOQ</h2><table><thead><tr><th>#</th><th>Trade Package</th><th>Sub Item</th><th>Description</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>" + boqRows + "</tbody></table></div><div class='block'><h2>Commercial Summary</h2><table class='summary'>" + summaryRows + "</table></div><div class='block'><h2>Detailed Material Takeoff</h2>" + groupedTakeoff + "</div></div>");
    win.document.write("<section class='cta-page'><div class='cta-wrap'><div class='badge'>Build This Project With Us</div><h1>We do not just estimate. We help deliver.</h1><p>Al Qaswaa Al Sharqia Trading Est supports project owners, consultants, and procurement teams with execution-focused support, commercial coordination, contractor engagement, and practical delivery assistance for construction projects.</p><p>" + company.experienceNote + "</p><div class='cta-grid'><div class='cta-card'><h3>Company Information</h3><p><strong>Company:</strong> " + company.name + "</p><p><strong>CR Number:</strong> " + company.cr + "</p><p><strong>VAT:</strong> " + company.vat + "</p></div><div class='cta-card'><h3>Primary Contact</h3><p><strong>Contact Person:</strong> " + company.contactPerson + "</p><p><strong>Position:</strong> " + company.position + "</p><p><strong>Phone:</strong> " + company.phone1 + " / " + company.phone2 + "</p><p><strong>Email:</strong> " + company.email + "</p></div></div></div></section>");
    win.document.write("</body></html>");
    win.document.close();
    setTimeout(function () { win.print(); }, 500);
  }
  window.BOQPdf = { exportReport };
})();
