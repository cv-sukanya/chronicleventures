

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
const stones = document.querySelectorAll(".stone");

stones.forEach((stone, index) => {
  // random vertical position
  const y = Math.random() * 80;
  stone.style.top = y + "%";

  // random size
  const scale = 0.5 + Math.random();

  // direction
  const direction = Math.random() > 0.5 ? 1 : -1;

  // speed
  const speed = 1 + Math.random() * 1;

  // rotation
  let rotation = Math.random() * 360;
  const rotationSpeed = 0.1 + Math.random() * 0.3;

  // ✅ FIX 1: Some stones start inside screen
  let x;
  if (index < 4) {
    // first 4 stones visible initially
    x = Math.random() * window.innerWidth;
  } else {
    // rest start outside
    x = direction === 1 ? -100 : window.innerWidth + 100;
  }

  function animate() {
    x += speed * direction;
    rotation += rotationSpeed;

    // loop reset
    if (direction === 1 && x > window.innerWidth + 100) {
      x = -100;
    } else if (direction === -1 && x < -100) {
      x = window.innerWidth + 100;
    }

    // ✅ FIX 2: apply ALL transforms together
    stone.style.transform = `translateX(${x}px) scale(${scale}) rotate(${rotation}deg)`;

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



// What we do 

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

  services.forEach((service) => {

    const rect = service.getBoundingClientRect();
    const astro = service.querySelector('.astro');

    // progress from 0 → 1
    let progress = (windowHeight - rect.top) / windowHeight;
    progress = Math.max(0, Math.min(1, progress));

    // horizontal movement
    const moveX = (1 - progress) * 120;

    if (service.classList.contains('left')) {
      service.style.transform = `translateX(${-moveX}px)`;
    } else {
      service.style.transform = `translateX(${moveX}px)`;
    }

    // astro parallax (only desktop)
    if (window.innerWidth > 768) {
      let floatY = (progress - 0.5) * 40;
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


