import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// A helper to get the token from localStorage
const getToken = () => localStorage.getItem('token');



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://backend.comcin.com.ng/api/v1',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => 'auth/profile',
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = authApi;
