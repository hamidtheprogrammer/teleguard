import { IUser } from "@/app/types/authTypes";
import { GetUserType, IUserInfo } from "@/app/types/userTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUserType, string>({
      query: (params: string) => ({
        url: `/get-all-users?${params}`,
        credentials: "include",
        provideTags: ["users"],
      }),
    }),
    getUserById: builder.query<IUserInfo, String>({
      query: (id: String) => ({
        url: `/getUserById/${id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersApi;
