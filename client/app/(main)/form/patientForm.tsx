"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { inputClassName } from "./DoctorForm";
import { useEffect } from "react";

enum gender {
  MALE = "male",
  FEMALE = "female",
}

export const patientSchema = z.object({
  gender: z.custom(
    (data) => {
      return data === gender.MALE || data === gender.FEMALE;
    },
    { message: "Invalid gender input" }
  ),
  dob: z.date({ message: "Invalid input" }),
  address: z.string().min(1, { message: "required" }),
  ethnicity: z.string().min(1, { message: "required" }),
  language: z.string().min(1, { message: "required" }),
  insurance: z.string().min(1, { message: "required" }),
});

const iconStyle: string =
  "stroke-black stroke-2 fill-transparent absolute inset-0 top-1/2 -translate-y-1/2 left-2";

export default function PatientForm() {
  // 1. Define your form.
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof patientSchema>>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      gender: "",
      dob: new Date(Date.now()),
      address: "",
      ethnicity: "",
      language: "",
      insurance: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = (data: z.infer<typeof patientSchema>) => {
    console.log(data);
  };

  const watchAll = watch();
  useEffect(() => {
    console.log(watchAll);
  }, [watchAll]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.gender && "text-red-600"}`}>
          Gender
        </label>
        <select
          className={inputClassName}
          {...register("gender")}
          name="gender"
          id=""
        >
          <option value="">select your gender</option>
          <option value={gender.FEMALE}>{gender.FEMALE}</option>
          <option value={gender.MALE}>{gender.MALE}</option>
        </select>
        {errors.gender && (
          <p className="text-red-600 text-xs">
            {errors.gender.message as string}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.gender && "text-red-600"}`}>
          Date of birth
        </label>
        <input className={inputClassName} {...register("dob")} type="date" />
        {errors.dob && (
          <p className="text-red-600 text-xs">{errors.dob.message as string}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.address && "text-red-600"}`}>
          Address
        </label>
        <input
          {...register("address")}
          type="text"
          className={inputClassName}
          placeholder="Your Address"
        />
        {errors.address && (
          <p className="text-red-600 text-xs">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.ethnicity && "text-red-600"}`}>
          Ethnicity
        </label>
        <input
          {...register("ethnicity")}
          type="text"
          className={inputClassName}
          placeholder="Your ethnicity"
        />
        {errors.ethnicity && (
          <p className="text-red-600 text-xs">{errors.ethnicity.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.language && "text-red-600"}`}>
          Language
        </label>
        <input
          {...register("language")}
          type="text"
          className={inputClassName}
          placeholder="Your language"
        />
        {errors.language && (
          <p className="text-red-600 text-xs">{errors.language.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className={`${errors.insurance && "text-red-600"}`}>
          Health insurance
        </label>
        <input
          {...register("insurance")}
          type="text"
          className={inputClassName}
          placeholder="77466228837"
        />
        {errors.insurance && (
          <p className="text-red-600 text-xs">{errors.insurance.message}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
