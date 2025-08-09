import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const points = [];
points.push(new THREE.Vector3(-25, 0, 0));
points.push(new THREE.Vector3(0, 20, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(points[0]);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const colors = [];
// R, G, B -> value from 0 to 1, it can be 0.1, 0.2, ... 1 if 0 is false
colors.push(1, 0, 0);
colors.push(1, 0, 0);
colors.push(1, 0, 0);
colors.push(1, 0, 0);

geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
const material = new THREE.LineBasicMaterial({
  // color: 0x0000ff,
  vertexColors: true,
});

const line = new THREE.Line(geometry, material);

scene.add(line);

function animate() {
  line.rotateZ(0.01);
  renderer.render(scene, camera);
}
