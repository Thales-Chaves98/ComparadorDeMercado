const newListBtn = document.getElementById("new-list-btm");
const marketsBtn = document.getElementById("markets-btn");
const shoppingListsBtn = document.getElementById("shopping-lists-btn");


marketsBtn.addEventListener("click", () => {
    document.querySelector(".markets").classList.remove("hidden");
    document.querySelector(".shopping-lists").classList.add("hidden");
});
shoppingListsBtn.addEventListener("click", () => {
    document.querySelector(".shopping-lists").classList.remove("hidden");
    document.querySelector(".markets").classList.add("hidden");
});