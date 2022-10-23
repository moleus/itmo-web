import {CoordinateNormalizer} from "./canvas/CoordinateNormalizer";
import {CanvasController} from "./canvas/CanvasController";
import {Axis2dView} from "./canvas/Axis2dView";
import {InputFormView} from "./form/InputFormView";
import {TableView} from "./table/TableView";
import {InputFormModel} from "./form/InputFormModel";
import {InputFormController} from "./form/InputFormController";
import {Axis3dView} from "./axis_3d/Axis3dView";
import {ModeSwitcherView} from "./canvas/ModeSwitcherView";
import {HitsModel} from "./table/HitsModel";

(() => {
    const imageSizePx = 300
    const numberOfIntervals = 3

    const coordinateNormalizer = new CoordinateNormalizer(imageSizePx, numberOfIntervals);
    const inputFormView = new InputFormView();
    const tableView = new TableView();
    const canvasView = new Axis2dView(imageSizePx, coordinateNormalizer);
    const axis3dView = new Axis3dView();
    const modeSwitcherView = new ModeSwitcherView();

    const inputFormModel = new InputFormModel();
    const hitsModel = new HitsModel();

    new CanvasController(
        coordinateNormalizer,
        canvasView,
        inputFormView,
        tableView,
        axis3dView,
        modeSwitcherView,
        hitsModel
    );
    new InputFormController(
        inputFormView,
        inputFormModel,
        tableView,
        canvasView,
        axis3dView,
        hitsModel
    );
})();