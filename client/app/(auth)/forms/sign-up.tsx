"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomFormField from "@/components/ui/CustomFormField";
import { CustomFormFieldType } from "@/app/types/formTypes";
import { regSchema } from "@/lib/validation";
import { FaPhone, FaTypo3, FaUser } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/redux/store";
import {
  authPageChange,
  setisLoadingScreenOpen,
  setPasskeyModal,
} from "@/app/redux/features/global/globalSlice";
import { authPageType, passKeyModalType } from "@/app/types/globalTypes";
import { useRegisterMutation } from "@/app/redux/services/auth";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    "status" in error
  );
}

const iconStyle: string =
  "stroke-black stroke-2 fill-transparent absolute inset-0 top-1/2 -translate-y-1/2 left-2";

const SignUpWrapper = () => {
  return (
    <Provider store={store}>
      <SignUp />
    </Provider>
  );
};

export function SignUp() {
  const dispatch = useDispatch();
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof regSchema>>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof regSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const response = await register(values).unwrap();
      console.log(response);

      // Handle successful registration
    } catch (err) {
      // Handle error
      console.log(err);
    }
  }

  useEffect(() => {
    const watchData = form.watch();
    if (error && isFetchBaseQueryError(error)) {
      for (const [key, values] of Object.entries(error.data!)) {
        if (Object.keys(watchData).includes(key)) {
          form.setError(key as keyof typeof watchData, {
            type: "manual",
            message: values as string,
          });
        }
      }
    }
  }, [error]);

  useEffect(() => {
    isLoading
      ? dispatch(setisLoadingScreenOpen(true))
      : dispatch(setisLoadingScreenOpen(false));
  }, [isLoading]);

  useEffect(() => {
    isSuccess &&
      dispatch(
        setPasskeyModal({ isOpen: true, type: passKeyModalType.verify })
      );
  }, [isSuccess]);

  return (
    <div className="relative w-[80%] left-1/2 -translate-x-1/2">
      <Form {...form}>
        <div className="space-y-3 mb-5">
          <h1 className="font-bold">Welcome to TeleGuard!</h1>
          <p className="text-xs">
            Create an account to access our secure telehealth services and
            connect with your healthcare team.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            name="username"
            control={form.control}
            label="Username"
            type={CustomFormFieldType.INPUT}
            placeholder="username"
          >
            <FaUser className={iconStyle} size={20} />
          </CustomFormField>
          <CustomFormField
            name="email"
            control={form.control}
            label="Email"
            type={CustomFormFieldType.INPUT}
            placeholder="user@gmail.com"
          >
            <FaMailBulk className={iconStyle} size={20} />
          </CustomFormField>
          <CustomFormField
            name="password"
            control={form.control}
            label="Password"
            type={CustomFormFieldType.INPUT}
            placeholder="uf87t6br67xc2x"
          >
            <FaTypo3 className={iconStyle} size={20} />
          </CustomFormField>
          <CustomFormField
            name="phone"
            control={form.control}
            label="Phone number"
            type={CustomFormFieldType.PHONE}
            placeholder="-0000"
          />
          <div className="flex items-baseline gap-4">
            <Button type="submit">Submit</Button>
            <button
              onClick={() => dispatch(authPageChange(authPageType.signIN))}
              type="button"
              className="text-blue-700 underline text-xs"
            >
              Login
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignUpWrapper;
