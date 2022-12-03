import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    credentials: 'include',
    mode: "cors"
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
    = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result);
    if (result.error) {
        console.error("Error from server. reloading!", result.error);
        window.location.reload()
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
    endpoints: () => ({}),
})
