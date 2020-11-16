testCase.addEventListener("click", confirmTest);

function checkBeforeTest() {
  var empty = IsTitleTest();
  if (empty) {
      startTest();
  }
  else {
      //제목 입력안했으면 
  }
}
function IsTitleTest() {
  var title = document.getElementById("title__input").value;
  if (!title) {
      alert("제목을 입력하세요!");
      return false;
  }
  else return true;
}
function startTest() {
  intervalobj = setInterval(test, 1000);
}
function test(){
  latitudeValue = lat0[t];
  lngitudeValue = lng0[t];
  watchTest();
  lastlng = lngitudeValue;
  lastLat = latitudeValue
  t++;
  if(t==7){
      clearInterval(intervalobj);
  }
}
function watchTest() {
  if (lastResult != result) {
      lastResult = result;
      getAddress(latitudeValue, lngitudeValue);
      mapGetTitle = mapSetTitle.innerText
      postLatlng(latitudeValue, lngitudeValue, mapGetTitle);
      setMarker(latitudeValue, lngitudeValue);
      paintLine(latitudeValue, lngitudeValue);
  }
  latlngsLength=latlngs.length;
  markersLength=markers.length;
}
function confirmTest(){
  let cfStart = confirm('Test를 시작하시겠습니까 ?')
  if(cfStart){
      checkBeforeTest();
  }
}
