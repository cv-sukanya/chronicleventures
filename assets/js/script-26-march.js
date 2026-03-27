

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
  const rect = about.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // progress from 0 → 1
  let progress = 1 - rect.top / windowHeight;

  // clamp
  progress = Math.max(0, Math.min(progress, 1));

  // ⭐ Step 1: show star
  if (progress > 0.2) {
    star.style.opacity = 1;
  }

  // ⭐ Step 2: scale star smoothly
  let scale = 0.5 + progress * 20; // controls growth
  star.style.transform = `translate(-50%, -50%) scale(${scale})`;

  // ⭐ Step 3: show text when star is big
  if (progress > 0.8) {
    content.classList.add("show");
  }
});
