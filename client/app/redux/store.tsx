import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./features/global/globalSlice";
import authReducer from "./features/auth/authSlice";
import usersReducer from "./features/users/usersSlice";
import chatsReducer from "./features/chat/chatSlice";
import { authApi } from "./services/auth";
import { usersApi } from "./services/users";
import { chatsApi } from "./services/chats";
import { formSubmissionApi } from "./services/formSubmission";
import { appointmentApi } from "./services/appointment";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    auth: authReducer,
    users: usersReducer,
    chats: chatsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [formSubmissionApi.reducerPath]: formSubmissionApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      formSubmissionApi.middleware,
      chatsApi.middleware,
      appointmentApi.middleware
    ),
});

setupListeners(store.dispatch);
