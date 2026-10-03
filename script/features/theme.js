import { loadAppData, saveAppData } from "../core/localStorage.js";

const themeBtn = document.getElementById("theme-toggle");

const appData = loadAppData();

let theme = appData.theme;

function applyTheme(theme){
    const themeIcon = themeBtn.querySelector("span");

    if(theme === "light"){
        themeIcon.textContent = "moon_stars";
        document.body.classList.remove("dark-theme");
    } else {
        themeIcon.textContent = "light_mode";
        document.body.classList.add("dark-theme");
    }
    saveAppData(appData);
}


export function initializeTheme(){

    applyTheme(theme);

    themeBtn.addEventListener("click", () =>{
        theme = theme === "light" ? "dark" : "light";
        
        applyTheme(theme);
        
        appData.theme = theme;
        saveAppData(appData);
    });

}
