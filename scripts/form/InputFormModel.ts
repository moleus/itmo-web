import {RequestProcessor} from "./RequestProcessor";

export class InputFormModel {
    public x: number;
    public y: number;
    public r: number;
    public version: number = 0;

    constructor() {}

    public setVersion(version: number) {
        this.version = version;
    }

    public fetchUpdates(): Promise<string> {
        const formData = RequestProcessor.prepareBody(this.x, this.y, this.r, this.version);
        return RequestProcessor.makeRequest("../php/main.php", formData);
    };

    public fetchAllData(): Promise<string> {
        return RequestProcessor.makeRequest("../php/get_results.php");
    };

    public resetData() {
        RequestProcessor.makeRequest("../php/reset_session.php");
    };
}