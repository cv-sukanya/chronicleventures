window.addEventListener("load", () => {
  initAnimations();
});

const canvas = document.getElementById("space-canvas");
const scene = new THREE.Scene();

const isMobile = window.innerWidth < 768;

/* =========================
   🎥 CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = isMobile ? 7 : 6;

/* =========================
   🎥 RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

/* =========================
   🌌 TEXTURES
========================= */

const loader = new THREE.TextureLoader();

const starTexture = loader.load(
  "https://threejs.org/examples/textures/sprites/spark1.png"
);

/* =========================
   🌌 GALAXY
========================= */

const starCount = isMobile ? 2500 : 6000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;

  const radius = Math.random() * 80;
  const spin = radius * 0.3;
  const angle = Math.random() * Math.PI * 2;

  positions[i3] =
    Math.cos(angle + spin) * radius + (Math.random() - 0.5) * 2;

  positions[i3 + 1] = (Math.random() - 0.5) * 5;

  positions[i3 + 2] =
    Math.sin(angle + spin) * radius + (Math.random() - 0.5) * 2;
}

const galaxyGeo = new THREE.BufferGeometry();
galaxyGeo.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const galaxyMat = new THREE.PointsMaterial({
  size: isMobile ? 0.085 : 0.08,
  opacity: 0.6,
  map: starTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
scene.add(galaxy);

/* =========================
   🛸 UFO
========================= */

const ufoTexture = loader.load("assets/images/ufo.webp");

const ufoMaterial = new THREE.SpriteMaterial({
  map: ufoTexture,
  transparent: true,
  depthWrite: false,
});

const ufo = new THREE.Sprite(ufoMaterial);

const baseX = isMobile ? 0.8 : 2;
const baseY = isMobile ? 0.5 : 1;
const baseZ = isMobile ? -1 : -2;

ufo.position.set(baseX, baseY, baseZ);
ufo.scale.set(isMobile ? 1.8 : 2.5, isMobile ? 0.9 : 1.2, 1);

ufo.renderOrder = 999;
ufo.material.depthTest = false;

scene.add(ufo);

/* =========================
   ✨ UFO GLOW
========================= */

const glowTexture = loader.load(
  "https://threejs.org/examples/textures/sprites/glow.png"
);

const glowMaterial = new THREE.SpriteMaterial({
  map: glowTexture,
  color: 0x00ff99,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});

const glow = new THREE.Sprite(glowMaterial);

glow.scale.set(isMobile ? 2 : 3, isMobile ? 2 : 3, 1);

glow.renderOrder = 998;
glow.material.depthTest = false;

scene.add(glow);

/* =========================
   🌠 SHOOTING STARS
========================= */

const shootingStars = [];

function createShootingStar() {
  const geometry = new THREE.BufferGeometry();

  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-2, -0.5, 0),
  ];

  geometry.setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8,
  });

  const line = new THREE.Line(geometry, material);

  line.position.set(
    (Math.random() - 0.5) * 40,
    (Math.random() - 0.5) * 20,
    -20
  );

  line.velocity = new THREE.Vector3(-0.6, -0.2, 0);

  scene.add(line);
  shootingStars.push(line);

  setTimeout(() => scene.remove(line), 1500);
}

setInterval(createShootingStar, 1200);

/* =========================
   ✨ SPARKLES
========================= */

const star1 = loader.load("assets/images/small_star.webp");
const star2 = loader.load("assets/images/big_star.webp");

const sparkleGroup = new THREE.Group();

for (let i = 0; i < 15; i++) {
  const texture = Math.random() > 0.5 ? star1 : star2;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    color: 0xcc66ff,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);

  sprite.position.set(
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10,
    Math.random() * 5
  );

  const scale = Math.random() * 1.5 + 0.5;
  sprite.scale.set(scale, scale, 1);

  sprite.userData = {
    speed: Math.random() * 0.02 + 0.01,
  };

  sparkleGroup.add(sprite);
}

scene.add(sparkleGroup);

/* =========================
   🖱️ MOUSE
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* =========================
   ⚡ SCROLL
========================= */

let scrollY = 0;
let scrollProgress = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const maxScroll =
    document.documentElement.scrollHeight - window.innerHeight;

  scrollProgress = scrollY / maxScroll;
});

/* =========================
   🎥 ANIMATION
========================= */

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  galaxy.rotation.y += 0.0008;

  /* 🛸 SCROLL LEFT-RIGHT */
  const scrollX = (scrollProgress - 0.5) * (isMobile ? 2 : 4);
  ufo.position.x += (baseX + scrollX - ufo.position.x) * 0.08;

  /* 🛸 FLOAT Y */
  ufo.position.y =
    baseY +
    Math.sin(time * 1.2) * 0.3 +
    Math.cos(time * 0.5) * 0.2;

  /* 🛸 SCALE BASED ON Y (DEPTH EFFECT) */
  const minY = baseY - 0.5;
  const maxY = baseY + 0.5;

  const yProgress = (ufo.position.y - minY) / (maxY - minY);

  // 🎯 scale based ONLY on scroll
const minScale = isMobile ? 1.6 : 2.2;
const maxScale = isMobile ? 2.4 : 3.2;

// map scroll (0 → 1) to scale
const targetScale =
  minScale + (maxScale - minScale) * scrollProgress;

// smooth easing
ufo.scale.x += (targetScale - ufo.scale.x) * 0.08;
ufo.scale.y += (targetScale * 0.5 - ufo.scale.y) * 0.08;

  /* ✨ ROTATION */
  ufo.material.rotation = Math.sin(time * 0.8) * 0.08;

  /* ✨ GLOW FOLLOW + SCALE */
  glow.position.x += (ufo.position.x - glow.position.x) * 0.1;
  glow.position.y += (ufo.position.y - 0.5 - glow.position.y) * 0.1;

  glow.scale.x += (targetScale * 1.2 - glow.scale.x) * 0.1;
  glow.scale.y += (targetScale * 1.2 - glow.scale.y) * 0.1;

  /* ✨ SPARKLES */
  sparkleGroup.children.forEach((star, i) => {
    const t = Date.now() * 0.002 + i;

    const scale = 0.8 + Math.sin(t * star.userData.speed * 50) * 0.5;
    star.scale.set(scale, scale, 1);

    star.material.opacity = 0.6 + Math.sin(t * 2) * 0.4;
  });

  /* 🌠 SHOOTING STARS */
  shootingStars.forEach((s) => {
    s.position.add(s.velocity);
  });

  /* 🎥 CAMERA */
  const scrollFactor = isMobile ? 0.0015 : 0.003;
  const minZ = isMobile ? 5.5 : 4.5;

  camera.position.z = Math.max(
    (isMobile ? 7 : 6) - scrollY * scrollFactor,
    minZ
  );

  camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

/* =========================
   📱 RESPONSIVE
========================= */

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

/* =========================
   🌐 FALLBACK
========================= */

if (!window.WebGLRenderingContext) {
  document.body.classList.add("no-webgl");
}