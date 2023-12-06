import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import notificationMessages from './notificationMessages';

const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5221',
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
            fetchAllProperties: builder.query({
                query: (args) => {
                    const buildQueryString = (param) => {
                        if (args?.[param] && args[param].length > 1) {
                            const data = args[param].slice(1);
                            return data
                                .map((value) => `&${param}=${encodeURIComponent(value)}`)
                                .join('');
                        }
                        return '';
                    };

                    const neighbourhoodQuery = buildQueryString('neighbourhood');
                    const numberOfRoomsQuery = buildQueryString('numberOfRooms');
                    const buildingTypeQuery = buildQueryString('buildingType');
                    const exposureQuery = buildQueryString('exposure');
                    const finishQuery = buildQueryString('finish');
                    const furnishmentQuery = buildQueryString('furnishment');
                    const heatingQuery = buildQueryString('heating');

                    const queryString = `${neighbourhoodQuery}${numberOfRoomsQuery}${buildingTypeQuery}${exposureQuery}${finishQuery}${furnishmentQuery}${heatingQuery}`;

                    return { url: `/properties/all${queryString ? `?${queryString}` : ''}` };
                },
            }),
            fetchOwnProperties: builder.query({
                query: () => ({ url: '/properties' }),
            }),
            fetchPropertyOptions: builder.query({
                query: () => ({ url: '/propertyOptions' }),
            }),
            fetchPropertiesFilterOptions: builder.query({
                query: () => ({ url: '/propertyOptions/filter' }),
            }),
            fetchPropertyById: builder.query({
                query: (id) => ({ url: `/properties/${id}` }),
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
                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchAllProperties',
                                undefined,
                                (draftData) => {
                                    draftData?.push(data);
                                }
                            )
                        );
                    } catch (error) {
                        toast.error(notificationMessages(error?.error?.status));
                    }
                },
            }),
            deleteOwnProperty: builder.mutation({
                query: (id) => {
                    return {
                        url: `/properties/${id}`,
                        method: 'DELETE',
                    };
                },
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;

                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchOwnProperties',
                                undefined,
                                (draftData) => {
                                    return draftData?.filter((property) => property?.id !== data);
                                }
                            )
                        );
                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchAllProperties',
                                undefined,
                                (draftData) => {
                                    return draftData?.filter((property) => property?.id !== data);
                                }
                            )
                        );
                    } catch (error) {
                        toast.error(notificationMessages(error?.error?.status));
                    }
                },
            }),
        };
    },
});

export const {
    useFetchAllPropertiesQuery,
    useFetchOwnPropertiesQuery,
    useFetchPropertyOptionsQuery,
    useFetchPropertiesFilterOptionsQuery,
    useFetchPropertyByIdQuery,
    useAddPropertyInfoMutation,
    useDeleteOwnPropertyMutation,
} = propertiesApi;
export { propertiesApi };
