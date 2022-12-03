import React from 'react';

export interface AxesStrokesProps {
    center: number;
    shift: number;
}

const AxesStrokes = ({center, shift}: AxesStrokesProps) => {
    return (
        <>
            <line className="coordinate-line" x1={center + shift} x2={center + shift} y1={center - 5} y2={center + 5}
                  stroke="black"/>
            <line className="coordinate-line" x1={center - shift} x2={center - shift} y1={center - 5} y2={center + 5}
                  stroke="black"/>
            <line className="coordinate-line" y1={center + shift} y2={center + shift} x1={center - 5} x2={center + 5}
                  stroke="black"/>
            <line className="coordinate-line" y1={center - shift} y2={center - shift} x1={center - 5} x2={center + 5}
                  stroke="black"/>
        </>
    )
}

export default AxesStrokes;