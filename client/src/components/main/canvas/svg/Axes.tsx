import React from 'react';
import {range} from "../../../util/Util";
import AxesStrokes from "./AxesStrokes";


interface AxesProps {
    strokeDistance: number;
    sizePx: number;
}

const Axes = ({strokeDistance, sizePx}: AxesProps) => {
    const center = sizePx / 2;
    const count = Math.floor(sizePx / strokeDistance);

    const rightArrow = `${sizePx},${center} ${sizePx - 10},${center - 5} ${sizePx - 10},${center + 5}`
    const topArrow = `${center},0 ${center - 5},10 ${center + 5},10`

    const unitsPositions = (count: number, pxPerUnit: number) => range((count - 1)).map(i => (i + 1) * pxPerUnit)

    return (
        <svg width={sizePx} height={sizePx} className="svg-graph" xmlns="http://www.w3.org/2000/svg">
            {/* X-Axis */}
            <line className="axis" x1="0" y1={center} x2={sizePx} y2={center} stroke="black"/>
            {/*arrow */}
            <polygon points={rightArrow}/>

            {/* Y-Axis */}
            <line className="axis" x1={center} y1="0" x2={center} y2={sizePx} stroke="black"/>
            <polygon points={topArrow}/>

            {/* X/Y strokes */}
            {unitsPositions(count, strokeDistance).map(shift => (
                <AxesStrokes key={shift} center={center} shift={shift}/>
            ))}
        </svg>
    )
}

export default Axes;