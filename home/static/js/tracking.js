let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
var lat = document.getElementById("lat");
var lng = document.getElementById("lng");
start.addEventListener("click", startwatch);
end.addEventListener("click", endwatch);
let lngitudeValue;
let latitudeValue;
var geoId;
var lastLng = firstlngitudeValue;
var lastLat = firstlatitudeValue;
var lastResult = result;
var intervalobj;

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
                lat.innerHTML = lastLat;
                lng.innerHTML = lastLng;

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
    lng.innerHTML = "종료";
    lat.innerHTML = "종료";
}