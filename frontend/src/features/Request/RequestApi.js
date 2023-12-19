import { Api } from "../api/api";
export const RequestApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getRequestsByUser: builder.query({
      query: (token) => ({
        url: "/requests/get-requests-by-user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Request"],
    }),
    sendRequest: builder.mutation({
      query: ({ token, data }) => ({
        url: "/requests/send-request",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Request"],
    }),
    updateRequest: builder.mutation({
      query: ({ token, data, status }) => ({
        url: "/requests/update-request",
        method: "POST",
        body: { status, data },
        status,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Request", "User", "Transaction", "Users"],
    }),
  }),
});
export const {
  useGetRequestsByUserQuery,
  useSendRequestMutation,
  useUpdateRequestMutation,
} = RequestApi;
