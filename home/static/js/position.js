// Event Add
position.addEventListener("click", getLocation);

// 현재 위치 Get
function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function (position) {
      firstlngitudeValue = position.coords.longitude;
      console.log(firstlngitudeValue);
      firstlatitudeValue = position.coords.latitude;
      console.log(firstlatitudeValue);

      // Test 0 : 소수점 3번째 자리 변화 -> 위치 변화 인식 O
      lat0 = [firstlatitudeValue + 0.001, firstlatitudeValue + 0.005, firstlatitudeValue + 0.002, firstlatitudeValue + 0.001, firstlatitudeValue + 0.005, firstlatitudeValue + 0.006, firstlatitudeValue + 0.007, firstlatitudeValue + 0.008];
      lng0 = [firstlngitudeValue + 0.01, firstlngitudeValue + 0.015, firstlngitudeValue + 0.02, firstlngitudeValue + 0.025, firstlngitudeValue + 0.03, firstlngitudeValue + 0.035, firstlngitudeValue + 0.04, firstlngitudeValue + 0.045];

      latlng = { lat: firstlatitudeValue, lng: firstlngitudeValue };
      addressResult = getAddress(firstlatitudeValue, firstlngitudeValue); // 도로명 주소 가져오기 
      address.innerHTML = addressResult;
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
  // @To do 1
  // 위치 변경 시 이전 위치였던 0번째 index marker 삭제

  if (markers[0] != null) {
    markers[0].setMap(null);
  }

  latlng = { lat: lat, lng: lng };
  Position = new google.maps.LatLng(lat, lng);

  //start위치에서 start마커 추가
  if (flag == 0) {
    startMarker = new google.maps.Marker({
      position: Position,
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    });
    startMarker.setMap(map)
    flag += 1
  }

  Marker = new google.maps.Marker({
    position: Position,
    // @To do 2
    // icon custom
    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
  });

  map.setZoom(15);
  map.panTo(Position);
  // 현재 위치 marker가 있으면 marker 추가 X
  if (markers[1] == null) {
    markers.push(Marker);
    markers[1].setMap(map);
    markers.shift();
  }

  if (latlngs[latlngsLength] == null) {
    latlngs.push(latlng);
  }
}
//End버튼 눌렀을 때 End marker 추가
function setEndMarker(lat, lng) {
  latlng = { lat: lat, lng: lng };
  Position = new google.maps.LatLng(lat, lng);
  endMarker = new google.maps.Marker({
    position: Position,
    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  });
  endMarker.setMap(map)
  mapGetTitle = mapSetTitle.innerText
  setZoom(mapGetTitle)
}
//End 버튼 누르고 최종 지도 zoom 조절
function setZoom(title) {
  mapId = getMapId(title).then(data => {
    axios({
      method: "GET",
      url: `new_route/setzoom/${data}/`
    }).then(function (res) {
      var data = res.data.zoom;
      console.log(res)
      map.setZoom(data)
      // Position = new google.maps.LatLng(lat, lng);
      var middlelat = res.data.middlelat;
      var middlelon = res.data.middlelon;
      var location = new google.maps.LatLng(middlelat, middlelon);
      map.setCenter(location);
    }).catch(error => {
      console.log(error);
    })
  })
}
// 도로명 주소 가져오기
function getAddress(lat, lng) {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
    .then((res) => {
      result = res.data.results[0].formatted_address.slice(5);
      address.innerHTML = result;
    });
}
// 현재 위치 위도 경도 저장
function postLatlng(lat, lng, title) {
  // 403 Error를 위한 처리 
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  mapId = getMapId(title).then(data => {
    axios({
      method: "POST",
      url: `new_route/now/${data}/`,
      data: {
        "lngitudeValue": lng,
        "latitudeValue": lat
      },
    }).then(res => {
      console.log(res.data)
    }).catch(error => {
      console.log(error);
    })
  })
}
// 현재 위치와 이동 위치의 선 그어주기
function paintLine(lat, lng) {
  latlng = { lat: lat, lng: lng };
  latlngs.push(latlng);

  // draw polyline
  path = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 1,
  });
  path.setMap(map);

  // 출발 marker 및 line 생성된 latlngs 삭제
  latlngsLength = latlngsLength;
  if (latlngsLength == 2) {
    latlngs.shift();
  }
}
// title에 해당하는 지도 id 가져오기
function getMapId(title) {
  // 403 Error를 위한 처리 
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  return axios({
    method: "GET",
    url: `new_route/get_mapid/${encodeURI(title, "UTF-8")}/`,
  }).then(function (response) {
    mapId = response.data.data.map_id
    return response.data.data.map_id
  })
}
