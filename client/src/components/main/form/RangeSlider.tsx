import React from 'react';
import "./RangeSlider.scss"

const RangeSlider = () => {
    return (
        <div className="slider">
            <input type="range" min="0" max="100" value="10"/>
        </div>
    )
}

export default RangeSlider;