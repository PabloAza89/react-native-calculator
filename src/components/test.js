let init = "(((10+2x3x2)+2x1)x2)))".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
let parsed = [] // [10, x, 30, +, 3, -, 2] // WELL PARSED

init.forEach((e, i) => { // => parsed
  if (parsed.length === 0) parsed.push(e)
  else if (!isNaN(init[i - 1]) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

let openPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS, MOVING INDEX
let closePar = openPar;// FIND FIRST CLOSED ) PARENTHESIS

do {
  if (parsed[openPar] === "(") break;
  else openPar--
} while (openPar !== -1)

let toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main
toDo.splice(0, 1) // Delete (
toDo.splice(-1, 1) // Delete )

let foundMul;
let foundDiv;
let firstOp;

function updateMultiAndDiv() {
  foundMul = toDo.indexOf("x") // update x index
  foundDiv = toDo.indexOf("/") // update / index
  if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
  if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"
  if (foundMul === -1 && foundDiv === -1) firstOp = undefined;
}

let opOne = { // operation One // x or /
  'x': function(a, b) { return parseInt(a) * parseInt(b) },
  '/': function(a, b) { return parseInt(a) / parseInt(b) }
};

let foundPlus = toDo.indexOf("+")
let foundMin = toDo.indexOf("-")
let secOp;

function updatePlusAndMin() {
  foundPlus = toDo.indexOf("+") // update + index
  foundMin = toDo.indexOf("-") // update - index
  if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) secOp = "+" // update + or - found
  if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) secOp = "-" // update + or - found
  if (foundPlus === -1 && foundMin === -1) secOp = undefined;
}

let opTwo = { // operation Two // + or -
  '+': function(a, b) { return parseInt(a) + parseInt(b) },
  '-': function(a, b) { return parseInt(a) - parseInt(b) }
};

updateMultiAndDiv()
updatePlusAndMin()

let curr;
let idx = 1

while (toDo.length !== 1 && firstOp !== undefined || secOp !== undefined) {
  updateMultiAndDiv()
  updatePlusAndMin()

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
}

console.log(
  //foundMul,
  //foundDiv,
  `firstOp: ${firstOp}`,
  `secOp: ${secOp}`,
  `toDo: ${toDo}`,
  `curr: ${curr}`,
)