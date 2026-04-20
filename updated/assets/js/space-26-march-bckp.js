window.addEventListener("load", () => {
  initAnimations();
});

const canvas = document.getElementById("space-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 6;

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
   🌌 GALAXY (BACKGROUND)
========================= */

const isMobile = window.innerWidth < 768;
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
  size: isMobile ? 0.085: 0.08,
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

const ufoTexture = loader.load("assets/images/ufo.png");

const ufoMaterial = new THREE.SpriteMaterial({
  map: ufoTexture,
  transparent: true,
  depthWrite: false,
  
});

const ufo = new THREE.Sprite(ufoMaterial);

// ufo.position.set(2, 1, -2);
// ufo.scale.set(2.5, 1.2, 1.5); //(width, height, depth);

if (isMobile) {
  ufo.position.set(0.8, 0.5, -1.5);
  ufo.scale.set(1.8, 0.9, 1);
} else {
  ufo.position.set(2, 1, -2);
  ufo.scale.set(2.5, 1.2, 1);
}

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

if (isMobile) {
  glow.scale.set(2, 2, 1);
} else {
  glow.scale.set(3, 3, 1);
}

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
   ✨ PNG SPARK STARS
========================= */

const star1 = loader.load("assets/images/small_star.png");
const star2 = loader.load("assets/images/big_star.png");

const sparkleGroup = new THREE.Group();

const sparkleCount = 15;

for (let i = 0; i < sparkleCount; i++) {
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
   🖱️ MOUSE PARALLAX
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

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/* =========================
   🎥 ANIMATION
========================= */

function animate() {
  requestAnimationFrame(animate);

  // galaxy rotation
  galaxy.rotation.y += 0.0008;

  // UFO motion
  ufo.position.y = 1 + Math.sin(Date.now() * 0.0015) * 0.3;
  ufo.position.x = 2 + Math.sin(Date.now() * 0.0008) * 0.5;
  ufo.material.rotation = Math.sin(Date.now() * 0.001) * 0.05;

  // glow follow
  glow.position.x = ufo.position.x;
  glow.position.y = ufo.position.y - 0.5;

  // sparkle stars
  sparkleGroup.children.forEach((star, i) => {
    const time = Date.now() * 0.002 + i;

    const scale = 0.8 + Math.sin(time * star.userData.speed * 50) * 0.5;
    star.scale.set(scale, scale, 1);

    star.material.opacity = 0.6 + Math.sin(time * 2) * 0.4;
  });

  // shooting stars
  shootingStars.forEach((s) => {
    s.position.add(s.velocity);
  });

  // camera movement
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;
  camera.position.z = 6 - scrollY * 0.003;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

/* =========================
   📱 RESPONSIVE
========================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   🌐 FALLBACK
========================= */

if (!window.WebGLRenderingContext) {
  document.body.classList.add("no-webgl");
}