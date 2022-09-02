import {CanvasView} from "./CanvasView.js";
import {InputFormModel} from "./InputFormModel.js";
import {Vector} from "./common.js";
import {InputFormView} from "./InputFormView.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {TableView} from "./TableView.js";

export class CanvasController {
    private canvasView: CanvasView;
    private dataModel: InputFormModel;
    private inputFormView: InputFormView;
    private tableView: TableView;
    private coordinateNormalizer: CoordinateNormalizer;

    constructor(
        coordinateNormalizer: CoordinateNormalizer,
        canvasView: CanvasView,
        inputFormView: InputFormView,
        tableView: TableView,
        canvasModel: InputFormModel) {
        this.tableView = tableView;
        this.coordinateNormalizer = coordinateNormalizer;
        this.canvasView = canvasView;
        this.dataModel = canvasModel;
        this.inputFormView = inputFormView;

        this.canvasView.bindClick(this.handleClick);
    }

    private handleClick = (event: MouseEvent) => {
        const position = getPosition(event);
        const unitR = this.inputFormView.getR();
        const normalized = this.coordinateNormalizer.fromPxToUnits(position, unitR);
        this.dataModel.x = normalized.x;
        this.dataModel.y = normalized.y;
        this.dataModel.r = unitR
        this.dataModel.version = this.tableView.countRows();
        this.dataModel.fetchUpdates().then(
            respHtml => {
                this.tableView.updateTable(respHtml);
                this.tableView.getRows(this.dataModel.version).forEach(
                    result => this.canvasView.addPoint(result.x, result.y, result.r, result.isHit)
                )
            }
        ).catch(reason => console.error("Failed to receive data: ", reason))
    }
}

function getPosition(event: MouseEvent): Vector {
    return new Vector(event.offsetX, event.offsetY)
}
