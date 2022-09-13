import {ElementsContext, Vector} from "../util/common.js";
import {CanvasDrawer} from "./CanvasDrawer.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {Canvas} from "./Canvas.js";
import {Switchable} from "./Switchable.js";

export class Axis2dView implements Canvas, Switchable {
    private readonly axis2d: HTMLCanvasElement;

    private readonly canvasDrawer: CanvasDrawer;
    private readonly coordinateNormalizer: CoordinateNormalizer;

    constructor(imageSizePx: number, coordinatesNormalizer: CoordinateNormalizer) {
        this.coordinateNormalizer = coordinatesNormalizer;
        this.axis2d = ElementsContext.canvas;

        this.canvasDrawer = new CanvasDrawer(this.axis2d, imageSizePx);
    }

    display() {
        this.axis2d.style.display = "block";
    }

    hide() {
        this.axis2d.style.display = "none";
    }

    clear = () => this.canvasDrawer.clearCanvas()

    addPoint = (x: number, y: number, r: number, isHit: boolean) => {
        const normalized = this.coordinateNormalizer.fromUnitsToPx(new Vector(x, y), r);
        this.canvasDrawer.drawPoint(normalized.x, normalized.y, isHit)
    }

    bindClick = (handler) => {
        this.axis2d.addEventListener('click', handler);
    }
}