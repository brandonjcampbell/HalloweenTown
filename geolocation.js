// const topLeftLat = 41.132586
// const topLeftLon =-112.054798

// const bottomRightLat = 41.125439
// const bottomRightLon =-112.040559

const topLeftLat = 43.561458
const topLeftLon =-116.612855




const bottomRightLat = 43.552780
const bottomRightLon =-116.562993

// const height= 755
// const width=1125

const height= 332
const width=1381

let currentLat =0;
let currentLon =0;
let currentX =0;
let currentY=0;

const latDelta = topLeftLat - bottomRightLat
const lonDelta = topLeftLon - bottomRightLon

const latUnit = latDelta/height
const lonUnit = lonDelta/width

// const list = [
// {name:"The Gauntlet", lat:41.131751, lon:-112.045505},
// {name:"Trail Middle", lat:41.130238, lon:-112.044441},
// {name:"Triple Rumble", lat:41.129773, lon:-112.043494},
// {name:"Onyx", lat:41.127191, lon:-112.042030},
// {name:"Piggy",lat:41.131349, lon:-112.043258}
// ]

const list = [
  {name:"Certain Doom", lat:43.560945, lon:-116.577733},
  {name:"Get some cocoa", lat:43.555014, lon:-116.572660},
  {name:"Spy on the Elderly", lat:43.555558, lon:-116.580356}
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

  currentX = calibrateLat(position.coords.latitude)-200;
  currentY = calibrateLon(position.coords.longitude)+450;
  
  console.log(currentX,currentY)

  
  x.innerHTML = `<div style="position:absolute; background:green; top:${currentX}px; left:${currentY}px;">HERE!</div>`
  plotLandmarks()

  setTimeout(recheck, 1000)

}

function plotLandmarks(){

  var landmarks = document.getElementById("demo");

  list.forEach(mark =>{
    console.log(mark, landmarks)
   landmarks.innerHTML += `<div style="position:absolute; background:red; top:${calibrateLat(mark.lat)}px; left:${calibrateLon(mark.lon)}px;">${mark.name}</div>`
  })

}

function recheck(){
  getLocation()
}

getLocation()

