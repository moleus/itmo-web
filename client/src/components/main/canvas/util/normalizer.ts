import {Coordinates} from "./types/canvasPoint";

interface NormalizerProps {
    canvasSizePx: number;
    pxPerRadius: number;
}

const normalizer = ({canvasSizePx, pxPerRadius}: NormalizerProps) => {
    const fromPxToUnits = (position: Coordinates, radiusScale: number): Coordinates => {
        const centered = shiftToAxisCenter(position)
        const scaled = scalePosition(centered)
        return {x: scaled.x / radiusScale, y: scaled.y / radiusScale}
    }

    const shiftToAxisCenter = (position: Coordinates): Coordinates => {
        return {x: position.x - canvasSizePx / 2, y: canvasSizePx / 2 - position.y}
    }

    const scalePosition = (position: Coordinates): Coordinates => {
        return {x: position.x / pxPerRadius, y: position.y / pxPerRadius}
    }

    const fromUnitsToPx = (units: Coordinates, unitR: number): Coordinates => {
        const scaled = scaleToPx(units, unitR)
        return {x: scaled.x + canvasSizePx / 2, y: canvasSizePx / 2 - scaled.y}
    }

    const scaleToPx = (units: Coordinates, radiusScale: number) => {
        const xPx = units.x * pxPerRadius * radiusScale
        const yPx = units.y * pxPerRadius * radiusScale
        return {x: xPx, y: yPx}
    }
    return {fromPxToUnits, fromUnitsToPx};
}

export default normalizer;