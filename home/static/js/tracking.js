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
    watchLocation();
    lastlng = lngitudeValue;
    lastLat = latitudeValue
    t++;
    if (t == 7) {
        clearInterval(intervalobj);
    }
}

function startWatch() {
    intervalobj = setInterval(test, 1000);
}

function watchLocation() {
    getAddress(latitudeValue, lngitudeValue);
    if (lastResult != result) {
        lastResult = result;
        mapGetTitle = mapSetTitle.innerText;
        postLatlng(latitudeValue, lngitudeValue, mapGetTitle);
        setMarker(latitudeValue, lngitudeValue);
        paintLine(latitudeValue, lngitudeValue);
    }
    latlngsLength = latlngs.length;
    markersLength = markers.length;
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
        uploadPhotoButton.style.display = 'flex';
        imageFile.style.display = 'flex';
        newRouteButton.style.display = 'flex';

    }
}
