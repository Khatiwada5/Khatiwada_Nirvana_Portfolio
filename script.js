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

const initButlerMascot = () => {
  if (document.querySelector("[data-mascot]")) return;

  const mascot = document.createElement("div");
  mascot.className = "anime-mascot";
  mascot.dataset.mascot = "";
  mascot.setAttribute("aria-hidden", "true");
  mascot.innerHTML = `
    <svg viewBox="0 0 70 100" role="img">
      <defs>
        <filter id="butler-layer-shadow" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="#050509" flood-opacity="0.48"></feDropShadow>
        </filter>
        <filter id="butler-hair-shadow" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.1" flood-color="#030408" flood-opacity="0.58"></feDropShadow>
        </filter>
        <radialGradient id="butler-face" cx="44%" cy="34%" r="67%">
          <stop offset="0%" stop-color="#ffe1cd"></stop>
          <stop offset="54%" stop-color="#ecc0a5"></stop>
          <stop offset="100%" stop-color="#b87966"></stop>
        </radialGradient>
        <radialGradient id="butler-neck" cx="50%" cy="22%" r="82%">
          <stop offset="0%" stop-color="#f7cdb7"></stop>
          <stop offset="100%" stop-color="#a86d5f"></stop>
        </radialGradient>
        <linearGradient id="butler-hair" x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stop-color="#263249"></stop>
          <stop offset="22%" stop-color="#0d1324"></stop>
          <stop offset="72%" stop-color="#03050d"></stop>
          <stop offset="100%" stop-color="#151d31"></stop>
        </linearGradient>
        <linearGradient id="butler-hair-shine" x1="10%" y1="8%" x2="86%" y2="65%">
          <stop offset="0%" stop-color="#6f7f9f" stop-opacity="0.75"></stop>
          <stop offset="45%" stop-color="#2d3855" stop-opacity="0.52"></stop>
          <stop offset="100%" stop-color="#0b1020" stop-opacity="0"></stop>
        </linearGradient>
        <radialGradient id="butler-jacket" cx="48%" cy="22%" r="86%">
          <stop offset="0%" stop-color="#41475a"></stop>
          <stop offset="45%" stop-color="#171923"></stop>
          <stop offset="100%" stop-color="#02030a"></stop>
        </radialGradient>
        <linearGradient id="butler-lapel" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stop-color="#2f3341"></stop>
          <stop offset="56%" stop-color="#0e111a"></stop>
          <stop offset="100%" stop-color="#010207"></stop>
        </linearGradient>
        <linearGradient id="butler-shirt" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"></stop>
          <stop offset="58%" stop-color="#dfe2e8"></stop>
          <stop offset="100%" stop-color="#a6adbc"></stop>
        </linearGradient>
        <radialGradient id="butler-cravat" cx="45%" cy="28%" r="74%">
          <stop offset="0%" stop-color="#46305e"></stop>
          <stop offset="60%" stop-color="#1b1029"></stop>
          <stop offset="100%" stop-color="#05030a"></stop>
        </radialGradient>
        <radialGradient id="butler-glove" cx="36%" cy="26%" r="73%">
          <stop offset="0%" stop-color="#fffdf2"></stop>
          <stop offset="65%" stop-color="#d8d5c8"></stop>
          <stop offset="100%" stop-color="#8f8b82"></stop>
        </radialGradient>
        <radialGradient id="butler-leg" cx="42%" cy="22%" r="86%">
          <stop offset="0%" stop-color="#31364a"></stop>
          <stop offset="65%" stop-color="#10131c"></stop>
          <stop offset="100%" stop-color="#02040a"></stop>
        </radialGradient>
        <radialGradient id="butler-shoe" cx="36%" cy="22%" r="88%">
          <stop offset="0%" stop-color="#303545"></stop>
          <stop offset="65%" stop-color="#080a10"></stop>
          <stop offset="100%" stop-color="#010103"></stop>
        </radialGradient>
        <radialGradient id="butler-eye" cx="68%" cy="25%" r="78%">
          <stop offset="0%" stop-color="#302044"></stop>
          <stop offset="60%" stop-color="#12091f"></stop>
          <stop offset="100%" stop-color="#030207"></stop>
        </radialGradient>
        <radialGradient id="butler-puff" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#483264" stop-opacity="0.74"></stop>
          <stop offset="72%" stop-color="#090712" stop-opacity="0.42"></stop>
          <stop offset="100%" stop-color="#090712" stop-opacity="0"></stop>
        </radialGradient>
      </defs>
      <ellipse class="butler-aura" cx="35" cy="91" rx="23" ry="8"></ellipse>
      <ellipse class="butler-puff" cx="35" cy="88" rx="30" ry="14"></ellipse>
      <ellipse class="butler-shadow" cx="35" cy="93" rx="18" ry="4"></ellipse>
      <g class="butler-rig">
        <g class="butler-body">
          <g class="butler-legs">
            <path class="butler-leg butler-left-leg" d="M29 60 C27 71 26 80 24 91 L18 91 C20 78 22 68 24 59z" fill="url(#butler-leg)" filter="url(#butler-layer-shadow)"></path>
            <path class="butler-shoe butler-left-shoe" d="M17 89 H27 C29 93 25 96 16 94z" fill="url(#butler-shoe)"></path>
            <path class="butler-leg butler-right-leg" d="M41 60 C43 71 44 80 46 91 L40 91 C37 80 36 71 36 59z" fill="url(#butler-leg)" filter="url(#butler-layer-shadow)"></path>
            <path class="butler-shoe butler-right-shoe" d="M39 89 H49 C52 93 48 96 39 94z" fill="url(#butler-shoe)"></path>
          </g>
          <path class="butler-tail left-tail" d="M23 49 C13 62 13 79 20 91 C27 78 31 64 30 51z" fill="url(#butler-jacket)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-tail right-tail" d="M47 49 C57 62 57 79 50 91 C43 78 39 64 40 51z" fill="url(#butler-jacket)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-neck" d="M29 35 H41 L43 47 H27z" fill="url(#butler-neck)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-jacket" d="M19 45 C23 38 47 38 51 45 L47 71 C42 77 28 77 23 71z" fill="url(#butler-jacket)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-shirt" d="M29 42 H41 L44 70 H26z" fill="url(#butler-shirt)"></path>
          <path class="butler-shirt-shadow" d="M35 43 C34 52 34 62 36 70" fill="none" stroke="#8d95a6" stroke-width="1" opacity="0.45"></path>
          <path class="butler-left-lapel" d="M20 45 L31 40 L35 70 L23 61z" fill="url(#butler-lapel)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-right-lapel" d="M50 45 L39 40 L35 70 L47 61z" fill="url(#butler-lapel)" filter="url(#butler-layer-shadow)"></path>
          <path class="butler-cravat" d="M30 40 C32 37 38 37 40 40 L38 48 L35 52 L32 48z" fill="url(#butler-cravat)" filter="url(#butler-layer-shadow)"></path>
          <ellipse class="butler-cravat-knot" cx="35" cy="41" rx="4" ry="3" fill="url(#butler-cravat)"></ellipse>
          <g class="butler-arms">
            <path class="butler-arm butler-left-arm" d="M22 48 C16 57 15 67 20 76" fill="none" stroke="url(#butler-jacket)" stroke-width="7" stroke-linecap="round" filter="url(#butler-layer-shadow)"></path>
            <path class="butler-glove butler-left-glove" d="M18 74 C18 80 24 80 24 74 C22 72 20 72 18 74z" fill="url(#butler-glove)"></path>
            <path class="butler-knuckle left-knuckle" d="M19 75 C21 74 23 75 24 77" fill="none" stroke="#fffef7" stroke-width="0.9" opacity="0.65"></path>
            <path class="butler-arm butler-right-arm" d="M48 48 C54 57 55 67 50 76" fill="none" stroke="url(#butler-jacket)" stroke-width="7" stroke-linecap="round" filter="url(#butler-layer-shadow)"></path>
            <path class="butler-glove butler-right-glove" d="M46 74 C46 80 52 80 52 74 C50 72 48 72 46 74z" fill="url(#butler-glove)"></path>
            <path class="butler-knuckle right-knuckle" d="M47 75 C49 74 51 75 52 77" fill="none" stroke="#fffef7" stroke-width="0.9" opacity="0.65"></path>
          </g>
          <g class="butler-head-wrap">
            <ellipse class="butler-face" cx="35" cy="23" rx="15" ry="18" fill="url(#butler-face)" filter="url(#butler-layer-shadow)"></ellipse>
            <path class="butler-jaw-shadow" d="M24 29 C28 39 41 39 46 29 C44 40 35 45 27 39 C24 36 23 33 24 29z" fill="#8b554b" opacity="0.2"></path>
            <path class="butler-cheek left-cheek" d="M24 27 C27 30 29 32 31 36" fill="none" stroke="#b36f62" stroke-width="0.8" opacity="0.34"></path>
            <path class="butler-cheek right-cheek" d="M46 27 C43 30 41 32 39 36" fill="none" stroke="#b36f62" stroke-width="0.8" opacity="0.28"></path>
            <path class="butler-hair" d="M20 21 C21 9 31 4 38 6 C47 8 52 15 50 25 C45 18 39 17 35 19 C30 15 25 17 20 21z" fill="url(#butler-hair)" filter="url(#butler-hair-shadow)"></path>
            <path class="butler-widow" d="M32 9 L35 20 L39 9 C37 13 34 13 32 9z" fill="#060914"></path>
            <path class="butler-side-part" d="M29 9 C35 9 43 12 48 19" fill="none" stroke="#59647e" stroke-width="1.2" opacity="0.66"></path>
            <path class="butler-hair-shine" d="M27 10 C34 9 43 12 48 20 C42 17 36 16 30 18z" fill="url(#butler-hair-shine)" opacity="0.82"></path>
            <g class="butler-eyes">
              <path class="butler-brow left-brow" d="M24 22 L32 20" fill="none" stroke="#100d13" stroke-width="1.5" stroke-linecap="round"></path>
              <path class="butler-brow right-brow" d="M39 20 L47 22" fill="none" stroke="#100d13" stroke-width="1.5" stroke-linecap="round"></path>
              <path class="butler-eyelid left-lid" d="M24 26 C27 24 31 24 33 26" fill="none" stroke="#100d13" stroke-width="1.15" stroke-linecap="round"></path>
              <path class="butler-eyelid right-lid" d="M38 26 C41 24 45 24 48 26" fill="none" stroke="#100d13" stroke-width="1.15" stroke-linecap="round"></path>
              <ellipse class="butler-iris left-iris" cx="29" cy="27" rx="2.2" ry="2.7" fill="url(#butler-eye)"></ellipse>
              <ellipse class="butler-iris right-iris" cx="43" cy="27" rx="2.2" ry="2.7" fill="url(#butler-eye)"></ellipse>
              <circle class="butler-eye-dot left-dot" cx="30" cy="26" r="0.55" fill="#fff"></circle>
              <circle class="butler-eye-dot right-dot" cx="44" cy="26" r="0.55" fill="#fff"></circle>
            </g>
            <path class="butler-nose" d="M34 28 C33 31 34 33 35 34" fill="none" stroke="#8c594f" stroke-width="0.8" stroke-linecap="round"></path>
            <circle class="nose-dot left-nose" cx="33" cy="34" r="0.55" fill="#7a4c46" opacity="0.55"></circle>
            <circle class="nose-dot right-nose" cx="37" cy="34" r="0.55" fill="#7a4c46" opacity="0.48"></circle>
            <path class="butler-mouth" d="M31 38 C34 39 39 39 42 37" fill="none" stroke="#351821" stroke-width="1" stroke-linecap="round"></path>
          </g>
        </g>
      </g>
    </svg>
  `;
  document.body.appendChild(mascot);

  const mascotSize = { width: 70, height: 100 };
  const edgePadding = 80;
  let mascotX = edgePadding;
  let mascotY = Math.max(edgePadding, window.innerHeight - mascotSize.height - edgePadding);
  let mascotMode = "idle";
  let walkTimer;
  let teleportTimer;
  let adjustTimer;
  let endMoveTimer;
  let fleeCooldown = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const bounds = () => ({
    minX: Math.min(edgePadding, Math.max(0, window.innerWidth - mascotSize.width)),
    minY: Math.min(edgePadding, Math.max(0, window.innerHeight - mascotSize.height)),
    maxX: Math.max(
      Math.min(edgePadding, Math.max(0, window.innerWidth - mascotSize.width)),
      window.innerWidth - mascotSize.width - edgePadding
    ),
    maxY: Math.max(
      Math.min(edgePadding, Math.max(0, window.innerHeight - mascotSize.height)),
      window.innerHeight - mascotSize.height - edgePadding
    )
  });

  const setMode = (mode) => {
    mascotMode = mode;
    mascot.classList.toggle("is-walking", mode === "walking");
    mascot.classList.toggle("is-teleporting", mode === "teleporting");
    mascot.classList.toggle("is-arriving", mode === "arriving");
    mascot.classList.toggle("is-fleeing", mode === "fleeing");
  };

  const setPosition = (x, y, duration = 1400) => {
    const { minX, minY, maxX, maxY } = bounds();
    const nextX = clamp(x, minX, maxX);
    const nextY = clamp(y, minY, maxY);
    const direction = nextX < mascotX ? -1 : 1;

    mascotX = nextX;
    mascotY = nextY;
    mascot.style.setProperty("--mascot-x", `${mascotX}px`);
    mascot.style.setProperty("--mascot-y", `${mascotY}px`);
    mascot.style.setProperty("--mascot-dir", direction);
    mascot.style.setProperty("--mascot-duration", `${duration}ms`);
  };

  const randomPoint = () => {
    const { minX, minY, maxX, maxY } = bounds();
    return {
      x: minX + Math.random() * Math.max(1, maxX - minX),
      y: minY + Math.random() * Math.max(1, maxY - minY)
    };
  };

  const scheduleWalk = () => {
    window.clearTimeout(walkTimer);
    walkTimer = window.setTimeout(() => {
      if (mascotMode !== "idle") {
        scheduleWalk();
        return;
      }

      const target = randomPoint();
      const distance = Math.hypot(target.x - mascotX, target.y - mascotY);
      const duration = clamp(distance * 8, 1500, 3200);

      setMode("walking");
      setPosition(target.x, target.y, duration);
      window.clearTimeout(endMoveTimer);
      endMoveTimer = window.setTimeout(() => {
        setMode("idle");
        scheduleWalk();
      }, duration + 120);
    }, 4000 + Math.random() * 4000);
  };

  const teleportTo = (target, mode = "teleporting") => {
    if (mascotMode === "teleporting" || mascotMode === "arriving" || mascotMode === "fleeing") return;

    window.clearTimeout(walkTimer);
    window.clearTimeout(endMoveTimer);
    setMode(mode);

    window.setTimeout(() => {
      mascot.classList.add("is-vanished");
      setPosition(target.x, target.y, 0);

      window.setTimeout(() => {
        setMode("arriving");
        mascot.classList.remove("is-vanished");

        window.setTimeout(() => {
          setMode("idle");
          scheduleWalk();
        }, 320);
      }, 35);
    }, 300);
  };

  const scheduleTeleport = () => {
    window.clearTimeout(teleportTimer);
    teleportTimer = window.setTimeout(() => {
      if (mascotMode === "idle" || mascotMode === "walking") {
        teleportTo(randomPoint());
      }
      scheduleTeleport();
    }, 20000 + Math.random() * 10000);
  };

  const scheduleAdjustment = () => {
    window.clearInterval(adjustTimer);
    adjustTimer = window.setInterval(() => {
      if (mascotMode !== "idle") return;
      mascot.classList.add("is-adjusting");
      window.setTimeout(() => mascot.classList.remove("is-adjusting"), 1500);
    }, 7000);
  };

  const farthestPointFrom = (mouseX, mouseY) => {
    const { minX, minY, maxX, maxY } = bounds();
    const candidates = [
      { x: minX, y: minY },
      { x: maxX, y: minY },
      { x: minX, y: maxY },
      { x: maxX, y: maxY }
    ];

    return candidates.reduce((best, point) => {
      const bestDistance = Math.hypot(best.x - mouseX, best.y - mouseY);
      const pointDistance = Math.hypot(point.x - mouseX, point.y - mouseY);
      return pointDistance > bestDistance ? point : best;
    });
  };

  const handleMouseMove = (event) => {
    if (fleeCooldown) return;

    const centerX = mascotX + mascotSize.width / 2;
    const centerY = mascotY + mascotSize.height / 2;
    const distance = Math.hypot(centerX - event.clientX, centerY - event.clientY);

    if (distance > 140) return;

    fleeCooldown = true;
    teleportTo(farthestPointFrom(event.clientX, event.clientY), "fleeing");
    window.setTimeout(() => {
      fleeCooldown = false;
    }, 1500);
  };

  setPosition(mascotX, mascotY, 0);
  scheduleWalk();
  scheduleTeleport();
  scheduleAdjustment();

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("resize", () => setPosition(mascotX, mascotY, 0));
};

window.addEventListener("DOMContentLoaded", initButlerMascot);
