import { IUserInfo } from "@/app/types/userTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { users: IUserInfo[]; filters: object } = {
  users: [],
  filters: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setUsers, setFilters } = usersSlice.actions;
export default usersSlice.reducer;
