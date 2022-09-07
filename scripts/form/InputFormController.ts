import {InputFormView} from "./InputFormView.js";
import {TableView} from "../table/TableView.js";
import {CanvasView} from "../canvas/CanvasView.js";
import {InputFormModel} from "./InputFormModel.js";
import {InputRangeValidator} from "../util/InputRangeValidator.js";

export class InputFormController {
    private inputFormView: InputFormView;
    private tableView: TableView;
    private canvasView: CanvasView;
    private inputFormModel: InputFormModel;

    constructor(inputFormView: InputFormView, inputFormModel: InputFormModel, tableView: TableView, canvasView: CanvasView) {
        this.inputFormView = inputFormView;
        this.inputFormModel = inputFormModel;
        this.tableView = tableView;
        this.canvasView = canvasView;

        this.inputFormView.bindInputX(this.handleInputX);
        this.inputFormView.bindInputY(this.handleInputY);
        this.inputFormView.bindKeyPress(InputFormController.handleKeyPress);
        this.inputFormView.bindSubmit(this.handleSubmit);
        this.inputFormView.bindReset(this.handleReset);

        this.inputFormModel.fetchAllData().then(this.processUpdate);
    }

    private handleInputX = (event: InputEvent) => {
        this.inputFormModel.x = Number(event.data);
    }

    private handleInputY = (trigger: HTMLInputElement) => {
        if (trigger.value.length > trigger.maxLength) trigger.value = trigger.value.slice(0, trigger.maxLength);
        this.inputFormModel.y = trigger.valueAsNumber;
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
        this.tableView.updateTable(respHtml);
        this.tableView.getRows(this.inputFormModel.version).forEach(
            result => this.canvasView.addPoint(result.x, result.y, result.r, result.isHit)
        )
    }

    private validateInput = (): boolean => {
        return InputRangeValidator.validateValues(this.inputFormModel.x, this.inputFormModel.y, this.inputFormModel.r);
    }

    private handleReset = () => {
        this.inputFormModel.resetData();
        this.canvasView.clearCanvas();
        this.tableView.clearTable();
    }
}