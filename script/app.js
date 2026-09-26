const main = document.querySelector('main');
const header = document.querySelector('header');
const addMarketBtn = document.getElementById('new-market-btn');

const cancelBtn = document.querySelectorAll('.cancel-btn');

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

cancelBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    });
});

function showView(viewId) {
    const views = document.querySelectorAll('main section');

    views.forEach(v => {
        v.classList.add('hidden');
    });

    const viewToShow = document.getElementById(viewId);

    viewToShow.classList.remove('hidden');

}

//MARKETS

let markets = [];



function createMarketList(){
    const marketContainer = document.querySelector('.markets-container');

    if(markets.length > 0){
        marketContainer.innerHTML = '';


    }

}


