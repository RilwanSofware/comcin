import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token from localStorage
const getToken = () => sessionStorage.getItem("token");

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.comcin.com.ng/api/v1",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // /api/v1/admin/memberships
    getDashboard: builder.query({
      query: () => "/admin/dashboard",
    }),
    getAdminMemberships: builder.query({
      query: () => "/admin/memberships",
    }),
    getAdminInstitution: builder.query({
      query: () => "/admin/institutions",
    }),
    getAdminSupport: builder.query({
      query: () => "/admin/support-tickets",
    }),
    approveRequestSuport: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/admin/support-tickets/${user_id}/action`,
        method: "POST",
        body: data,
      }),
    }),


     getAdminTestimonial: builder.query({
      query: () => "/admin/testimonials",
    }),
    // approveRequestSuport: builder.mutation({
    //   query: ({ user_id, data }) => ({
    //     url: `/admin/support-tickets/${user_id}/action`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),


// /api/v1/admin/members

    getAdminSingleApplication: builder.query({
      query: ({ user_id }) => `/admin/applications/${user_id}`,
    }),
    approveRequest: builder.mutation({
      query: ({ user_id, data }) => ({
        url: `/admin/applications/${user_id}/action`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetAdminMembershipsQuery,
  useGetAdminInstitutionQuery,
  useGetAdminSingleApplicationQuery,
  useApproveRequestMutation,
  useApproveRequestSuportMutation,
  useGetAdminSupportQuery,
  useGetAdminTestimonialQuery
} = adminDashboardApi;
