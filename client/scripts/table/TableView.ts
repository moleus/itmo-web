import {HitResult} from "../util/common";

class FrameContext {
    private frame: HTMLIFrameElement

    constructor(frame: HTMLIFrameElement) {
        this.frame = frame;
    }

    public readonly dataTable = (): HTMLTableElement | null => this.getDoc().getElementById('result-table') as HTMLTableElement;
    public readonly tableContainer = (): HTMLElement | null => this.getDoc().getElementById('table-container');
    private readonly getDoc = (): Document => this.frame.contentDocument;
}


export class TableView {
    private frameContext: FrameContext;
    private readonly tableFrame: HTMLIFrameElement;
    private scrollTimer: NodeJS.Timeout;
    private lastScrollFireTime: number = 0;

    constructor(tableFrame: HTMLIFrameElement) {
        this.tableFrame = tableFrame;
        this.frameContext = new FrameContext(this.tableFrame);
    }

    public countRows = (): number => this.tablePresent() ? this.frameContext.dataTable().rows.length - 1 : 0

    public clearTable() {
        if (this.tablePresent()) {
            this.frameContext.dataTable().querySelectorAll('tbody tr').forEach(tr => tr.remove())
        }
    }

    public updateTable = (tableFrame: string) => {
        if (tableFrame === undefined || tableFrame === "") return;
        this.tableFrame.srcdoc = tableFrame;
        return new Promise((resolve) => {
            this.tableFrame.onload = (ev: Event) => {
                resolve(ev);
                this.scrollToBottom();
            };
        });
    }

    public getRows = (fromIndex: number): Array<HitResult> => {
        if (!this.tablePresent()) return [];
        const valueRows = [];
        const xRow = this.frameContext.dataTable().getElementsByClassName('.table-x_val');
        const yRow = this.frameContext.dataTable().getElementsByClassName('.table-y_val');
        const rRow = this.frameContext.dataTable().getElementsByClassName('.table-r_val');
        const isHitRow = this.frameContext.dataTable().getElementsByClassName('.table-hit_res');

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
        return Boolean(this.frameContext.dataTable());
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