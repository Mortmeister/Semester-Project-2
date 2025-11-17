//Generic fetch client for all requests
// src/api/apiClient.js

import { BASE_URL } from "./config.mjs";

export async function apiClient(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // const headers = options.headers ? { ...options.headers } : {};
  const API_KEY = import.meta.env.VITE_API_KEY;
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };
  debugger;

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

    return await response.json();
  } catch (error) {
    console.error("API Client Error:", error);
    throw error;
  }
}
