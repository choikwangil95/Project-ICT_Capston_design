function getImage(){
  let formData = new FormData();
  let imageFile = document.getElementsByClassName("image")[0];
  for(let i=0; i<imageFile.files.length; i++){
    formData.append('image', imageFile.files[i]);
  }
  formData.append('csrfmiddlewaretoken', '{{ csrf_token }}')

  mapId = getMapId(mapSetTitle_p.innerHTML).then(data=>{
    axios({
      method: "POST",
      url: `image/${data}/`,
      data: formData,
      headers: {
        'cache': false,
        'Content-Type' : false,
        'processData': false,
        'Access-Control-Allow-Origin': '*',
        'crossDomain' : true,
      }
    }).then((response) => {
      console.log(response.data);
      let length = Object.keys(response.data.data).length;
      for (let i=0; i<length; i++){
        let data = response.data.data[i];
        console.log(data);
        // let icon = new google.maps.MarkerImage(
        //   `media/${data.image}`,
        //   new google.maps.Size(12, 20),
        //   new google.maps.Point(0, 0),
        //   new google.maps.Point(6, 20)
        // )

        let imagePosition = new google.maps.LatLng(data.lat, data.lng);
        let imageMarker = new google.maps.Marker({
          // icon: icon,
          position: imagePosition,
        })
        imageMarker.setMap(map);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  })
}
