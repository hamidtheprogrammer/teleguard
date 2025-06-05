import { IforgotPassword } from "./authTypes";

export enum authPageType {
  signIN = "sign-in",
  signUp = "sign-up",
  forgotPassword = "forgot-password",
}

export enum passKeyModalType {
  verify = "VERIFY",
  password = "PASSWORD",
  login = "LOGIN",
}

export interface globalSliceType {
  passkeyModal: { isOpen: boolean; type: passKeyModalType };
  currentAuthPage: authPageType;
  isLoadingScreenOpen: boolean;
  isSideBarCollapsed: boolean;
}

export interface OTP {
  otp: string;
  type: passKeyModalType;
  data?: IforgotPassword;
}
