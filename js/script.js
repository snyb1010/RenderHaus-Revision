// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobileMenu');

  const showMenu = () => {
    mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
    document.body.classList.add('overflow-hidden');
  };

  const hideMenu = () => {
    mobileMenu.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  };

  openBtn?.addEventListener('click', showMenu);
  closeBtn?.addEventListener('click', hideMenu);

  const menuLinks = mobileMenu?.querySelectorAll('a, button');
  menuLinks?.forEach(link => {
    link.addEventListener('click', hideMenu);
  });
});

// Navbar visibility toggle based on HERO section
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");
  const navStartBtn = document.getElementById("nav-start-btn");

  function setupObserver() {
    if (window.innerWidth >= 1024 && heroSection && navStartBtn) {
      const heroObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              navStartBtn.classList.add("opacity-0", "translate-y-3", "hidden");
            } else {
              navStartBtn.classList.remove("hidden");
              setTimeout(() => {
                navStartBtn.classList.remove("opacity-0", "translate-y-3");
              }, 50);
            }
          });
        },
        { threshold: 0.2 }
      );

      heroObserver.observe(heroSection);
    } else if (navStartBtn) {
      navStartBtn.classList.add("hidden");
    }
  }

  setupObserver();

  // Removed reload on resize to prevent fullscreen reload issue
  // window.addEventListener("resize", () => {
  //   if (!document.fullscreenElement) {
  //     location.reload();
  //   }
  // });
});

// Shared intersection reveal animation for fade-up
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-5');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in-up, #scale-text, #scale-image, #how-it-works-title, #how-it-works-desc').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
  fadeObserver.observe(el);
});

// Sticky glass navbar on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('navbar');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('glass-nav');
    } else {
      header.classList.remove('glass-nav');
    }
  }
});

// Sections and nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar ul li a');

function clearActiveLinks() {
  navLinks.forEach(link => link.classList.remove('active'));
}

function setActiveNav() {
  const scrollPos = window.scrollY + 90;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      clearActiveLinks();
      const activeLink = document.querySelector(`#navbar ul li a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

document.querySelectorAll('#navbar ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerOffset = 80;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove('opacity-0', 'invisible');
    backToTopButton.classList.add('opacity-100', 'visible');
  } else {
    backToTopButton.classList.remove('opacity-100', 'visible');
    backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

AOS.init({
  once: true,
  duration: 800,
  offset: 120,
});

// Typing effect
const words = ["Content Creators", "Founders", "Marketing Teams"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;
const speed = 60;
const delay = 1000;

function type() {
  const el = document.getElementById("typewriter");

  if (i < words.length) {
    if (!isDeleting && j <= words[i].length) {
      currentWord = words[i].substring(0, j++);
      el.textContent = currentWord;
      setTimeout(type, speed);
    } else if (isDeleting && j >= 0) {
      currentWord = words[i].substring(0, j--);
      el.textContent = currentWord;
      setTimeout(type, speed / 2);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, delay);
      } else {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, speed);
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", type);

// Intersection observers for animations & fades
document.addEventListener("DOMContentLoaded", () => {
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("feature-item")) {
          entry.target.classList.add("animate-slide-in-left");
          observer.unobserve(entry.target);
        }
        if (entry.target.id === "custom-quote") {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
        if (entry.target.id === "price-section") {
          entry.target.classList.add("animate-fade-up");
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  document.querySelectorAll(".feature-item").forEach(el => observer.observe(el));
  const customQuote = document.getElementById("custom-quote");
  if (customQuote) observer.observe(customQuote);
  const priceSection = document.getElementById("price-section");
  if (priceSection) observer.observe(priceSection);
});

const fadeUpObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up-on-scroll').forEach((el) => fadeUpObserver.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up-on-scroll').forEach(el => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('#get-started');
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        section.classList.add('visible');
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('get-started');
  const leftText = section.querySelector('.animate-slide-in-left');
  const rightButtons = section.querySelector('.animate-fade-in');

  leftText.classList.remove('animate-slide-in-left');
  rightButtons.classList.remove('animate-fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        leftText.classList.add('animate-slide-in-left');
        rightButtons.classList.add('animate-fade-in');
        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.2
  });

  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-now-btn');
  const formSection = document.getElementById('get-started');

  startBtn.addEventListener('click', () => {
    formSection.classList.remove('hidden');

    setTimeout(() => {
      formSection.classList.remove('opacity-0', 'scale-95');
      formSection.classList.add('opacity-100', 'scale-100');
    }, 10);

    setTimeout(() => {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  });
});

window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }
});
