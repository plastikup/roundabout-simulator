import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Car } from './simulation/car.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.body.appendChild(renderer.domElement);

window.scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 80, 100);

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

/* ~~~~ DEV ~~~ */
const IS_AI_TRAINING = true;

/* ~~~~~~~~~ */
import { plateGroup } from '/static/baseplate.js';
scene.add(plateGroup);

console.log(scene);

/* ~~~~~~~~~ */
/* ~~~~~~~~~ */
/* ~~~~~~~~~ */

function animate() {
	renderer.render(scene, camera);

	// rotate camera around [x,y,z]=[0,0,0]
	controls.update();

	requestAnimationFrame(animate);
}

new Car(0, -120);
animate();
