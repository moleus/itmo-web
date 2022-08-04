export class Vector {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    public toString = () => {
        return `{${this.x}, ${this.y}}`
    }
}

