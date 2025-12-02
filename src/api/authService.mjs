// Handles login, register, etc.
// src/api/authService.js
import { apiClient } from "./apiClient.mjs";
import { getUsername } from "../storage/index.mjs";
import {
  LOGIN_URL,
  REGISTER_URL,
  GET_LISTINGS_URL,
  CREATE_LISTING_URL,
  PROFILE_URL,
  PROFILE_LISTINGS_URL,
  SEARCH_LISTING_URL,
} from "./config.mjs";
import { getToken } from "../storage/index.mjs";

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

export async function getUserProfile() {
  const username = getUsername();
  return apiClient(PROFILE_URL + username, {
    method: "GET",
  });
}

export async function getUserListings({
  includeSeller = true,
  includeBids = true,
} = {}) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}`;
  const username = getUsername();
  return apiClient(PROFILE_URL + username + PROFILE_LISTINGS_URL + query, {
    method: "GET",
  });
}

// get all listings, sorted by date created to get the most recent auctions.
export async function getListings({
  includeSeller = true,
  includeBids = true,
  limit = 18,
  page = 1,
  sort = "created",
  sortOrder = "desc",
} = {}) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}&limit=${limit}&page=${page}&&sort=${sort}&sortOrder=${sortOrder}`;

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

export function deleteListing(id) {
  const authToken = getToken();

  if (!authToken) {
    throw new Error("No auth token was provided");
  }

  return apiClient(`${GET_LISTINGS_URL}/${id}`, {
    method: "DELETE",
  });
}

export function updateListing(payload, id) {
  const authToken = getToken();

  if (!authToken) {
    throw new Error("No auth token was provided");
  }

  return apiClient(`${GET_LISTINGS_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function getSingleListing(
  id,
  { includeSeller = true, includeBids = true } = {}
) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}`;

  return apiClient(`${GET_LISTINGS_URL}/${id}${query}`, {
    method: "GET",
  });
}

export function makeBid(id, payload) {
  return apiClient(`${GET_LISTINGS_URL}/${id}/bids`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function searchPosts(query) {
  return apiClient(`${SEARCH_LISTING_URL}${query}`, {
    method: "GET",
  });
}
