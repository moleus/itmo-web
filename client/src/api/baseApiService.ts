import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";
import {deleteCookie} from "../components/util/Util";
import {ResponseTemplate} from "./types/ResponseTemplate";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    credentials: 'include',
    mode: "cors"
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
    = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && !result.meta.request.url.includes("/user/")) {
        console.error("Session expired. Redirecting to login", result.error);
        deleteCookie("JSESSIONID");
        window.location.replace("/login")
        return result;
    }
    const payload = result.data as ResponseTemplate;
    if (payload && !payload.isError) {
        result.data = payload.data;
    }
    return result;
}
export const emptyApi = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Hits'],
    endpoints: () => ({}),
})
