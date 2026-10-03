import { loadAppData, saveAppData } from "../core/localStorage.js";

const appData = loadAppData();

let markets = appData.markets;

const newListBtn = document.getElementById("new-list-btn");

const listAction = document.querySelector(".new-list-action");
const listContainer = document.querySelector(".new-list-container");

const cancelListBtn = document.getElementById("cancel-list-btn");
const saveListBtn = document.getElementById("save-list-btn");

export function initializeShoppingLists(){
    
    newListBtn.addEventListener('click', () =>{
        listAction.classList.add("hidden");
        listContainer.classList.remove("hidden");
    });
    
    cancelListBtn.addEventListener('click', () =>{
        listAction.classList.remove("hidden");
        listContainer.classList.add("hidden");
    });

} 