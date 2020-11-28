// 맵 가져오기
function initMap() {
  defaultPosition = new google.maps.LatLng(seoulLat, seoulLng);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: defaultPosition
  });

  mapMobile = new google.maps.Map(document.getElementById('map--mobile'), {
    zoom: 13,
    center: defaultPosition
  });

  initMarker = new google.maps.Marker({
    position: defaultPosition,
    label: "Default"
  });
  markers.push(initMarker);
  initMarker.setMap(map);
  initMarker.setMap(mapMobile);
}

initMap();
