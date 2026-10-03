import { initializeMarkets } from "./features/markets.js";

initializeMarkets();

const main = document.querySelector('main');
const header = document.querySelector('header');

const backHomeBtn = document.querySelector(".back-home");
const themeBtn = document.getElementById("theme-toggle");

let theme = true;

main.addEventListener('click', (e) =>{

    const viewBtn = e.target.closest('button[data-view]');
    const backBtn = e.target.closest('.back-home');

    if(viewBtn) {
        showView(viewBtn.dataset.view);
    } else if(backBtn) {
        showView('home');
    }

});

header.addEventListener('click', (e) => {
    const backMenuBtn = e.target.closest('.back-home');

    if(backMenuBtn) {
        showView('home');
    }
});

themeBtn.addEventListener("click", () =>{
    theme = !theme;
    const newTheme = theme ? "light" : "dark";

    applyTheme(newTheme);
});



function showView(viewId) {
    const views = document.querySelectorAll('main section');

    views.forEach(v => {
        v.classList.add('hidden');
    });

    const viewToShow = document.getElementById(viewId);

    viewToShow.classList.remove('hidden');
    
    if(viewId === "home"){
        backHomeBtn.classList.add('invisible');
    } else {
        backHomeBtn.classList.remove('invisible');        
    }
}

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

showView('home');

