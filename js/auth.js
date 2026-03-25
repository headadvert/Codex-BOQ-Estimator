(function () {
  function initLandingAuth() {
    const modal = document.getElementById("authModal");
    const form = document.getElementById("signupForm");
    const closeButton = document.getElementById("closeAuthModal");
    if (!modal || !form) { return; }
    let selectedApp = "boq";
    function openModal(app) { selectedApp = app || "boq"; modal.classList.add("active"); }
    function closeModal() { modal.classList.remove("active"); }
    document.querySelectorAll("[data-auth-trigger]").forEach(function (button) { button.addEventListener("click", function () { openModal(button.dataset.authTrigger); }); });
    if (closeButton) { closeButton.addEventListener("click", closeModal); }
    modal.addEventListener("click", function (event) { if (event.target === modal) { closeModal(); } });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const user = { name: document.getElementById("userName").value.trim(), email: document.getElementById("userEmail").value.trim(), company: document.getElementById("userCompany").value.trim(), phone: document.getElementById("userPhone").value.trim(), projectCount: 0, unlimitedAccess: false };
      BOQUtils.storage.set("boq_user", user);
      localStorage.setItem("selected_app", selectedApp);
      window.location.href = "dashboard.html?type=" + encodeURIComponent(selectedApp);
    });
  }
  document.addEventListener("DOMContentLoaded", initLandingAuth);
})();
