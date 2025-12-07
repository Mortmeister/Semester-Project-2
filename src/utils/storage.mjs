// TOKEN
export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function deleteToken() {
  localStorage.removeItem("token");
}

// USERNAME
export function saveUsername(username) {
  localStorage.setItem("username", username);
}

export function getUsername() {
  return localStorage.getItem("username");
}

export function deleteUsername() {
  localStorage.removeItem("username");
}
