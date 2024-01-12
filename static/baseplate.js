import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { materials } from './materials.js';

export const plateGroup = (() => {
	const plateGroup = new THREE.Group();
	const doubleLaneSize = 15;
	const innerCircleDiameter = 30;
	const outerCircleDiameter = innerCircleDiameter + doubleLaneSize / 1.5;
	const asphaltHeight = 2;
	const viewportDimension = 250;

	// center
	const centerInner = new THREE.Mesh(new THREE.CylinderGeometry(innerCircleDiameter, innerCircleDiameter, asphaltHeight * 2, 32), materials.rock);
	centerInner.position.y = asphaltHeight;

	// grass zone
	const viewportVolume = new THREE.Mesh(new THREE.BoxGeometry(viewportDimension, asphaltHeight, viewportDimension), materials.grass);
	const centerOuterVolume = new THREE.Mesh(new THREE.CylinderGeometry(outerCircleDiameter, outerCircleDiameter, asphaltHeight, 32));
	const lane1Volume = new THREE.Mesh(new THREE.BoxGeometry(viewportDimension, asphaltHeight, doubleLaneSize));
	const lane2Volume = new THREE.Mesh(new THREE.BoxGeometry(doubleLaneSize, asphaltHeight, viewportDimension));
	const grass = CSG.subtract(viewportVolume, CSG.union(centerOuterVolume, CSG.union(lane1Volume, lane2Volume)));
	grass.position.y = asphaltHeight / 2;

	// centerCirculation
	const outerCircleFlat = new THREE.Mesh(new THREE.CylinderGeometry(outerCircleDiameter, outerCircleDiameter, 0.5, 32), materials.asphalt);
	const centerCirculation = CSG.subtract(outerCircleFlat, centerInner);

	// lanes
	let lane1Flat = new THREE.Mesh(new THREE.BoxGeometry(viewportDimension, 0.5, doubleLaneSize), materials.road1);
	lane1Flat = CSG.subtract(lane1Flat, outerCircleFlat);
	let lane2Flat = new THREE.Mesh(new THREE.BoxGeometry(doubleLaneSize, 0.5, viewportDimension), materials.road2);
	lane2Flat = CSG.subtract(lane2Flat, outerCircleFlat);

	plateGroup.add(grass, centerInner, centerCirculation, lane1Flat, lane2Flat);
	return plateGroup;
})();
