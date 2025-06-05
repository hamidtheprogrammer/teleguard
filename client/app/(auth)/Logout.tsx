"use client";
import { LogOutIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useLogoutMutation } from "../redux/services/auth";
import { useRouter } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import { store } from "../redux/store";
import { setisLoadingScreenOpen } from "../redux/features/global/globalSlice";
import { reset } from "../redux/features/auth/authSlice";

const logOutWrapper = () => {
  return (
    <Provider store={store}>
      <Logout />
    </Provider>
  );
};

const Logout = () => {
  const [logOut, { isLoading, isSuccess }] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const log_out = async () => {
    try {
      const response = await logOut("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      router.push("/auth");
    }
  }, [isSuccess]);

  useEffect(() => {
    isLoading
      ? dispatch(setisLoadingScreenOpen(true))
      : setisLoadingScreenOpen(false);
  }, [isLoading]);

  return (
    <div
      onClick={log_out}
      className="p-1 bg-white shadow-2xl shadow-black rounded-md"
    >
      <span className="cursor-pointer hover:bg-slate-100 flex gap-1 items-center text-sm font-bold rounded-md p-2">
        <LogOutIcon className="rotate-180" />
        <p>Logout</p>
      </span>
    </div>
  );
};

export default logOutWrapper;
