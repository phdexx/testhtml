// Check if a user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    const usernameDisplay = document.getElementById("usernameDisplay");
  
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      usernameDisplay.textContent = `Здравствуйте, ${storedUsername}`;
    }
  });
  