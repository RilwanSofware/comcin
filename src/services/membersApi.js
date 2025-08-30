import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const membersApi = createApi({
  reducerPath: "membersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.comcin.com.ng/api/v1/",
  }),
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => "homepage",
    }),
  }),
});

export const { useGetMembersQuery } = membersApi