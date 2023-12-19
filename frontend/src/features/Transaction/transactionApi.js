import { Api } from "../api/api";
export const transactionApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    transferFund: builder.mutation({
      query: ({ data, token }) => ({
        url: "/transactions/transfer-fund",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Transaction", "Users"],
    }),
    depositFund: builder.mutation({
      query: ({ data, token, amount }) => ({
        url: "/transactions/deposit-funds",
        method: "POST",
        body: { data, amount },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Transaction", "Users"],
    }),
    transactionByUser: builder.query({
      query: (token) => ({
        url: "/transactions/transaction-by-user",
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
  }),
});
export const {
  useTransferFundMutation,
  useTransactionByUserQuery,
  useDepositFundMutation,
} = transactionApi;
