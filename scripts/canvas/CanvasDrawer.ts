'use strict';

import GraphImg from "../../images/graph.svg";

enum DotColor {
    miss = 'red',
    hit = 'green'
}

export class CanvasDrawer {
    private readonly canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private readonly image: HTMLImageElement;
    private readonly imageSizePx: number;

    constructor(canvas: HTMLCanvasElement, imageSizePx: number) {
        this.canvas = canvas;
        this.imageSizePx = imageSizePx;
        this.ctx = canvas.getContext('2d');
        this.image = new Image(this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0)
        }
        this.image.src = GraphImg;
        this.scaleCanvas();
    }

    public drawPoint(x: number, y: number, isValid: boolean) {
        this.ctx.fillStyle = isValid ? DotColor.hit.toString() : DotColor.miss.toString()
        let dot = new Path2D();
        dot.arc(x, y, 3, 0, 2 * Math.PI)
        this.ctx.fill(dot);
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.ctx.drawImage(this.image, 0, 0)
    }

    private scaleCanvas = () => {
        this.canvas.width = this.imageSizePx;
        this.canvas.height = this.imageSizePx;

        const scale = this.canvas.width / this.imageSizePx
        this.ctx.scale(scale, scale)
    }
}

