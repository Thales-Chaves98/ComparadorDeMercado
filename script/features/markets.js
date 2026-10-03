import { loadAppData, saveAppData } from "../core/localStorage.js";

const marketContainer = document.querySelector('.markets-container');

const newMarketInput = document.getElementById("market-name-input");
const saveMarketBtn = document.getElementById("save-market-btn");

const newMarketModal = document.getElementById("add-market-modal");
const confirmDeleteModal = document.getElementById("confirm-delete-modal");

const deleteMarketBtn = document.getElementById("delete-market-btn");

const addMarketBtn = document.getElementById('new-market-btn');

const cancelBtn = document.querySelectorAll('.cancel-btn');

const appData = loadAppData();

let markets = appData.markets;

let editingMarketId = null;
let deletingMarketId = null;

function gerarMarketId() {
    return crypto.randomUUID();
}

function createMarket(name){

    let market = {
        id: gerarMarketId(),
        marketName: name
    };

    markets.push(market);
    saveAppData(appData);
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
    marketContainer.innerHTML = "";
    
    const marketUL = document.createElement('ul');
    marketUL.classList.add('marketUL')

    if (markets.length === 0){
        marketContainer.innerHTML = 
        `
        <div class="empty-markets">
            <span class="material-symbols-outlined filled">add_business</span>
            <h1>NENHUM MERCADO CADASTRADO !</h1>
            <p>Adicione um mercado para comparar preços.</p>
         </div>
        `;

        return;
    }

    markets.forEach(m=>{
        
        const marketLI = document.createElement('li');
        marketLI.classList.add('marketLI');


        let marketContent;
        
       if(m.id === editingMarketId){
        marketContent = `
            <div class="market-list-content">
                <div class="market-name">    
                    <input type="text" class="edit-market-input" value="${m.marketName}" data-id="${m.id}">
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

    
    saveAppData(appData);
    renderMarketList();
}

function deleteMarket(id){
    markets = markets.filter((m) => {
        return m.id !== id;
    })

    appData.markets = markets;

    if(editingMarketId === id){
        editingMarketId = null;
    }
    
    saveAppData(appData);
}

function confirmDeleteMarket(id){
    deletingMarketId = id;
    confirmDeleteModal.showModal();
}

export function initializeMarkets(){

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

        const id = btn.dataset.id;

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
    
    renderMarketList();
}