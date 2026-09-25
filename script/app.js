const main = document.querySelector('main');


main.addEventListener('click', (e) =>{

    const targetView = e.target.dataset.view;
    if(targetView){
        showView(targetView);
    } else if(e.target.classList.contains('back-home')){
        showView('home');
    }
});



function showView(viewId) {
    const views = document.querySelectorAll('main section');

    views.forEach(v => {
        v.classList.add('hidden');
    });

    const viewToShow = document.getElementById(viewId);

    viewToShow.classList.remove('hidden');

}



