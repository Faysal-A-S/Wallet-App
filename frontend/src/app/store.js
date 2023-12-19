import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./../features/api/api";
import userSlice from "../features/User/userSlice";
import RequestSlice from "../features/Request/RequestSlice";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    AuthUser: userSlice,
    requestType: RequestSlice,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(Api.middleware),
});
