function getImage(){
  let checktitleMobile = mapTitleMobile.getElementsByTagName("p")[0]
  if(!checktitleMobile){
      alert("여행이 끝난 후에 사진을 업로드하세요!");
  }else if (!checktitleMobile.innerHTML) {
      alert("제목을 입력하세요!");
  }else{
    let formData = new FormData();
    for(let i=0; i<imageFile.files.length; i++){
      formData.append('image', imageFile.files[i]);
    }
    formData.append('csrfmiddlewaretoken', '{{ csrf_token }}')
    let titleMobile = mapTitleMobile.getElementsByTagName("p")[0].innerHTML;
    mapId = getMapId(titleMobile).then(data=>{
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
            size: new google.maps.Size(64, 64),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
          }
          let imagePosition = new google.maps.LatLng(data.lat, data.lng);
          let imageMarker = new google.maps.Marker({
            icon: image,
            position: imagePosition,
          })
          imageMarker.setMap(mapMobile);
        }
      })
      .catch((error) => {
        console.log(error);
      })
    })
  }
}
