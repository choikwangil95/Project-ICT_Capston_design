testCase.addEventListener("click", confirmStart);
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);
testDelete.addEventListener("click", deleteMap);

// Test 0 : 소수점 3번째 자리 변화 -> 위치 변화 인식 O
lat0 = [37.280003, 37.281003, 37.282003, 37.283003, 37.284003, 37.285003, 37.286003, 37.287003];
lng0 = [127.046553, 127.046553, 127.046553, 127.046553 ,127.046553, 127.046553, 127.046553, 127.046553];

// Test case
function checkBeforeStart() {
    var empty = IsTitleEmpty();
    if (empty) {
        startWatch();
    }
    else {
        //제목 입력안했으면 
    }
    // startWatch();
}

function IsTitleEmpty() {
    var title = document.getElementById("title__input").value;
    if (!title) {
        alert("제목을 입력하세요!");
        return false;
    }
    else return true;
}

function test(){
    latitudeValue = lat0[t];
    lngitudeValue = lng0[t];
    watchLocation();
    lastlng = lngitudeValue;
    lastLat = latitudeValue
    t++;
    if(t==7){
        clearInterval(intervalobj);
    }
}

function startWatch() {
    intervalobj = setInterval(test, 1000);
}

function watchLocation() {
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

function endwatch() {
    setEndMarker(latitudeValue, lngitudeValue);
    clearInterval(intervalobj);
}

function confirmStart(){
    let cfStart = confirm('여행을 시작하시겠습니까 ?')
    if(cfStart){
        checkBeforeStart();
    }
}

/* @To do
* 1 이동경로 종료 시 지도에 등록된 마커와 선 삭제하는 delete 함수
* 2 DB에 저장된 위도 경도를 바탕으로 지도에 마커랑 선 표시하는 get함수
*/

function deleteMap(map_id){
    
    return axios.get(`delete/${map_id}`)
        .then(
            function(response){
                console.log(response.data);
            }
        )
}

function getMap(){

}