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
            addPropertyInfo: builder.mutation({
                query: (formData) => {
                    return {
                        url: '/properties',
                        method: 'POST',
                        body: formData,
                    };
                },
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        const { data: id } = await queryFulfilled;
                        data.id = id.id;

                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchOwnProperties',
                                undefined,
                                (draftData) => {
                                    draftData?.push(data);
                                }
                            )
                        );
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
        };
    },
});

export const {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
    useAddPropertyInfoMutation,
} = propertiesApi;
export { propertiesApi };