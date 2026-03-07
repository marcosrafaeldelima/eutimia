/**
 * Eutimia - Main JavaScript
 * Gestão do conhecimento para líderes
 */

/* ═══════════════════════════════════════════════════════
   FAVICON THEME SWITCHER
═══════════════════════════════════════════════════════ */
function updateFavicon() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const faviconLight = document.querySelector('link[media="(prefers-color-scheme: light)"]');
  const faviconDark = document.querySelector('link[media="(prefers-color-scheme: dark)"]');
  
  if (faviconLight && faviconDark) {
    faviconLight.rel = isDark ? "" : "icon";
    faviconDark.rel = isDark ? "icon" : "";
  }
}

// Atualizar favicon ao carregar
document.addEventListener("DOMContentLoaded", updateFavicon);

// Monitorar mudanças de tema do sistema
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);

/* ═══════════════════════════════════════════════════════
   SMOOTH SCROLL + ACTIVE NAV
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Update active nav link on scroll
  window.addEventListener("scroll", function () {
    let current = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});


/* ═══════════════════════════════════════════════════════
   LAZY LOAD IMAGES
═══════════════════════════════════════════════════════ */
if ("IntersectionObserver" in window) {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((image) => imageObserver.observe(image));
}

/* ═══════════════════════════════════════════════════════
   VIEWPORT ANIMATIONS (Optional Enhancement)
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("section, .serv-card, .depo-card").forEach((el) => {
    observer.observe(el);
  });
});



/* ═══════════════════════════════════════════════════════
   DEPOIMENTOS CAROUSEL
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".depo-track");
  const prevBtn = document.querySelector(".depo-arrow-prev");
  const nextBtn = document.querySelector(".depo-arrow-next");
  if (!track || !prevBtn || !nextBtn) return;

  const VISIBLE = window.innerWidth <= 768 ? 1 : 3;
  const origCards = Array.from(track.children);
  const TOTAL = origCards.length;

  // Prepend clone of last card (buffer for prev)
  track.insertBefore(origCards[TOTAL - 1].cloneNode(true), track.firstChild);
  // Append VISIBLE clones of first cards (buffer for next)
  for (let i = 0; i < VISIBLE; i++) {
    track.appendChild(origCards[i % TOTAL].cloneNode(true));
  }

  let current = 1; // start at first real card (after the prepended clone)

  function jump(animate) {
    const cardWidth = track.children[0].offsetWidth;
    const gap = 20;
    if (!animate) {
      track.style.transition = "none";
      track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
      track.offsetHeight; // force reflow
      track.style.transition = "";
    } else {
      track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
    }
  }

  track.addEventListener("transitionend", function () {
    if (current >= 1 + TOTAL) {
      current -= TOTAL;
      jump(false);
    } else if (current < 1) {
      current += TOTAL;
      jump(false);
    }
  });

  jump(false);

  nextBtn.addEventListener("click", function () { current++; jump(true); });
  prevBtn.addEventListener("click", function () { current--; jump(true); });
});

console.log("✓ Eutimia - App initialized");

