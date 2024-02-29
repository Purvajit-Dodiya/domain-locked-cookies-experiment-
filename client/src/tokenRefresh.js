// tokenRefresh.js
import axios from "axios";

export const refreshToken = async () => {
  try {
    const email = localStorage.getItem("email");
    const response = await axios.post(
      "http://localhost:3000/refresh",
      { email },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      console.log("Token refreshed successfully");
      return true;
    } else {
      console.error("Failed to refresh token");
      window.location.href = "/login"; // Redirect to login if refresh fails
      return false;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    window.location.href = "/login"; // Redirect to login if an error occurs
    return false;
  }
};
