

// LENIS SMOOTH SCROLL
// const lenis = new Lenis({
//   smooth: true
// });

// Delay GSAP Animation
window.addEventListener("load", () => {
  initAnimations();
});

// Only animate after hero loads
const hero = document.querySelector(".hero");

if (hero) {
  hero.onload = () => initAnimations();
}

// Disable heavy animations on touch devices:
const isTouch = window.matchMedia("(pointer: coarse)").matches;

if (isTouch) {
  ScrollTrigger.getAll().forEach(t => t.kill());
}

// preloader 
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 1s ease";

  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});


const lenis = new Lenis({
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Delay hero 
gsap.from(".hero", {
  opacity: 0,
  duration: 1,
  delay: 0.5
});

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
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetSection = document.querySelector(this.getAttribute("href"));

    closeMenu();

    setTimeout(() => {
      targetSection.scrollIntoView({
        behavior: "smooth"
      });
    }, 400);
  });
});


// one line
const cta = document.querySelector(".cta-line");
const left = document.querySelector(".left");
const right = document.querySelector(".right");

let ticking = false;

function updateAnimation() {
  const rect = cta.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  let progress = 1 - rect.top / windowHeight;
  progress = Math.max(0, Math.min(progress, 1));

  const maxMove = 120;
  const move = maxMove * (1 - progress);

  left.style.transform = `translate3d(-${move}%, 0, 0)`;
  right.style.transform = `translate3d(${move}%, 0, 0)`;

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimation);
    ticking = true;
  }
});


// About section
// const about = document.querySelector(".about");
// const star = document.querySelector(".center-star");
// const content = document.querySelector(".content");

// window.addEventListener("scroll", () => {
//   requestAnimationFrame(() => {
//     const rect = about.getBoundingClientRect();
//     const windowHeight = window.innerHeight;

//     let progress = 1.2 - rect.top / windowHeight;
//     progress = Math.max(0, Math.min(progress, 1));

//     const isMobile = window.innerWidth < 768;

//     let scale;

//     if (isMobile) {
//       // ✅ FIX: use BASE width instead of offsetWidth
//       const baseWidth = 100; // same as your CSS default
//       const maxWidth = window.innerWidth * 0.85;

//       const maxScale = maxWidth / baseWidth;

//       // smooth controlled scaling
//       scale = 0.5 + progress * maxScale;

//       // clamp (extra safety)
//       scale = Math.min(scale, maxScale);
//     } else {
//       scale = 0.5 + progress * 20;
//     }

//     // apply transform
//     star.style.opacity = progress > 0.2 ? 1 : 0;
//     star.style.transform = `translate(-50%, -50%) scale(${scale})`;

//     // glow
//     const glow = progress * (isMobile ? 20 : 40);
//     star.style.filter = `drop-shadow(0 0 ${glow}px #a955f740)`;

//     // content
//     if (progress > 0.2) {
//       content.classList.add("show");
//     }
//   });
// });


// new 
const about = document.querySelector(".about");
const star = document.querySelector(".center-star");
const content = document.querySelector(".content");

let hasEntered = false; // 👈 important

window.addEventListener("scroll", () => {
  requestAnimationFrame(() => {
    const rect = about.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1.2 - rect.top / windowHeight;
    progress = Math.max(0, Math.min(progress, 1));

    const isTablet = window.innerWidth <= 1024;

    let scale;

    if (isTablet) {
      const baseWidth = 100;
      const maxWidth = window.innerWidth * 0.85;
      const maxScale = maxWidth / baseWidth;

      scale = 0.5 + progress * maxScale;
      scale = Math.min(scale, maxScale);
    } else {
      scale = 0.5 + progress * 20;
    }

    // ✅ ENTRY LOCK (prevents disappearing)
    if (progress > 0.2) {
      hasEntered = true;
    }

    if (hasEntered) {
      star.style.opacity = 1;
    } else {
      star.style.opacity = 0;
    }

    // ✅ transform (ONLY JS controls this now)
    star.style.transform = `translate(-50%, -50%) scale(${scale})`;

    // ✅ glow (smooth, no CSS animation)
    const glow = progress * (isTablet ? 15 : 30);
    star.style.filter = `drop-shadow(0 0 ${glow}px #a955f740)`;

    // content
    if (progress > 0.2) {
      content.classList.add("show");
    }
  });
});

