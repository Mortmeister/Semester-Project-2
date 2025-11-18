// Handles login, register, etc.
// src/api/authService.js
import { apiClient } from "./apiClient.mjs";
import {
  LOGIN_URL,
  REGISTER_URL,
  GET_LISTINGS_URL,
  CREATE_LISTING_URL,
} from "./config.mjs";

// Login
export async function loginUser(payload) {
  return apiClient(LOGIN_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Register
export async function registerUser(payload) {
  return apiClient(REGISTER_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// get all listings, sorted by date created to get the most recent auctions.
export async function getListings({
  includeSeller = true,
  includeBids = true,
  limit = 18,
  page = 1,
} = {}) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}&limit=${limit}&page=${page}&sort=created&sortOrder=desc`;

  return apiClient(GET_LISTINGS_URL + query, {
    method: "GET",
  });
}

export function createListing(payload) {
  return apiClient(CREATE_LISTING_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
