import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {Axis3d} from "./axis3d.js";
import {CanvasController} from "./CanvasController.js";
import {CanvasView} from "./CanvasView.js";
import {InputFormView} from "./InputFormView.js";
import {TableView} from "./TableView.js";
import {InputFormModel} from "./InputFormModel.js";
import {InputFormController} from "./InputFormController.js";

(() => {
    const imageSizePx = 300
    const numberOfIntervals = 3

    const coordinateNormalizer = new CoordinateNormalizer(imageSizePx, numberOfIntervals);
    const inputFormView = new InputFormView();
    const inputFormModel = new InputFormModel();
    const tableView = new TableView();
    const canvasView = new CanvasView(imageSizePx, coordinateNormalizer);
    new CanvasController(
        coordinateNormalizer,
        canvasView,
        inputFormView,
        tableView,
        inputFormModel
    );
    new InputFormController(
        inputFormView,
        inputFormModel,
        tableView,
        canvasView
    );
    Axis3d.init()
    Axis3d.animate()
})();