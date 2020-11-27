tab.addEventListener("click", displayTab);
tabBlock.addEventListener("click", displayTab);

function displayTab(){
  if(!tabBlock.classList.contains("service__tab--display")){ 
    tabBlock.classList.add("service__tab--display");
    let tabDisplay = document.getElementsByClassName("service__tab--display")[0];
    let login = tabDisplay.getElementsByClassName("login")[0];
    let signin = tabDisplay.getElementsByClassName("signin")[0];
    login.classList.add("login--display");
    signin.classList.add("signin--display");
  }else{
    tabBlock.classList.remove("service__tab--display");
  }
}