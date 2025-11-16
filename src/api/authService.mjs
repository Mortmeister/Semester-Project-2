// Handles login, register, etc.
// src/api/authService.js
import { apiClient } from "./apiClient.mjs";
import { LOGIN_URL, REGISTER_URL, GET_LISTINGS_URL } from "./config.mjs";

// Login
export async function loginUser(payload) {
  return apiClient(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Register
export async function registerUser(payload) {
  return apiClient(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// get all listings
export async function getListings({
  includeSeller = true,
  includeBids = true,
} = {}) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}`;

  return apiClient(GET_LISTINGS_URL + query, {
    method: "GET",
  });
}
