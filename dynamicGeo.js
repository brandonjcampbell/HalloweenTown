
import list from './list.js'

const topLeftLat = 43.561458
const topLeftLon =-116.612855

const bottomRightLat = 43.552780
const bottomRightLon =-116.562993

const height= 1260
const width=4840

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
   // console.log(x)


  currentLat=position.coords.latitude;
  currentLon = position.coords.longitude;

  // currentLat = 43.531045
  // currentLon = -116.577733

  currentX = calibrateLat(currentLat);
  currentY = calibrateLon(currentLon);

if (currentLat < topLeftLat && currentLat > bottomRightLat && currentLon > topLeftLon && currentLon < bottomRightLon) {

  //console.log(currentLat < topLeftLat)
 // console.log(currentLat > bottomRightLat)
 // console.log(currentLon > topLeftLon)
 // console.log(currentLon < bottomRightLon)
    
    x.innerHTML = `<img
     style="z-index:5;position:absolute; top:${currentX-100}px; left:${currentY-20}px; height:100px;width:100px;" 
     src="./geotag.png"/>`
    plotLandmarks()
  }else{
    x.innerHTML = `<div class="card" style="position:absolute; top:100px; left:100px;">You are outside map boundaries</div>`
    plotLandmarks()
  }

  setTimeout(recheck, 1000)

}

function plotLandmarks(){
  var landmarks = document.getElementById("demo");

  landmarks.innerHTML = "";
  list.forEach(mark =>{
   // console.log(mark, landmarks)
   landmarks.innerHTML += `<div class="cache" onClick="handleMessage(\`${mark.name}\`,\`${mark.desc}\`,${calibrateLat(mark.lat)-100}, ${calibrateLon(mark.lon)-20})" style="position:absolute; top:${calibrateLat(mark.lat)-100}px; left:${calibrateLon(mark.lon)-20}px;"><img style="height:100px;width:100px" src="cache.png"/></div>`
  
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