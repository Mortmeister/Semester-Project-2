import { registerUser } from "../api/auth-service.mjs";

export function initRegisterForm() {
  const registerFormEl = document.getElementById("registerForm");
  if (!registerFormEl) return;

  registerFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerFormEl);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      bio: formData.get("bio"),
      avatar: {
        url: formData.get("avatarUrl"),
        alt: formData.get("avatarAlt"),
      },
    };

    try {
      const { data } = await registerUser(payload);
      console.log("User registered:", data);
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed. Check your input.");
    }
  });
}
