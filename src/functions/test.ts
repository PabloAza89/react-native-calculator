//let init = [ 6.9000 ]

//let qq = parseFloat(init[0].toFixed(4)).toString().split("")

//let init = (-2).toString().split("")

//let qq
//if (init[0] === "-") init.splice(0,1,"N")

let qq = ["1", "0", "0", "0", "0", "0", "7", "0"]

// [6, ., 9, 0, 0, 0]

let target = qq.slice(0,8)

let result

for (let i = 7; i >= 0 ; i--) {
  if (target[i] !== "0") { result = i; break }
}

console.log(
  //qq.includes(".")
  //init.join("")
  //target
  result
)

export {}