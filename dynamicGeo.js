
import list from './list.js'

const topLeftLat = 41.132575
const topLeftLon =-112.054722

const bottomRightLat = 41.125411
const bottomRightLon =-112.035564

const height=1824 
const width=3248

let currentLat =0;
let currentLon =0;
let currentX =0;
let currentY=0;

const latDelta = topLeftLat - bottomRightLat
const lonDelta = topLeftLon - bottomRightLon

const latUnit = latDelta/height
const lonUnit = lonDelta/width

var x = document.getElementById("demo");
var landmarks = document.getElementById("landmarks");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
 
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    console.log("notSupported")
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

  currentLat=position.coords.latitude;
  currentLon = position.coords.longitude;

  currentX = calibrateLat(currentLat);
  currentY = calibrateLon(currentLon);

  // console.log(currentLat < topLeftLat)
  // console.log(currentLat > bottomRightLat)
  // console.log(currentLon > topLeftLon)
  // console.log(currentLon < bottomRightLon)

if (currentLat < topLeftLat && currentLat > bottomRightLat && currentLon > topLeftLon && currentLon < bottomRightLon) {
    x.innerHTML = `<img
     style="z-index:5;position:absolute; top:${currentX-100}px; left:${currentY-50}px; height:150px;width:150px;" 
     src="./geotag.svg"/>`

    plotLandmarks()
  }else{
    x.innerHTML = `<div class="card" style="position:absolute; top:100px; left:100px;">You are outside map boundaries</div>`
    plotLandmarks()
  }

  setTimeout(recheck, 1000)

}

function plotLandmarks(){
  var landmarks = document.getElementById("landmarks");

  landmarks.innerHTML = "";
  list.forEach(mark =>{

    if(Math.abs(currentLat - mark.lat)<0.001 && Math.abs(currentLon - mark.lon)<0.001 ){
      landmarks.innerHTML += `<div class="cache" onClick="handleMessage(\`${mark.name}\`,\`${mark.desc}\`,${calibrateLat(mark.lat)-50}, ${calibrateLon(mark.lon)})" style="position:absolute; top:${calibrateLat(mark.lat)-100}px; left:${calibrateLon(mark.lon)}px; z-index:20"><img style="height:100px;width:100px;z-index:10" src="nearCache.svg"/></div>`

    }
    else{
      landmarks.innerHTML += `<div class="cache" style="position:absolute; top:${calibrateLat(mark.lat)-100}px; left:${calibrateLon(mark.lon)}px;"><img style="height:100px;width:100px" src="cache.svg"/></div>`

    }

  
  })
}


window.handleMessage = function (name,text,x,y){
  //var message = document.getElementById("message");
  //message.innerHTML = `<div style="display:block;position:absolute;top:${x}px;left:${y}px> <h1>${name} </h1>  ${text} </div>`
  alert(name+ " - " +text)

}

function recheck(){
  getLocation()
}

getLocation()