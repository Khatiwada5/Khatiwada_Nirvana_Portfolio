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
