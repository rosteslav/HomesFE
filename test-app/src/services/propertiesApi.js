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
                    let querySting = '?';
                    if (args?.neighbourhood && args?.neighbourhood.length > 1) {
                        const data = args.neighbourhood;

                        for (let idx = 1; idx < data.length; idx++) {
                            if (idx === 1) {
                                querySting += `Neighbourhood=${encodeURIComponent(data[idx])}`;
                            } else {
                                querySting += `&Neighbourhood=${encodeURIComponent(data[idx])}`;
                            }
                        }
                    }
                    if (args?.numberOfRooms && args?.numberOfRooms.length > 1) {
                        const data = args.numberOfRooms;
                        for (let idx = 1; idx < data.length; idx++) {
                            if (idx === 1) {
                                if (querySting === '?') {
                                    querySting += `NumberOfRooms=${encodeURIComponent(data[idx])}`;
                                } else {
                                    querySting += `&NumberOfRooms=${encodeURIComponent(data[idx])}`;
                                }
                            } else {
                                querySting += `&NumberOfRooms=${encodeURIComponent(data[idx])}`;
                            }
                        }
                    }
                    if (args?.buildingType && args?.buildingType.length > 1) {
                        const data = args.buildingType;
                        for (let idx = 1; idx < data.length; idx++) {
                            if (idx === 1) {
                                if (querySting === '?') {
                                    querySting += `buildingType=${encodeURIComponent(data[idx])}`;
                                } else {
                                    querySting += `&buildingType=${encodeURIComponent(data[idx])}`;
                                }
                            } else {
                                querySting += `&buildingType=${encodeURIComponent(data[idx])}`;
                            }
                        }
                    }
                    if (args?.exposure && args?.exposure.length > 1) {
                        const data = args.exposure;
                        for (let idx = 1; idx < data.length; idx++) {
                            if (idx === 1) {
                                if (querySting === '?') {
                                    querySting += `exposure=${encodeURIComponent(data[idx])}`;
                                } else {
                                    querySting += `&exposure=${encodeURIComponent(data[idx])}`;
                                }
                            } else {
                                querySting += `&exposure=${encodeURIComponent(data[idx])}`;
                            }
                        }
                    }
                    if (args?.finish && args?.finish.length > 1) {
                        const data = args.finish;
                        for (let idx = 1; idx < data.length; idx++) {
                            if (idx === 1) {
                                if (querySting === '?') {
                                    querySting += `finish=${encodeURIComponent(data[idx])}`;
                                } else {
                                    querySting += `&finish=${encodeURIComponent(data[idx])}`;
                                }
                            } else {
                                querySting += `&finish=${encodeURIComponent(data[idx])}`;
                            }
                        }
                    }
                    if (querySting !== '?') {
                        return { url: `/properties/all${querySting}` };
                    }

                    return { url: `/properties/all` };
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
