import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5221',
        prepareHeaders: async (headers, { getState }) => {
            const token = await getState().auth.data.token?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            fetchAllProperties: builder.query({
                query: () => ({ url: '/properties/all' }),
            }),
            fetchOwnProperties: builder.query({
                query: () => ({ url: '/properties' }),
            }),
        };
    },
});

export const { useFetchAllPropertiesQuery } = propertiesApi;
export { propertiesApi };