// explore section 
const stones = document.querySelectorAll(".stone");

stones.forEach((stone, index) => {
  // Random vertical position
  const y = Math.random() * 80;
  stone.style.top = y + "%";

  // Random size
  const scale = 0.5 + Math.random();

  // Direction (left or right)
  const direction = Math.random() > 0.5 ? 1 : -1;

  // Speed
  const speed = 0.05 + Math.random() * 0.08;

  // Rotation
  let rotation = Math.random() * 360;
  const rotationSpeed = 0.1 + Math.random() * 0.3;

  // Start position in vw (responsive)
  let x = Math.random() * 100;

  function animate() {
    // Move
    x += speed * direction;

    // Smooth infinite loop (no sudden disappear)
    if (x > 110) x = -20;
    if (x < -20) x = 110;

    // Rotate
    rotation += rotationSpeed;

    // Apply transform
    stone.style.transform = `
      translateX(${x}vw)
      scale(${scale})
      rotate(${rotation}deg)
    `;

    requestAnimationFrame(animate);
  }

  animate();
});


const words = ["Marketing", "Events", "Branding"];
const wordEl = document.getElementById("changing-word");

let index = 0;
function changeWord() {
  wordEl.style.opacity = 0;
  wordEl.style.transform = "translateY(10px)";

  setTimeout(() => {
    index = (index + 1) % words.length;
    wordEl.textContent = words[index];

    wordEl.style.opacity = 1;
    wordEl.style.transform = "translateY(0)";
  }, 200);
}

// change every 2 seconds
setInterval(changeWord, 2000);

// Buzz image

// old code -----
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".buzz-img",
  {
    x: 150,   // start from right
  },
  {
    x: -500,  // move to left
    ease: "none",
    scrollTrigger: {
      trigger: ".buzz-section",
      start: "top 100%",
      end: "top -70%",
      scrub: 1.5,
    }
  }
);


// new code (stop at left in mobile) -----
// gsap.registerPlugin(ScrollTrigger);

// function animateBuzz() {
//   const isMobile = window.innerWidth <= 768;
//   const buzz = document.querySelector(".buzz-img");

//   let moveRight = isMobile ? 200 : 900;

//   let moveLeft;

//   if (isMobile) {
//     // Calculate exact stop position so it touches left edge
//     const imgWidth = buzz.offsetWidth;
//     const screenWidth = window.innerWidth;

//     moveLeft = -(imgWidth - screenWidth); 
//   } else {
//     moveLeft = -800; // keep your desktop behavior
//   }

//   gsap.fromTo(".buzz-img",
//     {
//       x: moveRight,
//     },
//     {
//       x: moveLeft,
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".buzz-section",
//         start: "top 100%",
//         end: "top 50%",
//         scrub: true,
//       }
//     }
//   );
// }

// animateBuzz();



// What we do / Services

// gsap.registerPlugin(ScrollTrigger);

// const isMobile = window.innerWidth < 768;

// document.querySelectorAll('.service').forEach((service, index) => {

//   const isLeft = service.classList.contains('left');
//   const astro = service.querySelector('.astro');

//   // HORIZONTAL MOVEMENT (TEXT STRIP)
//   gsap.fromTo(service,
//     {
//       x: isLeft ? -150 : 150
//     },
//     {
//       x: 0,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: service,
//         start: "top 85%",
//         end: "top 40%",
//         scrub: true,
//         delay: index * 0.1
//       }
//     }
//   );

//   // ASTRO PARALLAX (FLOATING)
//   gsap.fromTo(astro,
//     {
//       y: isMobile ? 0 : 40
//     },
//     {
//       y: isMobile ? 0 : -40,
//       ease: "none",
//       scrollTrigger: {
//         trigger: service,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true
//       }
//     }
//   );


//   // RESPONSIVE BEHAVIOUR
//   ScrollTrigger.matchMedia({

//   "(max-width: 768px)": function () {

//     document.querySelectorAll('.service').forEach((service) => {

//       gsap.fromTo(service,
//         { y: 80 },
//         {
//           y: 0,
//           scrollTrigger: {
//             trigger: service,
//             start: "top 90%",
//             end: "top 60%",
//             scrub: true
//           }
//         }
//       );

