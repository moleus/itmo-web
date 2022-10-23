import {InputFormView} from "./InputFormView";
import {TableView} from "../table/TableView";
import {Axis2dView} from "../canvas/Axis2dView";
import {InputFormModel} from "./InputFormModel";
import {InputRangeValidator} from "../util/InputRangeValidator";
import {Axis3dView} from "../axis_3d/Axis3dView";
import {HitResult} from "../util/common";
import {HitsModel} from "../table/HitsModel";

export class InputFormController {
    private inputFormView: InputFormView;
    private tableView: TableView;
    private canvasView: Axis2dView;
    private axis3dView: Axis3dView;
    private hitsModel: HitsModel;

    constructor(inputFormView: InputFormView, inputFormModel: InputFormModel, tableView: TableView, canvasView: Axis2dView, axis3dView: Axis3dView, hitsModel: HitsModel) {
        this.inputFormView = inputFormView;
        this.tableView = tableView;
        this.canvasView = canvasView;
        this.axis3dView = axis3dView;
        this.hitsModel = hitsModel;

        this.inputFormView.bindInputX(this.handleInputX);
        this.inputFormView.bindInputY(this.handleInputY);
        this.inputFormView.bindKeyPress(InputFormController.handleKeyPress);
        this.inputFormView.bindSubmit(this.handleSubmit);
        this.inputFormView.bindReset(this.handleReset);

        this.hitsModel.getHits().then(this.updateViews).catch(reason => (`Initial receiving of hits failed [${reason}]`));
    }

    private handleInputX = (event: InputEvent) => {
        this.hitsModel.constructingHit.x = Number(event.data);
    }

    private handleInputY(this: HTMLInputElement) {
        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    }

    private static handleKeyPress(event: KeyboardEvent) {
        const numericSymbol = /[\d.\-+]/
        let isNumeric = numericSymbol.test(event.key);
        if (!isNumeric) {
            event.preventDefault();
        }
    }

    private handleSubmit = () => {
        this.hitsModel.constructingHit.x = this.inputFormView.getX();
        this.hitsModel.constructingHit.y = this.inputFormView.getY();
        this.hitsModel.constructingHit.r = this.inputFormView.getR();
        if (!this.validateInput()) return;
        this.hitsModel.postHit().then(() => this.hitsModel.getHits()
            .then(this.updateViews)
            .catch(reason => console.info(`Submit new hit failed [${reason}]`)))
    }

    private updateViews = (newHits: Array<HitResult>) => {
        this.tableView.updateTable(newHits);
        newHits.forEach(result => {
                this.canvasView.addPoint(result.x, result.y, result.r, result.hit);
                this.axis3dView.addPoint(result.x, result.y, result.r, result.hit);
            }
        )
    }

    private validateInput = (): boolean => {
        return InputRangeValidator.validateValues(this.hitsModel.constructingHit.x, this.hitsModel.constructingHit.y, this.hitsModel.constructingHit.r);
    }

    private handleReset = () => {
        this.hitsModel.sendDeleteHitsRequest();
        this.canvasView.clear();
        this.axis3dView.clear();
        this.hitsModel.reset();
        this.tableView.clearTable();
    }
}