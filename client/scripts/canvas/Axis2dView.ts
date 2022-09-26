import {ElementsContext, Vector} from "../util/common";
import {CanvasDrawer} from "./CanvasDrawer";
import {CoordinateNormalizer} from "./CoordinateNormalizer";
import {Canvas} from "./Canvas";
import {Switchable} from "./Switchable";

export class Axis2dView implements Canvas, Switchable {
    private readonly axis2d: HTMLCanvasElement;

    private readonly canvasDrawer: CanvasDrawer;
    private readonly coordinateNormalizer: CoordinateNormalizer;

    private clearRequiredFlag: boolean = false;

    constructor(imageSizePx: number, coordinatesNormalizer: CoordinateNormalizer) {
        this.coordinateNormalizer = coordinatesNormalizer;
        this.axis2d = ElementsContext.canvas;

        this.canvasDrawer = new CanvasDrawer(this.axis2d, imageSizePx);
    }

    display() {
        this.axis2d.style.display = "block";
        if (this.clearRequiredFlag) {
            this.clear();
            this.clearRequiredFlag = false;
        }
    }

    hide() {
        this.axis2d.style.display = "none";
    }

    clear() {
        if (this.axis2d.style.display !== "none") {
            this.canvasDrawer.clearCanvas()
        } else {
            this.clearRequiredFlag = true;
        }
    }

    addPoint = (x: number, y: number, r: number, isHit: boolean) => {
        const normalized = this.coordinateNormalizer.fromUnitsToPx(new Vector(x, y), r);
        this.canvasDrawer.drawPoint(normalized.x, normalized.y, isHit)
    }

    bindClick = (handler) => {
        this.axis2d.addEventListener('click', handler);
    }
}