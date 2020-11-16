newMap.addEventListener("click", toggleTitle);

function toggleTitle(){
  if(mapTitle.classList.contains("title--display")){
    mapTitle.classList.remove("title--display");
  }else{
    if(!mapSetTitle.classList.contains("setTitle--display"))
    mapTitle.classList.add("title--display");
  }
}

if(mapSetTitle.classList.contains("setTitle--display")){
  mapSetTitle.classList.remove("setTitle--display");
}
