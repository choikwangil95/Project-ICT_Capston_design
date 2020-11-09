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
                    if (lastResult != result) {
                        lastResult = result;
                        address.innerHTML = result;
                        lat.innerHTML = latitudeValue;
                        lng.innerHTML = lngitudeValue;
                    }
                });
            // axios.post('http://127.0.0.1:8000/saveLocation/')
            //     .then((res) => {

            //     });

        });
    }
    else {
        alert('GPS를 지원하지 않습니다');
    }
}


// function changeMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 5,
//         center: currentPosition,
//     });

//     new google.maps.Marker({
//         position: currentPosition,
//         map: map,
//         label: "here"
//     });
// }

function endwatch() {
    clearInterval(intervalobj);
    lng.innerHTML = "종료";
    lat.innerHTML = "종료";
}