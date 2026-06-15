import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payments",
  initialState: {
    list: [],
  },
  reducers: {
    setPayments: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setPayments } = paymentSlice.actions;
export default paymentSlice.reducer;