import {Vector} from "../../scripts/Shapes";

const DEFAULT_SIZE = 200

class FiguresAxis extends HTMLElement {
    public clickCallback: Function;

    private readonly imgSrc: string;
    private readonly size: number;
    private readonly unit: number
    private unitMultiplier: number
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        super()
        try {
            this.imgSrc = this.getAttribute("img")
            this.unit = Number(this.getAttribute("unit"))
        } catch {
            console.warn("missing attribute when initiating figures-axis element")
            return
        }
        this.size = this.hasAttribute("size") ? Number(this.getAttribute('size')) : DEFAULT_SIZE

        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext("2d")
        this.initCanvas()

        // draw points

        // add event listeners
        this.canvas.addEventListener('click', this.processClick)
    }

    private initCanvas() {
        this.canvas.width = this.size
        this.canvas.height = this.size
        const image = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight)
        image.onload = () => {
            this.context.drawImage(image, 0, 0)
        }
        image.src = this.imgSrc
    }

    private processClick = (event: MouseEvent) => {
        if (!this.clickCallback) return
        const clickPx = new Vector(event.offsetX, event.offsetY)
        const units: Vector = this.shiftToCenter(this.scalePosition(clickPx))
        // TODO: should we multiply by R here or before send
        const normalized = new Vector(units.x * this.unitMultiplier, units.y * this.unitMultiplier)
        // TODO: when should we draw a point?
        this.clickCallback(normalized)
    }

    private shiftToCenter(position: Vector): Vector {
        return new Vector(position.x - this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 - position.y)
    }

    private scalePosition(position: Vector): Vector {
        const unitRSizePx = DEFAULT_SIZE / this.unit
        const unitsX = position.x / unitRSizePx
        const unitsY = position.y / unitRSizePx
        return new Vector(unitsX, unitsY)
    }
}

customElements.define('figures-axis', FiguresAxis, {extends: 'canvas'});