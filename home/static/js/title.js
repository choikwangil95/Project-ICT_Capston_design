// Add Event
inputTitle.addEventListener("onkeyup", getTitle);
mapButton.addEventListener("click", confirmTitle);

function getTitle() {
  cfTitle = inputTitle.value;
}
function setTitle(text) {
  mapSetTitle_p = document.createElement("p");
  mapSetTitle_p.innerHTML = text;
  mapSetTitle.appendChild(mapSetTitle_p);
  getTitleName.classList.add("setTitle--display");
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
    mapTitle.style.display = 'none';
    setTitle(title);
  }).catch(error => {
    console.log(error);
  })
}

