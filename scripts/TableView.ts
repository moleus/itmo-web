import {ElementsContext, HitResult} from "./common.js";

export class TableView {
    private readonly tableElement: HTMLTableElement;
    private scrollTimer: NodeJS.Timeout;
    private lastScrollFireTime: number = 0;

    constructor() {
        this.tableElement = ElementsContext.dataTable;
    }

    public countRows = (): number => this.tableElement.rows.length - 1;

    public clearTable() {
        this.tableElement.querySelectorAll('tbody tr').forEach(tr => tr.remove())
    }

    public updateTable = (bodyHtml: string) => {
        $('#result-table tbody').append(bodyHtml)
        this.scrollToBottom()
    }

    public getRows(fromIndex: number): Array<HitResult> {
        const valueRows = [];
        const xRow = this.tableElement.querySelectorAll('.table-x_val');
        const yRow = this.tableElement.querySelectorAll('.table-y_val');
        const rRow = this.tableElement.querySelectorAll('.table-r_val');
        const isHitRow = this.tableElement.querySelectorAll('.table-hit_res');

        for (let i = fromIndex; i < this.countRows(); i++) {
            valueRows.push(new HitResult(
                +(xRow[i] as HTMLElement).innerText,
                +(yRow[i] as HTMLElement).innerText,
                +(rRow[i] as HTMLElement).innerText,
                (isHitRow[i] as HTMLElement).innerText == "true"
            ));
        }
        return valueRows
    }

    private scrollToBottom = () => {
        let minScrollTime = 500
        let now = new Date().getTime()

        if (!this.scrollTimer) {
            if (now - this.lastScrollFireTime > (3 * minScrollTime)) {
                TableView.processScroll()  /* immediate scroll */
                this.lastScrollFireTime = now;
            }
            this.scrollTimer = setTimeout(() => {
                this.scrollTimer = undefined;
                this.lastScrollFireTime = new Date().getTime()
                TableView.processScroll()  /* delayed scroll */
            }, minScrollTime);
        }
    }

    private static processScroll() {
        const scrollAnimationMs = 400
        const tableContainer = $('#table-container')
        tableContainer.animate({scrollTop: tableContainer.prop('scrollHeight')}, scrollAnimationMs);
    }
}