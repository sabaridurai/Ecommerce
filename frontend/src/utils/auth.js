export const setAuth = (data) => {
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("role", data.role);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);
};

export const getAccessToken = () => {
  return localStorage.getItem("access");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh");
};

export const getRole = () => {
  return localStorage.getItem("role");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("access");
};

export const logout = () => {
  localStorage.clear();
    window.location.href = "/admin/login";
};