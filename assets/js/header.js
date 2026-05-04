document.querySelectorAll(".profile-container").forEach((container) => {
  const profileMenu = container.querySelector(".profile-menu");
  const profiles = container.querySelectorAll(".user-profile");

  container.addEventListener("click", () => {
    profileMenu.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-container")) {
      profileMenu.classList.remove("active");
    }
  });
});