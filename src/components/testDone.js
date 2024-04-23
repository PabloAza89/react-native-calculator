//let init = "(((10x2x3/2+2)+2x2)x2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET LATER
let init = "(((20x(2x3))/2)+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(20x6/2+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(120/2+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(60+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(62)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET

let parsed = [] // [10, x, 30, +, 3, -, 2] // WELL PARSED // UPDATED EVERY ( PARENTHESIS ) CALC

init.forEach((e, i) => { // => first parsed result
  if (parsed.length === 0) parsed.push(e)
  else if (!isNaN(init[i - 1]) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

let openPar
let closePar
let toDo

function updateOpenAndCloseParenthesis() {
  openPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS NEXT TO ), MOVING INDEX
  closePar = openPar; // FIND FIRST CLOSED ) PARENTHESIS

  do {
    if (parsed[openPar] === "(") break;
    else openPar--
  } while (openPar !== -1)

  toDo =  // Extract toDo from Main (init)
  toDo.splice(0, 1) // Delete open (
  toDo.splice(-1, 1) // Delete close )

}

updateOpenAndCloseParenthesis()

let foundMul;
let foundDiv;
let firstOp;

let opOne = { // operation One // x or /
  'x': function(a, b) { return parseInt(a) * parseInt(b) },
  '/': function(a, b) { return parseInt(a) / parseInt(b) }
};

let foundPlus;
let foundMin;
let secOp;

let opTwo = { // operation Two // + or -
  '+': function(a, b) { return parseInt(a) + parseInt(b) },
  '-': function(a, b) { return parseInt(a) - parseInt(b) }
};

function updateVariables() { // multi, div, plus & minus
  foundMul = toDo.indexOf("x") // update x index
  foundDiv = toDo.indexOf("/") // update / index
  if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
  if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"
  if (foundMul === -1 && foundDiv === -1) firstOp = undefined;

  foundPlus = toDo.indexOf("+") // update + index
  foundMin = toDo.indexOf("-") // update - index
  if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) secOp = "+" // update + or - found
  if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) secOp = "-" // update + or - found
  if (foundPlus === -1 && foundMin === -1) secOp = undefined;
}

updateVariables()

let curr;
let idx = 1

while (toDo.length !== 1 && firstOp !== undefined || secOp !== undefined) {
  updateVariables() // multi, div, plus & minus

  if (toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === firstOp && !isNaN(toDo[idx + 1])) { // do al x or /
    curr = opOne[firstOp](toDo[idx - 1], toDo[idx + 1])
    toDo.splice(idx - 1, 3)
    toDo.splice(idx - 1, 0, curr)
    idx = 1
  }
  else if (firstOp === undefined && toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === secOp && !isNaN(toDo[idx + 1])) { // do al + or -
    curr = opTwo[secOp](toDo[idx - 1], toDo[idx + 1])
    toDo.splice(idx - 1, 3)
    toDo.splice(idx - 1, 0, curr)
    idx = 1
  }

  else idx++

  updateVariables()

  // console.log("parsed.length", parsed)
  // console.log("parsed", parsed)
  // console.log("toDo", toDo)
  // console.log("curr", curr)
  // console.log("openPar", openPar)

  // console.log(firstOp)
  // console.log(secOp)
  // if (toDo.length === 1) {
  if (parsed.length > 1 && firstOp === undefined && secOp === undefined) {
    parsed.splice(openPar, 0, curr)
    updateOpenAndCloseParenthesis()
    updateVariables()
  }
}

console.log("FINISH")
console.log(toDo)
console.log(parsed)
console.log(curr)
