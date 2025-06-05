"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomFormField from "@/components/ui/CustomFormField";
import { CustomFormFieldType } from "@/app/types/formTypes";
import { loginSchema } from "@/lib/validation";
import { FaMailBulk, FaPhone, FaTypo3, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  authPageChange,
  setisLoadingScreenOpen,
  setPasskeyModal,
} from "@/app/redux/features/global/globalSlice";
import { authPageType, passKeyModalType } from "@/app/types/globalTypes";
import { useSendOTPMutation } from "@/app/redux/services/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isFetchBaseQueryError } from "./sign-up";
import { setNewPasswordPlaceHolder } from "@/app/redux/features/auth/authSlice";

const iconStyle: string =
  "stroke-black stroke-2 fill-transparent absolute inset-0 top-1/2 -translate-y-1/2 left-2";

function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [sendOTP, { isLoading, error, isSuccess }] = useSendOTPMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  const watchData = form.watch();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const response = await sendOTP({
        type: passKeyModalType.password,
      }).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setPasskeyModal({ isOpen: true, type: passKeyModalType.password })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    isLoading
      ? dispatch(setisLoadingScreenOpen(true))
      : dispatch(setisLoadingScreenOpen(false));
  }, [isLoading]);

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
    dispatch(
      setNewPasswordPlaceHolder({
        newPassword: watchData.password,
        email: watchData.email,
      })
    );
  }, [watchData]);

  return (
    <div className="relative w-[80%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <Form {...form}>
        <div className="space-y-3 mb-5">
          <h1 className="font-bold">Forgot password</h1>
          <p className="text-xs">
            Please. Enter your email and new password below.
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            label="New Password"
            type={CustomFormFieldType.INPUT}
            placeholder="uf87t6br67xc2x"
          >
            <FaTypo3 className={iconStyle} size={20} />
          </CustomFormField>
          <div className="flex items-baseline gap-4">
            <Button type="submit">Submit</Button>
            <button
              onClick={() => dispatch(authPageChange(authPageType.signUp))}
              type="button"
              className="text-blue-700 underline text-xs"
            >
              Register
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ForgotPassword;
