tab.addEventListener("click", displayTab);
tabClose.addEventListener("click", displayTab);
if(label){
  label.addEventListener("click", displayTab);
}
if(buttonNewmap){
  buttonNewmap.addEventListener("click", displayTab);
}
if(buttonTest){
  buttonTest.addEventListener("click", startDisplay);
  buttonTest.addEventListener("click", displayTab);
}
if(buttonDelete){
  buttonDelete.addEventListener("click", displayTab);
}
if(buttonStart){
  buttonStart.addEventListener("click", displayTab);
}
if(buttonList){
  buttonList.addEventListener("click", displayTab);
}
if(form){

}

function displayTab(){
  if(tabBlock.classList.contains("service__tab--display")){
    tabBlock.classList.remove("service__tab--display");
    if(buttonNewmap){
      buttonNewmap.classList.remove("button__newMap--display");
    }
    if(buttonTest){
      buttonTest.classList.remove("button__test--display");
    }
    if(buttonDelete){
      buttonDelete.classList.remove("button__delete--display");
    }

    if(buttonStart){
      buttonStart.classList.remove("button__start--display");
    }
    if(buttonList){
      buttonList.classList.remove("button__list--display");
    }
    if(form){
      form.classList.remove("filebox--display");
    }
  }else{
    tabBlock.classList.add("service__tab--display");
    let tabDisplay = document.getElementsByClassName("service__tab--display")[0];
    let login = tabDisplay.getElementsByClassName("login")[0];
    let signup = tabDisplay.getElementsByClassName("signup")[0];
    let logout = tabDisplay.getElementsByClassName("logout")[0];
    let myid = tabDisplay.getElementsByClassName("myid")[0];
    let panel = tabDisplay.getElementsByClassName("pannel")[0];
    panel.classList.add("pannel--display");
    if(buttonNewmap){
      buttonNewmap.classList.add("button__newMap--display");
    }
    if(buttonTest){
      buttonTest.classList.add("button__test--display");
    }
    if(buttonDelete){
      buttonDelete.classList.add("button__delete--display");
    }
    if(buttonStart){
      buttonStart.classList.add("button__start--display");
    }
    if(buttonList){
      buttonList.classList.add("button__list--display");
    }
    if(form){
      form.classList.add("filebox--display");
    }
    if(login){
      login.classList.add("login--display");
    }
    if(signup){
      signup.classList.add("signup--display");
    }
    if(logout){
      logout.classList.add("logout--display");
    }
    if(myid){
      myid.classList.add("myid--display");
    }
  }
}

function startDisplay(){
  if (startMobile.classList.contains("button__start--mobile--none")){
    if(startMobile){
      startMobile.classList.remove("button__start--mobile--none");
    }
  }else{
    if(startMobile){
      startMobile.classList.add("button__start--mobile--none");
    }
  }
}