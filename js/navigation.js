const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

function toggleMenu() {
  const isOpen = nav.classList.contains('open');
  const firstLink = nav.querySelector('a');

  nav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !isOpen);

  if (!isOpen) firstLink?.focus();
}

hamburger.addEventListener('click', toggleMenu);

hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    hamburger.focus();
  }
});