export class RequestProcessor {
    public static prepareBody(x: number, y: number, r: number, version: number): FormData {
        const formData = new FormData();
        formData.append("paramX", x.toFixed(2));
        formData.append("paramY", y.toFixed(2));
        formData.append("paramR", r.toString());
        formData.append("data_version", version.toString());
        return formData;
    }

    public static makeRequest(path: string, body?: BodyInit): Promise<string> {
        return fetch(path, {
            method: 'POST',
            body: body,
        }).then((response) => {
            if (response.redirected || response.status == 302) {
                window.location.replace(response.url);
            } else if (response.ok) return response.text();
        })
    }
}