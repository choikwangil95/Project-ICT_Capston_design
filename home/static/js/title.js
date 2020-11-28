// Add Event
// inputTitle.addEventListener("onkeyup", getTitle);
// mapButton.addEventListener("click", confirmTitle);
if(createMapTitle){
  createMapTitle.addEventListener("click", promptTitle);
}
function getTitle() {
  cfTitle = inputTitle.value;
}
function setTitle(text) {
  mapSetTitle_p = document.createElement("p");
  mapSetTitle_p.innerHTML = text;
  mapSetTitle.appendChild(mapSetTitle_p);
  getTitleName.classList.add("setTitle--display");
  mapTitle.classList.remove("title--display");
}
function confirmTitle() {
  ctResult = confirm(`'${cfTitle}' 제목으로 지도 생성 하시겠습니까?`);
  if (ctResult) {
    createMap(cfTitle);
  }
}
function createMap(title) {
  // 403 Error를 위한 처리 
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios({
    method: "POST",
    url: 'create_map/',
    data: {
      "title": title,
    },
  }).then(res => {
    console.log(res);
    // mapTitle.style.display = 'none';
    // setTitle(title);
  }).catch(error => {
    console.log(error);
  })
}
function promptTitle(){
  if(startMobile.style.display=='none'){
    startMobile.style.display='flex';
  }
  promTitle=prompt('여행 제목을 입력해주세요', '');
  if (promTitle==null){
   alert("여행 제목을 입력하지 않았습니다."); 
  }else{
    console.log(promTitle);
    ctResult = confirm(`'${promTitle}' 제목으로 지도 생성 하시겠습니까?`);
    if (ctResult) {
      createMap(promTitle);
      mapTitleMobile.classList.add("map__title--mobile--display");
      mapSetTitle_p = document.createElement("p");
      mapSetTitle_p.innerHTML = promTitle;
      mapTitleMobile.appendChild(mapSetTitle_p);
    }else{
      alert("지도가 생성되지 않았습니다."); 
    }
  }
}