let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);

let lngitudeValue;  // 현재 위도
let latitudeValue;  // 현재 경도
var geoId;
var lastLng = firstlngitudeValue;   // 이전 경도
var lastLat = firstlatitudeValue;   // 이전 위도
var lastResult = result;            // 이전 위치
var intervalobj;
let t=0;

// Test 1 : 소수점 4번째 자리
let lat1 = [37.280003, 37.280103, 37.280203, 37.280303, 37.280403, 37.280503, 37.280603, 37.280703];
let lng1 = [127.046553, 127.046453, 127.046353, 127.046253 ,127.046153, 127.046253, 127.046353, 127.046453];

// Test 2 : 소수점 5번째 자리
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
    latitudeValue = lat2[t];
    lngitudeValue = lng2[t];
    watchLocation();
    lastlng = lngitudeValue;
    lastLat = latitudeValue
    t++;
}

function startWatch() {
    intervalobj = setInterval(test, 1000);
}


function watchLocation() {
    // if (navigator.geolocation) { // GPS를 지원하면
    //     geo_id = navigator.geolocation.getCurrentPosition(function (position) {
    //         lngitudeValue = position.coords.longitude;
    //         latitudeValue = position.coords.latitude;

            getAddress(latitudeValue, lngitudeValue);

            if (lastResult != result) {
                lastResult = result;
                address.innerHTML = result;

                postLatlng(latitudeValue, lngitudeValue);
            }
            latlngsLength=latlngs.length;

            setMarker(latitudeValue, lngitudeValue);
            paintLine(latitudeValue, lngitudeValue);
        // });
    // }
    // else {
    //     alert('GPS를 지원하지 않습니다');
    // }
}


function endwatch() {
    clearInterval(intervalobj);
}