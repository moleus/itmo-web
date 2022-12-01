import React from 'react';
import {CanvasPoint, DotColor} from "./CanvasPoint";
import useCanvas, {CanvasProps} from "./useCanvas";
import {hitAPI} from "../../../services/HitsService";
import {HitResult} from "../../../models/HitResult";

import "./AxisCanvas.scss"
import {Vector} from './CoodinatesNormalizer';
import {useAppSelector} from '../../../hooks/redux';
import {HitQuery} from "../../../models/HitQuery";

export interface ClickableCanvasProps {
    canvasProps: CanvasProps;
}

const mapHitToPoint = (hit: HitResult, radius: number, normalizer: (coordinatesUnits: Vector, radius: number) => Vector): CanvasPoint => {
    const coordinates = normalizer({x: hit.x, y: hit.y}, radius);
    const color = hit.hit ? DotColor.hit : DotColor.miss;
    return {coordinates, color, radius: 3}
}

const AxisCanvas = ({canvasProps}: ClickableCanvasProps) => {
    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    const [sendHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const {radius} = useAppSelector(state => state.coordinates);

    const {canvasRef, draw, pxToUnits, unitsToPx} = useCanvas(canvasProps);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
        hits && hits.forEach(hit => draw(mapHitToPoint(hit, radius, unitsToPx)));
    });

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        console.log(`Click position x: ${event.nativeEvent.offsetX}; y: ${event.nativeEvent.offsetY}`)
        const {x, y} = pxToUnits({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}, radius);
        const hitQuery = {x, y, r: radius} as HitQuery;
        sendHit(hitQuery);
    }

    return (
        <canvas className="axis-canvas" id="axis-canvas" data-test-id="axis-canvas" ref={canvasRef} onClick={handleCanvasClick}>
              <img src={canvasProps.imageSrc} width={canvasProps.sizePx} height={canvasProps.sizePx} alt="A graph" />
        </canvas>
    );
}

export default AxisCanvas;