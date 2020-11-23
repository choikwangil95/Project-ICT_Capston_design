// Event Add
start.addEventListener("click", confirmStart);
end.addEventListener("click", endwatch);

// Test case
function checkBeforeStart() {
    var notempty = IsTitleEmpty();
    if (notempty) {
        start.style.display = 'none';
        end.style.display = 'flex';
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

function test() {
    latitudeValue = lat0[t];
    lngitudeValue = lng0[t];
    watchLocation(latitudeValue, lngitudeValue);
    t++;
    if (t == 7) {
        clearInterval(intervalobj);
    }
}

function startWatch() {
    intervalobj = setInterval(test, 100);
}

function watchLocation(lat, lng) {
    getAddress(lat, lng);
    if (lastResult != result) {
        mapGetTitle = mapSetTitle.innerText;
        postLatlng(lat, lng, mapGetTitle);
        setMarker(lat, lng);
        paintLine(lat, lng);
    }else{
        console.log("위치가 같음");
    }
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
        end.style.display = 'none';
        imageFile.style.display = 'flex';
        newRouteButton.style.display = 'flex';
    }
}
