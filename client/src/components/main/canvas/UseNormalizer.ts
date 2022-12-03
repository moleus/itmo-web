import {Vector} from "./CoodinatesNormalizer";

interface NormalizerProps {
    canvasSizePx: number;
    pxPerRadius: number;
}


const useNormalizer = ({canvasSizePx, pxPerRadius}: NormalizerProps) => {
    const fromPxToUnits = (position: Vector, radiusScale: number): Vector => {
        const centered = shiftToAxisCenter(position)
        const scaled = scalePosition(centered)
        //TODO: change backend scaling to multiplication
        return {x: scaled.x / radiusScale, y: scaled.y / radiusScale}
    }

    const shiftToAxisCenter = (position: Vector): Vector => {
        return {x: position.x - canvasSizePx / 2, y: canvasSizePx / 2 - position.y}
    }

    const scalePosition = (position: Vector): Vector => {
        return {x: position.x / pxPerRadius, y: position.y / pxPerRadius}
    }

    const fromUnitsToPx = (units: Vector, unitR: number): Vector => {
        const scaled = scaleToPx(units, unitR)
        return {x: scaled.x + canvasSizePx / 2, y: canvasSizePx / 2 - scaled.y}
    }

    const scaleToPx = (units: Vector, radiusScale: number) => {
        // TODO: check multiplication
        const xPx = units.x * pxPerRadius * radiusScale
        const yPx = units.y * pxPerRadius * radiusScale
        return {x: xPx, y: yPx}
    }
    return {fromPxToUnits, fromUnitsToPx};
}

export default useNormalizer;