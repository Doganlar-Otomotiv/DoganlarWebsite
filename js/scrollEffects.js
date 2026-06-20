const navLinks = document.querySelectorAll("nav a");
const sections = [...document.querySelectorAll("section")];

let isScrolling = false;

function updateActiveNavigation() {
  if (isScrolling) return;

  const scrollY = window.pageYOffset;
  let currentSection = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (currentSection && link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  setTimeout(updateActiveNavigation, 10);
});

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    if (!href.startsWith("#")) return;

    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      isScrolling = true;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      setTimeout(() => (isScrolling = false), 1000);
    }
  });
});

// reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  sections.forEach(section => {
    section.style.opacity = '0.8';
    section.style.transform = 'translateY(20px)';
    section.style.transition = '0.6s ease';
    observer.observe(section);
  });
});