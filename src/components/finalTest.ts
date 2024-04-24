//let init = "(((2x3+3) x 3 + 2) x 4 / 4)".replace(/ /g,'').split("") // OK input without whitespaces & splitted
//let init = "((2x3+3) x 3 + 2) x 4 / 4".replace(/ /g,'').split("") // OK input without whitespaces & splitted
//let init = "(3 x 4)".replace(/ /g,'').split("") // OK input without whitespaces & splitted
//let init = "(3) x (1)".replace(/ /g,'').split("") // OK input without whitespaces & splitted
//let init = "(3) x 5".replace(/ /g,'').split("") // OK input without whitespaces & splitted
//let init = "20)x(3+(2)".replace(/ /g,'').split("") // OK FIRST LEVEL ERROR
//let init = "(2x3)/2)+(2".replace(/ /g,'').split("") // OK SECOND LEVEL ERROR
let init = "(2+2x3)x(3)".replace(/ /g,'').split("") // OK

//init.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
//init.push(")") // ADD PARENTHESIS AT END // TODO

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

//console.log(parsed)

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

  console.log("openPar 1:", openPar)
  console.log("closePar 1:", closePar)

  
  // console.log("parsed 1:", parsed)

  if (openPar === -1 && closePar === -1 && (parsed.indexOf("x") !== -1 || parsed.indexOf("/") !== -1 || parsed.indexOf("+") !== -1) || parsed.indexOf("-") !== -1) {
    console.log("ACA")
    parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
    parsed.push(")") // ADD PARENTHESIS AT END // TODO
    openPar = 0;
    closePar = parsed.length - 1
    console.log("toDo", toDo)
    console.log("parsed:", parsed)
  }

  console.log("openPar 1:", openPar)
  console.log("closePar 1:", closePar)

  

  if (openPar !== -1 && closePar !== -1) { // FOUND OPEN & CLOSE TAG
    console.log("ENTRO ACA")
    
    toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main (init)
    console.log(toDo)
    toDo.splice(0, 1) // Delete open ( ToDo
    toDo.splice(-1, 1) // Delete close ) ToDo
    //parsed.splice(openPar, 0, "WAIT") // REPLACE OPERATION WITH "WAIT"
    console.log(parsed)
    console.log(toDo)
    console.log(innerToDo)
    
  }
  //if (toDo.)
  else if (openPar === -1 && closePar !== -1) {
    console.log("ERROR ENTRO EN ESTE 2");
    return /* setParErr(true); return */
  }

  

  console.log("openPar:", openPar)
  console.log("closePar:", closePar)
  //console.log("ToDo", toDo)

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

  console.log(firstOp)
  console.log(secOp)
  console.log(toDo)

}

updateOperators()


//while (parsed.length !== 1 && (firstOp !== undefined || secOp !== undefined)) {
//while (parsed.length !== 1 && parsed.includes("WAIT")) {
//while (parsed.includes("WAIT")) {
//while (parsed.length !== 1 && (firstOp !== undefined || secOp !== undefined)) {
while (parsed.length !== 1) {
  // if (parsed.length === 1) {
  //   console.log("entro en este AAA")
  //   break
  // }
  console.log(openPar)
  console.log(closePar)
  console.log(firstOp)
  console.log(secOp)
  console.log(parsed)
  console.log(toDo)
  console.log(innerToDo)
  console.log(index)
  //break
  /* if (toDo.length === 3) {
    console.log("entro en este AAA")
    break
  } */
  
  //console.log("entro en este otro BBB")
  //console.log(firstOp)
  //console.log(secOp)
  //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
  
  
  updateOperators() // MULTI, DIV, PLUS & MINUS

  // if (toDo.length === 3) {
  //   console.log(parsed)
  //   console.log(toDo)
  //   console.log(innerToDo)
  //   console.log("entro en este AAA")
  //   console.log(index)
  //   break
  // }

  if (toDo[index - 1] !== undefined && // DO ALL x OR /
    !isNaN(parseInt(toDo[index - 1])) &&
    toDo[index] === firstOp &&
    !isNaN(parseInt(toDo[index + 1]))
  ) {




    console.log("HIZO MULTI")
    innerToDo = opOne[firstOp](toDo[index - 1], toDo[index + 1])
    toDo.splice(index - 1, 3)
    toDo.splice(index - 1, 0, innerToDo)
    index = 1
    console.log(parsed)
    console.log(toDo)
    console.log(innerToDo)
    //break
    //if (parsed.length === 0) break
    //if (parsed.length === 0 && toDo.length === 1) break
    //innerToDo = undefined
    
  }
  else if (firstOp === undefined && // DO ALL + OR -
    toDo[index - 1] !== undefined &&
    !isNaN(parseInt(toDo[index - 1])) &&
    toDo[index] === secOp &&
    !isNaN(parseInt(toDo[index + 1]))
  ) {
    console.log("HIZO SUMA")
    innerToDo = opTwo[secOp](toDo[index - 1], toDo[index + 1])
    toDo.splice(index - 1, 3)
    toDo.splice(index - 1, 0, innerToDo)
    index = 1
    console.log(parsed)
    console.log(toDo)
    console.log(innerToDo)
  }

  else {
    index++
  }

  

  updateOperators() // firstOp & secOp

  console.log("aca")
  //break

  // if (foundMul === -1 && foundDiv === -1 && foundPlus === -1 && foundMin === -1) {
  //   console.log("AAAAAAAAA", innerToDo)
  //   parsed.splice(openPar, 0,toDo[0])
  //   //break;
  // }

  if (parsed.length !== 1 && firstOp === undefined && secOp === undefined /* && parsed.includes("WAIT") */ && toDo.length !== 1) {
    //let qq = parsed.indexOf("WAIT")
    //parsed.splice(qq, 1, innerToDo)
    parsed.splice(openPar, 0, innerToDo)
    //parsed.splice(openPar, 0, toDo[0])
    console.log("parsed ACTUAL:", parsed)
    // console.log("openPar 2:", openPar)
    // console.log("closePar 2:", closePar)
    // console.log("AAAAAAAAA", innerToDo)
    updateParenthesis()
    updateOperators()
    index = 1
    //break;
    //break;
  }
  else if (toDo.length === 1 /* && parsed.includes("WAIT") */) {
    console.log("ENTRO EN ESTE OTRO DE POR ACA")
    //let qq = parsed.indexOf("WAIT")
    //parsed.splice(qq, 1, toDo[0])
    console.log("toDo", toDo)
    console.log("parsed", parsed)
    parsed.splice(openPar, 0, toDo[0])
    console.log("parsed", parsed)
    updateParenthesis()
    updateOperators()
    index = 1
    //break;
    //break;
  }

  //break;
  // else {
  //   parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
  //   parsed.push(")") // ADD PARENTHESIS AT END // TODO
  //   console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB")
  //   break;
  // }
}
//                                 let init = "(3) x 4".replace(/ /g,'').split("") // input without whitespaces & splitted
console.log("PARSED END", parsed)
console.log("TODO END", toDo)

//console.log("ENTRO EN ESTE DE ACA")




export {}