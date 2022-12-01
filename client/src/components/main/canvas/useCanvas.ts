import {useEffect, useRef} from "react";
import {CanvasPoint} from "./CanvasPoint";
import {CoordinateNormalizer} from "./CoodinatesNormalizer";


export interface CanvasProps {
    sizePx: number;
    imageSrc: string;
}
    
const useCanvas = ({sizePx, imageSrc}: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const INTERVALS = 3;
    const coordinatesNormalizer = new CoordinateNormalizer(sizePx, INTERVALS);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const image = new Image(sizePx, sizePx);
        image.onload = () => {
            ctx.drawImage(image, 0, 0)
        }
        image.src = imageSrc;

        canvas.width = sizePx;
        canvas.height = sizePx;
    })

    const draw = (point: CanvasPoint) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = point.color;
        let dot = new Path2D();
        dot.arc(point.coordinates.x, point.coordinates.y, 3, 0, 2 * Math.PI)
        ctx.fill(dot);
    }

    const pxToUnits = coordinatesNormalizer.fromPxToUnits;
    const unitsToPx = coordinatesNormalizer.fromUnitsToPx;

    return {canvasRef, draw, pxToUnits, unitsToPx};
}

export default useCanvas;