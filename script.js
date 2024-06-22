// Modal code
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("registerModal");
  const btn = document.querySelector(".register-button");
  const span = document.getElementsByClassName("close")[0];
  const form = document.getElementById("registerForm");

  btn.onclick = function() {
    modal.style.display = "block";
  }

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  form.onsubmit = function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    const usernameDisplay = document.getElementById("usernameDisplay");
    usernameDisplay.textContent = `Здравствуйте, ${username}`;
    modal.style.display = "none";
  }
});

// Existing color switcher code
let colorIcons = document.querySelector(".color-icon"),
icons = document.querySelector(".color-icon .icons");

icons.addEventListener("click" , ()=>{
  colorIcons.classList.toggle("open");
})

// getting all .btn elements
let buttons = document.querySelectorAll(".btn");

// Function to apply the selected color theme
function applyTheme(theme) {
  let root = document.querySelector(":root");
  let color = theme.split(" ");
  
  root.style.setProperty("--white", color[0]);
  root.style.setProperty("--black", color[1]);
  root.style.setProperty("--nav-main", color[2]);
  root.style.setProperty("--switchers-main", color[3]);
  root.style.setProperty("--light-bg", color[4]);
}

// Check if a theme is already saved in localStorage
let savedTheme = localStorage.getItem("themeColor");
if (savedTheme) {
  applyTheme(savedTheme);
  document.querySelector(`[data-color="${savedTheme}"]`).classList.add("active");
} else {
  document.querySelector(".btn.blue").classList.add("active");
}

for (var button of buttons) {
  button.addEventListener("click", (e) => { //adding click event to each button
    let target = e.target;

    let open = document.querySelector(".open");
    if(open) open.classList.remove("open");

    document.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    // js code to switch colors (also day night mode)
    let dataColor = target.getAttribute("data-color"); //getting data-color values of clicked button

    // Save the selected theme in localStorage
    localStorage.setItem("themeColor", dataColor);

    applyTheme(dataColor);

    let iconName = target.className.split(" ")[2]; //getting the class name of icon

    let coloText = document.querySelector(".home-content span");

    if(target.classList.contains("fa-moon")){ //if icon name is moon
      target.classList.replace(iconName, "fa-sun") //replace it with the sun
      colorIcons.style.display = "none";
      coloText.classList.add("darkMode");
    }else if (target.classList.contains("fa-sun")) { //if icon name is sun
      target.classList.replace("fa-sun", "fa-moon"); //replace it with the sun
      colorIcons.style.display = "block";
      coloText.classList.remove("darkMode");
      document.querySelector(".btn.blue").click();
    }
  });
}
