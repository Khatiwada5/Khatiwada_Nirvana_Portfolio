const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("main > section[id], #top");
const skillBars = document.querySelectorAll(".skill-bar");
const timeline = document.querySelector(".timeline");
const typewriter = document.querySelector("[data-typewriter]");

const roles = ["Full Stack Developer", "AI Builder", "Business Analyst"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const type = () => {
  const current = roles[roleIndex];
  typewriter.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
    window.setTimeout(type, 70);
    return;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    window.setTimeout(type, 1100);
    return;
  }

  if (isDeleting && charIndex > 0) {
    charIndex -= 1;
    window.setTimeout(type, 36);
    return;
  }

  isDeleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  window.setTimeout(type, 180);
};

const updateActiveNav = () => {
  const fromTop = window.scrollY + 130;
  let activeId = "top";

  document.querySelectorAll("main > section[id]").forEach((section) => {
    if (section.offsetTop <= fromTop) activeId = section.id;
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${activeId}`);
  });
};

const updateTimeline = () => {
  if (!timeline) return;
  const rect = timeline.getBoundingClientRect();
  const viewport = window.innerHeight;
  const progress = Math.min(1, Math.max(0, (viewport * 0.74 - rect.top) / rect.height));
  timeline.style.setProperty("--line-height", `${progress * 100}%`);
};

year.textContent = new Date().getFullYear();
updateHeader();
updateActiveNav();
updateTimeline();
type();

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveNav();
  updateTimeline();
}, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

document.querySelectorAll("[data-href]").forEach((card) => {
  const openCardLink = () => {
    window.open(card.dataset.href, "_blank", "noopener,noreferrer");
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openCardLink();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openCardLink();
  });
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const progress = entry.target.dataset.progress;
    entry.target.style.setProperty("--progress", `${progress}%`);
    entry.target.querySelector("span").dataset.label = `${progress}%`;
    entry.target.classList.add("is-filled");
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.35 });

skillBars.forEach((bar) => skillObserver.observe(bar));

if (window.AOS) {
  AOS.init({
    duration: 850,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    once: true,
    offset: 80
  });
}

if (window.particlesJS) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 58, density: { enable: true, value_area: 900 } },
      color: { value: ["#8b5cf6", "#36f5a2", "#38bdf8"] },
      shape: { type: "circle" },
      opacity: { value: 0.34, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 145,
        color: "#8b5cf6",
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.3,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.28 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

const initSlimeCompanion = () => {
  if (document.getElementById("anime-assistant")) return;

  const rimuru = document.createElement("div");
  rimuru.id = "anime-assistant";
  rimuru.className = "form-slime";
  rimuru.setAttribute("aria-hidden", "true");
  rimuru.innerHTML = `
    <div class="rimuru-magic-circle"></div>
    <div class="rimuru-aura"></div>
    <div class="rimuru-character">
      <div class="rimuru-slime-mesh">
        <div class="slime-shine"></div>
        <div class="slime-eye left"></div>
        <div class="slime-eye right"></div>
      </div>
      <div class="rimuru-human-mesh">
        <div class="human-shadow"></div>
        <div class="human-hair-back"></div>
        <div class="human-legs">
          <div class="human-leg left"><span></span></div>
          <div class="human-leg right"><span></span></div>
        </div>
        <div class="human-coat">
          <div class="coat-highlight"></div>
          <div class="coat-lapel left"></div>
          <div class="coat-lapel right"></div>
        </div>
        <div class="human-shirt"></div>
        <div class="human-scarf">
          <div class="scarf-tail left"></div>
          <div class="scarf-tail right"></div>
        </div>
        <div class="human-arm left"></div>
        <div class="human-arm right"></div>
        <div class="human-head">
          <div class="human-ear left"></div>
          <div class="human-ear right"></div>
          <div class="human-hair-front"></div>
          <div class="hair-strand strand-one"></div>
          <div class="hair-strand strand-two"></div>
          <div class="hair-strand strand-three"></div>
          <div class="human-eye left"><div class="pupil"></div></div>
          <div class="human-eye right"><div class="pupil"></div></div>
          <div class="human-brow left"></div>
          <div class="human-brow right"></div>
          <div class="human-nose"></div>
          <div class="human-mouth"></div>
          <div class="human-cheek"></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(rimuru);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isMobile || prefersReducedMotion) {
    rimuru.style.display = "none";
    return;
  }

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;
  let wanderTimer = 0;
  let formChangeTimer = 0;
  let isPanicking = false;
  let currentForm = "slime";

  const settings = {
    moveSpeed: 0.025,
    fleeThreshold: 120,
    wanderInterval: 4500,
    formInterval: 8000
  };

  const renderPosition = () => {
    rimuru.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate3d(-50%, -50%, 0)`;
  };

  const getNewTarget = () => {
    const xPad = 130;
    const yPad = 150;
    const width = Math.max(1, window.innerWidth - xPad * 2);
    const height = Math.max(1, window.innerHeight - yPad * 2);
    targetX = Math.min(window.innerWidth - xPad, xPad + Math.random() * width);
    targetY = Math.min(window.innerHeight - yPad, yPad + Math.random() * height);
  };

  const createMorphBurst = (x, y) => {
    for (let i = 0; i < 12; i += 1) {
      const particle = document.createElement("div");
      particle.className = "morph-particle";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--mx", `${(Math.random() - 0.5) * 80}px`);
      particle.style.setProperty("--my", `${(Math.random() - 0.5) * 80}px`);
      document.body.appendChild(particle);
      window.setTimeout(() => particle.remove(), 600);
    }
  };

  const toggleForm = (forcedForm = null) => {
    const nextForm = forcedForm || (currentForm === "slime" ? "human" : "slime");
    if (nextForm === currentForm) return;

    currentForm = nextForm;
    createMorphBurst(currentX, currentY);
    rimuru.classList.toggle("form-slime", currentForm === "slime");
    rimuru.classList.toggle("form-human", currentForm === "human");
  };

  const escapeThreat = (mouseX, mouseY) => {
    if (isPanicking) return;
    isPanicking = true;
    toggleForm("slime");
    rimuru.classList.add("panic");

    window.setTimeout(() => {
      let clearLocation = false;
      let attempts = 0;

      while (!clearLocation && attempts < 24) {
        getNewTarget();
        clearLocation = Math.hypot(targetX - mouseX, targetY - mouseY) > 420;
        attempts += 1;
      }

      currentX = targetX;
      currentY = targetY;
      renderPosition();
      createMorphBurst(currentX, currentY);

      window.setTimeout(() => {
        rimuru.classList.remove("panic");
        isPanicking = false;
      }, 300);
    }, 200);
  };

  window.addEventListener("pointermove", (event) => {
    if (isPanicking) return;
    const gap = Math.hypot(event.clientX - currentX, event.clientY - currentY);
    if (gap < settings.fleeThreshold) {
      escapeThreat(event.clientX, event.clientY);
    }
  }, { passive: true });

  const tick = (time) => {
    if (!isPanicking) {
      if (time - wanderTimer > settings.wanderInterval) {
        getNewTarget();
        wanderTimer = time;
        if (Math.random() > 0.4) toggleForm("slime");
      }

      if (time - formChangeTimer > settings.formInterval) {
        if (Math.random() > 0.3) toggleForm("human");
        formChangeTimer = time;
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * settings.moveSpeed;
      currentY += dy * settings.moveSpeed;
      renderPosition();

      if (Math.abs(dx) > 0.2) {
        rimuru.querySelector(".rimuru-character").style.transform = `scaleX(${dx > 0 ? 1 : -1})`;
      }
    }

    window.requestAnimationFrame(tick);
  };

  getNewTarget();
  renderPosition();
  window.requestAnimationFrame(tick);
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initSlimeCompanion);
} else {
  initSlimeCompanion();
}
