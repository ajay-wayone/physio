document.addEventListener("DOMContentLoaded", loadIncludes);

async function loadIncludes() {
  const elements = document.querySelectorAll("[include-html]");

  for (const el of elements) {
    const file = el.getAttribute("include-html");
    if (!file) continue;

    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error("Cannot load " + file);

      const html = await res.text();
      el.innerHTML = html;
      el.removeAttribute("include-html");

      // If header loaded, initialize header logic immediately
      if (file.includes("header.html")) {
        initHeader();
      }

      // If contact section loaded, initialize contact form logic
      if (file.includes("contact-section.html")) {
        initContactForm();
      }
    } catch (e) {
      console.error("Include error:", e);
    }
  }
}

function activateCurrentNav() {
  const links = document.querySelectorAll(".header-navigation a");

  if (!links.length) return;

  // Get current page filename
  let current = window.location.pathname.split("/").pop();

  // If pathname is empty or just "/", default to index
  if (!current || current === "") {
    current = "index";
  }

  // Remove .html extension for comparison
  if (current.endsWith(".html")) {
    current = current.replace(".html", "");
  }

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    let file = href.split("/").pop();

    // Remove .html extension for comparison
    if (file.endsWith(".html")) {
      file = file.replace(".html", "");
    }

    if (file === current) {
      link.classList.add("active");
    }
  });
}

function initHeader() {
  attachMobileMenu();
  activateCurrentNav();
}

function attachMobileMenu() {
  const btn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector(".header-navigation");
  const actionBtn = document.querySelector(".header-action-btn");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("mobile-active");
    btn.classList.toggle("active");
    if (actionBtn) actionBtn.classList.toggle("mobile-active");
  });
}

function initContactForm() {
  const roleSelect = document.getElementById("c-role");
  const subjectSelect = document.getElementById("c-subject");
  const otherRoleGroup = document.getElementById("other-role-group");
  const otherSubjectGroup = document.getElementById("other-subject-group");

  // Remove patient and physio options if on infrastructure page
  if (window.location.pathname.includes('/infrastructure')) {
    if (roleSelect) {
      const patientOption = roleSelect.querySelector('option[value="patient"]');
      const physioOption = roleSelect.querySelector('option[value="physio"]');
      if (patientOption) patientOption.remove();
      if (physioOption) physioOption.remove();
    }

    if (subjectSelect) {
      const patientSupport = subjectSelect.querySelector('option[value="patient_support"]');
      const physioRegistration = subjectSelect.querySelector('option[value="physiotherapist_registration"]');

      if (patientSupport) patientSupport.remove();
      if (physioRegistration) physioRegistration.remove();
    }
  }



  if (roleSelect) {
    roleSelect.addEventListener("change", function () {
      if (this.value === "other") {
        otherRoleGroup.style.display = "block";
      } else {
        otherRoleGroup.style.display = "none";
      }
    });
  }

  if (subjectSelect) {
    subjectSelect.addEventListener("change", function () {
      if (this.value === "others") {
        otherSubjectGroup.style.display = "block";
      } else {
        otherSubjectGroup.style.display = "none";
      }
    });
  }
}