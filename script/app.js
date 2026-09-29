const main = document.querySelector('main');
const header = document.querySelector('header');

const backHomeBtn = document.querySelector(".back-home");
const themeBtn = document.getElementById("theme-toggle");

const addMarketBtn = document.getElementById('new-market-btn');
const marketContainer = document.querySelector('.markets-container');

const cancelBtn = document.querySelectorAll('.cancel-btn');

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

//MARKETS
const newMarketInput = document.getElementById("market-name-input");
const saveMarketBtn = document.getElementById("save-market-btn");

const newMarketModal = document.getElementById("add-market-modal");
const confirmDeleteModal = document.getElementById("confirm-delete-modal");

const deleteMarketBtn = document.getElementById("delete-market-btn");

let markets = [];

let marketId = 1;

let editingMarketId;
let deletingMarketId;

addMarketBtn.addEventListener('click', () => {
    const newMarketModal = document.getElementById('add-market-modal');
    newMarketModal.showModal();

    
});

newMarketModal.addEventListener('cancel', () =>{
    newMarketInput.value = "";
});

newMarketInput.addEventListener('keydown', (e) =>{
    if(e.key === "Enter"){
        e.preventDefault();
        saveMarket();
    }
});

saveMarketBtn.addEventListener('click', () =>{
    saveMarket();
});

marketContainer.addEventListener('click', (e) =>{
    const btn = e.target.closest("button");

    if(!btn) return;

    const id = Number(btn.dataset.id);

    if(btn.classList.contains("edit-btn")){
        enableEditMarket(id);
        
    } else if(btn.classList.contains("save-edit-btn")){
        const editInput = btn.closest(".marketLI").querySelector(".edit-market-input");
        saveEditMarket(id, editInput);
    } else if(btn.classList.contains("delete-btn")){
        confirmDeleteMarket(id);
    }
});

deleteMarketBtn.addEventListener('click', () =>{
    if(deletingMarketId !== null){
        deleteMarket(deletingMarketId);
    }

    deletingMarketId = null;
    confirmDeleteModal.close();

    renderMarketList();
});




function createMarket(name){

    let market = {
        id: marketId,
        marketName: name
    };

    marketId++;
    markets.push(market);
}

function saveMarket(){
    const marketName = newMarketInput.value.trim().toUpperCase();
    
    if(marketName === ""){
        return;
    }
    createMarket(marketName);
    newMarketInput.value = "";
    
    renderMarketList();
    newMarketModal.close();
}

function renderMarketList(){
    const marketUL = document.createElement('ul');
    marketUL.classList.add('marketUL')

    if(markets.length > 0){
        marketContainer.innerHTML = '';
    } else if (markets.length === 0){
        marketContainer.innerHTML = 
        `
        <div class="empty-markets">
            <span class="material-symbols-outlined filled">add_business</span>
            <h1>NENHUM MERCADO CADASTRADO !</h1>
            <p>Adicione um mercado para comparar preços.</p>
         </div>
        `
    }

    markets.forEach(m=>{
        
        const marketLI = document.createElement('li');
        marketLI.classList.add('marketLI');


        let marketContent;
        
       if(m.id === editingMarketId){
        marketContent = `
            <div class="market-list-content">
                <div class="market-name">    
                    <input type="text" class="edit-market-input" value="${m.marketName}" data-id="${m.id}>
                </div>
                <div class="market-list-actions">
                    <button class="save-edit-btn" data-id="${m.id}">
                        <span class="material-symbols-outlined filled">save_as</span>
                    </button>                
                    <button class="delete-btn" data-id="${m.id}">
                        <span class="material-symbols-outlined filled">delete_forever</span>
                    </button>                               
                </div>
            </div>
        `;
       } else {
         marketContent = `
            <div class="market-list-content">
                <div class="market-name">    
                    <p>${m.marketName}</p>
                </div>
                <div class="market-list-actions">
                    <button class="edit-btn" data-id="${m.id}">
                        <span class="material-symbols-outlined filled">edit</span>
                    </button>                
                    <button class="delete-btn" data-id="${m.id}">
                        <span class="material-symbols-outlined filled">delete_forever</span>
                    </button>                               
                </div>
            </div>
        `;
       }

        marketLI.innerHTML = marketContent;

        marketUL.append(marketLI);
        
    });
    
    marketContainer.append(marketUL);

}

function enableEditMarket(id){
    editingMarketId = id;
    renderMarketList();

    const editInput = document.querySelector(".edit-market-input");

    if(editInput){
        editInput.focus();

        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }


}

function saveEditMarket(id, input){
    const m = markets.find(mName =>{
        return mName.id === id;
    });

    if(!m) return;

    const newmarketName = input.value.trim().toUpperCase();

    if(newmarketName ==="") return;

    m.marketName = newmarketName;
    editingMarketId = null;

    saveMarket();
    renderMarketList();

}

function deleteMarket(id){
    markets = markets.filter((m) => {
        return m.id !== id;
    })

    if(editingMarketId === id){
        editingMarketId = null;
    }

}

function confirmDeleteMarket(id){
    deletingMarketId = id;
    confirmDeleteModal.showModal();
}

renderMarketList();

/* TODO/FIX:

*/