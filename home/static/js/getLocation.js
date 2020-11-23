position.addEventListener("click", getLocation);

// 현재 위치 Get
function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function (position) {
      firstlngitudeValue = position.coords.longitude;
      firstlatitudeValue = position.coords.latitude;
      latlng = { lat: firstlatitudeValue, lng: firstlngitudeValue };
      getAddress(firstlatitudeValue, firstlngitudeValue); // 도로명 주소 가져오기 
      initMarker.setMap(null);  // default marker 삭제
      setMarker(firstlatitudeValue, firstlngitudeValue);  // 현재 위치 마커 생성 및 지도에 등록
    }, function (error) {
      console.error(error);
    }, {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity
    });
  } else {
    /* @ To do
    * 사용자가 실수로 GPS 위치 허용 거절 누르면
    * 다시 허용할 수 있도록 해야 함
    */
    alert('GPS를 지원하지 않습니다');
  }
}
// 마커 생성 및 지도에 등록
function setMarker(lat, lng) {
  latlng = { lat: lat, lng: lng };
  Position = new google.maps.LatLng(lat, lng);
  Marker = new google.maps.Marker({
    position: Position,
    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
  });

  if (markers[0] != null) {
    markers.shift();
    markers.push(Marker);
    markers[0].setMap(map);
  }
  if (markers[0] != null && Marker != markers[0]){
    markers[0].setMap(null);
    markers.shift();
    markers.push(Marker);
    markers[0].setMap(map);
  }
  map.setZoom(15);
  map.panTo(Position);
}
// 도로명 주소 가져오기
function getAddress(lat, lng) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
    .then((res) => {
      result = res.data.results[0].formatted_address.slice(5);
      address.innerHTML = result;
    });
}
