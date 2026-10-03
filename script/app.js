import { initializeMarkets } from "./features/markets.js";
import  { initializeTheme } from "./features/theme.js";

initializeMarkets();
initializeTheme();

const main = document.querySelector('main');
const header = document.querySelector('header');

const backHomeBtn = document.querySelector(".back-home");


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


showView('home');

