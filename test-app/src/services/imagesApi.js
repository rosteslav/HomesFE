import toast from 'react-hot-toast';
import { propertiesApi } from './propertiesApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import notificationMessages from './notificationMessages';

const imagesApi = createApi({
    reducerPath: 'imagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5223',
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
            fetchPropertyImages: builder.query({
                query: (id) => ({ url: `/image/${id}` }),
            }),
            addPropertyImage: builder.mutation({
                query: (arg) => {
                    return {
                        url: `/image?propertyId=${arg.propertyId}`,
                        method: 'POST',
                        body: arg.data,
                    };
                },
                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                    try {
                        const res = await queryFulfilled;

                        dispatch(
                            propertiesApi.util.updateQueryData(
                                'fetchOwnProperties',
                                undefined,
                                (draftData) => {
                                    draftData?.map((property) => {
                                        if (property.id === arg.propertyId) {
                                            property.images.push(res.data.imageURL);
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
                                    draftData?.map((property) => {
                                        if (property.id === arg.propertyId) {
                                            property.images.push(res.data.imageURL);
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
            deletePropertyImage: builder.mutation({
                query: (data) => {
                    return {
                        url: `/image/${data.id}`,
                        method: 'DELETE',
                    };
                },
                async onQueryStarted(args, { dispatch, queryFulfilled }) {
                    await queryFulfilled;

                    dispatch(
                        propertiesApi.util.updateQueryData(
                            'fetchOwnProperties',
                            undefined,
                            (draftData) => {
                                draftData?.map((property) => {
                                    if (property.id === args.propertyId) {
                                        property.images = property.images.filter(
                                            (image) => image !== args.imageURL
                                        );
                                    }
                                    return property;
                                });
                            }
                        )
                    );
                    dispatch(
                        imagesApi.util.updateQueryData(
                            'fetchPropertyImages',
                            args.propertyId.toString(),
                            (draftData) => {
                                const data = draftData?.filter((image) => image.id !== args.id);

                                return data;
                            }
                        )
                    );
                },
            }),
            addUserImage: builder.mutation({
                query: (data) => {
                    return {
                        url: `/userImages`,
                        method: 'POST',
                        body: data,
                    };
                },
            }),
        };
    },
});

export const {
    useAddPropertyImageMutation,
    useFetchPropertyImagesQuery,
    useDeletePropertyImageMutation,
    useAddUserImageMutation,
} = imagesApi;
export { imagesApi };
