// map.js
const seoulLat = 37.5642135;
const seoulLng = 127.0016985;
let defaultPosition;
let map;
let initMarker;

// getLocation.js
let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let result; // 현재 위치
let firstlngitudeValue;
let firstlatitudeValue;
let latlng, Position, Marker;
