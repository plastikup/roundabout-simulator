import * as THREE from 'three';
import { materials } from '../static/materials.js';

// an array of every direction each car will raycast
const raycastSearch = [];
for (let deg = 0; deg < 360; deg += 6) {
	// not switching to rad does not matter in this specific case
	raycastSearch.push(new THREE.Vector3(Math.cos(deg), 0, Math.sin(deg)).normalize());
}
const raycaster = new THREE.Raycaster(undefined, undefined, 0, 25);

class Vehicle {
	constructor(startPoint, exitPoint) {
		this.x = startPoint % 4 === 0 ? 120 : startPoint % 4 === 2 ? -120 : 0;
		this.z = startPoint % 4 === 1 ? -120 : startPoint % 4 === 3 ? 120 : 0;
		this.vx = 0;
		this.vz = 0;
		this.a = Math.PI - (startPoint * Math.PI) / 2;
		this.meta = {};
		this.driving = {
			drivingState: 0,
			accelerationState: 0.5,
		};
		setInterval(() => {
			this.driving.accelerationState = Math.random();
		}, 1000);

		this.autoDrive = this.autoDrive.bind(this);
	}

	init() {
		console.log(this);

		// create 3D mesh for the Vehicle
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(this.meta.carLength, 2.5, this.meta.carWidth));
		this.mesh.position.x = this.x;
		this.mesh.position.y = 1.5;
		this.mesh.position.z = this.z;
		this.mesh.rotation.y = this.a;
		this.mesh.userData.parallelSimulationId = 0;
		// add it to the scene
		scene.add(this.mesh);

		// kickstart the autoDrive loop
		this.autoDrive();
	}
	autoDrive() {
		this.vx = 0.9 * (this.vx + (this.driving.accelerationState - 0.5) * 0.05 * Math.cos(this.a));
		this.vz = 0.9 * (this.vz + (this.driving.accelerationState - 0.5) * 0.05 * Math.sin(this.a));
		this.x += this.vx;
		this.z += this.vz;

		this.mesh.position.x = this.x;
		this.mesh.position.z = this.z;

		this.raycast();
		requestAnimationFrame(this.autoDrive);
	}
	raycast() {
		raycastSearch.forEach((dir) => {
			raycaster.set(this.mesh.position, dir);
			// compile all intersections with the rays
			const intersects = raycaster.intersectObjects(scene.children, false);
			if (intersects.length > 0) {
				if (intersects[0].object.userData.parallelSimulationId === this.mesh.userData.parallelSimulationId) {
					// splash color if a Vehicle is visible in its field of view
					intersects[0].object.material.color.set(Number('0x' + Math.floor(Math.random() * 16777215).toString(16)));
				}
			}
		});
	}
}

export class Car extends Vehicle {
	constructor(startPoint, exitPoint) {
		// calling parent
		super(startPoint, exitPoint);

		// meta for Car data only
		this.meta = {
			...this.meta,
			carType: 'car',
			carWidth: 5,
			carLength: 8,
		};

		this.init();
	}
}
