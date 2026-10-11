/* ===========================
   WORK DROPDOWN — click to open/close + active state
=========================== */
(function () {
  const workItem = document.querySelector('.nav-item-work');
  const trigger  = document.querySelector('.nav-work-trigger');
  if (!workItem || !trigger) return;

  // mark current page's project as active
  const currentFile = window.location.pathname.split('/').pop();
  document.querySelectorAll('.dropdown-item').forEach((item) => {
    const href = item.getAttribute('href');
    if (href && href === currentFile) {
      item.classList.add('active');
    }
  });

  function close() {
    workItem.classList.remove('dropdown-open');
  }

  function toggle(e) {
    e.stopPropagation();
    workItem.classList.toggle('dropdown-open');
  }

  trigger.addEventListener('click', toggle);

  // clicking anywhere outside closes it
  document.addEventListener('click', (e) => {
    if (!workItem.contains(e.target)) close();
  });

  // ESC closes it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

/* ===========================
   NAV — hide on scroll down, show on scroll up
   Fade leads, slide follows on hide.
   Slide leads on show.
=========================== */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;
  let hidden = false;

  function hideNav() {
    if (hidden) return;
    hidden = true;
    // opacity fades first (0.38s), transform slides up after opacity is nearly gone (0.28s delay)
    nav.style.transition = 'opacity 0.38s ease, transform 0.4s ease 0.28s';
    nav.classList.add('nav-hidden');
  }

  function showNav() {
    if (!hidden) return;
    hidden = false;
    // slide down and fade in together, quick
    nav.style.transition = 'opacity 0.35s ease, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    nav.classList.remove('nav-hidden');
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      if (currentY > nav.offsetHeight) {
        if (diff > 4) {
          hideNav();
        } else if (diff < -4) {
          showNav();
        }
      } else {
        showNav();
      }

      lastY = currentY;
      ticking = false;
    });
  }, { passive: true });
})();
