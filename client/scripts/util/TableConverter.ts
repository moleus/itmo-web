import {HitResult} from "./common";

export class TableConverter {
    public static toHtml(hits: Array<HitResult>): string {
        return hits.map(
           hit => `<tr>
                <td>${hit.x}</td>
                <td>${hit.y}</td>
                <td>${hit.r}</td>
                <td>${hit.hit}</td>
                <td>${hit.hitTime}</td>
                <td>${hit.executionTimeMicros}</td>
                </tr>`
        ).join("");
    }
}