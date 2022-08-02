import {FormManager} from "./FormManager.js";
import {Vector} from "./Shapes.js";
import {CanvasDrawer} from "./Drawer.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {FormValidator} from "./FormsValidator.js";

const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const Y_MIN = -3
const Y_MAX = 5;
const R_VALUES = [1, 1.5, 2, 2.5, 3];

export class FormProcessor {
    private readonly canvasDrawer: CanvasDrawer;
    private coordinateNormalizer: CoordinateNormalizer;

    constructor(
        coordinateNormalizer: CoordinateNormalizer,
        canvasDrawer: CanvasDrawer) {
        this.coordinateNormalizer = coordinateNormalizer;
        this.canvasDrawer = canvasDrawer;
    }

    public processSubmit = () => {
        const paramX = FormManager.getValueX()
        const paramY = FormManager.getValueY()
        const paramR = FormManager.getValueR()

        if (!(FormValidator.isInList(paramX, X_VALUES) &&
            FormValidator.isInRange(paramY, Y_MIN, Y_MAX) &&
            FormValidator.isInList(paramR, R_VALUES))) {
            console.error("Some value is missing!")
            return
        }
        this.sendSubmitRequest(paramX, paramY, paramR)
    }

    public sendSubmitRequest = (x: number, y: number, r: number) => {
        let formData = new FormData();
        formData.append("paramX", x.toString());
        formData.append("paramY", y.toString());
        formData.append("paramR", r.toString());
        this.updateTable("php/main.php", formData)
    }

    public resetTable = () => {
        this.updateTable("php/reset_session.php")
        this.canvasDrawer.clearCanvas()
    }

    public initTable = () => {
        this.updateTable("php/get_results.php")
    }

    private updateTable = (scriptName: string, body?: BodyInit) => {
        //TODO: fill table and graph on page reload
        //TODO: reuse POST request code
        // redraw all points on each request
        fetch(scriptName, {
            method: 'POST',
            body: body,
        })
            .then((response) => response.text())
            .then(res => {
                $('#result-table tbody').html(res)
                const rows = $('#result-table tbody tr')
                rows.each((index, _) => {
                    const x: number = +$('.table-x_val')[index].innerText
                    const y: number = +$('.table-y_val')[index].innerText
                    const r: number = +$('.table-r_val')[index].innerText
                    const res: boolean = $('.table-hit_res')[index].innerText == "true"
                    const norm_coords = this.coordinateNormalizer.fromUnitsToPx(new Vector(x, y), r);
                    this.canvasDrawer.drawPoint(norm_coords.x, norm_coords.y, res)
                })
            });
    }
}