// Handles login, register, etc.

import { BASE_URL, REGISTER_URL, LOGIN_URL } from "./config.mjs";

const loginFormEl = document.getElementById("loginForm");

export async function registerUser(formData) {
  const formDataInput = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio"),
    avatar: {
      url: formData.get("avatarUrl"),
      alt: formData.get("avatarAlt"),
    },
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataInput),
  };

  try {
    const response = await fetch(`${BASE_URL + REGISTER_URL}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

loginFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginFormEl);

  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(payload);

  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST", // must be POST for login
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const authToken = data.data.accessToken;
    const username = data.data.name;

    console.log(authToken);
    console.log(username);

    console.log("Login successful:", username);
    // redirect or update UI here
  } catch (error) {
    console.error("Error:", error);
    alert("Wrong email or password. Please try again.");
  }
});
