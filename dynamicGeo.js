// const topLeftLat = 41.132586
// const topLeftLon =-112.054798

// const bottomRightLat = 41.125439
// const bottomRightLon =-112.040559

// import { google } from './node_modules/googleapis'
// import keys  from './credentials.json'

// const client = new google.auth.JWT(
//     keys.client_email,
//     null, 
//     keys.private_key,
//     ["https://www.googleapis.com/auth/spreadsheets.readonly"]
// )

// client.authorize(function(err,tokens){
//     if(err){
//         console.log(err);
//         return;
//     }else{
//         console.log("Connected")
//         gsrun(client)
//     }
// })

// async function gsrun(cl){
//     const gsapi = google.sheets({version:'v4', auth:cl})
//     const opt = {
//         spreadsheetId:'1X5ol6f9HtzjXFEMh7w4gWAw9sbn6BSeuPIlgEWQtk9Y',
//         range:'A2:D'
//     }

//     let data = await gsapi.spreadsheets.values.get(opt)
//     list = data.data.values.map(row=>{
//         return {
//           name:row[0],
//           desc:row[1],
//           lat:row[2],
//           lon:row[3]
//         }
//       }
//     );
//     console.log(dataArray)
// }

import list from './list.js'
console.log(list,"liiiiiiiiiiiist")
const topLeftLat = 43.561458
const topLeftLon =-116.612855

const bottomRightLat = 43.552780
const bottomRightLon =-116.562993

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


// let list = [
//   // {name:"Certain Doom", lat:43.560945, lon:-116.577733},
//   // {name:"Get some cocoa", lat:43.555014, lon:-116.572660},
//   // {name:"Spy on the Elderly", lat:43.555558, lon:-116.580356}
//   ]

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

