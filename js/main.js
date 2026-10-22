/**
 * SBB 2026 - Interactive Logic & UI Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavigation();
  initContactModal();
  initMobileMenu();
});

/**
 * 1. Intersection Observer for Smooth Scroll Reveal Animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
}

/**
 * 2. Active Section Highlight & Smooth Scrolling Navigation
 */
function initNavigation() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-menu .nav-item');

  function updateActiveNav() {
    let scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
}

/**
 * 3. Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !navDrawer) return;

  function toggleMenu() {
    const isOpen = toggleBtn.classList.toggle('is-active');
    navDrawer.classList.toggle('is-active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('is-active');
      navDrawer.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * 4. Contact Modal Handler
 */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.getElementById('closeModalBtn');
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccessMsg');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close when clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Form submit handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission success
      contactForm.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
      }

      setTimeout(() => {
        closeModal();
        // Reset form state after close animation finishes
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          if (successMsg) successMsg.style.display = 'none';
        }, 400);
      }, 3000);
    });
  }
}
