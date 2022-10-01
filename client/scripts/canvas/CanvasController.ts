import {Axis2dView} from "./Axis2dView";
import {InputFormModel} from "../form/InputFormModel";
import {HitResult, Vector} from "../util/common";
import {InputFormView} from "../form/InputFormView";
import {CoordinateNormalizer} from "./CoordinateNormalizer";
import {TableView} from "../table/TableView";
import {Axis3dView} from "../axis_3d/Axis3dView";
import {ModeSwitcherView} from "./ModeSwitcherView";

export class CanvasController {
    private readonly axis2dView: Axis2dView;
    private readonly dataModel: InputFormModel;
    private readonly inputFormView: InputFormView;
    private readonly tableView: TableView;
    private readonly modeSwitcherView: ModeSwitcherView;
    private readonly axis3dView: Axis3dView;
    private readonly coordinateNormalizer: CoordinateNormalizer;

    constructor(
        coordinateNormalizer: CoordinateNormalizer,
        canvasView: Axis2dView,
        inputFormView: InputFormView,
        tableView: TableView,
        axis3dView: Axis3dView,
        modeSwitcherView: ModeSwitcherView,
        canvasModel: InputFormModel) {
        this.tableView = tableView;
        this.coordinateNormalizer = coordinateNormalizer;
        this.axis2dView = canvasView;
        this.dataModel = canvasModel;
        this.inputFormView = inputFormView;
        this.axis3dView = axis3dView;
        this.modeSwitcherView = modeSwitcherView;

        this.axis2dView.bindClick(this.handleMouseClick);
        this.axis3dView.bindClick(this.handle3dClick);
        this.modeSwitcherView.bindToggle(this.onCanvasSwitch);
    }

    private handleMouseClick = (event: MouseEvent) => {
        const position = getPosition(event);
        const unitR = this.inputFormView.getR();
        const normalized = this.coordinateNormalizer.fromPxToUnits(position, unitR);
        this.sendCoordinates(normalized, unitR, result => {
                this.axis2dView.addPoint(result.x, result.y, result.r, result.isHit)
                this.axis3dView.addPoint(result.x, result.y, result.r, result.isHit);
            }
        );
    }

    private handle3dClick = (x: number, y: number) => {
        const fixed_r = 1;
        this.sendCoordinates(new Vector(x, y), fixed_r, result => {
            this.axis2dView.addPoint(result.x, result.y, result.r, result.isHit)
        });
    }

    private sendCoordinates(coordinates: Vector, unitR: number, onResult: (result: HitResult) => void) {
        this.dataModel.x = coordinates.x;
        this.dataModel.y = coordinates.y;
        this.dataModel.r = unitR
        this.dataModel.version = this.tableView.countRows();
        this.dataModel.fetchUpdates().then(
            respHtml => {
                this.tableView.updateTable(respHtml).then(_ =>
                    this.tableView.getRows(this.dataModel.version).forEach(onResult)
                );
            }
        ).catch(reason => console.error("Failed to receive data: ", reason))
    }

    onCanvasSwitch = (isChecked: boolean) => {
        if (isChecked) {
            this.axis2dView.hide();
            this.axis3dView.display();
        } else {
            this.axis3dView.hide();
            this.axis2dView.display();
        }
    }
}

function getPosition(event: MouseEvent): Vector {
    return new Vector(event.offsetX, event.offsetY)
}