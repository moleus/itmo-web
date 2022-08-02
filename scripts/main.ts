import {CanvasDrawer} from "./Drawer.js";
import {ClickProcessor} from "./clickProcessor.js";
import {ElementsContext} from "./common.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {FormProcessor} from "./FormProcessor.js";

window.onload = () => {
    const imageSizePx = 300
    const numberOfIntervals = 3
    const canvas = ElementsContext.canvas;
    const canvasDrawer = new CanvasDrawer(canvas, imageSizePx)
    canvasDrawer.scaleCanvas();
    const coordinatesNormalizer = new CoordinateNormalizer(canvas, numberOfIntervals)
    const submitProcessor = new FormProcessor(coordinatesNormalizer, canvasDrawer)
    const clickProcessor = new ClickProcessor(coordinatesNormalizer, submitProcessor)

    canvas.addEventListener('click', clickProcessor.processClick)
    ElementsContext.submitButton.onclick = submitProcessor.processSubmit
    ElementsContext.resetButton.onclick = submitProcessor.resetTable
    //TODO: bind graph click on submit click

    submitProcessor.initTable()
}

$(".numeric-input").on('keypress', function (event) {
    const numericSymbol = /[\d.,\-+]/
    let isNumeric = numericSymbol.test(event.key);
    if (!isNumeric) {
        event.preventDefault();
    }
})