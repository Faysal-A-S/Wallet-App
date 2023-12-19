import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  notification: false,
};
const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    notificationType: (state, action) => {
      state.notification = action.payload;
    },
  },
});
export default requestSlice.reducer;
export const { notificationType } = requestSlice.actions;
