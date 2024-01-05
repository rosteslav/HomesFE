import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import notificationMessages from './notificationMessages';

const baseUrl = import.meta.env.VITE_ADMINS_API;

const adminApi = createApi({
    reducerPath: 'adminApi',
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
            fetchAllReports: builder.query({
                query: () => ({ url: '/reports' }),
            }),
            deleteReportsById: builder.mutation({
                query: (id) => {
                    return {
                        url: `/reports/${id}`,
                        method: 'DELETE',
                    };
                },
                async onQueryStarted(data, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;

                        dispatch(
                            adminApi.util.updateQueryData(
                                'fetchAllReports',
                                undefined,
                                (draftData) => {
                                    // console.log(data);
                                    return draftData?.filter(
                                        (report) => report?.propertyId !== data
                                    );
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

export const { useFetchAllReportsQuery, useDeleteReportsByIdMutation } = adminApi;
export { adminApi };