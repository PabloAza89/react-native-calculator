
interface AdderI {
  input?: any,
  setParErr?: any
}

export function Adder({ input, setParErr }: AdderI) {

  
  let init = input.replace(/ /g,'').split("") // input without whitespaces & splitted
  //let init = "20)x(3+(2)".replace(/ /g,'').split("") // FIRST LEVEL ERROR
  //let init = "(2x3)/2)+(2".replace(/ /g,'').split("") // SECOND LEVEL ERROR
  //let init = "(2+2x3)x(3)".replace(/ /g,'').split("") // CONTINUE HERE/-

  //init.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
  //init.push(")") // ADD PARENTHESIS AT END // TODO

  /// -----------> BEGIN PARENTHESIS STOPPERS <----------- ///

  if (
    init.filter((e: any) => e === "(").length !== // Check if ((( and ))) amount are equal
    init.filter((e: any) => e === ")").length
  ) { setParErr(true); return }

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

  function updateOpenAndCloseParenthesis() {

 

    openPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS NEXT TO ), MOVING INDEX
    closePar = openPar; // FIND FIRST CLOSED ) PARENTHESIS

    
  
    while (openPar !== -1) {
      if (parsed[openPar] === "(") break;
      else openPar--
    }

    console.log("openPar 1:", openPar)
    console.log("closePar 1:", closePar)
    console.log("parsed 1:", parsed)

    if (openPar === -1 && closePar === -1 && parsed.length >= 1) {
      parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
      parsed.push(")") // ADD PARENTHESIS AT END // TODO
      openPar = 0;
      closePar = parsed.length - 1
    }

    if (openPar !== -1 && closePar !== -1) { // FOUND OPEN & CLOSE TAG
      toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main (init)
      toDo.splice(0, 1) // Delete open ( ToDo
      toDo.splice(-1, 1) // Delete close ) ToDo
      console.log("ENTRO EN ESTE 1")
    }
    //if (toDo.)
    else if (openPar === -1 && closePar !== -1) {
      console.log("ENTRO EN ESTE 2"); setParErr(true); return
    }
  
    

    console.log("openPar", openPar)
    console.log("closePar", closePar)
    console.log("ToDo", toDo)
  
  }
  
  updateOpenAndCloseParenthesis()

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

  //while (parsed.length !== 1 && (firstOp !== undefined || secOp !== undefined)) {
  while (parsed.length > 1) {
   
    //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA")
    console.log("toDo.length", toDo.length)
    updateVariables() // MULTI, DIV, PLUS & MINUS
  
    if (toDo[idx - 1] !== undefined && // DO ALL x OR /
      !isNaN(parseInt(toDo[idx - 1])) &&
      toDo[idx] === firstOp &&
      !isNaN(parseInt(toDo[idx + 1]))
    ) { 
      curr = opOne[firstOp](toDo[idx - 1], toDo[idx + 1])
      toDo.splice(idx - 1, 3)
      toDo.splice(idx - 1, 0, curr)
      idx = 1
    }
    else if (firstOp === undefined && // DO ALL + OR -
      toDo[idx - 1] !== undefined &&
      !isNaN(parseInt(toDo[idx - 1])) &&
      toDo[idx] === secOp &&
      !isNaN(parseInt(toDo[idx + 1]))
    ) { 
      curr = opTwo[secOp](toDo[idx - 1], toDo[idx + 1])
      toDo.splice(idx - 1, 3)
      toDo.splice(idx - 1, 0, curr)
      idx = 1
    }
  
    else {
      idx++
    }
  
    updateVariables() 

    // if (foundMul === -1 && foundDiv === -1 && foundPlus === -1 && foundMin === -1) {
    //   console.log("AAAAAAAAA", curr)
    //   parsed.splice(openPar, 0,toDo[0])
    //   //break;
    // }

    if (parsed.length > 1 && firstOp === undefined && secOp === undefined) {
      //parsed.splice(openPar, 0, curr)
      parsed.splice(openPar, 0, toDo[0])
      console.log("openPar 2:", openPar)
      console.log("closePar 2:", closePar)
      console.log("AAAAAAAAA", curr)
      updateOpenAndCloseParenthesis()
      updateVariables()
      break;
    }
    if (parsed.length === 3) {
      parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
      parsed.push(")") // ADD PARENTHESIS AT END // TODO
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBB")
      break;
    }
  }

  //console.log("ENTRO EN ESTE DE ACA")


  console.log("PARSED END", parsed)
  console.log("TODO END", toDo)

  //console.log("ADDER:", inputWS)

  // desde ACA ABAJO

  // let init: any = "(((20x(2x3))/2)+2)".split(""); // ['S'P'L'I'T'E'D'] // TEST TARGET

  // let parsed: any[] = []; // [10, x, 30, +, 3, -, 2] // WELL PARSED // UPDATED EVERY ( PARENTHESIS ) CALC

  // init.forEach((e: any, i: any) => { // => first parsed result
  //   if (parsed.length === 0) parsed.push(e)
  //   else if (!isNaN(init[i - 1] as any) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  //   else parsed.push(e)
  // });

  // let openPar: any;
  // let closePar: any;
  // let toDo: any;

  // function updateOpenAndCloseParenthesis() {
  //   openPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS NEXT TO ), MOVING INDEX
  //   closePar = openPar; // FIND FIRST CLOSED ) PARENTHESIS

  //   do {
  //     if (parsed[openPar] === "(") break;
  //     else openPar--
  //   } while (openPar !== -1)

  //   toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main (init)
  //   toDo.splice(0, 1) // Delete open (
  //   toDo.splice(-1, 1) // Delete close )

  // };

  // updateOpenAndCloseParenthesis()

  // let foundMul: any;
  // let foundDiv: any;
  // let firstOp: any;

  // let opOne: any = { // operation One // x or /
  //   'x': function(a: any, b: any) { return parseInt(a) * parseInt(b) },
  //   '/': function(a: any, b: any) { return parseInt(a) / parseInt(b) }
  // };

  // let foundPlus = toDo.indexOf("+")
  // let foundMin = toDo.indexOf("-")
  // let secOp;

  // let opTwo: any = { // operation Two // + or -
  //   '+': function(a: any, b: any) { return parseInt(a) + parseInt(b) },
  //   '-': function(a: any, b: any) { return parseInt(a) - parseInt(b) }
  // };

  // function updateVariables() { // multi, div, plus & minus
  //   foundMul = toDo.indexOf("x") // update x index
  //   foundDiv = toDo.indexOf("/") // update / index
  //   if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
  //   if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"
  //   if (foundMul === -1 && foundDiv === -1) firstOp = undefined;

  //   foundPlus = toDo.indexOf("+") // update + index
  //   foundMin = toDo.indexOf("-") // update - index
  //   if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) secOp = "+" // update + or - found
  //   if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) secOp = "-" // update + or - found
  //   if (foundPlus === -1 && foundMin === -1) secOp = undefined;
  // };

  // updateVariables()

  // let curr: any;
  // let idx: any = 1

  // while (toDo.length !== 1 && firstOp !== undefined || secOp !== undefined) {
  //   updateVariables() // multi, div, plus & minus

  //   if (toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === firstOp && !isNaN(toDo[idx + 1])) { // do al x or /
  //     curr = opOne[firstOp](toDo[idx - 1], toDo[idx + 1])
  //     toDo.splice(idx - 1, 3)
  //     toDo.splice(idx - 1, 0, curr)
  //     idx = 1
  //   }
  //   else if (firstOp === undefined && secOp !== undefined && toDo[idx - 1] !== undefined && !isNaN(toDo[idx - 1]) && toDo[idx] === secOp && !isNaN(toDo[idx + 1])) { // do al + or -
  //     curr = opTwo[secOp](toDo[idx - 1], toDo[idx + 1])
  //     toDo.splice(idx - 1, 3)
  //     toDo.splice(idx - 1, 0, curr)
  //     idx = 1
  //   }

  //   else idx++

  //   updateVariables()

  //   console.log("parsed.length", parsed)
  //   console.log("parsed", parsed)
  //   console.log("toDo", toDo)
  //   console.log("curr", curr)
  //   console.log("openPar", openPar)

  //   console.log(firstOp)
  //   console.log(secOp)
  //   // if (toDo.length === 1) {
  //   if (parsed.length > 1 && firstOp === undefined && secOp === undefined) {
  //     parsed.splice(openPar, 0, curr)
  //     updateOpenAndCloseParenthesis()
  //     updateVariables()
  //   }
    

  // }

  // console.log("FINISH")
  // console.log(toDo)
  // console.log(parsed)
  // console.log(curr)

  // hasta ACA ABAJO

}

//export {}
