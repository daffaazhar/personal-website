window.addEventListener("scroll",()=>{let a=document.querySelector("header");window.pageYOffset>10?a.classList.add("shadow-large"):a.classList.remove("shadow-large")});const primaryNav=document.querySelector(".primary-navigation"),navToggle=document.querySelector(".mobile-nav-toggle");navToggle.addEventListener("click",()=>{let a=primaryNav.getAttribute("data-visible");"false"===a?(primaryNav.setAttribute("data-visible",!0),navToggle.setAttribute("aria-expanded",!0)):"true"===a&&(primaryNav.setAttribute("data-visible",!1),navToggle.setAttribute("aria-expanded",!1))});const openContent=(c,d)=>{let b=document.getElementsByClassName("tech-content");for(i=0;i<b.length;i++)b[i].style.display="none";let a=document.getElementsByClassName("tech-icon-box");for(i=0;i<a.length;i++)a[i].className=a[i].className.replace(" active","");document.getElementById(d).style.display="block",c.currentTarget.className+=" active"};document.getElementById("defaultOpen").click();const typedTextSpan=document.querySelector(".typed-text"),cursorSpan=document.querySelector(".cursor"),textArray=["design","develop","maintain"],typingDelay=200,erasingDelay=100,newTextDelay=1800;let textArrayIndex=0,charIndex=0;const type=()=>{charIndex<textArray[textArrayIndex].length?(cursorSpan.classList.contains("typing")||cursorSpan.classList.add("typing"),typedTextSpan.textContent+=textArray[textArrayIndex].charAt(charIndex),charIndex++,setTimeout(type,200)):(cursorSpan.classList.remove("typing"),setTimeout(erase,1800))},erase=()=>{charIndex>0?(cursorSpan.classList.contains("typing")||cursorSpan.classList.add("typing"),typedTextSpan.textContent=textArray[textArrayIndex].substring(0,charIndex-1),charIndex--,setTimeout(erase,100)):(cursorSpan.classList.remove("typing"),++textArrayIndex>=textArray.length&&(textArrayIndex=0),setTimeout(type,1300))};document.addEventListener("DOMContentLoaded",function(){textArray.length&&setTimeout(type,2050)});const tooltipContent=["HTML5","CSS3","Sass","JavaScript","React","TailwindCSS","PHP","Figma"];tooltipContent.forEach(a=>tippy(`.bxl-${a.toLowerCase()}`,{content:a}))