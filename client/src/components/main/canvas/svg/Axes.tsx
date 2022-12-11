import React from 'react';
import AxesStrokes from "./AxesStrokes";
import useSvgAxisCalculator from "./util/useSvgAxisCalculator";


interface AxesProps {
    strokeDistance: number;
    sizePx: number;
}

const Axes = ({strokeDistance, sizePx}: AxesProps) => {
    const center = sizePx / 2;
    const {getTopArrow, getRightArrow, getUnitsPositions} = useSvgAxisCalculator(strokeDistance, sizePx);

    return (
        <svg width={sizePx} height={sizePx} className="svg-graph" xmlns="http://www.w3.org/2000/svg">
            {/* X-Axis */}
            <line className="axis" x1="0" y1={center} x2={sizePx} y2={center} stroke="black"/>
            {/*arrow */}
            <polygon points={getRightArrow()}/>

            {/* Y-Axis */}
            <line className="axis" x1={center} y1="0" x2={center} y2={sizePx} stroke="black"/>
            <polygon points={getTopArrow()}/>

            {/* X/Y strokes */}
            {getUnitsPositions().map(shift => (
                <AxesStrokes key={shift} center={center} shift={shift}/>
            ))}
        </svg>
    )
}

const MemoizedAxes = React.memo(Axes);

export default MemoizedAxes;