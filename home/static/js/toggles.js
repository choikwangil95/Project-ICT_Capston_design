tab.addEventListener("click", displayTab);
tabClose.addEventListener("click", displayTab);
buttonNewmap.addEventListener("click", displayTab);
buttonTest.addEventListener("click", displayTab);
label.addEventListener("click", displayTab);
buttonDelete.addEventListener("click", displayTab);
buttonTest.addEventListener("click", startDisplay);
buttonStart.addEventListener("click", displayTab);
buttonList.addEventListener("click", startDisplay);

function displayTab(){
  if(tabBlock.classList.contains("service__tab--display")){ 
    tabBlock.classList.remove("service__tab--display");
    buttonNewmap.classList.remove("button__newMap--display");
    buttonTest.classList.remove("button__test--display");
    buttonDelete.classList.remove("button__delete--display");
    buttonStart.classList.remove("button__start--display");
    buttonList.classList.remove("button__list--display");
    form.classList.remove("filebox--display");
  }else{
    tabBlock.classList.add("service__tab--display");
    let tabDisplay = document.getElementsByClassName("service__tab--display")[0];
    let login = tabDisplay.getElementsByClassName("login")[0];
    let signin = tabDisplay.getElementsByClassName("signin")[0];
    let panel = tabDisplay.getElementsByClassName("pannel")[0];
    form.classList.add("filebox--display");
    panel.classList.add("pannel--display");
    login.classList.add("login--display");
    signin.classList.add("signin--display");
    buttonStart.classList.add("button__start--display");
    buttonList.classList.add("button__list--display");
    buttonNewmap.classList.add("button__newMap--display");
    buttonTest.classList.add("button__test--display");
    buttonDelete.classList.add("button__delete--display");
  }
}

function startDisplay(){
  if (startMobile.classList.contains("button__start--mobile--none")){
    startMobile.classList.remove("button__start--mobile--none");
  }else{
    startMobile.classList.add("button__start--mobile--none");
  }
}