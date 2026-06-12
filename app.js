// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.feature-card, .stat-card, .step, .integration-badge, .hero-metrics .metric'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Staggered delay for cards
document.querySelectorAll('.feature-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.stat-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// Animated counters
const counters = document.querySelectorAll('.stat-val');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.target);
    const suffix = el.querySelector('span')?.textContent || '';
    let current = 0;
    const duration = 1400;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.innerHTML = Math.floor(current) + `<span>${suffix}</span>`;
      if (current >= target) clearInterval(timer);
    }, 16);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// Navbar scroll style
window.addEventListener('scroll', () => {
  document.querySelector('.navbar').style.background =
    window.scrollY > 20 ? 'rgba(6,8,16,0.95)' : 'rgba(6,8,16,0.75)';
});

// Form submission
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.textContent = 'Request Received!';
  btn.style.background = 'linear-gradient(135deg, #00ff88, #00b4d8)';
  setTimeout(() => {
    btn.innerHTML = 'Request a Demo <span class="arrow">→</span>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// Hamburger (mobile)
document.getElementById('hamburger')?.addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const btn = document.querySelector('.btn-nav');
  if (links) {
    const open = links.style.display === 'flex';
    links.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(6,8,16,0.97);padding:24px;gap:20px;border-bottom:1px solid rgba(255,255,255,0.07)';
    if (btn) btn.style.display = open ? '' : 'none';
  }
});
