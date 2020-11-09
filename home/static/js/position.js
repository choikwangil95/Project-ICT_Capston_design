let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let result;
let firstlngitudeValue;
let firstlatitudeValue;

position.addEventListener("click", getLocation, changeMap);

function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function (position) {
      firstlngitudeValue = position.coords.longitude;
      firstlatitudeValue = position.coords.latitude;

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitudeValue},${lngitudeValue}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
        .then((res) => {
          result = res.data.results[0].formatted_address.slice(5);
          address.innerHTML = result;
        });

      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

      axios({
        method: "POST",
        url: 'now/',
        data: {
          "lngitudeValue": firstlngitudeValue,
          "latitudeValue": firstlatitudeValue
        },
      }).then(res => {
        console.log(res.data)
        alert("res request success");
      })
        .catch(error => {
          console.log(error);
          alrert("connection has error");
        })






      let currentPosition = new google.maps.LatLng(latitudeValue, lngitudeValue);
      let currentMarker = new google.maps.Marker({
        position: currentPosition,
        map: map,
        label: "You are Here!"
      });

      map.panTo(currentPosition, currentMarker);
      map.setZoom(17);

    }, function (error) {
      console.error(error);
    }, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  } else {
    alert('GPS를 지원하지 않습니다');
  }
}

function changeMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: currentPosition,
  });

  new google.maps.Marker({
    position: currentPosition,
    map: map,
    label: "here"
  });
}
