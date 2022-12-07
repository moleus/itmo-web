import {HitResult} from './types/HitResult'
import {emptyApi} from "./baseApiService";
import {HitQuery} from "./types/HitQuery";

export const hitAPI = emptyApi.injectEndpoints({
    endpoints: (build) => ({
        fetchAllHits: build.query<HitResult[], void>({
            query: () => ({
                url: `/hits`,
            }),
            providesTags: ['Hits']
        }),
        createHit: build.mutation<void, HitQuery>({
            query: (post) => ({
                url: `/hits/add`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Hits'],
        }),
        deleteAllHits: build.mutation<void, void>({
            query: () => ({
                url: `/hits`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Hits'],
        }),
    })
})