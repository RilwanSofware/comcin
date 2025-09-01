import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Helper to get token from localStorage
const getToken = () => sessionStorage.getItem("token");

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://backend.comcin.com.ng/api/v1",
    prepareHeaders: (headers) => {
      const token = getToken();
      // headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

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
    getAdminUser: builder.query({
      query: ({ page }) => ({
        url: "/admin/admins",
        method: "GET",
        // params: { page },
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/admins`,
        method: "POST",
        body: data,
      }),
    }),
    UpdateAdmin: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/admins/${id}`,
        method: "PUT",
        body: data,
      }),
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
    getAdminContent: builder.query({
      query: () => "/admin/website-content",
    }),
    createContent: builder.mutation({
      query: (data) => ({
        url: `/admin/news`,
        method: "POST",
        body: data,
      }),
    }),
    updateContent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/admin/news/${id}`,
        method: "PUT", // or PATCH depending on your backend
        body: formData,
      }),
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/admin/news/${id}`,
        method: "DELETE",
      }),
    }),
    getContent: builder.query({
      query: () => "/admin/news",
    }),
    getSingleNews: builder.query({
      query: (id) => `/admin/news/${id}`,
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
    // /api/v1/admin/settings/security
    getAdminGeneral: builder.query({
      query: () => `/admin/settings/general`,
    }),
    updateGeneral: builder.mutation({
      query: (data) => ({
        url: `/admin/settings/general`,
        method: "POST",
        body: data,
      }),
    }),

    getAdminSecurity: builder.query({
      query: () => `/admin/settings/security`,
    }),
    updateSecurity: builder.mutation({
      query: (data) => ({
        url: `/admin/settings/security`,
        method: "POST",
        body: data,
      }),
    }),
    getAdminSettingsNotification: builder.query({
      query: () => `/admin/settings/notifications`,
    }),
    updateSettingNotification: builder.mutation({
      query: (data) => ({
        url: `/admin/settings/notifications`,
        method: "POST",
        body: data,
      }),
    }),
    getAdminSettingsAccount: builder.query({
      query: () => `/admin/settings/super-admin`,
    }),
    updateSettingAccount: builder.mutation({
      query: (data) => ({
        url: `/admin/settings/super-admin`,
        method: "POST",
        body: data,
      }),
    }),
    getAdminNotification: builder.query({
      query: ({ user_id }) => `/admin/notifications/${user_id}`,
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
  useGetContentQuery,
  useDeleteContentMutation,
  useUpdateContentMutation,
  useGetAdminTestimonialQuery,
  useGetAdminUserQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useGetAdminGeneralQuery,
  useUpdateGeneralMutation,
  useGetAdminSecurityQuery,
  useUpdateSecurityMutation,
  useGetAdminSettingsNotificationQuery,
  useUpdateSettingNotificationMutation,
  useGetAdminSettingsAccountQuery,
  useUpdateSettingAccountMutation,
  useGetAdminContentQuery,
  useCreateContentMutation,
  useGetAdminNotificationQuery,
  useGetSingleNewsQuery,
} = adminDashboardApi;
