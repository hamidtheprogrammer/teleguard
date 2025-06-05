import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AppointmentPayload,
  UpdateAppointmentPayload,
} from "../../types/appointmentTypes";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APPOTINMENT_API_URL,
  }),
  endpoints: (builder) => ({
    createAppointment: builder.mutation<void, AppointmentPayload>({
      // Specify the response and request types for better IntelliSense
      query: (appointmentData: AppointmentPayload) => ({
        url: "/create-appointment",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: appointmentData,
      }),
    }),

    getAppointments: builder.query({
      query: () => ({
        url: "/get-appointments",
        credentials: "include",
      }),
    }),

    updateAppointment: builder.mutation<void, UpdateAppointmentPayload>({
      query: (appointmentData: UpdateAppointmentPayload) => ({
        url: `/update-appointment/${appointmentData.id}`,
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: appointmentData,
      }),
    }),
  }),
});

// Correctly export the auto-generated hooks
export const {
  useCreateAppointmentMutation,
  useGetAppointmentsQuery,
  useUpdateAppointmentMutation,
} = appointmentApi;
//
