import * as THREE from 'three';

export const materials = {
	gray: new THREE.MeshBasicMaterial({ color: 0x999999 }),
	rock: new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('../static/textures/rock.png') }),
	grass: new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('../static/textures/grass.png', (texture) => {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(10, 10);
		}),
	}),
	asphalt: new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('../static/textures/asphalt.png', (texture) => {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(5, 5);
		}),
	}),
	road1: new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('../static/textures/road.png', (texture) => {
			texture.rotation = Math.PI / 2;
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 20);
		}),
	}),
	road2: new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load('../static/textures/road.png', (texture) => {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set(1, 20);
		}),
	}),
};
