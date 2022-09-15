export class RangeValidator {
    public static isInList(value: number, allowed: Array<number>): boolean {
        return isNumber(value) && allowed.includes(value);
    }

    public static isInRange(value: number, min: number, max: number) {
        return isNumber(value) && (value > min && value < max);
    }
}

function isNumber(value: number): boolean {
    return !Number.isNaN(value);
}