export class NetworkUtil {
    public static throwIfNotOk = (response: Response): Response => {
        if (response.status == 302) {
            const url = response.url;
            window.location.replace(url)
            throw Error("Redirected");
        }
        if (!response.ok) {
            console.error(response.statusText);
            throw Error("Response failed");
        }
        return response;
    }
}