testCase.addEventListener("click", displayTest);
testMobile.addEventListener("click", confirmTest);
testEndMobile.addEventListener("click", endTest);

function displayTest(){
  if(startMobile.style.display == 'flex'){
    startMobile.style.display = 'none';
  }
  testMobile.classList.add("button__test--mobile--display");
}
function checkBeforeTest() {
  let empty = IslocationTest();
  if (empty) {
    testMobile.classList.remove("button__test--mobile--display");
    endMobile.classList.add("button__end--mobile--display");
    startTest();
  }
  else {
      //제목 입력안했으면 
  }
}
function IslocationTest() {
  console.log(addressMobile.innerHTML);
  if (!addressMobile.innerHTML) {
      alert("현재 위치를 확인하세요");
      return false;
  }
  else return true;
}
function startTest() {
  testintervalobj = setInterval(test, 500);
}
function test(){
  latitudeValue = lat0[t];
  lngitudeValue = lng0[t];
  watchTest();
  t++;
  if(t==9){
    endTest();
  }
}
function watchTest() {
  getAddress(latitudeValue, lngitudeValue);
  if (lastResult != result) {
      lastResult = result;
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
function endTest() {
  // setEndMarker(latitudeValue, lngitudeValue);
  alertEndTest();
}
function alertEndTest() {
  alert("Test를 종료합니다.");
  testMobile.classList.add("button__test--mobile--display");
  endMobile.classList.remove("button__end--mobile--display");
  clearInterval(testintervalobj);
}