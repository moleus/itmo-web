import {emptyApi} from "./BaseApiService";
import {User} from "../models/User";

export const userAPI = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<User, User>({
            query: (post) => ({
                url: `user/login`,
                method: 'POST',
                body: post
            }),
        }),
        registerUser: build.mutation<User, User>({
            query: (post) => ({
                url: `user/login`,
                method: 'POST',
                body: post
            }),
        }),
    })
})
