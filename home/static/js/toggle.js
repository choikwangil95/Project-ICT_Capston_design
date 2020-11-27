// if (mapSetTitle.classList.contains("setTitle--display")) {
//     mapSetTitle.classList.remove("setTitle--display");
// }
newMap.addEventListener("click", showTitleOrNot);


function showTitleOrNot() {
    if (!getTitleName.value) {
        //제목 입력한 적 없으면
        mapTitle_display.style.display = 'flex';
    } else {
        console.log("title already exist");
        //입력한 적 있으면
        // window.location.href = "{%url 'home'%}"
    }
}