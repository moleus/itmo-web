import {emptyApi} from "./baseApiService";
import {User, Username} from "./types/User";

export const userAPI = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<Username, User>({
            query: (post) => ({
                url: `user/login`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Hits']
        }),
        registerUser: build.mutation<Username, User>({
            query: (post) => ({
                url: `user/register`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Hits']
        }),
        logoutUser: build.mutation<void, void>({
            query: () => ({
                url: `user/logout`,
                method: 'HEAD',
            }),
        })
    })
})
