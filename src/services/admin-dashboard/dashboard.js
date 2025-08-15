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
  }),
});

export const {
  useGetDashboardQuery,
  useGetAdminMembershipsQuery,
  useGetAdminInstitutionQuery,
} = adminDashboardApi;
