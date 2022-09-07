import {ElementsContext, Vector} from "../util/common.js";
import {CanvasDrawer} from "./CanvasDrawer.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";

export class CanvasView {
    private readonly canvas2d: HTMLCanvasElement;
    private readonly modeSwitch: HTMLInputElement;
    private readonly canvas3d: HTMLElement;

    private readonly canvasDrawer: CanvasDrawer;
    private readonly coordinateNormalizer: CoordinateNormalizer;

    constructor(imageSizePx: number, coordinatesNormalizer: CoordinateNormalizer) {
        this.coordinateNormalizer = coordinatesNormalizer;
        this.canvas2d = ElementsContext.canvas;
        this.canvas3d = document.getElementById('axis-canvas-3d');
        this.modeSwitch = document.getElementById('toggle-canvas') as HTMLInputElement;

        this.canvasDrawer = new CanvasDrawer(this.canvas2d, imageSizePx);

        this.initModeSwitchListener();
    }

    public clearCanvas = () => this.canvasDrawer.clearCanvas()

    public addPoint = (x: number, y: number, r: number, isHit: boolean) => {
        const normalized = this.coordinateNormalizer.fromUnitsToPx(new Vector(x, y), r);
        this.canvasDrawer.drawPoint(normalized.x, normalized.y, isHit)
    }

    public bindClick = (handler) => {
        this.canvas2d.addEventListener('click', handler);
    }

    public initModeSwitchListener = () => {
        this.modeSwitch.onclick = () => {
            if (this.modeSwitch.checked) {
                this.canvas2d.style.display = "none";
                this.canvas3d.style.display = "block";
            } else {
                this.canvas2d.style.display = "block";
                this.canvas3d.style.display = "none";
            }
        }
    }
}