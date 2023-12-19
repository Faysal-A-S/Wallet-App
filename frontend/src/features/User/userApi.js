import { Api } from "../api/api";

export const userApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ data, token }) => ({
        url: "/users/update",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Users"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ data, action, token }) => ({
        url: "/users/update-user-status",
        method: "POST",
        body: { data, action },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User", "Users"],
    }),
    userInfo: builder.query({
      query: (data) => ({
        url: `/users/user-info`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }),
      providesTags: ["User"],
    }),
    AllUsers: builder.query({
      query: (data) => ({
        url: `/users/get-all-users`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data}`,
        },
      }),
      providesTags: ["Users"],
    }),
    verifyUser: builder.query({
      query: ({ token, data }) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
        url: `/users/verify-user/${data}`,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInfoQuery,
  useLazyVerifyUserQuery,
  useUpdateUserMutation,
  useAllUsersQuery,
  useUpdateUserStatusMutation,
} = userApi;
