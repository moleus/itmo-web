import React from 'react';
import Figures from "./svg/Figures";
import Axes from "./svg/Axes";
import Point from "./svg/Point";
import {IndexedPoint} from "./util/types/canvasPoint";


interface AxisCanvasProps {
    sizePx: number,
    pxPerUnit: number,
    points: IndexedPoint[];
    onClick: React.MouseEventHandler<SVGSVGElement>,
}

const AxisCanvas = ({sizePx, pxPerUnit, onClick, points, ...other}: AxisCanvasProps) => {
    return (
        <svg width={sizePx} height={sizePx} onClick={onClick} {...other}>
            <g>
                <Figures halfR={pxPerUnit} sizePx={sizePx}/>
                <Axes strokeDistance={pxPerUnit} sizePx={sizePx}/>
                {points && points.map((point: IndexedPoint) => {
                    return <Point key={point.id} coordinates={point.coordinates} radius={point.radius}
                                  color={point.color}/>
                })}
            </g>
        </svg>
    );
}

export default AxisCanvas;