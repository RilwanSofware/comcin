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
  }),
});

export const { useGetMemberDashboardQuery } = memberDashboardApi;
