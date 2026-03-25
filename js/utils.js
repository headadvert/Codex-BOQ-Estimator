(function () {
  const storage = {
    get(key, fallback) {
      try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (error) { return fallback; }
    },
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
  };
  function formatNumber(value, decimals) {
    return Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: decimals || 0, maximumFractionDigits: decimals || 0 });
  }
  function formatCurrency(value, currency) { return currency + " " + formatNumber(value, 0); }
  function getMode() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || localStorage.getItem("selected_app") || "boq";
    return String(type).toLowerCase() === "cost" ? "cost" : "boq";
  }
  function makeId(prefix) { return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 10000); }
  window.BOQUtils = { storage, formatNumber, formatCurrency, getMode, makeId };
})();
