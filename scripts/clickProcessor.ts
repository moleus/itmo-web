import {Vector} from "./Shapes.js";
import {FormManager} from "./FormManager.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {FormProcessor} from "./FormProcessor";

export class ClickProcessor {
    private coordinateNormalizer: CoordinateNormalizer;
    private formProcessor: FormProcessor;

    constructor(
        coordinateNormalizer: CoordinateNormalizer,
        formProcessor: FormProcessor) {
        this.coordinateNormalizer = coordinateNormalizer;
        this.formProcessor = formProcessor;
    }

    public processClick = (event: MouseEvent) => {
        const position = ClickProcessor.getPosition(event);
        const unitR = FormManager.getValueR()
        const normalized = this.coordinateNormalizer.fromPxToUnits(position, unitR);
        this.formProcessor.sendSubmitRequest(normalized.x, normalized.y, unitR)
    }

    private static getPosition(event: MouseEvent): Vector {
        return new Vector(event.offsetX, event.offsetY)
    }
}
