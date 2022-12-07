import {range} from "../../../../util/Util";

const useSvgAxisCalculator = (strokeDistance: number, imgSize: number) => {
    const center = imgSize / 2;
    const count = Math.floor(imgSize / strokeDistance);

    const getTopArrow = () => `${center},0 ${center - 5},10 ${center + 5},10`;
    const getRightArrow = () => `${imgSize},${center} ${imgSize - 10},${center - 5} ${imgSize - 10},${center + 5}`

    const getUnitsPositions = () => range((count - 1)).map(i => (i + 1) * strokeDistance);

    return {getTopArrow, getRightArrow, getUnitsPositions}
}

export default useSvgAxisCalculator;