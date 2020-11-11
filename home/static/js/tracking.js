let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);

let lngitudeValue;  // 현재 경도
let latitudeValue;  // 현재 위도
var geoId;
var lastLng = firstlngitudeValue;   // 이전 경도
var lastLat = firstlatitudeValue;   // 이전 위도
var lastResult = result;            // 이전 위치
var intervalobj;

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

function startWatch() {
    intervalobj = setInterval(watchLocation, 1000);
}

function watchLocation() {
    navigator.geolocation.getCurrentPosition( function(position) {
        lngitudeValue = position.coords.longitude;
        latitudeValue = position.coords.latitude;
        getAddress(latitudeValue, lngitudeValue);
    }, function(error) {
        console.error(error);
    }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
    });

    if (lastResult != result) {
        lastResult = result;
        setMarker(latitudeValue, lngitudeValue);
        paintLine(latitudeValue, lngitudeValue);    
        postLatlng(latitudeValue, lngitudeValue);
    }
    markersLength=markers.length;
    latlngsLength=latlngs.length;
}

function endwatch() {
    clearInterval(intervalobj);
}