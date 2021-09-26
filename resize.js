
console.log("loading?")
function reportWindowSize() {
    let hit = window.innerHeight;
    let wid = window.innerWidth;
    console.log( wid)
    document.getElementById("map").style.transform = "scale("+(wid/3300)+")";
  }
  
  window.onresize = reportWindowSize;
  reportWindowSize()