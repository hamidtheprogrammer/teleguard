import { Role } from "./userTypes";

export interface IUser {
  userId?: string | null;
  username?: string | null;
  email: string | null;
  password?: string | null;
  newPassword?: string | null;
  phone?: string | null;
  isAuthenticated?: boolean;
  role?: Role | null;
}

export interface IforgotPassword {
  newPassword: string | null;
  email: string | null;
}
