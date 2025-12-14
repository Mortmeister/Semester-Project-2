import { registerUser } from "../api/auth-service.mjs";

export function initRegisterForm() {
  const registerFormEl = document.getElementById("registerUserForm");
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
      banner: {
        url: formData.get("bannerUrl"),
        alt: formData.get("bannerAlt"),
      },
    };

    try {
      const { data } = await registerUser(payload);
      alert(`User registered: ${data.name}`);
      window.location.href = "../login/index.html";
    } catch (error) {
      alert(`Register error: ${error.errors[0].message}`);
    }
  });
}
