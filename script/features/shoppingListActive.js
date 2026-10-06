import { loadAppData, saveAppData } from "../core/localStorage.js";


const itemInput = document.getElementById("item-name");
const addItemBtn = document.getElementById("add-item-btn");

const activeShoppingList = document.getElementById("shopping-list-active");
const newList = document.querySelector(".new-list");
const shoppingDate = document.getElementById("shopping-list-date");





export function openActiveShoppingList(shopppingListId) {
    newList.classList.add("hidden");
    activeShoppingList.classList.remove("hidden");

    const appData = loadAppData();

    const shoppingList = appData.shoppingLists.find(list => list.id === shopppingListId);

    if(!shoppingList) return;

    shoppingDate.textContent = shoppingList.date;
}