export interface IUserInfo {
  id: String;
  username: String;
  email: String;
  password?: String;
  phone: String;
  role?: Role;
  verified?: boolean;
}

export enum Role {
  ADMIN = "ADMIN",
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
  USER = "USER",
}

export enum userFilterType {
  ROLE = "ROLE",
  DATE = "DATE",
}

export interface GetUserType {
  users: IUserInfo[];
  pagination: {
    pageNumber: number;
    total: number;
    count: number;
    pages: number;
  };
}
