export const getErrorMessage = (error) => {
  // No response (network error / server down)
  if (!error.response) {
    return "Network error. Please check your internet or server.";
  }

  const status = error.response.status;
  const data = error.response.data;

  // Backend custom message
  if (data?.message) return data.message;

  // Validation errors (Django / DRF style)
  if (data?.error) return data.error;

  // Common HTTP cases
  switch (status) {
    case 400:
      return "Bad request. Please check your input.";
    case 401:
      return "Unauthorized. Please login again.";
    case 403:
      return "You don't have permission.";
    case 404:
      return "API not found.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "Something went wrong.";
  }
};