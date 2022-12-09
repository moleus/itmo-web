export enum DotColor {
    miss = 'red',
    hit = 'green'
}

export interface Coordinates {
    x: number;
    y: number
}

export interface CanvasPoint {
    coordinates: Coordinates;
    radius: number;
    color: DotColor;
}

export interface IndexedPoint extends CanvasPoint {
   id: number;
}