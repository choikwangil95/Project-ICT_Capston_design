function getImage(){
  let formData = new FormData();
  for(let i=0; i<imageFile.files.length; i++){
    formData.append('image', imageFile.files[i]);
  }
  formData.append('csrfmiddlewaretoken', '{{ csrf_token }}')

  mapId = getMapId(mapSetTitle_p.innerHTML).then(data=>{
    imageState = 0;
    console.log(imageState);
    if(imageState==0){
      imageUploading.classList.add("image--uploading");
    }
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
      imageState=1;
      if(imageState==1){
        imageUploading.classList.remove("image--uploading");
      }
      console.log(imageState);
      console.log(response.data);
      let length = Object.keys(response.data.data).length;
      for (let i=0; i<length; i++){
        let data = response.data.data[i];
        let image = {
          url: `media/${data.image}`,
          size: new google.maps.Size(32, 32),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 32),
        }
        let imagePosition = new google.maps.LatLng(data.lat, data.lng);
        let imageMarker = new google.maps.Marker({
          icon: image,
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
