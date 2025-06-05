import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types/authTypes";
import { OTP, passKeyModalType } from "@/app/types/globalTypes";

interface RESETPASSWORD {
  type: passKeyModalType;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<void, IUser>({
      // Specify the response and request types for better IntelliSense
      query: (userData: IUser) => ({
        url: "/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<void, OTP>({
      query: (otp: OTP) => ({
        url: "/verify-otp",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: otp,
      }),
    }),
    login: builder.mutation<void, IUser>({
      query: (data: IUser) => ({
        url: "/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
    }),
    sendOTP: builder.mutation<void, RESETPASSWORD>({
      query: (data: { type: passKeyModalType }) => ({
        url: "/send-otp",
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
    }),
    verify_auth_token: builder.query<IUser, string>({
      providesTags: () => [{ type: "auth" }],
      query: () => ({
        url: "/verify-token",
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

// Correctly export the auto-generated hooks
export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useSendOTPMutation,
  useLogoutMutation,
  useVerify_auth_tokenQuery,
} = authApi;
