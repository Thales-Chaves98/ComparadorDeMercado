const main = document.querySelector('main');
const header = document.querySelector('header');
const addMarketBtn = document.getElementById('new-market-btn');
const backHomeBtn = document.querySelector(".back-home");

const cancelBtn = document.querySelectorAll('.cancel-btn');

const newMarketInput = document.getElementById("market-name-input");
const saveMarketBtn = document.getElementById("save-market-btn");

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

addMarketBtn.addEventListener('click', () => {
    const newMarketModal = document.getElementById('add-market-modal');
    newMarketModal.showModal();

    
});

saveMarketBtn.addEventListener('click', () =>{

});



cancelBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();

        newMarketInput.value = "";
    });
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

//MARKETS

let markets = [];



function createMarketList(){
    const marketContainer = document.querySelector('.markets-container');

    if(markets.length > 0){
        marketContainer.innerHTML = '';


    }

}


/* TODO/FIX:
- ADD NEW MARKET MODAL ESC DONT CLEAR THE INPUT

*/