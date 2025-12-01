const menuBtn = document.getElementById("userMenuButton");
const menu = document.getElementById("userMenu");

menuBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  menu.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target) && event.target !== menuBtn) {
    menu.classList.remove("show");
  }
});
