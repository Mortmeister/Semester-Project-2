// Handles login, register, etc.

import { BASE_URL, REGISTER_URL } from "./config.mjs";

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
