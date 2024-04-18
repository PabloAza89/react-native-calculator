//let init = "2x2x2"
let init = "2/2x2x2".split("") // ['S'P'L'I'T'E'D']
let parsed = [] // [10, x, 3, +, 3, -, 2] // WELL PARSED
let arr2 = [] // [DO ALL X]
let arr3 = [] // [DO ALL /]
let arr4 = [] // [DO ALL +]
let arr5 = [] // [DO ALL -]

let curr = []

init.forEach((e, i) => { // => parsed
  if (parsed.length === 0) parsed.push(e)
  else if (!isNaN(init[i - 1]) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

let idx = 0
let op = 0 // op = operator // 0 = x // 1 = /

// parsed = [ '2', '+', '2', 'x', '2', 'x', '2' ]

do {
  if (op === 0 && parsed[idx - 1] !== undefined && !isNaN(parsed[idx - 1]) && parsed[idx] === "x" && !isNaN(parsed[idx + 1])) {
    console.log("TT", idx, curr.length)
    //curr.push(parseInt(parsed[idx - 1]) * parseInt(parsed[idx + 1]))
    //curr[0] = parseInt(curr[0]) * parseInt(parsed[idx + 1])
    if (curr.length === 0 ) curr[0] = parseInt(parsed[idx - 1]) * parseInt(parsed[idx + 1])
    else curr[0] = parseInt(curr[0]) * parseInt(parsed[idx + 1])
    //idx = idx + 2
    if (parsed[idx + 2] !== undefined ) idx = idx + 2
    else idx++
  }
  if (op === 1 && parsed[idx - 1] !== undefined && !isNaN(parsed[idx - 1]) && parsed[idx] === "/" && !isNaN(parsed[idx + 1])) {
    console.log("TT", idx, curr.length)
    //curr.push(parseInt(parsed[idx - 1]) * parseInt(parsed[idx + 1]))
    //curr[0] = parseInt(curr[0]) * parseInt(parsed[idx + 1])
    if (curr.length === 0 ) curr[0] = parseInt(parsed[idx - 1]) / parseInt(parsed[idx + 1])
    else curr[0] = parseInt(curr[0]) * parseInt(parsed[idx + 1])
    //idx = idx + 2
    if (parsed[idx + 2] !== undefined ) idx = idx + 2
    else idx++
  }
  else idx++

  if (idx === parsed.length - 1) {
    op++;
    idx = 0
  }

} while (idx < parsed.length - 1 && op < 4)

console.log(
  //parsed,
  curr
  //"asd"
)

// arr1.forEach((e, i) => { // => arr2 // [DO ALL X]
//   if (e === "x" && !isNaN(arr1[i - 1]) && !isNaN(arr1[i + 1])) arr2.push(parseInt(arr1[i - 1]) * parseInt(arr1[i + 1]))
//   else if (arr1[i - 1] !== "x" && arr1[i + 1] !== "x") arr2.push(e)
// })

// arr2.forEach((e, i) => { // => arr3 // [DO ALL /]
//   if (e === "/" && !isNaN(arr2[i - 1]) && !isNaN(arr2[i + 1])) arr3.push(parseInt(arr2[i - 1]) / parseInt(arr2[i + 1]))
//   else if (arr2[i - 1] !== "/" && arr2[i + 1] !== "/") arr3.push(e)
// })

// arr3.forEach((e, i) => { // => arr4 // [DO ALL +]
//   if (e === "+" && !isNaN(arr3[i - 1]) && !isNaN(arr3[i + 1])) arr4.push(parseInt(arr3[i - 1]) + parseInt(arr3[i + 1]))
//   else if (arr3[i - 1] !== "+" && arr3[i + 1] !== "+") arr4.push(e)
// })

// arr4.forEach((e, i) => { // => arr5 // [DO ALL -]
//   if (e === "-" && !isNaN(arr4[i - 1]) && !isNaN(arr4[i + 1])) arr5.push(parseInt(arr4[i - 1]) - parseInt(arr4[i + 1]))
//   else if (arr4[i - 1] !== "-" && arr4[i + 1] !== "-") arr5.push(e)
// })

// console.log(
//   arr4
// )