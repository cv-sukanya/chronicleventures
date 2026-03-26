

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

const aboutSection = document.querySelector(".about");

window.addEventListener("scroll", () => {
  const rect = aboutSection.getBoundingClientRect();

  if (rect.top < window.innerHeight) {
    aboutSection.style.opacity = 1;
    aboutSection.style.transform = "translateY(0px)";
  }
  if (scrollY > window.innerHeight * 0.5) {
  galaxy.rotation.y += 0.0002; // slower = cinematic
} else {
  galaxy.rotation.y += 0.0008;
}
});
