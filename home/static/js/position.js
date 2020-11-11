let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let result; // 현재 위치
let firstlngitudeValue;
let firstlatitudeValue;

let testPosition1 = document.getElementsByClassName("button__test1")[0];
let testPosition2 = document.getElementsByClassName("button__test2")[0];

// 테스트 위도, 경도
let lngitudeTest1 = 127.046553; 
let latitudeTest1 = 37.280003;
let lngitudeTest2 = 127.043553;
let latitudeTest2 = 37.289013;

let markers=[]; 
let latlngs=[];
let markersLength;
let latlngsLength;
let latlng;
let path;
let Position, Marker;

position.addEventListener("click", getLocation);
testPosition1.addEventListener("click", paintLine1);
testPosition2.addEventListener("click", paintLine2);

/* @To do
* 1. 현재 위치만 마커 등록하고 위치 변경 시 해당 마커 삭제 (done)
* 2. 현재 위치 마커는 custom 해서 변경  (done)
* 3. zoom은 출발 위치와 종료 위치 거리에 따라 조절
* 4. 현재 위치 marker는 start 버튼 누를 시 출발점이 된다 (gyuri)
*/

// 현재 위치 Get
function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function(position) {
      firstlngitudeValue = position.coords.longitude;
      firstlatitudeValue = position.coords.latitude;
      latlng = { lat: firstlatitudeValue, lng: firstlngitudeValue };
      markersLength=markers.length;
      result = getAddress(firstlatitudeValue, firstlngitudeValue); // 도로명 주소 가져오기 
      address.innerHTML = result;
      initMarker.setMap(null);  // default marker 삭제
      setMarker(firstlatitudeValue, firstlngitudeValue, markersLength);  // 현재 위치 마커 생성 및 지도에 등록
      postLatlng(firstlatitudeValue, firstlngitudeValue)
    }, function(error) {
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
function setMarker(lat, lng, num){
  // @To do 1
  // 위치 변경 시 이전 위치였던 0번째 index marker 삭제
  if(markers[0]!=null){
    markers[0].setMap(null);
  }

  latlng = { lat: lat, lng: lng };
  Position = new google.maps.LatLng(lat, lng);
  Marker = new google.maps.Marker({
    position: Position,
    // @To do 2
    // icon custom
    icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
  });

  map.setZoom(15);
  map.panTo(Position);
  // 현재 위치 marker가 있으면 marker 추가 X
  if(markers[num]==null){
    markers.push(Marker);
    markers[num].setMap(map);
  }

  if(latlngs[num]==null){
    latlngs.push(latlng);
  }
}
// 도로명 주소 가져오기
function getAddress(lat, lng){
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
  .then((res) => {
    result = res.data.results[0].formatted_address.slice(5);
  });

  return result;
}

// 현재 위치 위도 경도 저장
function postLatlng(lat, lng){
  // 403 Error를 위한 처리 
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios({
    method: "POST",
    url: 'now/',
    data: {
      "lngitudeValue": lng,
      "latitudeValue": lat
    },
  }).then(res => {
    console.log(res.data)
  }).catch(error => {
    console.log(error);
  })
}

// 현재 위치와 이동 위치의 선 그어주기
function paintLine(lat, lng){
  latlng = { lat: lat, lng: lng };
  
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
  markersLength=markers.length;
  console.log(markersLength);
  if(markersLength==2){
    markers.shift();
    latlngs.shift();  
  }
}

// 위치 바뀌었을때 선 그어주기
function paintLine1(){
  latlng = { lat: latitudeTest1, lng: lngitudeTest1 };
  markersLength=markers.length;
  getAddress(latitudeTest1, lngitudeTest1);
  setMarker(latitudeTest1, lngitudeTest1, latlng, markersLength);

  // polyline
  let path = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 1,
  });
  path.setMap(map);

  // 출발 marker 및 line 생성된 latlngs 삭제
  markersLength=markers.length;
  if(markersLength==2){
    markers.shift();
    latlngs.shift();  
  }
}

function paintLine2() {
  latlng = { lat: latitudeTest2, lng: lngitudeTest2 };
  markersLength=markers.length;
  console.log(markersLength);

  getAddress(latitudeTest1, lngitudeTest1);
  setMarker(latitudeTest2, lngitudeTest2, latlng, 1);

  // polyline
  let path = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 1,
    });
  path.setMap(map);

  markersLength=markers.length;
  console.log(markersLength);
  if(markersLength==2){
    markers.shift();
    latlngs.shift();  
  }
  console.log(latlngs);
}
