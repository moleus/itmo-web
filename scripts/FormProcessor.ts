import {FormManager} from "./FormManager.js";
import {Vector} from "./Shapes.js";
import {CanvasDrawer} from "./Drawer.js";
import {CoordinateNormalizer} from "./CoordinateNormalizer.js";
import {FormValidator} from "./FormsValidator.js";
import {ElementsContext} from "./common.js";

const X_VALUES = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const Y_MIN = -3
const Y_MAX = 5;
const R_VALUES = [1, 1.5, 2, 2.5, 3];

export class FormProcessor {
    private readonly canvasDrawer: CanvasDrawer;
    private coordinateNormalizer: CoordinateNormalizer;
    private scrollTimer: NodeJS.Timeout;
    private lastScrollFireTime: number = 0;

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
        const next_row_index = FormProcessor.countRows()
        formData.append("paramX", x.toFixed(2));
        formData.append("paramY", y.toFixed(2));
        formData.append("paramR", r.toString());
        formData.append("data_version", next_row_index.toString());
        this.updateTable("php/main.php", formData)
    }

    public resetTable = () => {
        this.updateTable("php/reset_session.php")
        $("#result-table tbody tr").remove();
        this.canvasDrawer.clearCanvas()
    }

    public initTable = () => {
        this.updateTable("php/get_results.php")
    }

    private updateTable = (scriptName: string, body?: BodyInit) => {
        fetch(scriptName, {
            method: 'POST',
            body: body,
        })
            .then((response) => {
                if (!response.ok) throw Error()
                return response.text()
            })
            .then(resp_text => {
                const next_row_idx = FormProcessor.countRows()
                $('#result-table tbody').append(resp_text)
                const total_rows_count = FormProcessor.countRows()
                for (let i = next_row_idx; i < total_rows_count; i++) {
                    const x: number = +$('.table-x_val')[i].innerText
                    const y: number = +$('.table-y_val')[i].innerText
                    const r: number = +$('.table-r_val')[i].innerText
                    const res: boolean = $('.table-hit_res')[i].innerText == "true"
                    const norm_coords = this.coordinateNormalizer.fromUnitsToPx(new Vector(x, y), r);
                    this.canvasDrawer.drawPoint(norm_coords.x, norm_coords.y, res)
                }
            }).catch(() => console.error("Invalid data sent"));
        this.scrollToBottom()
    }

    private static countRows = (): number => ElementsContext.dataTable.rows.length - 1;

    private scrollToBottom = () => {
        let minScrollTime = 500
        let now = new Date().getTime()

        if (!this.scrollTimer) {
            if (now - this.lastScrollFireTime > (3 * minScrollTime)) {
                FormProcessor.processScroll()  /* immediate scroll */
                this.lastScrollFireTime = now;
            }
            this.scrollTimer = setTimeout(() => {
                this.scrollTimer = undefined;
                this.lastScrollFireTime = new Date().getTime()
                FormProcessor.processScroll()  /* delayed scroll */
            }, minScrollTime);
        }
    }

    private static processScroll() {
        const scrollAnimationMs = 400
        const tableContainer = $('#tableContainer')
        tableContainer.animate({scrollTop: tableContainer.prop('scrollHeight')}, scrollAnimationMs);
    }
}