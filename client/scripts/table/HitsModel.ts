import {HitCoordinates, HitResult} from "../util/common";
import {RequestProcessor} from "../form/RequestProcessor";
import {NetworkUtil} from "../util/NetworkUtil";
import {ApiPaths} from "../api/ApiPaths";

export class HitsModel {
    public readonly constructingHit: HitCoordinates = new HitCoordinates();

    private hitsStore: Array<HitResult> = [];
    public version = () => this.hitsStore.length;

    reset() {
        this.hitsStore = [];
    }

    /**
     * Send new hit to the server.
     */
    public postHit(): Promise<void> {
        const formData = RequestProcessor.prepareBody(this.constructingHit.x, this.constructingHit.y, this.constructingHit.r, this.version());
        return RequestProcessor.makeRequest(ApiPaths.ADD_HIT, "POST", formData)
            .then(NetworkUtil.throwIfNotOk)
            .then(() => console.log("Hit is sent with success"))
            .catch(reason => console.error(`Sending hit failed [${reason}]`));
    };

    /**
     * Retrieves and returns only new hits, based on current version.
     */
    public getHits(): Promise<Array<HitResult>> {
        return HitsModel.getHitsSlice(this.version())
            .then(NetworkUtil.throwIfNotOk)
            .then(response => response.text().then(hits => this.updateHitsStore(hits)))
    };

    /**
     * Request to delete all hits on server side.
     */
    public sendDeleteHitsRequest() {
        RequestProcessor.makeRequest(ApiPaths.HITS, "DELETE");
    };

    /**
     * Convert json payload to array of hits and append them to the store.
     */
    private updateHitsStore(payload: string): Array<HitResult> {
        const hits = HitsModel.toHitResults(payload);
        this.hitsStore.push(...hits);
        return hits;
    }

    private static getHitsSlice = (version: number = 0): Promise<Response> =>
        RequestProcessor.makeRequest(ApiPaths.HITS + "?" + new URLSearchParams({version: version.toString()}), "GET");

    private static toHitResults = (payload: string): Array<HitResult> => {
        const hits = JSON.parse(payload) as Array<HitResult>;
        return hits ? hits : [];
    }
}