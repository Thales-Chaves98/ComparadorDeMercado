const themeBtn = document.getElementById("theme-toggle");

let theme = true;

function applyTheme(theme){
    const themeIcon = themeBtn.querySelector("span");

    if(theme === "light"){
        themeIcon.textContent = "moon_stars";
        document.body.classList.remove("dark-theme");
    } else {
        themeIcon.textContent = "light_mode";
        document.body.classList.add("dark-theme");
    }
}


export function initializeTheme(){

    themeBtn.addEventListener("click", () =>{
    theme = !theme;
    const newTheme = theme ? "light" : "dark";

    applyTheme(newTheme);
    });

}
