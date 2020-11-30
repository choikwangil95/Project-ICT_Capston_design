// Event Add
// start.addEventListener("click", confirmStart);
// end.addEventListener("click", endwatch);
startMobile.addEventListener("click", confirmStart);
endMobile.addEventListener("click", endwatch);

function checkBeforeStart() {
    let notempty = IsTitleEmpty();
    if (notempty) {
        startMobile.style.display = 'none';
        endMobile.classList.add("button__end--mobile--display");
        // start.style.display = 'none';
        // end.style.display = 'flex';
        startWatch();
    }
    else {
        //제목 입력안했으면 
    }
}
function IsTitleEmpty() {
    // let title = document.getElementById("title__input").value;
    let checktitleMobile = mapTitleMobile.getElementsByTagName("p")[0]
    if(!checktitleMobile){
        alert("로그인을 하고 지도를 생성하세요!");
        return false;
    }else if (!checktitleMobile.innerHTML) {
        alert("제목을 입력하세요!");
        return false;
    }
    else return true;
}
function startWatch() {
    intervalobj = setInterval(watchLocation, 10000);
}
function watchLocation() {
    navigator.geolocation.getCurrentPosition( function(position) {
        lngitudeValue = position.coords.longitude;
        latitudeValue = position.coords.latitude;

        getAddress(latitudeValue, lngitudeValue);
        if (lastResult != result) {
            lastResult = result;
            let checktitleMobile = mapTitleMobile.getElementsByTagName("p")[0].innerHTML;
            console.log(checktitleMobile);
            if(checktitleMobile){
                postLatlng(latitudeValue, lngitudeValue, checktitleMobile);
            }
            setMarker(latitudeValue, lngitudeValue);
            paintLine(latitudeValue, lngitudeValue);
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
    setEndMarker(latitudeValue, lngitudeValue);
    confirmEnd();
}
function confirmStart() {
    let cfStart = confirm('여행을 시작하시겠습니까 ?')
    if (cfStart) {
        checkBeforeStart();
    }
}
function confirmEnd() {
    let cfEnd = confirm("여행을 종료하시겠습니까?");
    if (cfEnd) {
        clearInterval(intervalobj);
        startMobile.style.display = 'flex';
        endMobile.classList.remove("button__end--mobile--display");
        // end.style.display = 'none';
        // imageFile.style.display = 'flex';
        // newRouteButton.style.display = 'flex';
    }
}