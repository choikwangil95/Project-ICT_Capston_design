const seoulLat = 37.5642135;
const seoulLng = 127.0016985;
let defaultPosition;
let map;
let initMarker;

function initMap() {
  defaultPosition = new google.maps.LatLng(seoulLat, seoulLng);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: defaultPosition
  });
  
  initMarker = new google.maps.Marker({
    position: defaultPosition,
    label: "Default"
  });

  markers.push(initMarker);
  initMarker.setMap(map);
}

initMap();
