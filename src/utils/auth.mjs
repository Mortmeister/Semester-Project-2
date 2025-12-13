import { getToken, deleteToken, deleteUsername } from "./storage.mjs";

export function logout() {
  deleteToken();
  deleteUsername();
  window.location.href = "../login/index.html";
}

export function isAuthenticated() {
  const token = getToken();
  return !!token;
}

export function redirectToLogin() {
  window.location.href = "../login/index.html";
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
