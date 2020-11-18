// Event Add
mapButton.addEventListener("click", confirmTitle);
inputTitle.addEventListener("onkeyup", getTitle);

// 맵 가져오기
function initMap() {
  defaultPosition = new google.maps.LatLng(seoulLat, seoulLng);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: defaultPosition
  });
  
  initMarker = new google.maps.Marker({
    position: defaultPosition,
    label: "Default"
  });

  markers.push(initMarker);
  initMarker.setMap(map);
}
initMap();

/* @ To do
* 지도 생성 및 제목 저장 (새 여행 시작하기 버튼 누르게 되면~)
* 0 toggle title
* 1 onkeyup -> get title
* 3 Confirm Title
* 4 Create map
* 5 setTitle  
*/ 
function getTitle(){
  cfTitle = inputTitle.value;
}
function setTitle(text){
  mapSetTitle_p=document.createElement("p");
  mapSetTitle_p.innerHTML = text;
  mapSetTitle.appendChild(mapSetTitle_p);
  getTitleName.classList.add("setTitle--display");
  mapTitle.classList.remove("title--display");
}
function confirmTitle(){
  ctResult = confirm(`'${cfTitle}' 제목으로 지도 생성 하시겠습니까?`);
  if(ctResult){
    createMap(cfTitle);
  }
}
function createMap(title){
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
    setTitle(title);
  }).catch(error => {
    console.log(error);
  })
}