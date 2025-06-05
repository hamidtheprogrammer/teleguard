"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { daysOfWeek, medicalSpecialties } from "@/app/constants";
import { FaMailBulk } from "react-icons/fa";
import { iconStyle } from "@/app/(auth)/forms/sign-in";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitDoctorFormMutation } from "@/app/redux/services/formSubmission";
import { setisLoadingScreenOpen } from "@/app/redux/features/global/globalSlice";

export const inputClassName =
  "border-[1px] focus:ring-1 focus:ring-black rounded-md h-8 p-1";

const doctorSchema = z.object({
  specialty: z.custom(
    (data) => {
      return medicalSpecialties.includes(data);
    },
    { message: "Invalid specialty" }
  ),

  medicalLicenseNumber: z
    .string()
    .min(6, { message: "Invalid license number" }),
  yearsOfExperience: z.coerce.number().min(1, { message: "Invalid input" }),
  currentWorkplace: z.string(),
  description: z.string(),
  availability: z.array(
    z.custom(
      (data) => {
        return daysOfWeek.includes(data);
      },
      { message: "Invalid input" }
    )
  ),
});

export function DoctorForm({
  displaySuccessPage,
}: {
  displaySuccessPage: () => void;
}) {
  const [submitForm, { error, isSuccess, isLoading }] =
    useSubmitDoctorFormMutation();
  // 1. Define your form.
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof doctorSchema>>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      specialty: "",
      medicalLicenseNumber: "",
      yearsOfExperience: 1,
      availability: [],
    },
  });

  const watchAll = watch();
  const dispatch = useDispatch();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof doctorSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const response = await submitForm(values);

    console.log(response);
  }

  useEffect(() => {
    isLoading || isSubmitting
      ? dispatch(setisLoadingScreenOpen(true))
      : dispatch(setisLoadingScreenOpen(false));
  }, [isLoading]);

  useEffect(() => {
    isSuccess && displaySuccessPage;
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.specialty && "text-red-600"}`}>
          Specialty
        </label>
        <select
          className={inputClassName}
          {...register("specialty")}
          name="specialty"
          id=""
        >
          <option value="">Select a specialty</option>
          {medicalSpecialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
        {errors.specialty && (
          <p className="text-red-600 text-xs">
            {errors.specialty.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor=""
          className={`${errors.medicalLicenseNumber && "text-red-600"}`}
        >
          Medical license number
        </label>
        <input
          {...register("medicalLicenseNumber")}
          type="text"
          className={inputClassName}
          placeholder="77466228837"
        />
        {errors.medicalLicenseNumber && (
          <p className="text-red-600 text-xs">
            {errors.medicalLicenseNumber.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor=""
          className={`${errors.yearsOfExperience && "text-red-600"}`}
        >
          Years of experience
        </label>
        <input
          {...register("yearsOfExperience")}
          type="number"
          className={inputClassName}
          placeholder="1"
        />
        {errors.yearsOfExperience && (
          <p className="text-red-600 text-xs">
            {errors.yearsOfExperience.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor=""
          className={`${errors.currentWorkplace && "text-red-600"}`}
        >
          Current Work place
        </label>
        <input
          {...register("currentWorkplace")}
          type="text"
          className={inputClassName}
          placeholder="Any hospital worked at"
        />
        {errors.currentWorkplace && (
          <p className="text-red-600 text-xs">
            {errors.currentWorkplace.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.description && "text-red-600"}`}>
          Description
        </label>
        <textarea
          rows={5}
          cols={10}
          {...register("description")}
          className={`border-[1px] focus:ring-1 focus:ring-black rounded-md p-1`}
          placeholder="A short description of your expertise"
        />
        {errors.description && (
          <p className="text-red-600 text-xs">{errors.description.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor=""
          className={`${errors.availability && "text-red-600"}`}
        >
          Availability slots
        </label>
        <ul className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <li
              className={`relative rounded-full px-4 py-1 ${
                watchAll.availability.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              key={day}
            >
              <input
                {...register("availability")}
                value={day}
                checked={watchAll.availability.includes(day)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                type="checkbox"
              />
              <span>{day}</span>
            </li>
          ))}
        </ul>
        {errors.availability && (
          <p className="text-red-600 text-xs">{errors.availability.message}</p>
        )}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
