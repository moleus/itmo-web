import {ElementsContext} from "../util/common.js";

export class InputFormView {
    private readonly inputX: HTMLSelectElement;
    private readonly inputY: HTMLInputElement;
    private readonly checkboxesR: NodeListOf<HTMLInputElement>;

    private readonly numericInput: NodeListOf<Element>;
    private submitButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;

    constructor() {
        this.inputX = ElementsContext.inputX;
        this.inputY = ElementsContext.inputY;
        this.checkboxesR = ElementsContext.checkboxesR
        this.submitButton = ElementsContext.submitButton;
        this.resetButton = ElementsContext.resetButton;

        this.numericInput = document.querySelectorAll('.numeric-input');
    }

    public bindInputX = (handler: (this: HTMLSelectElement, ev: Event) => void) => {
        this.inputX.addEventListener('input', handler);
    }

    public bindInputY = (handler: (this: HTMLInputElement, ev: Event) => void) => {
        this.inputY.addEventListener('input', handler);
    }

    public getX(): number {
        return Number(this.inputX.value);
    }

    public getY(): number {
        return this.inputY.valueAsNumber;
    }

    public getR(): number {
        for (const checkBox of Array.from(this.checkboxesR)) {
            if (checkBox.checked) return parseFloat(checkBox.value);
        }
        return NaN
    }

    public bindKeyPress = (handler) => {
        this.numericInput.forEach((input) => {
            input.addEventListener('keypress', handler);
        });
    }

    public bindSubmit = (handler) => {
        this.submitButton.onclick = handler;
    }

    public bindReset = (handler) => {
        this.resetButton.onclick = handler;
    }
}
