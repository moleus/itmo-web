import {ElementsContext} from "./common.js";

export const FormManager = {
    getValueX(): number {
        return Number(ElementsContext.inputX.value)
    },

    getValueY(): number {
       return ElementsContext.inputY.valueAsNumber
    },

    /**
     * Returns R value of a first checked checkbox.
     * Returns NaN if nothing selected, or value can't be converted to a number
     */
    getValueR(): number {
        // TODO: fix a bug
        for (const checkBox of Array.from(ElementsContext.checkboxesR)) {
            if (checkBox.checked) return parseFloat(checkBox.value);
        }
        return NaN
    }
}