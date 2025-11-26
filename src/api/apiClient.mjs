import { BASE_URL } from "./config.mjs";

//Generic fetch client for all requests
export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
