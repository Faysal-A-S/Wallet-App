import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  verify: false,
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedInUser: (state, action) => {
      state.token = action.payload.token;
      state.verify = action.payload.verify;
    },
    userData: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      localStorage.clear();
      state.user = {};
      state.token = "";
      state.verify = false;
    },
  },
});
export default userSlice.reducer;
export const { loggedInUser, userData, logout } = userSlice.actions;
