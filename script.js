const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeReveal(el) {
  if (el && !el.classList.contains('visible')) {
    revealObserver.observe(el);
  }
}

window.observeReveal = observeReveal;

function initReveals() {
  document.querySelectorAll('.reveal').forEach(observeReveal);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveals);
} else {
  initReveals();
}
