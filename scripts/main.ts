import {CoordinateNormalizer} from "./canvas/CoordinateNormalizer.js";
import {Axis3d} from "./canvas/axis3d.js";
import {CanvasController} from "./canvas/CanvasController.js";
import {CanvasView} from "./canvas/CanvasView.js";
import {InputFormView} from "./form/InputFormView.js";
import {TableView} from "./table/TableView.js";
import {InputFormModel} from "./form/InputFormModel.js";
import {InputFormController} from "./form/InputFormController.js";

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