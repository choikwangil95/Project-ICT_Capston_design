// map.js
const seoulLat = 37.5642135;
const seoulLng = 127.0016985;
let defaultPosition;
let map;
let initMarker;
let inputTitle = document.getElementById("title__input");
let cfTitle;

// position.js
let position = document.getElementsByClassName("button__position")[0];
let address = document.getElementsByClassName("location__address")[0];
let result; // 현재 위치
let firstlngitudeValue;
let firstlatitudeValue;
let latlngs=[];
let markers=[];
let markersLength, latlngsLength;
let latlng, path, Position, Marker;
let lat0, lng0;
let mapGetTitle;
let flag=0;

// tracking.js
let start = document.getElementsByClassName("button__start")[0];
let end = document.getElementsByClassName("button__end")[0];
let testCase = document.getElementsByClassName("button__test")[0];
let testDelete = document.getElementsByClassName("button__delete")[0];
let lngitudeValue, latitudeValue;  // 현재 위도, 경도
var geoId; // ?
var lastLng = firstlngitudeValue;   // 이전 경도
var lastLat = firstlatitudeValue;   // 이전 위도
var lastResult = result;            // 이전 위치
var intervalobj;
let t=0;
let mapId;

// toggles.js
let newMap = document.getElementsByClassName("new__route")[0];
let mapTitle = document.getElementsByClassName("title")[0];
let mapSetTitle = document.getElementsByClassName("title__get")[0];
let mapButton = document.getElementsByClassName("title__submit")[0];
