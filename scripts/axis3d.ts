import * as THREE from 'three';

import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer;

const container = document.getElementById('axis-canvas-3d')

const WIDTH = 300
const HEIGHT = 300

export const Axis3d = {
    init: init,
    animate: animate
}

function init() {
    console.log("Run axis3d init")
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1); // Z axis - up

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(60, WIDTH / WIDTH, 1, 1000);
    camera.position.set(0, -45, 0);

    // controls
    controls = new OrbitControls(camera, renderer.domElement);

    controls.screenSpacePanning = false;
    controls.minDistance = 40;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;

    // world
    const axesHelper = new THREE.AxesHelper(300);
    scene.add(axesHelper);

    const unitR = 15
    const gridSize = unitR * 2 * 3
    const segments = 32
    const phiStart = 0;
    const phiEnd = Math.PI / 2;
    const thetaStart = 0;
    const thetaEnd = Math.PI / 2;

    const grid = new THREE.GridHelper(gridSize, gridSize / unitR, 0x444444, 0x888888);
    grid.computeLineDistances()
    grid.rotateX(Math.PI / 2);
    scene.add(grid)

    // materials
    const yellow_material = new THREE.MeshPhongMaterial({color: "yellow", opacity: 0.7, transparent: true})
    const blue_material = new THREE.MeshPhongMaterial({color: "blue", opacity: 0.7, transparent: true})
    const green_material = new THREE.MeshPhongMaterial({color: "green", opacity: 0.7, transparent: true})

    // Geometry
    const sphereGeometry = new THREE.SphereGeometry(unitR / 2, segments, segments, phiStart, phiEnd, thetaStart, thetaEnd);
    const cubeGeometry = new THREE.BoxGeometry(unitR, unitR, unitR)
    cubeGeometry.translate(-unitR / 2, 0, unitR / 2)

    const capGeom1 = new THREE.CircleBufferGeometry(unitR / 2, segments, phiStart, phiEnd);
    capGeom1.rotateY(Math.PI);  // flip normals

    const capGeom2 = new THREE.CircleBufferGeometry(unitR / 2, segments, thetaStart, thetaEnd);
    capGeom2.rotateY(Math.PI * .5);
    capGeom2.rotateX(Math.PI * .5);

    const capGeom3 = new THREE.CircleBufferGeometry(unitR / 2, segments, thetaStart, thetaEnd);
    capGeom3.rotateX(Math.PI * .5);
    capGeom3.rotateY(-Math.PI * .5);

    const pyramidGeometry = new THREE.ConeGeometry(unitR / 2, unitR, segments, 1, false, Math.PI / 2, Math.PI);
    pyramidGeometry.rotateZ(Math.PI / 2)
    pyramidGeometry.translate(-unitR / 2, 0, 0)

    // Mesh
    const sphere = new THREE.Mesh(sphereGeometry, blue_material);
    const cap = new THREE.Mesh(capGeom1, blue_material);
    const cap2 = new THREE.Mesh(capGeom2, blue_material);
    const cap3 = new THREE.Mesh(capGeom3, blue_material);
    sphere.add(cap)
    sphere.add(cap2)
    sphere.add(cap3)
    sphere.rotateY(Math.PI / 2)
    sphere.translateY(-unitR / 4)

    const cube = new THREE.Mesh(cubeGeometry, yellow_material);
    const cone = new THREE.Mesh(pyramidGeometry, green_material);

    // Scene
    scene.add(cone);
    scene.add(sphere)
    scene.add(cube);

    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(-4, -50, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff);
    dirLight2.position.set(10, 50, -4);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    container.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function onWindowResize() {
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();

    renderer.setSize(WIDTH, HEIGHT);

}

function render() {
    renderer.render(scene, camera);
}