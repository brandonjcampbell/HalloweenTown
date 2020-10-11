const topLeftLat = 41.132586
const topLeftLon =-112.054798

const bottomRightLat = 41.125439
const bottomRightLon =-112.040559

const height= 755
const width=1125

let currentLat =0;
let currentLon =0;
let currentX =0;
let currentY=0;

const latDelta = topLeftLat - bottomRightLat
const lonDelta = topLeftLon - bottomRightLon

const latUnit = latDelta/height
const lonUnit = lonDelta/width

const list = [
{name:"The Gauntlet", lat:41.131751, lon:-112.045505},
{name:"Trail Middle", lat:41.130238, lon:-112.044441},
{name:"Triple Rumble", lat:41.129773, lon:-112.043494},
{name:"Onyx", lat:41.127191, lon:-112.042030},
{name:"Piggy",lat:41.131349, lon:-112.043258}
]

var x = document.getElementById("demo");
var landmarks = document.getElementById("landmarks");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function calibrateLat(lat){
  return Math.round((topLeftLat - lat) /latUnit)
}

function calibrateLon(lon){
  return Math.round((topLeftLon - lon) /lonUnit)
}

function showPosition(position) {
    var x = document.getElementById("demo");
    console.log(x)


  currentLat=position.coords.latitude;
  currentLon = position.coords.longitude;

  currentX = calibrateLat(position.coords.latitude);
  currentY = calibrateLon(position.coords.longitude);

  
  x.innerHTML = `<div style="position:absolute; background:green; top:${currentX}px; left:${currentY}px;">HERE!</div>`
  plotLandmarks()

}

function plotLandmarks(){

  var landmarks = document.getElementById("demo");

  list.forEach(mark =>{
    console.log(mark, landmarks)
   landmarks.innerHTML += `<div style="position:absolute; background:red; top:${calibrateLat(mark.lat)}px; left:${calibrateLon(mark.lon)}px;">${mark.name}</div>`
  })

}

getLocation()

