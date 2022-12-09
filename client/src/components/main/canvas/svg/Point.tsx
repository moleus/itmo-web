import React from 'react';
import {CanvasPoint} from "../util/types/canvasPoint";


const Point = ({coordinates, radius, color}: CanvasPoint) => {
    return (<circle cx={coordinates.x} cy={coordinates.y} r={radius} fill={color}/>);
}

export default Point;