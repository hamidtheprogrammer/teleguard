"use client";
import React, { useEffect } from "react";
import { SignIn } from "../../forms/sign-in";
import { store } from "@/app/redux/store";
import { Provider, useSelector } from "react-redux";
import { authPageType } from "@/app/types/globalTypes";
import { SignUp } from "../../forms/sign-up";
import PasskeyModal from "@/components/passkeyModal";
import ForgotPassword from "../../forms/forgot-password";
import { Loader } from "lucide-react";

const AuthWrapper = () => {
  return (
    <Provider store={store}>
      <AuthPage />
    </Provider>
  );
};

const AuthPage = () => {
  const currentAuthPage = useSelector(
    (state: any) => state.global.currentAuthPage
  );

  const Passkey = useSelector((state: any) => state.global.passkeyModal);

  const isLoadingScreenOpen = useSelector(
    (state: any) => state.global.isLoadingScreenOpen
  );

  const newPasswordCredential = useSelector((state: any) => state.auth);

  useEffect(() => {
    console.log(newPasswordCredential);
  }, [newPasswordCredential]);

  return (
    <>
      <div
        className={`fixed bg-black/40 inset-0 h-full w-full z-50 ${
          isLoadingScreenOpen ? "flex" : "hidden"
        } justify-center items-center `}
      >
        <Loader className="loader" size={100} />
      </div>
      <div test-id="passkey" className="relative z-40">
        <PasskeyModal type={Passkey.type} data={newPasswordCredential} />
      </div>
      <div className="h-full w-full flex items-center">
        <section className="flex-1 relative h-full flex flex-col gap-14">
          <h1 className="relative top-5 left-10 text-xl font-bold ">
            <img src="./assets/logo.png" className="h-10" alt="logo" />
          </h1>
          <div>
            <div className="bg-blue-700 inset-0 bg-ball-auth"></div>
            <div
              className="bg-pink-700 
        bottom-0 right-0 bg-ball-auth"
            ></div>
            {currentAuthPage === authPageType.signIN ? (
              <SignIn />
            ) : currentAuthPage === authPageType.signUp ? (
              <SignUp />
            ) : (
              currentAuthPage === authPageType.forgotPassword && (
                <ForgotPassword />
              )
            )}
          </div>
        </section>
        <section className="flex-1 h-full bg-yellow-500">
          <img
            className="h-full w-full object-cover"
            src={"/assets/auth-tab-img.webp"}
            alt="doctors"
          />
        </section>
      </div>
    </>
  );
};

export default AuthWrapper;
