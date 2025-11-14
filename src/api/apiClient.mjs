//Generic fetch client for all requests
// src/api/apiClient.js

const BASE_URL = "https://v2.api.noroff.dev";

export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // Clone headers if provided, otherwise create new object
  const headers = options.headers ? { ...options.headers } : {};

  // Add Authorization header if token exists
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

    // Return parsed JSON response
    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error; // Re-throw so other modules can handle it
  }
}
