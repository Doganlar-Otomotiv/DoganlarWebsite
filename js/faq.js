document.querySelectorAll('.faq-question').forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-question')
        .setAttribute('aria-expanded', 'false');

      item.classList.remove('active');
    });

    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.parentElement.classList.add('active');
    }
  });
});