import {Axis2dView} from "./Axis2dView";
import {HitResult, Vector} from "../util/common";
import {InputFormView} from "../form/InputFormView";
import {CoordinateNormalizer} from "./CoordinateNormalizer";
import {TableView} from "../table/TableView";
import {Axis3dView} from "../axis_3d/Axis3dView";
import {ModeSwitcherView} from "./ModeSwitcherView";
import {HitsModel} from "../table/HitsModel";

export class CanvasController {
    private readonly axis2dView: Axis2dView;
    private readonly inputFormView: InputFormView;
    private readonly tableView: TableView;
    private readonly modeSwitcherView: ModeSwitcherView;
    private readonly axis3dView: Axis3dView;
    private readonly coordinateNormalizer: CoordinateNormalizer;
    private hitsModel: HitsModel;

    constructor(
        coordinateNormalizer: CoordinateNormalizer,
        canvasView: Axis2dView,
        inputFormView: InputFormView,
        tableView: TableView,
        axis3dView: Axis3dView,
        modeSwitcherView: ModeSwitcherView,
        hitsModel: HitsModel) {
        this.tableView = tableView;
        this.coordinateNormalizer = coordinateNormalizer;
        this.axis2dView = canvasView;
        this.hitsModel = hitsModel;
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
        this.sendCoordinates(normalized, unitR).then(results => this.updateViews(results));
    }

    private handle3dClick = (x: number, y: number) => {
        const fixed_r = 1;
        this.sendCoordinates(new Vector(x, y), fixed_r).then(results => this.updateViews(results, true));
    }

    private sendCoordinates(coordinates: Vector, unitR: number): Promise<Array<HitResult>> {
        this.hitsModel.constructingHit.x = coordinates.x;
        this.hitsModel.constructingHit.y = coordinates.y;
        this.hitsModel.constructingHit.r = unitR
        return this.hitsModel.postHit().then(() => this.hitsModel.getHits())
    }

    private updateViews = (newHits: Array<HitResult>, isFrom3d: boolean = false) => {
        this.tableView.updateTable(newHits);
        newHits.forEach(result => {
                this.axis2dView.addPoint(result.x, result.y, result.r, result.hit);
                if (isFrom3d) return;
                this.axis3dView.addPoint(result.x, result.y, result.r, result.hit);
            }
        )
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