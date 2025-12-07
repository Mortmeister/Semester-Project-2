import { loginUser } from "../api/auth-service.mjs";
import { saveToken, saveUsername } from "../utils/storage.mjs";

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
      const authToken = data.accessToken;
      const username = data.name;

      saveToken(authToken);
      saveUsername(username);
      window.location.href = "./feed/index.html";
      console.log("Login successful:", username);
    } catch (error) {
      console.error("Login error:", error);
      alert("Wrong email or password. Please try again.");
    }
  });
}
