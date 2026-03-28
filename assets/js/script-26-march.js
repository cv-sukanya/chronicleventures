

// LENIS SMOOTH SCROLL
// const lenis = new Lenis({
//   smooth: true
// });
const lenis = new Lenis({
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP
gsap.registerPlugin(ScrollTrigger);





// ABOUT TEXT COLOR
gsap.to(".about-text", {
  color: "#ffffff",
  scrollTrigger: {
    trigger: ".about",
    start: "top 70%",
    end: "top 20%",
    scrub: true
  }
});


// ================= MENU =================

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.querySelector(".side-menu");

// create overlay
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

let menuOpen = false;

// OPEN MENU FUNCTION
function openMenu() {
  gsap.to(sideMenu, {
    x: 0,
    duration: 0.8,
    ease: "power4.out"
  });

  gsap.to(overlay, {
    opacity: 1,
    pointerEvents: "all",
    duration: 0.5
  });

  // stagger animation (NOW CORRECT)
  gsap.from(".side-menu ul li", {
    x: -80,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power3.out"
  });

  menuOpen = true;
}

// CLOSE MENU FUNCTION
function closeMenu() {
  gsap.to(sideMenu, {
    x: "-100%",
    duration: 0.8,
    ease: "power4.in"
  });

  gsap.to(overlay, {
    opacity: 0,
    pointerEvents: "none",
    duration: 0.5
  });

  menuOpen = false;
}

// MENU BUTTON CLICK
menuBtn.addEventListener("click", () => {
  menuOpen ? closeMenu() : openMenu();
});

// OVERLAY CLICK
overlay.addEventListener("click", closeMenu);

// CLOSE BUTTON (SAFE CHECK)
const closeBtn = document.querySelector(".close-btn");

if (closeBtn) {
  closeBtn.addEventListener("click", closeMenu);
}
// CLOSE MENU ON LINK CLICK
document.querySelectorAll(".side-menu a").forEach(link => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});


// one line
const cta = document.querySelector(".cta-line");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

window.addEventListener("scroll", () => {
  const rect = cta.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = 1 - rect.top / windowHeight;

  // clamp between 0 → 1
  progress = Math.max(0, Math.min(progress, 1));

  // movement range
  const maxMove = 120; // matches your CSS start

  const move = maxMove * (1 - progress);

  left.style.transform = `translateX(-${move}%)`;
  right.style.transform = `translateX(${move}%)`;
});


// About section
const about = document.querySelector(".about");
const star = document.querySelector(".center-star");
const content = document.querySelector(".content");

window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    const rect = about.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1.2 - rect.top / windowHeight;
    progress = Math.max(0, Math.min(progress, 1));

    const isMobile = window.innerWidth < 768;

    let scale;

    if (isMobile) {
      // ✅ FIX: use BASE width instead of offsetWidth
      const baseWidth = 100; // same as your CSS default
      const maxWidth = window.innerWidth * 0.85;

      const maxScale = maxWidth / baseWidth;

      // smooth controlled scaling
      scale = 0.5 + progress * maxScale;

      // clamp (extra safety)
      scale = Math.min(scale, maxScale);
    } else {
      scale = 0.5 + progress * 20;
    }

    // apply transform
    star.style.opacity = progress > 0.2 ? 1 : 0;
    star.style.transform = `translate(-50%, -50%) scale(${scale})`;

    // glow
    const glow = progress * (isMobile ? 20 : 40);
    star.style.filter = `drop-shadow(0 0 ${glow}px #a955f740)`;

    // content
    if (progress > 0.2) {
      content.classList.add("show");
    }
  });
});


// explore section 
const starsContainer = document.querySelector(".stars");

for (let i = 0; i < 80; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // random position
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";

  // random animation delay
  star.style.animationDelay = Math.random() * 2 + "s";

  // random size variation
  const size = Math.random() * 2 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";

  starsContainer.appendChild(star);
}

const words = ["Marketing", "Events", "Branding"];
const wordEl = document.getElementById("changing-word");
const section = document.querySelector(".explore");

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();
  const progress = 1 - rect.top / window.innerHeight;

  let index = Math.floor(progress * words.length);

  if (index >= 0 && index < words.length) {
    wordEl.style.opacity = 0;

    setTimeout(() => {
      wordEl.textContent = words[index];
      wordEl.style.opacity = 1;
    }, 200);
  }
});

window.addEventListener("mousemove", (e) => {
  const stars = document.querySelectorAll(".star");

  stars.forEach((star, i) => {
    const speed = (i % 5) * 0.02;
    star.style.transform = `translate(${e.clientX * speed}px, ${e.clientY * speed}px)`;
  });
});