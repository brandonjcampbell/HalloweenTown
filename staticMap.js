
import list from './list.js'

const topLeftLat = 41.133266
const topLeftLon =-112.054882

const bottomRightLat = 41.124773
const bottomRightLon =-112.035624

const width=1600
const height=900

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
  return ((topLeftLat - lat) /latUnit)
}

function calibrateLon(lon){
  return ((topLeftLon - lon) /lonUnit)
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
     style="z-index:5;position:absolute; top:${currentX-50}px; left:${currentY-50}px; height:50px;width:50px;" 
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
      landmarks.innerHTML += `<div class="cache" onClick="handleMessage(\`${mark.name}\`,\`${mark.desc}\`,${calibrateLat(mark.lat)}, ${calibrateLon(mark.lon)})" style="position:absolute; top:${calibrateLat(mark.lat)-30}px; left:${calibrateLon(mark.lon)-50}px; z-index:20"><img style="height:35px;width:35px;z-index:10" src="nearCache.svg"/></div>`

    }
    else{
      landmarks.innerHTML += `<div class="cache"  onClick="getCloser(\`${mark.name}\`)" style="position:absolute; top:${calibrateLat(mark.lat)}px; left:${calibrateLon(mark.lon)}px;"><img style="height:35px;width:35px" src="cache.svg"/></div>`

    }

  
  })
}


window.getCloser = function (name){
  //var message = document.getElementById("message");
  //message.innerHTML = `<div style="display:block;position:absolute;top:${x}px;left:${y}px> <h1>${name} </h1>  ${text} </div>`
  alert(name+ " - Get a little bit closer to reveal the clue!")

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