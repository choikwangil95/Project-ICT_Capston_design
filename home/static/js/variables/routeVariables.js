//init.js
let uploadPhotoButton = document.getElementsByClassName("button__upload__photo")[0];
let newRouteButton = document.getElementsByClassName("button__new__route")[0];

// map.js
let cfTitle;
let inputTitle = document.getElementById("title__input");

// position.js
let markersLength, latlngsLength;
let path;
let lat0, lng0;
let mapGetTitle;
let flag = 0;

// tracking.js
let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
let lngitudeValue, latitudeValue;  // 현재 위도, 경도
var intervalobj;
let mapId;

// toggles.js
let newMap = document.getElementsByClassName("new__route")[0];
let mapTitle = document.getElementsByClassName("title")[0];
let getTitleName = document.getElementsByClassName("title__get")[0];
let mapSetTitle = document.getElementsByClassName("settitle__set")[0];
let mapButton = document.getElementsByClassName("title__submit")[0];
let imageUploading = document.getElementsByClassName("image")[0];

// image.js
let imageFile = document.getElementsByClassName("button__image")[0];
let imageState=-1;
