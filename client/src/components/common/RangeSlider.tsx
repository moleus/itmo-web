import React from 'react';
import Slider from 'rc-slider';


interface RangeSlider {
    onChange: (value: number) => void;
    min: number;
    max: number;
    defaultValue: number;
}

const RangeSlider = ({onChange, min, max, defaultValue}: RangeSlider) => (
    <Slider
        onChange={onChange}
        min={min}
        max={max}
        defaultValue={defaultValue}
        step={0.1}
    />
);

export default RangeSlider;