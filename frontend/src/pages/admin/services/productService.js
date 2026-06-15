// src/services/productService.js
import api from "./api";

// GET all products
export const getProducts = async () => {
  const res = await api.get("/products/");
  return res.data;
};

// productService.js
export const saveProduct = async (data, id = null) => {
  if (id) {
    const res = await api.put(`/products/${id}/`, data);
    return res.data;
  } else {
    const res = await api.post("/products/create/", data);
    return res.data;
  }
};
// DELETE product
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}/`);
  return res.data;
};

// GET single product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}/`);
  return res.data;
};

