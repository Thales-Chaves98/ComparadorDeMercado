import { loadAppData, saveAppData } from "../core/localStorage.js";
import { openActiveShoppingList } from "./shoppingListActive.js";

const totalMarketsAllowed = 4;

const newListBtn = document.getElementById("new-list-btn");
const newListForm = document.getElementById("new-list-form");

const listAction = document.querySelector(".new-list-action");
const listContainer = document.querySelector(".new-list-container");
const marketsList = document.getElementById("list-markets");
const marketsCounter = document.getElementById("markets-counter");

const cancelListBtn = document.getElementById("cancel-list-btn");
const saveListBtn = document.getElementById("save-list-btn");

const dateInput = document.getElementById("list-date");

function renderMarketsList(){
    const appData = loadAppData();
    const markets = appData.markets;

    marketsList.innerHTML = "";
    
    markets.forEach(market => {
        marketsList.innerHTML += 
        `
        <label>
            <input type="checkbox" value="${market.id}">
            <span>${market.marketName}</span>
        </label>
        `;
    });
    
    updateMarketsCounter();
}

function updateMarketsCounter() {
    const checkedMarkets = document.querySelectorAll("#list-markets input[type='checkbox']:checked");
    marketsCounter.textContent = `${checkedMarkets.length}/${totalMarketsAllowed} SELECIONADOS`;
    
}

function createShoppingList(date, selectedMarkets) {
    const appData = loadAppData();

    let shoppingList = {
        id: crypto.randomUUID(),
        date: date,
        markets: selectedMarkets,
        items: []
    }

    appData.shoppingLists.push(shoppingList);
    saveAppData(appData);

    return shoppingList;
}

function resetMarket(){
    const checkboxes = document.querySelectorAll("#list-markets input[type='checkbox']");
    checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
    });

    updateMarketsCounter();
}

export function closeList() {
    listAction.classList.remove("hidden");
    listContainer.classList.add("hidden");

    newListForm.reset();
    resetMarket();
}

export function initializeShoppingLists(){
    
    newListBtn.addEventListener('click', () =>{        
        listAction.classList.add("hidden");
        listContainer.classList.remove("hidden");

        renderMarketsList();
    });
    
    cancelListBtn.addEventListener('click', () =>{
        listAction.classList.remove("hidden");
        listContainer.classList.add("hidden");
    });

    marketsList.addEventListener('change', (e) => {
        const checkbox = e.target;

        if(!checkbox.matches("input[type='checkbox']")) return;

        const checked = document.querySelectorAll("#list-markets input[type='checkbox']:checked");

         const all = document.querySelectorAll("#list-markets input[type='checkbox']");
        all.forEach(cb => {
            if (!cb.checked) cb.disabled = checked.length >= totalMarketsAllowed;
        });
        
        updateMarketsCounter();
    });

    saveListBtn.addEventListener('click', () => {
        const selectedDate = dateInput.value;
        const selectedMarkets = Array.from(document.querySelectorAll("#list-markets input[type='checkbox']:checked")).map(cb => cb.value);

        if(selectedDate === "") return;

        if(selectedMarkets.length === 0) return;

        const shoppingList = createShoppingList(selectedDate, selectedMarkets);
        
        openActiveShoppingList(shoppingList.id);
    });

} 