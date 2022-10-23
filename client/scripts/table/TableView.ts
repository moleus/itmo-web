import {ElementsContext, HitResult} from "../util/common";
import {TableConverter} from "../util/TableConverter";


export class TableView {
    private readonly tableElement: HTMLTableElement;

    private scrollTimer: NodeJS.Timeout;
    private lastScrollFireTime: number = 0;

    constructor() {
        this.tableElement = ElementsContext.dataTable;
    }
    public clearTable() {
        this.tableElement.querySelectorAll('tbody tr').forEach(tr => tr.remove())
    }

    public updateTable = (newHits: Array<HitResult>) => {
        $('#result-table tbody').append(TableConverter.toHtml(newHits))
        this.scrollToBottom()
    }

    private scrollToBottom = () => {
        let minScrollTime = 500
        let now = new Date().getTime()

        if (!this.scrollTimer) {
            if (now - this.lastScrollFireTime > (3 * minScrollTime)) {
                this.processScroll()  /* immediate scroll */
                this.lastScrollFireTime = now;
            }
            this.scrollTimer = setTimeout(() => {
                this.scrollTimer = undefined;
                this.lastScrollFireTime = new Date().getTime()
                this.processScroll()  /* delayed scroll */
            }, minScrollTime);
        }
    }

    private processScroll = () => {
        const scrollAnimationMs = 400
        const tableContainer = $('#table-container')
        tableContainer.animate({scrollTop: tableContainer.prop('scrollHeight')}, scrollAnimationMs);
    }
}