(function () {
  var PROFILE_KEY = "qs_user_profile";
  var PLAN_KEY = "qs_user_plan";

  function byId(id) {
    return document.getElementById(id);
  }

  function getProfile() {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    } catch (error) {
      return null;
    }
  }

  function setProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function getSelectedPlan() {
    return localStorage.getItem(PLAN_KEY) || "";
  }

  function setSelectedPlan(plan) {
    localStorage.setItem(PLAN_KEY, plan);
  }

  function getRedirectTarget() {
    var params = new URLSearchParams(window.location.search);
    return params.get("redirect") || "./boq-estimator.html";
  }

  function requireAccess() {
    if (window.location.pathname.toLowerCase().indexOf("access.html") !== -1) {
      return;
    }
    if (!getProfile() || !getSelectedPlan()) {
      var page = window.location.pathname.split("/").pop() || "boq-estimator.html";
      var redirect = "./access.html?redirect=" + encodeURIComponent(page);
      window.location.replace(redirect);
    }
  }

  function initAccessPage() {
    var leadForm = byId("lead-form");
    if (!leadForm) {
      return;
    }

    var planStep = byId("plan-step");
    var accessStep = byId("access-step");
    var errorNote = byId("lead-error");
    var continueLink = byId("continue-link");
    var planNote = byId("selected-plan-note");
    continueLink.href = getRedirectTarget();

    var existingProfile = getProfile();
    var existingPlan = getSelectedPlan();

    if (existingProfile) {
      byId("lead-name").value = existingProfile.name || "";
      byId("lead-company").value = existingProfile.company || "";
      byId("lead-email").value = existingProfile.email || "";
      byId("lead-phone").value = existingProfile.phone || "";
      byId("lead-purpose").value = existingProfile.purpose || "";
      planStep.hidden = false;
    }

    if (existingProfile && existingPlan) {
      planNote.textContent = "Current plan: " + existingPlan + ". You can continue or change it below.";
      accessStep.hidden = false;
    }

    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!leadForm.reportValidity()) {
        errorNote.hidden = false;
        return;
      }
      errorNote.hidden = true;
      setProfile({
        name: byId("lead-name").value.trim(),
        company: byId("lead-company").value.trim(),
        email: byId("lead-email").value.trim(),
        phone: byId("lead-phone").value.trim(),
        purpose: byId("lead-purpose").value,
        updatedAt: new Date().toISOString()
      });
      planStep.hidden = false;
      accessStep.hidden = true;
      planStep.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    Array.prototype.forEach.call(document.querySelectorAll("[data-plan]"), function (button) {
      button.addEventListener("click", function () {
        var plan = button.getAttribute("data-plan");
        setSelectedPlan(plan);
        planNote.textContent = "Plan selected: " + plan + ". Access is now enabled.";
        accessStep.hidden = false;
        accessStep.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  window.QSAccessGate = {
    requireAccess: requireAccess,
    getProfile: getProfile,
    getSelectedPlan: getSelectedPlan
  };

  requireAccess();
  initAccessPage();
})();
