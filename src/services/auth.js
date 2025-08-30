import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// A helper to get the token from localStorage
const getToken = () => sessionStorage.getItem("token");

export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
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
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    VerifyAccount: builder.query({
      query: ({ user_uuid, otp }) => ({
        url: `/verify-email/${user_uuid}/${otp}`,
        method: "GET",
      }),
    }),

    getProfile: builder.query({
      query: () => "auth/profile",
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useCreateAccountMutation,
  useLazyVerifyAccountQuery,
} = authApi;
