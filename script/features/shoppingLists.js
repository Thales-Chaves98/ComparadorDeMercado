import { loadAppData, saveAppData } from "../core/localStorage.js";

const appData = loadAppData();

const totalMarketsAllowed = 4;

let markets = appData.markets;

const newListBtn = document.getElementById("new-list-btn");

const listAction = document.querySelector(".new-list-action");
const listContainer = document.querySelector(".new-list-container");
const marketsList = document.getElementById("list-markets");
const marketsCounter = document.getElementById("markets-counter");

const cancelListBtn = document.getElementById("cancel-list-btn");
const saveListBtn = document.getElementById("save-list-btn");

function renderMarketsList(){
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

} 