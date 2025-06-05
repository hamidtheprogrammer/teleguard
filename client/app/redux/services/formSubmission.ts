import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formSubmissionApi = createApi({
  reducerPath: "formSubmissionApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_EMR_API_URL }),
  endpoints: (builder) => ({
    submitDoctorForm: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/doctor-registration`,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSubmitDoctorFormMutation } = formSubmissionApi;
