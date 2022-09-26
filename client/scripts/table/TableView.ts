import {HitResult} from "../util/common";

class FrameContext {
    private frameDocument: Document;

    constructor(frameDocument: Document) {
        this.frameDocument = frameDocument;
    }

    public readonly dataTable = (): HTMLTableElement | null => this.frameDocument.getElementById('result-table') as HTMLTableElement;
    public readonly tableContainer = (): HTMLElement | null => this.frameDocument.getElementById('table-container');
}


export class TableView {
    private frameContext: FrameContext;
    private readonly tableFrame: HTMLIFrameElement;
    private tableElement: HTMLTableElement | null;

    private scrollTimer: NodeJS.Timeout;
    private lastScrollFireTime: number = 0;

    constructor(tableFrame: HTMLIFrameElement) {
        this.tableFrame = tableFrame;
        this.frameContext = new FrameContext(this.tableFrame.contentDocument);
    }

    public countRows = (): number => this.tablePresent() ? this.frameContext.dataTable().rows.length - 1 : 0

    public clearTable() {
        if (this.tablePresent()) {
            this.frameContext.dataTable().querySelectorAll('tbody tr').forEach(tr => tr.remove())
        }
    }

    public updateTable = (tableFrame: string) => {
        //TODO: fix showing undefined
        this.tableFrame.srcdoc = tableFrame;
        // this.scrollToBottom()
    }

    public getRows(fromIndex: number): Array<HitResult> {
        if (!this.tablePresent()) return [];
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
                (isHitRow[i] as HTMLElement).innerText === "true"
            ));
        }
        return valueRows
    }

    private tablePresent = (): boolean => {
        this.tableElement = this.frameContext.dataTable();
        return this.tableElement !== null;
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
        const tableContainer = this.frameContext.tableContainer();
        if (!tableContainer) return;
        tableContainer.animate({scrollTop: tableContainer.scrollHeight}, scrollAnimationMs);
    }
}