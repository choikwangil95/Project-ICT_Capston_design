let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let testPosition1 = document.getElementsByClassName("button__test1")[0];
let testPosition2 = document.getElementsByClassName("button__test2")[0];

position.addEventListener("click", getLocation);
testPosition1.addEventListener("click", paintLine1);
testPosition2.addEventListener("click", paintLine2);

let markers = []; // 지도에 표시되는 marker list -> 각 marker setmap 용도
let latlng;
let latlngs = [];

function getLocation() {
  if (navigator.geolocation) { // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(function(position) {
      let lngitudeValue = position.coords.longitude;
      let latitudeValue = position.coords.latitude;

      latlng = { lat: latitudeValue, lng: lngitudeValue };
      latlngs.push(latlng);

      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitudeValue},${lngitudeValue}&key=AIzaSyDbM2ILxG_n0ScqaBRFcf40fCalno5QX90`)
        .then((res) => {
          let result = res.data.results[0].formatted_address.slice(5);
          address.innerHTML = result;
      });

      let currentPosition = new google.maps.LatLng(latitudeValue, lngitudeValue);
      let currentMarker = new google.maps.Marker({
        position: currentPosition,
        label: "You are Here!"
      });
      
      initMarker.setMap(null);  // default marker 삭제

      map.setZoom(17);
      map.panTo(currentPosition);

      // 현재 위치 marker가 있으면 marker 추가 X
      // 현재 위치 marker는 start 버튼 누를 시 출발점이 된다
      if(markers[0]==null){
        markers.push(currentMarker);
        markers[0].setMap(map);
      }

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

function paintLine1(){

  let lngitudeTest1 = 127.046553;
  let latitudeTest1 = 37.280003;

  let newLatlng = { lat: latitudeTest1, lng: lngitudeTest1 };

  let testPosition1 = new google.maps.LatLng(latitudeTest1, lngitudeTest1);
  let testMarker1 = new google.maps.Marker({
    position: testPosition1,
    label: "test1"
  });

  // 지도 properties edit
  map.setZoom(16);
  map.panTo(testPosition1);

  if (markers[markers.length-1] != testMarker1){
    markers.push(testMarker1);
    let markerIndex = markers.indexOf(testMarker1);
    markers[markerIndex].setMap(map);
  }
  
  for (let i=0; i<latlngs.length; i++){
    if(latlngs[i] == newLatlng){
      break;
    }else if(i == latlngs.length-1){
      latlngs.push(newLatlng);
    }
  }

  console.log(latlngs);

  let path = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  path.setMap(map);

}

function paintLine2() {
  
  let lngitudeTest2 = 127.043553;
  let latitudeTest2 = 37.289013;
  latlng = { lat: latitudeTest2, lng: lngitudeTest2 };

  let testPosition2 = new google.maps.LatLng(latitudeTest2, lngitudeTest2);
  let testMarker2 = new google.maps.Marker({
    position: testPosition2,
    label: "test2"
  });

  map.setZoom(14);

  if (markers[markers.length] != testMarker2){
    markers.push(testMarker2);
    let markerIndex = markers.indexOf(testMarker2);
    markers[markerIndex].setMap(map);
  }
  
  map.panTo(testPosition2);

  latlngs.push(latlng);
  console.log(latlngs);

  let path = new google.maps.Polyline({
    path: latlngs,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  path.setMap(map);
}

// @ To do
let list = [];
list.push(1);
console.log(list);
let test = list.top();
console.log(test);
console.log(list);