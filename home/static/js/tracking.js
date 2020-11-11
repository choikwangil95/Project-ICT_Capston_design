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

let lat = [37.280003, 37.281003, 37.282003, 37.283003, 37.284003];
let lng = [127.046553, 127.056553, 127.066553, 127.076553 ,127.086553];

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
    latitudeValue = lat[t];
    lngitudeValue = lng[t];
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