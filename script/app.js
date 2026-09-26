const main = document.querySelector('main');
const header = document.querySelector('header');
const addMarketBtn = document.getElementById('new-market-btn');
const backHomeBtn = document.querySelector(".back-home");

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
const newMarketInput = document.getElementById("market-name-input");
const saveMarketBtn = document.getElementById("save-market-btn");

let marketId = 1;

saveMarketBtn.addEventListener('click', () =>{
    saveMarket();
});

let markets = [];

function createMarket(name){

    let market = {
        id: marketId,
        marketName: name
    };

    marketId++
    markets.push(market);
    console.log(markets);
}

function saveMarket(){
    const marketName = newMarketInput.value.trim().toUpperCase();
    const modal = document.getElementById('add-market-modal');
    
    if(marketName != ""){
        createMarket(marketName);
        newMarketInput.value = "";
    }

    renderMarketList();
    modal.close();
}

function renderMarketList(){
    const marketContainer = document.querySelector('.markets-container');
    const marketUL = document.createElement('ul');
    marketUL.classList.add('marketUL')

    if(markets.length > 0){
        marketContainer.innerHTML = '';
    }

    markets.forEach(m=>{
        ;
        
        const marketLI = document.createElement('li');
        marketLI.classList.add('marketLI');
        marketLI.textContent = m.marketName;

        marketUL.append(marketLI);
        
    });
    
    marketContainer.append(marketUL);
    console.log()

}


/* TODO/FIX:
- ADD NEW MARKET MODAL ESC DONT CLEAR THE INPUT

*/