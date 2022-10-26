export class RequestProcessor {
    public static prepareBody(x: number, y: number, r: number, version: number): FormData {
        const formData = new FormData();
        formData.append("paramX", x.toFixed(2));
        formData.append("paramY", y.toFixed(2));
        formData.append("paramR", r.toString());
        formData.append("data_version", version.toString());
        return formData;
    }

    public static makeRequest(path: string, method: string = "GET", body?: BodyInit): Promise<Response> {
        return fetch(path, {
            method: method,
            body: body,
            redirect: "follow"
        });
    }
}