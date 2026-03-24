const canvas = document.getElementById("space-canvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ⭐ Create Stars
const starCount = 5000;
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05,
});

const stars = new THREE.Points(geometry, material);
scene.add(stars);

// 🖱️ Mouse Movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// 🎥 Animation Loop
function animate() {
  requestAnimationFrame(animate);

  stars.rotation.y += 0.0005;
  stars.rotation.x += 0.0002;

  // Parallax effect
  camera.position.x += (mouseX - camera.position.x) * 0.02;
  camera.position.y += (-mouseY - camera.position.y) * 0.02;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

animate();

// 📱 Resize Fix
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});