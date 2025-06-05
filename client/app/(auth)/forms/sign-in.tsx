"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import CustomFormField from "@/components/ui/CustomFormField";
import { CustomFormFieldType } from "@/app/types/formTypes";
import { loginSchema } from "@/lib/validation";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/app/redux/store";
import {
  authPageChange,
  setisLoadingScreenOpen,
  setPasskeyModal,
} from "@/app/redux/features/global/globalSlice";
import { authPageType, passKeyModalType } from "@/app/types/globalTypes";
import { useLoginMutation } from "@/app/redux/services/auth";
import { useEffect } from "react";
import { isFetchBaseQueryError } from "./sign-up";
import { FaEnvelope, FaLock } from "react-icons/fa";

export const iconStyle: string =
  "stroke-black stroke-2 fill-transparent absolute inset-0 top-1/2 -translate-y-1/2 left-2";

const SignInWrapper = () => {
  return (
    <Provider store={store}>
      <SignIn />
    </Provider>
  );
};

export function SignIn() {
  const dispatch = useDispatch();

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await login(values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPasskeyModal({ isOpen: true, type: passKeyModalType.login }));
    }
  }, [isSuccess]);

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

  return (
    <div className="relative w-[80%] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      <Form {...form}>
        <div className="space-y-3 mb-5">
          <h1 className="font-bold">Welcome to TeleGuard!</h1>
          <p className="text-xs">Login to your account.</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            name="email"
            control={form.control}
            label="Email"
            type={CustomFormFieldType.INPUT}
            placeholder="user@gmail.com"
          >
            <FaEnvelope className={iconStyle} size={20} />
          </CustomFormField>
          <CustomFormField
            name="password"
            control={form.control}
            label="Password"
            type={CustomFormFieldType.INPUT}
            placeholder="uf87t6br67xc2x"
          >
            <FaLock className={iconStyle} size={20} />
          </CustomFormField>
          <div className="flex items-baseline gap-4">
            <Button type="submit">Submit</Button>
            <button
              onClick={() => dispatch(authPageChange(authPageType.signUp))}
              type="button"
              className="text-blue-700 underline text-xs"
            >
              Register
            </button>{" "}
            <button
              onClick={() =>
                dispatch(authPageChange(authPageType.forgotPassword))
              }
              type="button"
              className="text-blue-700 underline text-xs"
            >
              forgot password?
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default SignInWrapper;
