const seoulLat = 37.5642135;
const seoulLng = 127.0016985;
let defaultPosition = { lat: seoulLat ,lng: seoulLng };
let map;
let initMarker;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: defaultPosition
  });
  
  initMarker = new google.maps.Marker({
    position: defaultPosition,
    label: "Default"
  });

  initMarker.setMap(map);
}

initMap();
