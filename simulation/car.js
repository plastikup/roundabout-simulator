import * as THREE from 'three';
import { materials } from '../static/materials.js';

class Vehicle {
	constructor(x, z) {
		this.x = x;
		this.z = z;

		this.autoDrive = this.autoDrive.bind(this);
	}

	init() {
        console.log(this);

		// create 3D mesh for the Vehicle
		this.mesh = new THREE.Mesh(new THREE.BoxGeometry(this.meta.carWidth, 3, this.meta.carLength), materials.gray);
		this.mesh.position.x = this.x;
		this.mesh.position.y = 1.5;
		this.mesh.position.z = this.z;
		this.mesh.rotation.y = this.a;
        // add it to the scene
		scene.add(this.mesh);

        // kickstart the autoDrive loop
		this.autoDrive();
	}
	autoDrive() {
		this.z += 0.1;
		this.mesh.position.z = this.z;

		requestAnimationFrame(this.autoDrive);
	}
}

export class Car extends Vehicle {
	constructor(x, z, a) {
		// calling parent
		super(x, z);

		// default angle to be changed later
		this.a = 0;
		// meta for Car data only
		this.meta = {
			carType: 'car',
			carWidth: 5,
			carLength: 8,
		};

		this.init();
	}
}
