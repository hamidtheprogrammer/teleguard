import { createSlice } from "@reduxjs/toolkit";
import {
  authPageType,
  globalSliceType,
  passKeyModalType,
} from "@/app/types/globalTypes";

const initialState: globalSliceType = {
  currentAuthPage: authPageType.signIN,
  passkeyModal: { isOpen: false, type: passKeyModalType.verify },
  isLoadingScreenOpen: false,
  isSideBarCollapsed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    authPageChange: (state, action) => {
      state.currentAuthPage = action.payload;
    },
    setPasskeyModal: (state, action) => {
      state.passkeyModal = action.payload;
    },
    setisLoadingScreenOpen: (state, action) => {
      state.isLoadingScreenOpen = action.payload;
    },
    setisSideBarCollapsed: (state, action) => {
      state.isSideBarCollapsed = action.payload;
    },
  },
});

export const {
  authPageChange,
  setPasskeyModal,
  setisLoadingScreenOpen,
  setisSideBarCollapsed,
} = globalSlice.actions;
export default globalSlice.reducer;
