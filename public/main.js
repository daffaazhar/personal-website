// Event listener to add and remove class from HTML element
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  // Check whether the page has been scrolled or not
  if (window.pageYOffset > 0) {
    header.classList.add("shadow-large");
  } else {
    header.classList.remove("shadow-large");
  }
});

// Variable for navigation bar
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
// Event listener to add an remove attribute from HTML element
navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");
  // Check whether the toggle has been clicked or not
  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});
