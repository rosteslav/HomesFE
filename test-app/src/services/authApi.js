import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../store/features/authUser';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5220',
        prepareHeaders: async (headers, { getState }) => {
            const token = await getState().authUser.data?.token?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
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
            }),
            registerAdmin: builder.mutation({
                query: (body) => {
                    return {
                        url: '/admin/register',
                        method: 'POST',
                        body,
                    };
                },
            }),
            fetchRolesOptions: builder.query({
                query: () => ({ url: '/roles' }),
            }),
            fetchBrokersOptions: builder.query({
                query: () => ({ url: 'authOptions/brokers' }),
            }),
        };
    },
});

export const {
    useLoginMutation,
    useRegisterUserMutation,
    useRegisterAdminMutation,
    useFetchRolesOptionsQuery,
    useFetchBrokersOptionsQuery,
} = authApi;
export { authApi };
