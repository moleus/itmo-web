import {CanvasDrawer} from "./Drawer.js";
import {ClickProcessor} from "./clickProcessor.js";
import {ElementsContext} from "./common.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {FormProcessor} from "./FormProcessor.js";

{
    const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    const Y_MIN = -3
    const Y_MAX = 5;
    const R_VALUES = [1, 1.5, 2, 2.5, 3];

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

    const inputForm = ElementsContext.inputForm
    const inputX = ElementsContext.inputX
    const inputY = ElementsContext.inputY

    ValidationHooks.bindValidationHook(inputX, (value) => FormValidator.isInList(value, X_VALUES))
    ValidationHooks.bindValidationHook(inputY, (value) => FormValidator.isInRange(value, Y_MIN, Y_MAX))
    ValidationHooks.bindSubmitHook(inputForm, (value) => FormValidator.isInList(value, R_VALUES))


}