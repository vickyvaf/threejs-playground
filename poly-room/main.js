import * as THREE from "three";
import * as Tweakpane from "tweakpane";

const pane = new Tweakpane.Pane();
const params = { color: "0xffffff", size: 50 };

pane.addBinding(params, "color");
pane.addBinding(params, "size");

pane.on("change", () => {
  cube.material.color.set(params.color);
  cube.scale.set(params.size / 50, params.size / 50, params.size / 50);
});

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.append(renderer.domElement);

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(300, 20);
gridHelper.rotation.x = Math.PI / 2;
scene.add(gridHelper);

const geomerty = new THREE.BoxGeometry(50, 50, 50);
const cube = new THREE.Mesh(geomerty);

scene.add(cube);

const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const keysPressed = new Set();

window.addEventListener("keydown", (e) => keysPressed.add(e.code));
window.addEventListener("keyup", (e) => keysPressed.delete(e.code));

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    if (event.shiftKey) {
      camera.position.y -= event.deltaY * 0.1; // geser atas/bawah
      camera.position.x += event.deltaX * 0.1; // geser kiri/kanan

      return;
    }

    // CMD (Mac) atau CTRL (Windows) → zoom
    if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
      camera.position.z += event.deltaY * 0.1;
      camera.position.z = Math.min(Math.max(camera.position.z, 10), 200);
      return;
    }

    // Default → rotasi scene
    scene.rotation.x -= event.deltaY * 0.01;
    scene.rotation.y -= event.deltaX * 0.01;
  },
  { passive: false }
);

camera.position.z = 150;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  renderer.render(scene, camera);
}
