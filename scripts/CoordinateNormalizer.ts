import {Vector} from "./Shapes.js";

export class CoordinateNormalizer {
    private readonly canvas: HTMLCanvasElement
    private readonly intervalsCount: number

    public constructor(canvas: HTMLCanvasElement, intervalsCount: number) {
        this.canvas = canvas
        this.intervalsCount = intervalsCount
    }

    public fromPxToUnits = (position: Vector, unitR: number): Vector => {
        const centered = this.shiftToAxisCenter(position)
        const scaled = this.scalePosition(centered)
        return new Vector(scaled.x * unitR, scaled.y * unitR)
    }

    private shiftToAxisCenter = (position: Vector): Vector => {
        return new Vector(position.x - this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 - position.y)
    }

    /**
     * Returns float number of R units
     */
    private scalePosition(position: Vector): Vector {
        // 3 R intervals on axis image
        console.assert(this.canvas.offsetWidth == this.canvas.offsetHeight)
        const unitRSizePx = this.canvas.offsetWidth / this.intervalsCount
        const unitsX = position.x / unitRSizePx
        const unitsY = position.y / unitRSizePx
        return new Vector(unitsX, unitsY)
    }

    public fromUnitsToPx = (units: Vector, unitR: number): Vector => {
        const scaled = this.scaleToPx(units, unitR)
        return new Vector(scaled.x + this.canvas.offsetWidth / 2, this.canvas.offsetHeight / 2 - scaled.y)
    }

    private scaleToPx(units: Vector, unitR: number) {
        const unitRSizePx = this.canvas.offsetWidth / this.intervalsCount
        const xPx = units.x * unitRSizePx / unitR
        const yPx = units.y * unitRSizePx / unitR
        return new Vector(xPx, yPx)
    }
}