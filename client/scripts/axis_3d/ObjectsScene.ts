import * as THREE from 'three';

import {SceneUtil} from "./SceneUtil";

class Materials {
    static readonly yellow = new THREE.MeshPhongMaterial({color: "yellow", opacity: 0.7, transparent: true});
    static readonly blue = new THREE.MeshPhongMaterial({color: "blue", opacity: 0.7, transparent: true});
    static readonly green = new THREE.MeshPhongMaterial({color: "green", opacity: 0.7, transparent: true});
}

export enum ObjectType {
   HIT_POINT,
   HITTABLE_MESH,
}

export class ObjectsScene {
    readonly scene: THREE.Scene;
    readonly FIXED_UNIT_R = 1;
    private readonly MESH_SEGMENTS = 32;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.scene.background = new THREE.Color(0xffffff);

        this.addAxisHelper();
        this.addGrid();
        this.addSphere();
        this.addCone();
        this.addCube();
        this.addLight();
    }

    addIntersectionPoint(point: THREE.Vector3, isHit: boolean) {
        const color = isHit ? "green" : "red";
        const sphereGeometry = new THREE.SphereBufferGeometry(this.FIXED_UNIT_R / 20, 10, 10);
        const material = new THREE.MeshPhongMaterial({color: color})
        const clickedSphere = new THREE.Mesh(sphereGeometry, material);
        clickedSphere.position.set(point.x, point.y, point.z);
        clickedSphere.userData.disableRaycast = true;
        clickedSphere.userData.type = ObjectType.HIT_POINT;
        this.scene.add(clickedSphere);
    }

    clear() {
        const points = this.scene.children.filter(obj => obj.userData.type == ObjectType.HIT_POINT);
        this.scene.remove(...points);
    }

    private addAxisHelper() {
        this.scene.add(new THREE.AxesHelper(300));
    }

    private addGrid() {
        const gridSize = this.FIXED_UNIT_R * 2 * 3
        const grid = new THREE.GridHelper(gridSize, gridSize / this.FIXED_UNIT_R, 0x444444, 0x888888);
        grid.computeLineDistances()
        grid.rotateX(Math.PI / 2);
        this.scene.add(grid)
    }

    private addSphere() {
        const phiStart = 0;
        const phiEnd = Math.PI / 2;
        const thetaStart = 0;
        const thetaEnd = Math.PI / 2;

        const sphereGeometry = new THREE.SphereGeometry(this.FIXED_UNIT_R / 2, this.MESH_SEGMENTS, this.MESH_SEGMENTS, phiStart, phiEnd, thetaStart, thetaEnd);
        const capGeom1 = SceneUtil.quarterCircle(this.FIXED_UNIT_R / 2, 0, Math.PI)  // flip normals
        const capGeom2 = SceneUtil.quarterCircle(this.FIXED_UNIT_R / 2, Math.PI / 2, 0, Math.PI / 2)
        const capGeom3 = SceneUtil.quarterCircle(this.FIXED_UNIT_R / 2, Math.PI / 2, -Math.PI / 2)
        const sphere = SceneUtil.mergeGeometry([sphereGeometry, capGeom1, capGeom2, capGeom3], Materials.blue);
        sphere.rotateY(Math.PI / 2)
        sphere.userData.type = ObjectType.HITTABLE_MESH;
        this.scene.add(sphere)
    }

    private addCube() {
        const cubeGeometry = new THREE.BoxGeometry(this.FIXED_UNIT_R, this.FIXED_UNIT_R, this.FIXED_UNIT_R)
        cubeGeometry.translate(-this.FIXED_UNIT_R / 2, 0, this.FIXED_UNIT_R / 2)
        cubeGeometry.rotateX(-Math.PI / 2);
        const cube = new THREE.Mesh(cubeGeometry, Materials.yellow);
        cube.userData.type = ObjectType.HITTABLE_MESH;
        this.scene.add(cube);
    }

    private addCone() {
        const coneGeometry = new THREE.ConeGeometry(this.FIXED_UNIT_R / 2, this.FIXED_UNIT_R, this.MESH_SEGMENTS, 1, false, Math.PI / 2, Math.PI);
        coneGeometry.rotateZ(Math.PI / 2);
        coneGeometry.rotateX(-Math.PI / 2);
        coneGeometry.translate(-this.FIXED_UNIT_R / 2, 0, 0);
        const cone = new THREE.Mesh(coneGeometry, Materials.green);
        cone.userData.type = ObjectType.HITTABLE_MESH;
        this.scene.add(cone);
    }

    private addLight() {
        this.addDirLight(new THREE.Vector3(10, 50, -4));
        this.addDirLight(new THREE.Vector3(-4, -50, 40));
        this.scene.add(new THREE.AmbientLight(0x222222));
    }

    private addDirLight(position: THREE.Vector3) {
        const dirLight = new THREE.DirectionalLight(0xffffff);
        dirLight.position.set(position.x, position.y, position.z);
        this.scene.add(dirLight);
    }

}
