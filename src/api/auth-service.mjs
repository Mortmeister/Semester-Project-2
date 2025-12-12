// Handles login, register, etc.
import { apiClient } from "./api-client.mjs";
import { getUsername, getToken } from "../utils/storage.mjs";
import {
  LOGIN_URL,
  REGISTER_URL,
  GET_LISTINGS_URL,
  CREATE_LISTING_URL,
  PROFILE_URL,
  PROFILE_LISTINGS_URL,
  SEARCH_LISTING_URL,
} from "./api-config.mjs";

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

export async function updateUserProfile(payload) {
  const username = getUsername();
  return apiClient(PROFILE_URL + username, {
    method: "PUT",
    body: JSON.stringify(payload),
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

export async function getUserBids() {
  const username = getUsername();
  return apiClient(
    PROFILE_URL + username + "/bids?_listings=true&_seller=true&_bids=true",
    {
      method: "GET",
    }
  );
}

export async function getUserWins() {
  const username = getUsername();
  return apiClient(
    PROFILE_URL + username + "/wins?_listings=true&_seller=true&_bids=true",
    {
      method: "GET",
    }
  );
}

// get all listings, sorted by date created to get the most recent auctions.
export async function getListings({
  includeSeller = true,
  includeBids = true,
  limit = 18,
  page = 1,
  sort = "created",
  sortOrder = "desc",
  tag = null,
} = {}) {
  let query = `?_seller=${includeSeller}&_active=true&_bids=${includeBids}&limit=${limit}&page=${page}&sort=${sort}&sortOrder=${sortOrder}`;

  if (tag) {
    query += `&_tag=${tag}`;
  }

  return apiClient(GET_LISTINGS_URL + query, { method: "GET" });
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
  return apiClient(`${SEARCH_LISTING_URL}${query}&_seller=true&_bids=true`, {
    method: "GET",
  });
}

export function searchUsers(query) {
  return apiClient(`auction/profiles/search?q=${query}`, {
    method: "GET",
  });
}
export async function getUserProfileByUsername(username) {
  return apiClient(PROFILE_URL + username, {
    method: "GET",
  });
}

// Get a specific user's listings by username
export async function getUserListingsByUsername(
  username,
  { includeSeller = true, includeBids = true } = {}
) {
  const query = `?_seller=${includeSeller}&_bids=${includeBids}`;
  return apiClient(PROFILE_URL + username + PROFILE_LISTINGS_URL + query, {
    method: "GET",
  });
}

// Get a specific user's bids by username
export async function getUserBidsByUsername(username) {
  return apiClient(
    PROFILE_URL + username + "/bids?_listings=true&_seller=true&_bids=true",
    {
      method: "GET",
    }
  );
}

// Get a specific user's wins by username
export async function getUserWinsByUsername(username) {
  return apiClient(
    PROFILE_URL + username + "/wins?_listings=true&_seller=true&_bids=true",
    {
      method: "GET",
    }
  );
}
