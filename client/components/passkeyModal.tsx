import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authApi, useVerifyOtpMutation } from "@/app/redux/services/auth";
import { useRouter } from "next/navigation";
import {
  setisLoadingScreenOpen,
  setPasskeyModal,
} from "@/app/redux/features/global/globalSlice";
import { OTP, passKeyModalType } from "@/app/types/globalTypes";
import { TriangleAlert } from "lucide-react";
import { setNewPasswordPlaceHolder } from "@/app/redux/features/auth/authSlice";
import { isFetchBaseQueryError } from "@/app/(auth)/forms/sign-up";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IforgotPassword } from "@/app/types/authTypes";

const PasskeyModal: React.FC<{ type: OTP["type"]; data?: IforgotPassword }> = ({
  type,
  data,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [passKey, setPassKey] = useState("");
  const [stateError, setStateError] = useState<null | FetchBaseQueryError>(
    null
  );
  const PasskeyModal = useSelector((state: any) => state.global.passkeyModal);

  const [verifyOtp, { isLoading, error, isSuccess }] = useVerifyOtpMutation();

  const sendOTP = async () => {
    try {
      const payload: OTP = {
        otp: passKey,
        type,
      };
      if (type === passKeyModalType.password) {
        payload.data = data;
        const response = await verifyOtp(payload).unwrap();
        console.log(response);
      } else {
        const response = await verifyOtp(payload).unwrap();
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setStateError(error as FetchBaseQueryError);
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPasskeyModal({ ...PasskeyModal, isOpen: false }));
      dispatch(setNewPasswordPlaceHolder(null));
      dispatch(authApi.util.invalidateTags(["auth"]));
      router.push("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    isLoading
      ? dispatch(setisLoadingScreenOpen(true))
      : dispatch(setisLoadingScreenOpen(false));
  }, [isLoading]);

  return (
    <AlertDialog open={PasskeyModal.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Verify passkey</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the passkey sent to your phone number.
          </AlertDialogDescription>
          {stateError &&
            isFetchBaseQueryError(stateError) &&
            stateError.data!.message && (
              <div className="bg-destructive/65 text-red-700 p-1 flex flex-row gap-2 items-center rounded-sm">
                <TriangleAlert />
                <p className="text-xs">{stateError.data!.message!}</p>
              </div>
            )}
        </AlertDialogHeader>
        <div className="mx-auto">
          <InputOTP
            maxLength={6}
            value={passKey}
            onChange={(value) => {
              setPassKey(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setPassKey("");
              setStateError(null);
              dispatch(setPasskeyModal({ ...PasskeyModal, isOpen: false }));
            }}
          >
            Cancel
          </AlertDialogCancel>
          <div className="OTP-submit-button">
            <AlertDialogAction
              disabled={passKey.split("").length < 6}
              onClick={sendOTP}
            >
              Continue
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
