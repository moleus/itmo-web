import {InputFormView} from "./InputFormView";
import {TableView} from "../table/TableView";
import {Axis2dView} from "../canvas/Axis2dView";
import {InputFormModel} from "./InputFormModel";
import {InputRangeValidator} from "../util/InputRangeValidator";
import {Axis3dView} from "../axis_3d/Axis3dView";

export class InputFormController {
    private inputFormView: InputFormView;
    private tableView: TableView;
    private canvasView: Axis2dView;
    private inputFormModel: InputFormModel;
    private axis3dView: Axis3dView;

    constructor(inputFormView: InputFormView, inputFormModel: InputFormModel, tableView: TableView, canvasView: Axis2dView, axis3dView: Axis3dView) {
        this.inputFormView = inputFormView;
        this.inputFormModel = inputFormModel;
        this.tableView = tableView;
        this.canvasView = canvasView;
        this.axis3dView = axis3dView;

        this.inputFormView.bindInputX(this.handleInputX);
        this.inputFormView.bindInputY(this.handleInputY);
        this.inputFormView.bindKeyPress(InputFormController.handleKeyPress);
        this.inputFormView.bindSubmit(this.handleSubmit);
        this.inputFormView.bindReset(this.handleReset);

        // this.inputFormModel.fetchAllData().then(this.processUpdate);
    }

    private handleInputX = (event: InputEvent) => {
        this.inputFormModel.x = Number(event.data);
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
        this.inputFormModel.x = this.inputFormView.getX();
        this.inputFormModel.y = this.inputFormView.getY();
        this.inputFormModel.r = this.inputFormView.getR();
        this.inputFormModel.setVersion(this.tableView.countRows());
        if (!this.validateInput()) return;
        this.inputFormModel.fetchUpdates().then(this.processUpdate).catch(reason => console.error("Failed to receive data: ", reason));
    }

    private processUpdate = (respHtml: string) => {
        this.tableView.updateTable(respHtml).then(_ =>
            this.tableView.getRows(this.inputFormModel.version).forEach(
                result => {
                    this.canvasView.addPoint(result.x, result.y, result.r, result.isHit);
                    this.axis3dView.addPoint(result.x, result.y, result.r, result.isHit);
                }
            )
        );
    }

    private validateInput = (): boolean => {
        return InputRangeValidator.validateValues(this.inputFormModel.x, this.inputFormModel.y, this.inputFormModel.r);
    }

    private handleReset = () => {
        this.inputFormModel.resetData();
        this.canvasView.clear();
        this.axis3dView.clear();
        this.tableView.clearTable();
    }
}