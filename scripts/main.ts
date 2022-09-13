import {CoordinateNormalizer} from "./canvas/CoordinateNormalizer.js";
import {CanvasController} from "./canvas/CanvasController.js";
import {Axis2dView} from "./canvas/Axis2dView.js";
import {InputFormView} from "./form/InputFormView.js";
import {TableView} from "./table/TableView.js";
import {InputFormModel} from "./form/InputFormModel.js";
import {InputFormController} from "./form/InputFormController.js";
import {Axis3dView} from "./axis_3d/Axis3dView.js";
import {ModeSwitcherView} from "./canvas/ModeSwitcherView.js";

(() => {
    const imageSizePx = 300
    const numberOfIntervals = 3

    const coordinateNormalizer = new CoordinateNormalizer(imageSizePx, numberOfIntervals);
    const inputFormView = new InputFormView();
    const inputFormModel = new InputFormModel();
    const tableView = new TableView();
    const canvasView = new Axis2dView(imageSizePx, coordinateNormalizer);
    const axis3dView = new Axis3dView();
    const modeSwitcherView = new ModeSwitcherView();
    new CanvasController(
        coordinateNormalizer,
        canvasView,
        inputFormView,
        tableView,
        axis3dView,
        modeSwitcherView,
        inputFormModel
    );
    new InputFormController(
        inputFormView,
        inputFormModel,
        tableView,
        canvasView,
        axis3dView
    );
})();