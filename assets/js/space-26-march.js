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
   🎥 RENDERER (OPTIMIZED)
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
   🌌 STAR TEXTURE (FIX BOX ISSUE)
========================= */

const loader = new THREE.TextureLoader();

const starTexture = loader.load(
  "https://threejs.org/examples/textures/sprites/spark1.png"
);

/* =========================
   🌌 GALAXY (SPIRAL + GLOW)
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
  size: 0.5,
  map: starTexture,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const galaxy = new THREE.Points(galaxyGeo, galaxyMat);
scene.add(galaxy);

/* =========================
   🪐 HERO PLANET
========================= */

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(1.4, 64, 64),
  new THREE.MeshStandardMaterial({
    map: loader.load("assets/images/stone-texture.jpg"), // replace with your texture
    roughness: 0.7,
  })
);

planet.position.set(2, 1, -3);
scene.add(planet);

/* =========================
   ✨ LIGHTING
========================= */

const light = new THREE.PointLight(0xffffff, 2);
light.position.set(3, 3, 3);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));

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
   🖱️ MOUSE PARALLAX
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* =========================
   ⚡ SCROLL WARP
========================= */

let scrollY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/* =========================
   🎥 ANIMATION LOOP
========================= */

function animate() {
  requestAnimationFrame(animate);

  // galaxy rotation
  galaxy.rotation.y += 0.0008;
  galaxyMat.size = 0.08 + Math.sin(Date.now() * 0.002) * 0.02;

  // planet float
  planet.rotation.y += 0.002;
  planet.position.y = Math.sin(Date.now() * 0.001) * 0.3;

  // shooting stars
  shootingStars.forEach((s) => {
    s.position.add(s.velocity);
  });

  // smooth camera
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;

  // scroll zoom
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