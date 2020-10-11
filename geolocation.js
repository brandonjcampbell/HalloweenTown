const topLeftLat = 41.136211
const topLeftLon =-112.050665

const bottomRightLat = 41.126469
const bottomRightLon =-112.041706

const height= 834
const width=834

let currentLat =0;
let currentLon =0;
let currentX =0;
let currentY=0;

const latDelta = topLeftLat - bottomRightLat
const lonDelta = topLeftLon - bottomRightLon

const latUnit = latDelta/height
const lonUnit = lonDelta/width

var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var x = document.getElementById("demo");



  currentLat=position.coords.latitude;
  currentLon = position.coords.longitude;

  currentX = Math.round((topLeftLat - position.coords.latitude) /latUnit);
  currentY = (topLeftLon - position.coords.longitude) /lonUnit;
  console.log(currentX,currentY, currentLat,currentLon)
  
  x.innerHTML = `<div style="position:absolute; background:red; top:${currentX}px; left:${currentY}px;">HERE!</div>`

}

getLocation()

