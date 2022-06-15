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

// Function to open tech-stack tab
const openContent = (evt, contentName) => {
  // Get all elements with "tech-content" class and hide them
  const techContent = document.getElementsByClassName("tech-content");
  for (i = 0; i < techContent.length; i++) {
    techContent[i].style.display = "none";
  }
  // Get all elements with class "tech-icon-box" and remove "active" class
  const techIconBox = document.getElementsByClassName("tech-icon-box");
  for (i = 0; i < techIconBox.length; i++) {
    techIconBox[i].className = techIconBox[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(contentName).style.display = "block";
  evt.currentTarget.className += " active";
};

// Show a tab by default by getting the element with "defaultOpen" id and automatically click it
document.getElementById("defaultOpen").click();

// Mixitup filter
let mixerProject = mixitup(".project-container", {
  selectors: {
    target: ".project-card",
  },
  animation: {
    duration: 300,
  },
});

// Variable to get all elements with "project-filter" class
const projectFilter = document.querySelectorAll(".project-filter");
// Anonymous function to add and remove "active-btn" class from HTML element
function activeFilter() {
  projectFilter.forEach((e) => e.classList.remove("active-btn"));
  this.classList.add("active-btn");
}
// Run the Anonymous activeFilter function when the element is clicked
projectFilter.forEach((e) => e.addEventListener("click", activeFilter));
