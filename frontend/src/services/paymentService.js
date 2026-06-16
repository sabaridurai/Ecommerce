import api from "./api";

export const getMethods = async () => {
  const res = await api.get("/payment-methods/");
  return res.data;
};

export const saveMethod = async (
  data,
  id = null
) => {
  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  };

  if (id) {
    const res = await api.put(
      `/payment-methods/${id}/`,
      data,
      config
    );
    return res.data;
  } else {
    const res = await api.post(
      "/payment-methods/",
      data,
      config
    );
    return res.data;
  }
};

export const deleteMethod = async (
  id
) => {
  const res = await api.delete(
    `/payment-methods/${id}/`
  );
  return res.data;
};