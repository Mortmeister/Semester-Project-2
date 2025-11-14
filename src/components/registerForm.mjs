import { registerUser } from "../api/authService.mjs";

export function initRegisterForm() {
  const registerFormEl = document.getElementById("registerUserForm");
  registerFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerFormEl);
    console.log(formData);

    try {
      const userData = await registerUser(formData);
      console.log("User created:", userData);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  });
}
