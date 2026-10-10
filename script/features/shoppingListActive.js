import { loadAppData, saveAppData } from "../core/localStorage.js";

const itemInput = document.getElementById("item-name");
const addItemBtn = document.getElementById("add-item-btn");

const activeShoppingList = document.getElementById("shopping-list-active");
const newList = document.querySelector(".new-list");
const shoppingDate = document.getElementById("shopping-list-date");

const shoppingContainer = document.getElementById("shopping-list-table");

let activeListId = null;

function formatDate(date) {
    if(!date) return "";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

function renderItems(shoppingList){ 
    if(!shoppingContainer) return;

    shoppingContainer.innerHTML = "";

    const appData = loadAppData();

    const selectedMarkets = shoppingList.markets.map(marketId =>{
        return appData.markets.find(market => market.id === marketId)
    });

    const shoppingTable = document.createElement('table');
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');

    const headerRow = document.createElement('tr');

    const itemHeader = document.createElement('th');
    itemHeader.textContent = "ITEM";
    headerRow.append(itemHeader);

    selectedMarkets.forEach(m => {
        const marketHeader = document.createElement('th');

        marketHeader.textContent = m.marketName;

        headerRow.append(marketHeader);
    });

    const actionsHeader = document.createElement('th');
    actionsHeader.textContent = "AÇÕES";
    headerRow.append(actionsHeader);

    tHead.append(headerRow);

    shoppingList.items.forEach(i =>{
        const itemRow = document.createElement('tr');

        const itemCell = document.createElement('td');
        itemCell.textContent = i.itemName;

        itemRow.append(itemCell);

        selectedMarkets.forEach(m =>{
            const priceCell = document.createElement('td');

            const savedPrice = i.prices?.[m.id] ?? "";

            priceCell.innerHTML = 
            `
                <input type="number" data-item-id="${i.id}" 
                data-market-id="${m.id}" value="${savedPrice}">
            `;

            itemRow.append(priceCell);
        });

        const actionCell = document.createElement('td');
        actionCell.innerHTML = 'ACTIONS';
        
        itemRow.append(actionCell);

        tBody.append(itemRow);
    });




    shoppingTable.append(tHead);
    shoppingTable.append(tBody);

    shoppingContainer.append(shoppingTable); 
}

function createItem(itemName){
    const appdata = loadAppData();

    const shoppingList = appdata.shoppingLists.find(list => list.id === activeListId);

    if(!shoppingList) return null;

    const item = {
        id: crypto.randomUUID(),
        itemName: itemName,
        amount: 1,
        prices: {}
    }

    shoppingList.items.push(item);
    saveAppData(appdata);

    return item;
}

function saveItem(){
    const itemName = itemInput.value.trim().toUpperCase();

    if(itemName === "") return;

    if(!activeListId) return;

    createItem(itemName);
    itemInput.value = "";
    itemInput.focus();

    const appData = loadAppData();
    const shoppingList = appData.shoppingLists.find(list => list.id === activeListId);

    if (shoppingList) renderItems(shoppingList);
}



export function openActiveShoppingList(shoppingListId) {
    newList.classList.add("hidden");
    activeShoppingList.classList.remove("hidden");

    const appData = loadAppData();

    const shoppingList = appData.shoppingLists.find(list => list.id === shoppingListId);

    if(!shoppingList) return;

    activeListId = shoppingListId;
    shoppingDate.textContent = formatDate(shoppingList.date);

    renderItems(shoppingList);

    
}

export function initializeActiveList(){

    addItemBtn.addEventListener('click', saveItem);

    itemInput.addEventListener('keydown', (e) =>{
        if(e.key === "Enter"){
            e.preventDefault();
            saveItem();
        }
    });

    shoppingContainer.addEventListener('change', (e) =>{
        if (!e.target.matches("input[data-item-id][data-market-id]")) return;

        const itemId = e.target.dataset.itemId;
        const marketId = e.target.dataset.marketId;
        const price = e.target.value;

        const appData = loadAppData();

        const shoppingList = appData.shoppingLists.find(list => list.id === activeListId);
        if(!shoppingList) return;
        
        const item = shoppingList.items.find(i => i.id === itemId);
        if(!item) return;

        const formattedPrice = price === "" ? null : Number(price);

        item.prices[marketId] = formattedPrice;

        saveAppData(appData);
    });
}