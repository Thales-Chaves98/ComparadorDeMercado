import { loadAppData, saveAppData } from "../core/localStorage.js";

const itemInput = document.getElementById("item-name");
const addItemBtn = document.getElementById("add-item-btn");

const activeShoppingList = document.getElementById("shopping-list-active");
const newList = document.querySelector(".new-list");
const shoppingDate = document.getElementById("shopping-list-date");

const shoppingTable = document.getElementById("shopping-list-table");

let activeListId = null;

function formatDate(date) {
    if(!date) return "";

    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

function renderItems(shoppingList){ /*JUST TESTING CHANGE TO TABLE LATER*/
    if(!shoppingTable) return;

    shoppingTable.innerHTML = "";

    if (shoppingList.items.length === 0) {
        shoppingTable.innerHTML = `<p class="empty-items">Nenhum item ainda.</p>`;
        return;
    }

    shoppingList.items.forEach(item => {
        shoppingTable.innerHTML += `
            <div class="item" data-id="${item.id}">
                <span class="item-name">${item.itemName}</span>
                <span class="item-price">${item.itemPrice ?? "—"}</span>
            </div>
        `;
    });
}

function createItem(itemName){
    const appdata = loadAppData();

    const shoppingList = appdata.shoppingLists.find(list => list.id === activeListId);

    if(!shoppingList) return null;

    const item = {
        id: crypto.randomUUID(),
        itemName: itemName,
        itemPrice: null
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
}