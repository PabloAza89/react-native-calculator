function RGBAtoRGB(r, g, b, a, r2,g2,b2){
  var r3 = Math.round(((1 - a) * r2) + (a * r))
  var g3 = Math.round(((1 - a) * g2) + (a * g))
  var b3 = Math.round(((1 - a) * b2) + (a * b))
  //return "rgb("+r3+","+g3+","+b3+")";
  console.log("rgb("+r3+","+g3+","+b3+")")
} 

//$("#result").html(RGBAtoRGB(225,110,0,0.5,255,255,255));
RGBAtoRGB(0,0,255,0.5,255,255,255)