//     });

//   }

// });

// });


const services = document.querySelectorAll('.service');

window.addEventListener('scroll', () => {

  const windowHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 768;

  services.forEach((service) => {

    const rect = service.getBoundingClientRect();
    const astro = service.querySelector('.astro');

    // progress from 0 → 1
    let progress = (windowHeight - rect.top) / windowHeight;
    progress = Math.max(0, Math.min(1, progress));

    // ease-out curve to prevent snapping at the end
    const eased = 1 - Math.pow(1 - progress, 3);

    // reduce max movement on mobile
    const maxMove = isMobile ? 40 : 120;
    const moveX = (1 - eased) * maxMove;

    if (service.classList.contains('left')) {
      service.style.transform = `translateX(${-moveX}px)`;
    } else {
      service.style.transform = `translateX(${moveX}px)`;
    }

    // astro parallax (only desktop)
    if (!isMobile) {
      let floatY = (eased - 0.5) * 40;
      astro.style.transform = `translateY(${floatY}px)`;
    }

  });

});


// why us section
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".why-us h2",
  {
    x: 500,   // start from right
    opacity: 1
  },
  {
    x: 0,     // move to center
    opacity: 1,
    ease: "power2.out",

    scrollTrigger: {
      trigger: ".why-us",
      start: "top 80%",   // when section enters
      end: "top 30%",     // when near center
      scrub: true         // 🔥 THIS makes it reversible on scroll
    }
  }
);

// why us content
window.addEventListener("load", () => {
  const track = document.querySelector(".wu-track");
  const firstGroup = document.querySelector(".wu-group");

  const height = firstGroup.getBoundingClientRect().height;

  gsap.to(track, {
    y: -height,
    duration: 10,
    ease: "none",
    repeat: -1
  });
});

// static count 
const counters = document.querySelectorAll('.counter');

const speed = 50; // lower = faster

const startCounting = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const update = () => {
    const increment = target / speed;

    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count) + "+";
      requestAnimationFrame(update);
    } else {
      counter.innerText = target + "+";
    }
  };

  update();
};

/* 👀 Trigger when visible */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      obs.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));



// ask question section
gsap.registerPlugin(ScrollTrigger);

// TELEPHONE (Right → Center)
gsap.to(".telephone", {
  x: "-80vw",

  ease: "power2.out",
  scrollTrigger: {
    trigger: ".ask-section",
    start: "top 90%",
    end: "top -50%",
    scrub: 2
  }
});

gsap.timeline({ repeat: -1, repeatDelay: 1 })
  .to(".telephone", {
    rotation: -14,
    duration: 0.08,
    ease: "power1.inOut"
  })
  .to(".telephone", {
    rotation: -6,
    duration: 0.08,
    ease: "power1.inOut"
  })
  .to(".telephone", {
    rotation: -14,
    duration: 0.08
  })
  .to(".telephone", {
    rotation: -8,
    duration: 0.08
  })
  .to(".telephone", {
    rotation: -12,
    duration: 0.08
  })
  .to(".telephone", {
    rotation: -10, // reset to original
    duration: 0.1
  });


const text = document.querySelector(".telepathy-text");

function getMoveDistance() {
  const rect = text.getBoundingClientRect();
  const maxMove = window.innerWidth - rect.right;

  return Math.min(maxMove, 0); // 🔥 never push beyond screen
}

gsap.to(".left-content", {
  x: getMoveDistance,
  ease: "none",
  scrollTrigger: {
    trigger: ".ask-section",
    start: "top 80%",
    end: "top -10%", // 🔥 key fix
    scrub: 4,
    invalidateOnRefresh: true
  }
});

gsap.to(".professor", {
  x: 80,   // small movement only
  y: -10,  // slight upward float
  ease: "none",
  scrollTrigger: {
    trigger: ".ask-section",
    start: "top 90%",
    end: "top -20%",
    scrub: 4   // 👈 slower = smoother = less aggressive
  }
});


// footer links 
document.querySelectorAll(".footer a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // ignore empty or #
    if (targetId === "#" || targetId === "") return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    e.preventDefault();

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});