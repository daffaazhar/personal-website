// Event listener to add and remove class from HTML element
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  // Check whether the page has been scrolled or not
  if (window.pageYOffset > 10) {
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

// Typing animation
const typedTextSpan = document.querySelector(".typed-text"); // Get element with "typed-text" class
const cursorSpan = document.querySelector(".cursor"); // Get element with "cursor" class
const textArray = ["design", "develop", "maintain"]; // Set the word to be displayed
const typingDelay = 200; // Set typing delay duration
const erasingDelay = 100; // Set erasing delay duration
const newTextDelay = 1800; // Set new text delay duration
let textArrayIndex = 0;
let charIndex = 0;
const type = () => {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
};
const erase = () => {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Tippy Tooltip Function
const tooltipContent = ["HTML5", "CSS3", "Sass", "JavaScript", "React", "TailwindCSS", "PHP", "Figma"];
tooltipContent.forEach((x) => tippy(`.bxl-${x.toLowerCase()}`, { content: x }));
