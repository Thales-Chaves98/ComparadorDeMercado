const mainScreen = document.querySelector("main");
const newListBtn = document.querySelector(".new-list-btn");
const newMarketBtn = document.querySelector(".markets-btn");



mainScreen.addEventListener("click", (e) =>{
    let targetBtn = e.target.document.querySelector("button");
    console.log(targetBtn);

    if(targetBtn.contains("new-list-btn")){
        newListBtn.classList.remove("hidden");
    } else if(targetBtn.contains("markets-btn")){
        newMarketBtn.classList.remove("hidden");
    }
});