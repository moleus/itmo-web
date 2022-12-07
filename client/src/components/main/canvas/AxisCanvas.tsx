import React from 'react';
import {CanvasPoint, DotColor} from "./CanvasPoint";
import useCanvas, {CanvasProps} from "./useCanvas";
import {hitAPI} from "../../../api/hitsService";
import {HitResult} from "../../../api/types/HitResult";

import "./AxisCanvas.scss"
import {Vector} from './CoodinatesNormalizer';
import {useAppSelector} from '../../../hooks/redux';
import {HitQuery} from "../../../api/types/HitQuery";

export interface ClickableCanvasProps {
    canvasProps: CanvasProps;
}

const mapHitToPoint = (hit: HitResult, radius: number, normalizer: (coordinatesUnits: Vector, radius: number) => Vector): CanvasPoint => {
    const coordinates = normalizer({x: hit.x, y: hit.y}, radius);
    const color = hit.hit ? DotColor.hit : DotColor.miss;
    return {coordinates: coordinates, color, radius: 3}
}

const AxisCanvas = ({canvasProps}: ClickableCanvasProps) => {
    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    const [sendHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const {scaleRadius} = useAppSelector(state => state.coordinatesReducer);

    const {canvasRef, draw, clear, pxToUnits, unitsToPx} = useCanvas(canvasProps);

    React.useEffect(() => {
        clear();
        hits && hits.forEach(hit => draw(mapHitToPoint(hit, scaleRadius, unitsToPx)));
    }, [hits, scaleRadius]);

    const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        const {x, y} = pxToUnits({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}, scaleRadius);
        const hitQuery = {x, y, r: scaleRadius} as HitQuery;
        sendHit(hitQuery);
    }

    return (
        <canvas className="axis-canvas" id="axis-canvas" data-test-id="axis-canvas" ref={canvasRef} onClick={handleCanvasClick}/>
    );
}

export default AxisCanvas;