import {ElementsContext} from "../util/common.js";
import * as THREE from "three";
import {SceneRenderer} from "./SceneRenderer.js";
import {ObjectsScene} from "./ObjectsScene.js";
import {Canvas} from "../canvas/Canvas.js";

const WIDTH = 300
const HEIGHT = 300

export class Axis3dView implements Canvas {
    private readonly renderer: SceneRenderer;
    private readonly scene: ObjectsScene;
    private readonly axis3d: HTMLElement;

    constructor() {
        this.axis3d = ElementsContext.axis3d;

        this.scene = new ObjectsScene(new THREE.Scene());
        this.renderer = new SceneRenderer(this.axis3d, this.scene, WIDTH, HEIGHT);
    }

    display() {
        this.axis3d.style.display = "block";
    }

    hide() {
        this.axis3d.style.display = "none";
    }

    addPoint = (x: number, y: number, r: number, isHit: boolean) => {
        this.scene.addIntersectionPoint(new THREE.Vector3(x, y, 0), isHit);
    }

    clear() {
        this.scene.clear();
    }

    bindClick(handler: (x: number, y: number, z: number) => void) {
        this.renderer.bindClick(handler);
    }
}