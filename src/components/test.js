let init = "(((10x2-2)+2x1)x2)))".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//let init = "4+1".split("") // ['S'P'L'I'T'E'D']
// (2x2x2)
// (2/(2x2x2))
// "2/[2x2x2]+[1+1]x2" OK
let parsed = [] // [10, x, 3, +, 3, -, 2] // WELL PARSED
let arr2 = [] // [DO ALL X]
let arr3 = [] // [DO ALL /]
let arr4 = [] // [DO ALL +]
let arr5 = [] // [DO ALL -]



init.forEach((e, i) => { // => parsed
  if (parsed.length === 0) parsed.push(e)
  else if (!isNaN(init[i - 1]) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

//let idx = 0
//let op = 0 // op = operator // 0 = x // 1 = /

let openPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS, MOVING INDEX
let closePar = openPar;// FIND FIRST CLOSED ) PARENTHESIS

do {
  if (parsed[openPar] === "(") break;
  else openPar--
} while (openPar !== -1)

let toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main
toDo.splice(0, 1) // Delete (
toDo.splice(-1, 1) // Delete )







let foundMul = toDo.indexOf("x")
let foundDiv = toDo.indexOf("/")
let firstOp;
if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"

let opOne = { // operation One // x or /
  'x': function(a, b) { return parseInt(a) * parseInt(b) },
  '/': function(a, b) { return parseInt(a) / parseInt(b) }
};

let foundPlus = toDo.indexOf("+")
let foundMin = toDo.indexOf("-")
let secOp;
if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) firstOp = "+"
if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) firstOp = "-"

let opTwo = { // operation Two // + or -
  '+': function(a, b) { return parseInt(a) + parseInt(b) },
  '-': function(a, b) { return parseInt(a) - parseInt(b) }
};

let curr;
let idx = 1

while (toDo.length !== 1 && firstOp !== undefined) {

  foundMul = toDo.indexOf("x") // update x index
  foundDiv = toDo.indexOf("/") // update x index
  if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x" // update x or / found
  if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/" // update x or / found

  console.log(idx)
  console.log(toDo)
  console.log(firstOp)
  console.log(foundMul)
  console.log(foundDiv)
  // TODOS OK

  if (foundMul === -1 && foundDiv === -1) firstOp = undefined;

  if (toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === firstOp && !isNaN(toDo[idx + 1])) {

    //console.log("idx", idx)
    curr = opOne[firstOp](toDo[idx - 1], toDo[idx + 1])
    // console.log("idx - 1", idx - 1)
    // console.log("idx - 1", idx + 1)

    toDo.splice(idx - 1, 3)
    toDo.splice(idx - 1, 0, curr)
    //console.log("toDo", toDo)

    // console.log("curr", curr)
    // console.log("toDo", toDo.length)
    idx = 1
  }
  // if (toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === secOp && !isNaN(toDo[idx + 1])) {

  //   //console.log("idx", idx)
  //   curr = opOne[secOp](toDo[idx - 1], toDo[idx + 1])
  //   // console.log("idx - 1", idx - 1)
  //   // console.log("idx - 1", idx + 1)

  //   toDo.splice(idx - 1, 3)
  //   toDo.splice(idx - 1, 0, curr)
  //   //console.log("toDo", toDo)

  //   // console.log("curr", curr)
  //   // console.log("toDo", toDo.length)
  //   idx = 1
  // }
  else idx++
  //if (toDo.length === 1 && firstOp !== undefined) firstOp === undefined
  //if (toDo.length === 1 && firstOp !== undefined) firstOp === undefined
}


console.log(
  //foundMul,
  //foundDiv,
  `firstOp: ${firstOp}`,
  `toDo: ${toDo}`,
  `curr: ${curr}`,
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


// do {
//   if (op === 0 && toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === "x" && !isNaN(parsed[idx + 1])) {
//     console.log("TT", idx, curr.length)
//     if (curr.length === 0 ) curr[0] = parseInt(parsed[idx - 1]) * parseInt(parsed[idx + 1])
//     else curr[0] = parseInt(curr[0]) * parseInt(parsed[idx + 1])
//     if (parsed[idx + 2] !== undefined ) idx = idx + 2
//     else idx++
//   }
//   if (op === 1 && parsed[idx - 1] !== undefined && !isNaN(parsed[idx - 1]) && parsed[idx] === "/" && !isNaN(parsed[idx + 1])) {
//     console.log("TT", idx, curr.length)
//     if (curr.length === 0 ) curr[0] = parseInt(parsed[idx - 1]) / parseInt(parsed[idx + 1])
//     else curr[0] = parseInt(curr[0]) / parseInt(parsed[idx + 1])
//     if (parsed[idx + 2] !== undefined ) idx = idx + 2
//     else idx++
//   }
//   else idx++
//   if (idx === parsed.length - 1) {
//     op++;
//     idx = 0
//   }
// } while (idx < parsed.length - 1 && op < 4)