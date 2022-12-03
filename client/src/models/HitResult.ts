export interface HitResult {
    id: number;
    x: number;
    y: number;
    r: number;
    hit: boolean;
    hitTime: string;
    executionTimeMicros: number;
}