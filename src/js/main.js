/**
 * Eutimia - Main JavaScript
 * Gestão do conhecimento para líderes
 */

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
   BUTTON INTERACTIONS
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
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
   FOOTER SOCIAL LINKS
═══════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = {
    in: "https://linkedin.com",
    ig: "https://instagram.com",
    yt: "https://youtube.com",
  };

  document.querySelectorAll(".footer-icon").forEach((icon) => {
    const label = icon.textContent.trim();
    if (label === "coming") return; // Skip coming soon icons

    icon.addEventListener("click", function () {
      const url = socialLinks[label];
      if (url) {
        window.open(url, "_blank");
      }
    });

    icon.style.cursor = "pointer";
  });
});

console.log("✓ Eutimia - App initialized");
