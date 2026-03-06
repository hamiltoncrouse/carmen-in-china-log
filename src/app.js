(() => {
  const rail = document.getElementById('rail');
  const dots = [...document.querySelectorAll('.dot')];

  const setCurrent = (id) => {
    dots.forEach((d) => d.setAttribute('aria-current', d.dataset.to === id ? 'true' : 'false'));
  };

  dots.forEach((d) => {
    d.addEventListener('click', () => {
      const el = document.getElementById(d.dataset.to);
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setCurrent(d.dataset.to);
    });
  });

  if (rail && 'IntersectionObserver' in window) {
    const cards = [...rail.querySelectorAll('.card')];
    const io = new IntersectionObserver((entries) => {
      const best = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => (b.intersectionRatio - a.intersectionRatio))[0];
      if (!best) return;
      setCurrent(best.target.id);
    }, { root: rail, threshold: [0.35, 0.55, 0.75] });

    cards.forEach(c => io.observe(c));
  }
})();
