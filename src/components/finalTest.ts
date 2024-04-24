let init = "(2+2x3)x(3)".replace(/ /g,'').split("") // OK

/// -----------> BEGIN PARENTHESIS STOPPERS <----------- ///

if (
  init.filter((e: any) => e === "(").length !== // Check if ((( and ))) amount are equal
  init.filter((e: any) => e === ")").length
//) { setParErr(true); return }
) { console.log("ERROR") }

/// -----------> END PARENTHESIS STOPPERS <----------- ///

let parsed: any[] = []

init.forEach((e: any, i: any) => { // ADD 'M37' or '99' JOINED, ELSE PUSH x ALONE
  if ((init[i - 1] === "M" || !isNaN(parseInt(init[i - 1]))) && !isNaN(parseInt(e))) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

parsed.forEach((e, i) => { // M95 => -1 * 95 // NEGATIVE PARSER
  if (e.slice(0, 1) === "M") parsed[i] = -1 * parseInt(e.slice(1, e.length))
})

let openPar: any; // OPEN PARENTHESIS FOUND, MOVING INDEX
let closePar: any; // CLOSE PARENTHESIS FOUND
let toDo: any; // NEXT (OPERARION) TODO INSIDE PARENTHESIS
let innerToDo: any; // INNER OPERATION INSIDE toDo
let index: any = 1; // WHILE LOOP INDEX

function updateParenthesis() {

  openPar = parsed.indexOf(")") // OPEN PARENTHESIS FOUND, MOVING INDEX
  closePar = openPar; // CLOSED PARENTHESIS FOUND

  while (openPar !== -1) {
    if (parsed[openPar] === "(") break;
    else openPar--
  }

  if (openPar === -1 && closePar === -1 && (parsed.indexOf("x") !== -1 || parsed.indexOf("/") !== -1 || parsed.indexOf("+") !== -1) || parsed.indexOf("-") !== -1) {
    parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
    parsed.push(")") // ADD PARENTHESIS AT END // TODO
    openPar = 0;
    closePar = parsed.length - 1
  }

  if (openPar !== -1 && closePar !== -1) { // FOUND OPEN & CLOSE TAG
    toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main (init)
    toDo.splice(0, 1) // Delete open ( ToDo
    toDo.splice(-1, 1) // Delete close ) ToDo
  }
  else if (openPar === -1 && closePar !== -1) {
    console.log("ERROR ENTRO EN ESTE 2");
    return /* setParErr(true); return */
  }
}

updateParenthesis()

let foundMul: any;
let foundDiv: any;
let firstOp: any;

let opOne: any = { // operation One // x or /
  'x': function(a: any, b: any) { return parseInt(a) * parseInt(b) },
  '/': function(a: any, b: any) { return parseInt(a) / parseInt(b) }
};

let foundPlus: any;
let foundMin: any;
let secOp: any;

let opTwo: any = { // operation Two // + or -
  '+': function(a: any, b: any) { return parseInt(a) + parseInt(b) },
  '-': function(a: any, b: any) { return parseInt(a) - parseInt(b) }
};

function updateOperators() { // firstOp & secOp
  foundMul = toDo.indexOf("x") // UPDATE x INDEX
  foundDiv = toDo.indexOf("/") // UPDATE / INDEX
  if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
  if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"
  if (foundMul === -1 && foundDiv === -1) firstOp = undefined;

  foundPlus = toDo.indexOf("+") // UPDATE + INDEX
  foundMin = toDo.indexOf("-") // UPDATE - INDEX
  if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) secOp = "+" // update + or - found
  if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) secOp = "-" // update + or - found
  if (foundPlus === -1 && foundMin === -1) secOp = undefined;
}

updateOperators()

while (parsed.length !== 1) {

  updateOperators() // MULTI, DIV, PLUS & MINUS

  if (toDo[index - 1] !== undefined && // DO ALL x OR /
    !isNaN(parseInt(toDo[index - 1])) &&
    toDo[index] === firstOp &&
    !isNaN(parseInt(toDo[index + 1]))
  ) {
    innerToDo = opOne[firstOp](toDo[index - 1], toDo[index + 1])
    toDo.splice(index - 1, 3)
    toDo.splice(index - 1, 0, innerToDo)
    index = 1
  }
  else if (firstOp === undefined && // DO ALL + OR -
    toDo[index - 1] !== undefined &&
    !isNaN(parseInt(toDo[index - 1])) &&
    toDo[index] === secOp &&
    !isNaN(parseInt(toDo[index + 1]))
  ) {
    innerToDo = opTwo[secOp](toDo[index - 1], toDo[index + 1])
    toDo.splice(index - 1, 3)
    toDo.splice(index - 1, 0, innerToDo)
    index = 1
  }

  else {
    index++
  }

  updateOperators() // firstOp & secOp

  if (parsed.length !== 1 && firstOp === undefined && secOp === undefined && toDo.length !== 1) {
    parsed.splice(openPar, 0, innerToDo)
    updateParenthesis()
    updateOperators()
    index = 1
  }
  else if (toDo.length === 1) {
    parsed.splice(openPar, 0, toDo[0])
    updateParenthesis()
    updateOperators()
    index = 1
  }
}

console.log("PARSED END", parsed)
console.log("TODO END", toDo)

export {}