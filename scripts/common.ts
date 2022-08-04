export const ElementsContext = {
    canvas: document.getElementById('axis-canvas') as HTMLCanvasElement,
    inputX: document.getElementById('x-input') as HTMLSelectElement,
    inputY: document.getElementById('y-input') as HTMLInputElement,
    checkboxesR: document.getElementsByName('paramR') as NodeListOf<HTMLInputElement>,
    submitButton: document.getElementById('submit') as HTMLButtonElement,
    resetButton: document.getElementById('reset') as HTMLButtonElement,
    inputForm: document.getElementById('input-form') as HTMLFormElement
}
