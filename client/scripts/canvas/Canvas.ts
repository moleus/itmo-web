export interface Canvas {
    addPoint(x: number, y: number, r: number, isHit: boolean);
    clear();
    bindClick(handler: (MouseEvent) => void);
}