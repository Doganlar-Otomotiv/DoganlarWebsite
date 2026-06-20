function loadParticles() {
  if (typeof tsParticles === 'undefined') return;

  tsParticles.load("particles-js", {
    background: { color: { value: "#0c0c0c" } },
    fpsLimit: 60,
    particles: {
      color: { value: "#3ea6ff" },
      links: {
        enable: true,
        color: "#3ea6ff",
        distance: 150,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        outModes: "bounce"
      },
      number: { value: 40 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
  }).catch(console.error);
}

document.addEventListener('DOMContentLoaded', loadParticles);