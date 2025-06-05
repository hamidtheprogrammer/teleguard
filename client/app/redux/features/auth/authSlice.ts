import { IUser } from "@/app/types/authTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser = {
  newPassword: null,
  email: null,
  username: null,
  userId: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewPasswordPlaceHolder: (state, action) => {
      state = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { setNewPasswordPlaceHolder, setCurrentUser, reset } =
  authSlice.actions;
export default authSlice.reducer;
