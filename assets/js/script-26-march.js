

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



// ROBOT (starts later when text reaches it)
tl.to(".hero-obj", {
  x: "-110vw",
  scale: 0.95,
  ease: "none"
}, 0);

// movement to img 
gsap.to(".hero-obj", {
  y: "+=20",
  repeat: -1,
  yoyo: true,
  duration: 2,
  ease: "sine.inOut"
});

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


// services
document.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".stone").forEach((stone, i) => {
    gsap.to(stone, {
      y: "random(-40, 40)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: gsap.utils.random(3, 6),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: i * 0.2
    });
  });
});

gsap.utils.toArray(".service-card").forEach((card, i) => {

  const isEven = i % 2 === 0;

  gsap.from(card, {
    x: isEven ? -150 : 150,  // 👈 alternate direction
    opacity: 0,
    duration: 1,
    ease: "power3.out",

    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      end: "top 60%",
      scrub: 1
    }
  });

});