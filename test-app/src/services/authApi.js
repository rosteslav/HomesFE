import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../store/features/authUser';
import { propertiesApi } from './propertiesApi';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5220',
    }),
    endpoints(builder) {
        return {
            login: builder.mutation({
                query: (body) => {
                    return {
                        url: '/login',
                        method: 'POST',
                        body,
                    };
                },
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        const response = await queryFulfilled;
                        console.log(response);
                        dispatch(setUser(response.data));
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            registerUser: builder.mutation({
                query: (body) => {
                    return {
                        url: '/register',
                        method: 'POST',
                        body,
                    };
                },
                // async onQueryStarted(data, { dispatch, queryFulfilled }) {
                //     console.log(data);
                //     try {
                //         await queryFulfilled;
                //         dispatch(
                //             authApi.util.('login', undefined, {
                //                 username: data.username,
                //                 password: data.password,
                //             })
                //         );
                //     } catch (error) {
                //         console.log(error);
                //     }
                // },
            }),
            fetchRolesOptions: builder.query({
                query: () => ({ url: '/roles' }),
            }),
        };
    },
});

export const { useLoginMutation, useFetchRolesOptionsQuery, useRegisterUserMutation } = authApi;
export { authApi };
