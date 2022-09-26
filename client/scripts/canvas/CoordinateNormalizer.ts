import {Vector} from "../util/common";

export class CoordinateNormalizer {
    private readonly intervalsCount: number
    private readonly canvasDimension: number;

    public constructor(canvasDimension: number, intervalsCount: number) {
        this.canvasDimension = canvasDimension;
        this.intervalsCount = intervalsCount
    }

    public fromPxToUnits = (position: Vector, unitR: number): Vector => {
        const centered = this.shiftToAxisCenter(position)
        const scaled = this.scalePosition(centered)
        return new Vector(scaled.x * unitR, scaled.y * unitR)
    }

    private shiftToAxisCenter = (position: Vector): Vector => {
        return new Vector(position.x - this.canvasDimension / 2, this.canvasDimension / 2 - position.y)
    }

    /**
     * Returns float number of R units
     */
    private scalePosition(position: Vector): Vector {
        // 3 R intervals on axis image
        console.assert(this.canvasDimension == this.canvasDimension)
        const unitRSizePx = this.canvasDimension / this.intervalsCount
        const unitsX = position.x / unitRSizePx
        const unitsY = position.y / unitRSizePx
        return new Vector(unitsX, unitsY)
    }

    public fromUnitsToPx = (units: Vector, unitR: number): Vector => {
        const scaled = this.scaleToPx(units, unitR)
        return new Vector(scaled.x + this.canvasDimension / 2, this.canvasDimension / 2 - scaled.y)
    }

    private scaleToPx(units: Vector, unitR: number) {
        const unitRSizePx = this.canvasDimension / this.intervalsCount
        const xPx = units.x * unitRSizePx / unitR
        const yPx = units.y * unitRSizePx / unitR
        return new Vector(xPx, yPx)
    }
}