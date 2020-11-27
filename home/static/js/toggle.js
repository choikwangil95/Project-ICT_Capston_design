// if (mapSetTitle.classList.contains("setTitle--display")) {
//     mapSetTitle.classList.remove("setTitle--display");
// }
newMap.addEventListener("click", showTitleOrNot);


function showTitleOrNot() {
    if (!mapSetTitle.innerHTML) {
        mapTitle.style.display = 'flex';
        mapTitle_display.style.display = 'flex';

    } else {

        console.log("title already exist");
        //입력한 적 있으면
        window.location = window.location.pathname;
    }
}