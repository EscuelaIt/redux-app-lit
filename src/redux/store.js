import { configureStore } from "@reduxjs/toolkit";
import { appSlice } from "./app-slice";
import { userSlice } from "./user-slice";

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: userSlice.reducer,
  }
});