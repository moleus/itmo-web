export class NetworkUtil {
    public static throwIfNotOk = (response: Response): Response => {
        if (!response.ok) throw Error(response.statusText);
        return response;
    }
}