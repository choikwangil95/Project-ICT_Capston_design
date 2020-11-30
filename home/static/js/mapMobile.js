function initMap() {
  defaultPosition = new google.maps.LatLng(seoulLat, seoulLng);

  mapMobile = new google.maps.Map(document.getElementById('map--mobile'), {
    zoom: 13,
    center: defaultPosition
  });

  initMarker = new google.maps.Marker({
    position: defaultPosition,
    label: "Seoul"
  });

  markers.push(initMarker);
  initMarker.setMap(mapMobile);
}

initMap();
