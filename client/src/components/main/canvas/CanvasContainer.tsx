import React from "react";
import Axes from "./svg/Axes";
import Figures from "./svg/Figures";
import {useAppSelector} from "../../../hooks/redux";
import {hitAPI} from "../../../api/hitsService";
import {HitQuery} from "../../../api/types/HitQuery";
import useNormalizer from "./UseNormalizer";
import Point from "./svg/Point";
import {HitResult} from "../../../api/types/HitResult";
import {Vector} from "./CoodinatesNormalizer";
import {CanvasPoint, DotColor} from "./CanvasPoint";

const mapHitToPoint = (hit: HitResult, scaleRadius: number, toPx: (coordinatesUnits: Vector, radius: number) => Vector): CanvasPoint => {
    const coordinates = toPx({x: hit.x, y: hit.y}, scaleRadius);
    const color = hit.hit ? DotColor.hit : DotColor.miss;
    return {coordinates: coordinates, color, radius: 3}
}

const CanvasContainer = () => {
    const SIZE = 300;
    const INIT_PX_PER_UNIT = 50;
    const RADIUS_PX = 2 * INIT_PX_PER_UNIT;

    const {data: hits} = hitAPI.useFetchAllHitsQuery();
    const [sendHit, {}] = hitAPI.useCreateHitMutation({fixedCacheKey: 'shared-create-hit'});
    const {scaleRadius} = useAppSelector(state => state.coordinatesReducer);

    const {fromPxToUnits, fromUnitsToPx} = useNormalizer({canvasSizePx: SIZE, pxPerRadius: RADIUS_PX});

    const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
        const {x, y} = fromPxToUnits({x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY}, scaleRadius);
        const hitQuery = {x, y, r: scaleRadius} as HitQuery;
        sendHit(hitQuery);
    }

    const scaledPxPerUnit = () => Math.min(INIT_PX_PER_UNIT * scaleRadius, SIZE);

    return (
        <section className="grid-section" id="canvas-container">
            <div>
                <svg width={SIZE} height={SIZE} onClick={handleClick}>
                    <g>
                        <Figures halfR={scaledPxPerUnit()} sizePx={SIZE}/>
                        <Axes strokeDistance={scaledPxPerUnit()} sizePx={SIZE} />
                        {hits && hits.map((h: HitResult) => {
                            const point = mapHitToPoint(h, scaleRadius, fromUnitsToPx);
                            return <Point key={h.id} coordinates={point.coordinates} radius={point.radius} color={point.color}/>
                        })}
                    </g>
                </svg>
            </div>
        </section>
    )
}

export default CanvasContainer;
