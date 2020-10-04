let position = document.getElementsByClassName("button__position")[0];
let longitude = document.getElementsByClassName("location__long")[0];
let latitude = document.getElementsByClassName("location__lat")[0];

position.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function(position) {
      let longitudeValue = position.coords.latitude;
      let latitudeValue = position.coords.longitude;
      longitude.innerHTML = longitudeValue;
      latitude.innerHTML = latitudeValue;
    }, function(error) {
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