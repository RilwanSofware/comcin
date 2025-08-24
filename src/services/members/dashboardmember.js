import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => sessionStorage.getItem("token");

export const memberDashboardApi = createApi({
  reducerPath: "memberDashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.comcin.com.ng/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMemberDashboard: builder.query({
      query: () => "/member/dashboard",
    }),
    getMemberDashboardInstitution: builder.query({
      query: () => "/member/institution",
    }),
    getMemberDashboardCert: builder.query({
      query: () => "/member/certificates",
    }),
    getMemberDashboardFinacials: builder.query({
      query: () => "/member/financials",
    }),
    getMemberDashboardNotification: builder.query({
      query: () => "/member/notifications",
    }),
    ReadNotification: builder.mutation({
      query: (data) => ({
        url: "/member/notifications/mark-as-read",
        method: "POST",
        body: data,
      }),
    }),

    getMemberDashboardTickets: builder.query({
      query: () => "/member/support/tickets",
    }),
    getMemberDashboardEditUser: builder.query({
      query: () => "/member/edit-institution",
    }),
    createSupport: builder.mutation({
      query: (data) => ({
        url: "/member/support/tickets",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMemberDashboardQuery,
  useGetMemberDashboardInstitutionQuery,
  useGetMemberDashboardCertQuery,
  useGetMemberDashboardFinacialsQuery,
  useGetMemberDashboardNotificationQuery,
  useGetMemberDashboardTicketsQuery,
  useCreateSupportMutation,
  useGetMemberDashboardEditUserQuery,
  useReadNotificationMutation
} = memberDashboardApi;
