export class RequestProcessor {
    public static makeRequest(path: string, method: string = "GET", body?: BodyInit): Promise<Response> {
        return fetch(path, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body,
            redirect: "follow"
        });
    }
}