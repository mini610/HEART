// Get the heart path from SVG
const path = document.querySelector("svg path");
const length = path.getTotalLength();

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Adjust zoom based on screen size
if (window.innerWidth < 480) {
  camera.position.z = 650;
} else if (window.innerWidth < 768) {
  camera.position.z = 550;
} else {
  camera.position.z = 400;
}

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Controls (disabled for fixed view)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableZoom = false;
controls.enablePan = false;

// Create heart particles
const heartParticles = new THREE.Group();

for (let i = 0; i < 700; i++) {
  const pos = path.getPointAtLength((i / 700) * length);

  const geometry = new THREE.SphereGeometry(1.5, 8, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0xff3366 });
  const particle = new THREE.Mesh(geometry, material);

  particle.position.set(
    pos.x - 300 + (Math.random() - 0.5) * 5,
    -(pos.y - 250) + (Math.random() - 0.5) * 5,
    (Math.random() - 0.5) * 60
  );

  heartParticles.add(particle);

  // Subtle floating animation
  gsap.to(particle.position, {
    x: particle.position.x + Math.random() * 10,
    y: particle.position.y + Math.random() * 10,
    duration: 2 + Math.random(),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
}

scene.add(heartParticles);

// Animate (no rotation)
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();