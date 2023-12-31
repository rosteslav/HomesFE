import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import notificationMessages from './notificationMessages';

const baseUrl = import.meta.env.VITE_PROPERTIES_API;

const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
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
                        if (args?.[param] && args[param].length > 0) {
                            const data = args[param];
                            return data
                                .map((value) => `&${param}=${encodeURIComponent(value)}`)
                                .join('');
                        }
                        return '';
                    };

                    const buildQueryRangeString = (param) => {
                        if (args?.[param] && args[param].length > 1) {
                            return `&${param}from=${encodeURIComponent(
                                args[param][0]
                            )}&${param}to=${encodeURIComponent(args[param][1])}`;
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
                    const priceQuery = buildQueryRangeString('price');
                    const spaceQuery = buildQueryRangeString('space');
                    const publishedOnQuery = buildQueryString('publishedOn');
                    const orderByQuery = buildQueryString('orderBy');
                    const pageQuery = `&page=${args.page ? args.page : 1}`;
                    let isAscending = args.isAscending ? `&isAscending=${args.isAscending}` : '';

                    const queryString = `${neighbourhoodQuery}${numberOfRoomsQuery}${buildingTypeQuery}${exposureQuery}${finishQuery}${furnishmentQuery}${heatingQuery}${priceQuery}${spaceQuery}${publishedOnQuery}${orderByQuery}${isAscending}${pageQuery}`;

                    return { url: `/properties/all${queryString ? `?${queryString}` : ''}` };
                },
                serializeQueryArgs: ({ queryArgs }) => {
                    return { ...queryArgs, page: 1 };
                },

                merge: (currentCache, newItems) => {
                    if (currentCache != newItems) {
                        currentCache.push(...newItems);
                    }
                },
                forceRefetch({ currentArg, previousArg }) {
                    if (currentArg.page != 1 && currentArg != previousArg) {
                        return true;
                    }
                    return false;
                },
            }),
            fetchOwnProperties: builder.query({
                query: () => ({ url: '/properties' }),
            }),
            fetchRecommendedProperties: builder.query({
                query: () => ({ url: '/properties/recommended' }),
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
                async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
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
                                getState().filter.queryData,
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
                async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
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
                                getState().filter.queryData,
                                (draftData) => {
                                    return draftData?.filter((property) => property?.id !== data);
                                }
                            )
                        );
                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchAllProperties',
                                {
                                    orderBy: ['CreatedOnLocalTime'],
                                    page: 1,
                                },
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
            editPropertyInfo: builder.mutation({
                query: (data) => {
                    return {
                        url: `properties/${data.id}`,
                        method: 'PUT',
                        body: data.data,
                    };
                },
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;

                        const newProperty = data.data;
                        newProperty.id = data.id;
                        newProperty.images = data.oldImages;

                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchOwnProperties',
                                undefined,
                                (draftData) => {
                                    return draftData?.map((property) => {
                                        if (property?.id == data.id) {
                                            property = newProperty;
                                        }
                                        return property;
                                    });
                                }
                            )
                        );
                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchAllProperties',
                                undefined,
                                (draftData) => {
                                    return draftData?.map((property) => {
                                        if (property?.id == data.id) {
                                            property = newProperty;
                                        }
                                        return property;
                                    });
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
    useEditPropertyInfoMutation,
    useFetchRecommendedPropertiesQuery,
} = propertiesApi;
export { propertiesApi };
