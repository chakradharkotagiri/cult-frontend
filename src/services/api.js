import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {API_URL} from '../config'

export const api = createApi({

    reducerPath : 'api',

    baseQuery: fetchBaseQuery({
        baseUrl : `${API_URL}/api`,

        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('token');

            if(token){
        headers.set('Authorization', `Bearer ${token}`);

            }
            return headers;
        },


    }),

    tagTypes: ['Post','User'],

    endpoints:(builder) =>({

        getPosts: builder.query({
            query :() => '/posts',

            providesTags: ['Post'],
        }),
        getUsers: builder.query({
            query:()=> '/users',

            providesTags:['User'],
        }),
        getUserPosts: builder.query({
            query:(userId)=>`/posts/user/${userId}`,

            providesTags: ['Post'],
        }),

    }),

});

export const {
    useGetPostsQuery,
    useGetUsersQuery,
    useGetUserPostsQuery,
} = api;