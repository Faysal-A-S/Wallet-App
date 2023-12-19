import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wallet-app-eta-six.vercel.app/api",
    headers: { "Content-Type": "application/json" },
  }),
  tagTypes: ["Request", "User", "Transaction", "Users"],
  endpoints: (builder) => ({}),
});
