// Event Add
start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);

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

        if (lastResult != result) {
            lastResult = result;
            getAddress(latitudeValue, lngitudeValue);
            mapGetTitle = mapSetTitle.innerText
            postLatlng(latitudeValue, lngitudeValue, mapGetTitle);
            setMarker(latitudeValue, lngitudeValue);
            paintLine(latitudeValue, lngitudeValue);
            latlngsLength=latlngs.length;
            markersLength=markers.length;
        }else{
            console.log("위치가 같음");
        }
    }, function(error) {
        console.error(error);
    }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
    });
}
function endwatch() {
    clearInterval(intervalobj);
}
function confirmStart(){
    let cfStart = confirm('여행을 시작하시겠습니까 ?')
    if(cfStart){
        checkBeforeStart();
    }
}
