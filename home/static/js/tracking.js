let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);

let lngitudeValue, latitudeValue;  // 현재 위도, 경도
var geoId; // ?
var lastLng = firstlngitudeValue;   // 이전 경도
var lastLat = firstlatitudeValue;   // 이전 위도
var lastResult = result;            // 이전 위치
var intervalobj;
let t=0;

/* @To do
* Test case 1) 도로명 주소로 위치 변화 확인 시 위치 변화가 어떻게 일어나는지 확인
* Test0 -> 소수점 3번째 자리 변화에 따라 도로명 주소로 위치 변화 확인
* 
* Test case 2) 위치 변화가 미세하게 일어날 때 지도에 선이 어떻게 그어지는지 확인
* Test1, Test2 -> 변화가 미세하게 일어나도 선이 깔끔하게 표현됨
*/

// Test 0 : 소수점 3번째 자리 변화 -> 위치 변화 인식 O
let lat0 = [37.280003, 37.281003, 37.282003, 37.283003, 37.284003, 37.285003, 37.286003, 37.287003];
let lng0 = [127.046553, 127.046553, 127.046553, 127.046553 ,127.046553, 127.046553, 127.046553, 127.046553];

// Test 1 : 소수점 4번째 자리 변화 -> 위치 변화 인식 X
let lat1 = [37.280003, 37.280103, 37.280203, 37.280303, 37.280403, 37.280503, 37.280603, 37.280703];
let lng1 = [127.046553, 127.046453, 127.046353, 127.046253 ,127.046153, 127.046253, 127.046353, 127.046453];

// Test 2 : 소수점 5번째 자리 변화 -> 위치 변화 인식 X
let lat2 = [37.280003, 37.280013, 37.280023, 37.280033, 37.280043, 37.280053, 37.280063, 37.280073];
let lng2 = [127.046053, 127.046063, 127.046073, 127.046083 ,127.046093, 127.046003, 127.046013, 127.046023];

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
    latitudeValue = lat1[t];
    lngitudeValue = lng1[t];
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
