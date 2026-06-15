import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import paymentReducer from "../features/payments/paymentSlice";

const adminStore = configureStore({
  reducer: {
    products: productReducer,
    payments: paymentReducer,
  },
});

export default adminStore;