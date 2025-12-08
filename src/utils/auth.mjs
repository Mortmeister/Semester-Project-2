import { getToken, deleteToken, deleteUsername } from "./storage.mjs";

export function logout() {
  deleteToken();
  deleteUsername();
  window.location.href = "../index.html";
}

export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

export function redirectToLogin(returnUrl = null) {
  const loginUrl = "../login/index.html";
  if (returnUrl) {
    window.location.href = `${loginUrl}?returnUrl=${encodeURIComponent(
      returnUrl
    )}`;
  } else {
    window.location.href = loginUrl;
  }
}

export function handleUnauthorizedAccess(
  message = "You must be logged in to perform this action.",
  redirect = true
) {
  alert(message);
  if (redirect) {
    redirectToLogin(window.location.href);
  }
}
