import * as THREE from "three";
import {ObjectsScene, ObjectType} from "./ObjectsScene";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

class HitResult {
    readonly point: THREE.Vector3;
    readonly isHit: boolean;
    constructor(point, isHit) {
        this.point = point;
        this.isHit = isHit;
    }
}

export class SceneRenderer {
    private readonly renderer: THREE.WebGLRenderer;
    private readonly container: HTMLElement;
    private readonly camera: THREE.PerspectiveCamera;
    private readonly sceneWidth: number;
    private readonly sceneHeight: number;
    private readonly scene: THREE.Scene;
    private readonly objectScene: ObjectsScene;
    private readonly rayCaster: THREE.Raycaster;

    private clickProcessor: (x: number, y: number, z: number) => void;

    constructor(container: HTMLElement, objectScene: ObjectsScene, sceneWidth: number, sceneHeight: number) {
        this.sceneHeight = sceneHeight;
        this.sceneWidth = sceneWidth;
        this.container = container;
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(sceneWidth, sceneHeight);
        this.objectScene = objectScene;
        this.scene = objectScene.scene;
        this.rayCaster = new THREE.Raycaster();
        this.camera = new THREE.PerspectiveCamera(60, sceneHeight / sceneWidth);
        this.camera.position.set(0, 0, 3);

        container.appendChild(this.renderer.domElement);
        container.addEventListener('resize', this.onWindowResize);

        this.initControls();
        this.animate();
        this.renderer.domElement.addEventListener("click", this.createIntersectionPoint, true);
    }

    bindClick(handler: (x: number, y: number, z: number) => void) {
        this.clickProcessor = handler;
    }

    createIntersectionPoint = (event: MouseEvent) => {
        const result = this.calculateIntersectionPoint(event);
        const point = result.point
        this.clickProcessor(point.x, point.y, point.z);
        this.objectScene.addIntersectionPoint(result.point, result.isHit);
    }

    calculateIntersectionPoint(event: MouseEvent): HitResult {
        const clickPosition = new THREE.Vector2;
        clickPosition.x = (event.offsetX / this.sceneWidth) * 2 - 1;
        clickPosition.y = -(event.offsetY / this.sceneHeight) * 2 + 1;

        this.rayCaster.setFromCamera(clickPosition, this.camera);
        const meshIntersection = this.rayCaster.intersectObjects(
            this.scene.children.filter(obj => obj.userData.type == ObjectType.HITTABLE_MESH))[0];
        if (meshIntersection) {
            return new HitResult(meshIntersection.point, true);
        } else {
            const axisPlane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
            const intersectionPoint = new THREE.Vector3();
            this.rayCaster.ray.intersectPlane(axisPlane, intersectionPoint);
            return new HitResult(intersectionPoint, false);
        }
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    private onWindowResize = () => {
        this.camera.aspect = this.sceneWidth / this.sceneHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sceneWidth, this.sceneHeight);
    }

    private initControls() {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        controls.screenSpacePanning = false;
        controls.minDistance = this.objectScene.FIXED_UNIT_R * 2;
        controls.maxDistance = this.objectScene.FIXED_UNIT_R * 10;
        controls.maxPolarAngle = Math.PI / 2;
    }
}