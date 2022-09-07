import * as THREE from 'three';

import {OrbitControls} from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer;

const container = document.getElementById('axis-canvas-3d')

const WIDTH = 300
const HEIGHT = 300

export const Axis3d = {
    init: init,
    animate: animate
}

function init() {
    THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1); // Z axis - up

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    initRenderer();

    camera = new THREE.PerspectiveCamera(60, WIDTH / WIDTH, 1, 1000);
    camera.position.set(0, -45, 0);

    initControls(camera, renderer);
    scene.add(new THREE.AxesHelper(300));

    const unitR = 15

    addGrid(unitR);
    addMeshes(unitR);

    addDirLight(scene, new THREE.Vector3(10, 50, -4))
    addDirLight(scene, new THREE.Vector3(-4, -50, 40))

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    container.addEventListener('resize', onWindowResize);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);
    container.appendChild(renderer.domElement);
    renderer.domElement.addEventListener("click", createNewPoint, true);
}

function initControls(camera: THREE.Camera, renderer: THREE.Renderer) {
    controls = new OrbitControls(camera, renderer.domElement);

    controls.screenSpacePanning = false;
    controls.minDistance = 40;
    controls.maxDistance = 100;
    controls.maxPolarAngle = Math.PI / 2;
}

function addGrid(unitR: number) {
    const gridSize = unitR * 2 * 3
    const grid = new THREE.GridHelper(gridSize, gridSize / unitR, 0x444444, 0x888888);
    grid.computeLineDistances()
    grid.rotateX(Math.PI / 2);
    scene.add(grid)
}

function addMeshes(unitR: number) {
    // materials
    const yellow_material = new THREE.MeshPhongMaterial({color: "yellow", opacity: 0.7, transparent: true})
    const blue_material = new THREE.MeshPhongMaterial({color: "blue", opacity: 0.7, transparent: true})
    const green_material = new THREE.MeshPhongMaterial({color: "green", opacity: 0.7, transparent: true})

    // Geometry
    const segments = 32
    const phiStart = 0;
    const phiEnd = Math.PI / 2;
    const thetaStart = 0;
    const thetaEnd = Math.PI / 2;
    const sphereGeometry = new THREE.SphereGeometry(unitR / 2, segments, segments, phiStart, phiEnd, thetaStart, thetaEnd);
    const cubeGeometry = new THREE.BoxGeometry(unitR, unitR, unitR)
    cubeGeometry.translate(-unitR / 2, 0, unitR / 2)

    const capGeom1 = quarterCircle(unitR / 2, 0, Math.PI)  // flip normals
    const capGeom2 = quarterCircle(unitR / 2, Math.PI / 2, 0, Math.PI / 2)
    const capGeom3 = quarterCircle(unitR / 2, Math.PI / 2, -Math.PI / 2)

    const pyramidGeometry = new THREE.ConeGeometry(unitR / 2, unitR, segments, 1, false, Math.PI / 2, Math.PI);
    pyramidGeometry.rotateZ(Math.PI / 2)
    pyramidGeometry.translate(-unitR / 2, 0, 0)

    // Mesh
    const sphere = mergeGeometry([sphereGeometry, capGeom1, capGeom2, capGeom3], blue_material);
    sphere.rotateY(Math.PI / 2)
    sphere.translateY(-unitR / 4)

    const cube = new THREE.Mesh(cubeGeometry, yellow_material);
    const cone = new THREE.Mesh(pyramidGeometry, green_material);

    // Scene
    scene.add(cone);
    scene.add(sphere)
    scene.add(cube);
}

function quarterCircle(radius: number, rotationX: number, rotationY: number, rotationZ: number = 0) {
    const geometry = new THREE.CircleBufferGeometry(radius, 32, 0, Math.PI / 2);
    geometry.rotateX(rotationX);
    geometry.rotateY(rotationY);
    geometry.rotateZ(rotationZ);
    return geometry;
}

function mergeGeometry(geometries: Array<THREE.BufferGeometry>, material: THREE.Material): THREE.Mesh {
    return geometries.map((geometry) => new THREE.Mesh(geometry, material)).reduce((mainMesh, subMesh) => mainMesh.add(subMesh))
}

function addDirLight(scene: THREE.Scene, position: THREE.Vector3) {
    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(position.x, position.y, position.z);
    scene.add(dirLight);
}

const rayCaster = new THREE.Raycaster()

function createNewPoint(event: JQuery.ClickEvent) {
    const clickPosition = new THREE.Vector2;
    clickPosition.x = (event.offsetX / WIDTH) * 2 - 1;
    clickPosition.y = -(event.offsetY / HEIGHT) * 2 + 1;

    rayCaster.setFromCamera(clickPosition, camera);
    const meshIntersections = rayCaster.intersectObjects(scene.children.filter((obj) => obj.isMesh && !obj.disableRaycast));
    if (meshIntersections.length == 0) {
        const axisPlane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
        const intersectionPoint = new THREE.Vector3();
        rayCaster.ray.intersectPlane(axisPlane, intersectionPoint);
        addIntersectionPoint(intersectionPoint, "red")
        return
    }
    drawIntersections(meshIntersections, "green")
}

function drawIntersections(intersections: Array<THREE.Intersection<THREE.Object3D>>, color: THREE.ColorRepresentation) {
    for (let i = 0; i < intersections.length; i++) {
        const point = intersections[i].point;
        addIntersectionPoint(point, color)
    }
}

function addIntersectionPoint(point: THREE.Vector3, color: THREE.ColorRepresentation) {
    const sphereGeometry = new THREE.SphereBufferGeometry(0.5, 10, 10);
    const material = new THREE.MeshPhongMaterial({color: color})
    const clickedSphere = new THREE.Mesh(sphereGeometry, material);
    clickedSphere.position.set(point.x, point.y, point.z);
    clickedSphere["disableRaycast"] = true
    scene.add(clickedSphere);
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