// Load Navbar HTML
fetch("components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    initNavbar(); // run navbar-related scripts after it's loaded
  });
  
function initNavbar() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const dropdowns = document.querySelectorAll(".dropdown");
  const dropdownSubs = document.querySelectorAll(".dropdown-sub");

  // Toggle navigation
  burger?.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("open");

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });
  });

  // Handle main dropdowns and sub-dropdowns on mobile
  document.querySelectorAll(".dropdown-trigger").forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parentDropdown = this.closest(".dropdown, .dropdown-sub");
        if (parentDropdown) {
          parentDropdown.classList.toggle("open");
          // Close other dropdowns of the same type
          const allDropdowns = parentDropdown.classList.contains("dropdown")
            ? dropdowns
            : dropdownSubs;
          allDropdowns.forEach((other) => {
            if (other !== parentDropdown) {
              other.classList.remove("active");
            }
          });
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !nav?.contains(e.target) &&
      !burger?.contains(e.target) &&
      window.innerWidth <= 768
    ) {
      nav?.classList.remove("nav-active");
      burger?.classList.remove("open");

      // Close all dropdowns
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
      dropdownSubs.forEach((dropdownSub) =>
        dropdownSub.classList.remove("active")
      );
    }
  });

  // Close mobile nav when clicking regular links (not dropdown triggers)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      const isDropdownTrigger = link.classList.contains("dropdown-trigger");

      // If it's a dropdown trigger, don't close the menu
      if (isDropdownTrigger) {
        e.preventDefault();
        return;
      }

      // Otherwise, close the mobile nav
      nav.classList.remove("nav-active");
      burger.classList.remove("open");

      // Close any open dropdowns
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
      dropdownSubs.forEach((dropdownSub) =>
        dropdownSub.classList.remove("active")
      );
    }
  });
});




}