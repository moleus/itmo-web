import {RangeValidator} from "./RangeValidator";

const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const Y_MIN = -3
const Y_MAX = 5;
const R_VALUES = [1, 1.5, 2, 2.5, 3];

export class InputRangeValidator {
    public static validateValues(x: number, y: number, r: number): boolean {
        if (!(RangeValidator.isInList(x, X_VALUES) &&
            RangeValidator.isInRange(y, Y_MIN, Y_MAX) &&
            RangeValidator.isInList(r, R_VALUES))) {
            console.error("Some value is missing!")
            return false;
        }
        return true;
    }
}
