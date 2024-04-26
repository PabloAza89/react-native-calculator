//let init = [ 6.9000 ]

//let qq = parseFloat(init[0].toFixed(4)).toString().split("")

let init = (-2).toString().split("")

//let qq
if (init[0] === "-") init.splice(0,1,"N")


// [6, ., 9, 0, 0, 0]

console.log(
  //qq.includes(".")
  init.join("")
)

export {}