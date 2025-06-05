import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_CHAT_API_URL }),
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: "/get-conversations",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetConversationsQuery } = chatsApi;
