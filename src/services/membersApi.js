import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-endpoint.com/' }),
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => 'members',
    }),
  }),
})

export const { useGetMembersQuery } = membersApi