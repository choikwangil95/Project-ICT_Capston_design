let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];

start.addEventListener("click", checkBeforeStart);
end.addEventListener("click", endwatch);
let lngitudeValue;
let latitudeValue;
var geoId;
var lastLng = firstlngitudeValue;
var lastLat = firstlatitudeValue;
var lastResult = result;
var intervalobj;


function checkBeforeStart() {
    var empty = IsTitleEmpty();
    if (!empty) {
        startwatch();
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

function startwatch() {
    intervalobj = window.setInterval('watchLocation()', 10000);
}

function watchLocation() {

    if (navigator.geolocation) { // GPS를 지원하면
        geo_id = navigator.geolocation.getCurrentPosition(function (position) {
            lngitudeValue = position.coords.longitude;
            latitudeValue = position.coords.latitude;
            console.log(lngitudeValue);

            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitudeValue},${lngitudeValue}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
                .then((res) => {
                    result = res.data.results[0].formatted_address.slice(5);
                    console.log(res.data.results);

                });

            if (lastResult != result) {
                lastResult = result;
                address.innerHTML = lastResult;
                lastLng = lngitudeValue;
                lastLat = latitudeValue;


                axios.defaults.xsrfCookieName = 'csrftoken'
                axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

                axios({
                    method: "POST",
                    url: 'now/',
                    data: {
                        "lngitudeValue": lastLng,
                        "latitudeValue": lastLat
                    },
                }).then(res => {
                    console.log(res.data)
                    alert("res request success");
                })
                    .catch(error => {
                        console.log(error);
                        alrert("connection has error");
                    })
            }


        });
    }
    else {
        alert('GPS를 지원하지 않습니다');
    }
}


function endwatch() {
    clearInterval(intervalobj);

}