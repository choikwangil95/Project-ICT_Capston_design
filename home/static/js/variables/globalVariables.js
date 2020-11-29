// map.js
const seoulLat = 37.5642135;
const seoulLng = 127.0016985;
let defaultPosition;
let map;
let mapMobile;
let initMarker;
let breakpointMobile = 300;
let breakpointTablet = 758;
let breakpointDesktop = 1024;

// getLocation.js
let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let result; // 현재 위치
let firstlngitudeValue;
let firstlatitudeValue;
let latlng, Position, Marker;
let latlngs = [];
let markers = [];

// mobile.js
let positionMobile = document.getElementsByClassName("button__position--mobile")[0];
let addressMobile = document.getElementsByClassName("location__address--mobile")[0];

// title.js
let createMapTitle = document.getElementsByClassName("button__newMap")[0];
let promTitle;

//tracking.js
let lastResult = result;            // 이전 위치

//test.js
let t = 0;

//position.js
let markersLength, latlngsLength;

//image.js
let imageFile = document.getElementsByClassName("button__image")[0];
let imageState=-1;
let imageUploading = document.getElementsByClassName("image")[0];
