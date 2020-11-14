testCase.addEventListener("click", checkBeforeStart);
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);
testDelete.addEventListener("click", deleteMap);

// Test case
function checkBeforeStart() {
    var empty = IsTitleEmpty();
    if (empty) {
        startWatch();
    }
    else {
        //제목 입력안했으면 
    }
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
        postLatlng(latitudeValue, lngitudeValue);
        setMarker(latitudeValue, lngitudeValue);
        paintLine(latitudeValue, lngitudeValue);
    }
    latlngsLength=latlngs.length;
    markersLength=markers.length;
}

function endwatch() {
    clearInterval(intervalobj);
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