// src/components/LoginForm.js
import { loginUser } from "../api/authService.mjs";
// import { saveToken, saveUsername } from "../storage/index.js";

export function initLoginForm() {
  const loginFormEl = document.getElementById("loginForm");
  if (!loginFormEl) return;

  loginFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginFormEl);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const { data } = await loginUser(payload);
      // const authToken = data.accessToken;
      const username = data.name;

      // saveToken(authToken);
      // saveUsername(username);

      console.log("Login successful:", username);
      // redirect or update UI here
    } catch (error) {
      console.error("Login error:", error);
      alert("Wrong email or password. Please try again.");
    }
  });
}
