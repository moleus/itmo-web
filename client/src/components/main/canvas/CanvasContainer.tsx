import React from "react";
import AxisCanvas from "./AxisCanvas";

const CANVAS_BG_SRC = "/img/graph.svg";

const CanvasContainer = () => {
    return (
        <section className="grid-section" id="canvas-container">
            <div>
                <AxisCanvas canvasProps={{sizePx: 300, imageSrc: CANVAS_BG_SRC}}/>
            </div>
        </section>
    )
}

export default CanvasContainer;
