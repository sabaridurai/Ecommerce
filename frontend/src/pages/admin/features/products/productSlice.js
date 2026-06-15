import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload;
    },

    addProduct: (state, action) => {
      state.list.push(action.payload);
    },

    updateProduct: (state, action) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    deleteProduct: (state, action) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;