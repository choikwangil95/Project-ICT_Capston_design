let detailTitle = document.getElementsByClassName("map__title")[0];
let detailTitle_p = detailTitle.getElementsByTagName("p")[0].innerHTML;

function getMapData(title){
  // 403 Error를 위한 처리 
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';

  axios({
    method: "GET",
    url: `get_mapdata/${encodeURI(title, "UTF-8")}`,
  }).then(function (response) {
    let latlngs = response.data.data[0];
    let images = response.data.data[1];
    let latlngsLength = Object.keys(latlngs).length; 
    let imagesLength = Object.keys(images).length; 
    let polylines=[];

    console.log(images);
    console.log(latlngs);
    console.log(latlngsLength);

    for(let i=0; i<imagesLength; i++){
      let image = {
        url: `media/${images[i].image}`,
        size: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
      }

      let imagePosition = new google.maps.LatLng(images[i].lat, images[i].lng);
      let imageMarker = new google.maps.Marker({
        icon: image,
        position: imagePosition,
      })
      imageMarker.setMap(mapMobile);
      mapMobile.setCenter(imagePosition);
    }

    if(latlngsLength>1){
      for(let j=0; j<latlngsLength-1; j++){
        let lat1 = latlngs[j].lat;
        let lat2 = latlngs[j+1].lat;
        let lon1 = latlngs[j].lon;
        let lon2 = latlngs[j+1].lon;

        let getLatlng1 = {lat : lat1, lng: lon1};
        let getLatlng2 = {lat : lat2, lng: lon2};

        polylines.push(getLatlng1);
        polylines.push(getLatlng2);
        console.log(polylines);

        path = new google.maps.Polyline({
          path: polylines,
          geodesic: true,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 1,
        });
        path.setMap(mapMobile);
        polylines.shift();
        polylines.shift();
      }
    }
  })
  .catch((error) => {
    console.log(error);
  })
}

function initMap() {
  defaultPosition = new google.maps.LatLng(seoulLat, seoulLng);

  mapMobile = new google.maps.Map(document.getElementById('map--mobile'), {
    zoom: 15,
    center: defaultPosition
  });
  getMapData(detailTitle_p);
}

initMap();
