window.addEventListener('load', () => {
  const loading = document.getElementById('loading');

  setTimeout(() => {
    loading.classList.add('hidden');
    setTimeout(() => loading.remove(), 500);
  }, 1000);
});