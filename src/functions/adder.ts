
interface AdderI {
  scrollEnd?: any,
  input?: any,
  setInput?: any,
  setSecInput?: any,
  setParErr?: any
}

export function Adder({ scrollEnd, input, setInput, setSecInput, setParErr }: AdderI) {

  let init = input.replace(/ /g,'').split("") // OK

  /// -----------> BEGIN NEGATIVE & FLOATING POINT PARSER <----------- ///

  let parsed: any[] = []

  init.forEach((e: any, i: any) => { // ADD 'N37' or '99' or '7.32' JOINED, ELSE PUSH x ALONE
    if (
      (init[i - 1] === "N" || init[i - 1] === "." || !isNaN(parseInt(init[i - 1]))) &&
      (!isNaN(parseInt(e)) || e === ".")
    ) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
    else parsed.push(e)
  })

  parsed.forEach((e, i) => { // N95 => -1 * 95 // NEGATIVE PARSER
    if (e.slice(0, 1) === "N") parsed[i] = -1 * parseFloat(e.slice(1, e.length))
  })

  /// -----------> END NEGATIVE & FLOATING POINT PARSER <----------- ///

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

    // console.log("openPar === -1", openPar)
    // console.log("closePar === -1", closePar)
    // console.log(parsed.indexOf("x"))
    // console.log(parsed.indexOf("/"))
    // console.log(parsed.indexOf("+"))
    // console.log(parsed.indexOf("-"))

    //console.log()

    if (openPar === -1 && closePar === -1 && (parsed.indexOf("x") !== -1 || parsed.indexOf("/") !== -1 || parsed.indexOf("+") !== -1 || parsed.indexOf("-") !== -1)) {
    //if (openPar === -1 && closePar === -1) {
      parsed.unshift("(") // ADD PARENTHESIS AT BEGINNING // TODO
      parsed.push(")") // ADD PARENTHESIS AT END // TODO
      openPar = 0;
      closePar = parsed.length - 1
      //console.log("entro aca")
    }

    if (openPar !== -1 && closePar !== -1) { // FOUND OPEN & CLOSE TAG
      //console.log("toDo", toDo)
      toDo = parsed.splice(openPar, closePar - (openPar - 1)) // Extract toDo from Main (init)
      toDo.splice(0, 1) // Delete open ( ToDo
      toDo.splice(-1, 1) // Delete close ) ToDo
    }
    else if (openPar === -1 && closePar !== -1) { // STOP IF INNER PARENTHESIS ARE BAD POSITIONED
      //console.log("ERROR ENTRO EN ESTE 2");
      setParErr(true); return
    }
  }

  updateParenthesis()

  // if (openPar === -1 && closePar === -1 && parsed.indexOf("x") === -1 && parsed.indexOf("/") === -1 && parsed.indexOf("+") === -1 && parsed.indexOf("-") === -1) {
  //   console.log("entro en este otro")
  //   return
  // }
  if (openPar === -1 && closePar !== -1) { // STOP IF INNER PARENTHESIS ARE BAD POSITIONED
    // console.log("ERROR ENTRO EN ESTE 2");
    // return;
    setParErr(true); scrollEnd(); return
  }

  let foundMul: any;
  let foundDiv: any;
  let firstOp: any;

  let opOne: any = { // operation One // x or /
    'x': function(a: any, b: any) { return parseFloat(a) * parseFloat(b) },
    '/': function(a: any, b: any) { return parseFloat(a) / parseFloat(b) }
  };

  let foundPlus: any;
  let foundMin: any;
  let secOp: any;

  let opTwo: any = { // operation Two // + or -
    '+': function(a: any, b: any) { return parseFloat(a) + parseFloat(b) },
    '-': function(a: any, b: any) { return parseFloat(a) - parseFloat(b) }
  };

  function updateOperators() { // firstOp & secOp
    //console.log("AA", toDo.indexOf("x"))
    
      //console.log("BB", toDo)
      foundMul = toDo && toDo.indexOf("x") // UPDATE x INDEX
      foundDiv = toDo && toDo.indexOf("/") // UPDATE / INDEX
      if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firstOp = "x"
      if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firstOp = "/"
      if (foundMul === -1 && foundDiv === -1) firstOp = undefined;

      foundPlus = toDo && toDo.indexOf("+") // UPDATE + INDEX
      foundMin = toDo && toDo.indexOf("-") // UPDATE - INDEX
      if (foundPlus < foundMin && foundPlus > 0 || foundPlus > 0 && foundMin === -1) secOp = "+" // update + or - found
      if (foundMin < foundPlus && foundMin > 0 || foundMin > 0 && foundPlus === -1) secOp = "-" // update + or - found
      if (foundPlus === -1 && foundMin === -1) secOp = undefined;

      //return
    
  }

  //console.log("TODO A VER", toDo)
  //if (toDo !== undefined) updateOperators()
  //if (openPar !== -1 && openPar !== -1) updateOperators()
  updateOperators()
    
  

  while (parsed.length !== 1) {

    updateOperators() // MULTI, DIV, PLUS & MINUS

    if (toDo !== undefined && // DO ALL x OR /
      toDo[index - 1] !== undefined &&
      !isNaN(parseFloat(toDo[index - 1])) &&
      toDo[index] === firstOp &&
      !isNaN(parseFloat(toDo[index + 1]))
    ) {
      innerToDo = opOne[firstOp](toDo[index - 1], toDo[index + 1])
      toDo.splice(index - 1, 3)
      toDo.splice(index - 1, 0, innerToDo)
      index = 1
    }
    else if (toDo !== undefined && // DO ALL + OR -
      firstOp === undefined &&
      toDo[index - 1] !== undefined &&
      !isNaN(parseFloat(toDo[index - 1])) &&
      toDo[index] === secOp &&
      !isNaN(parseFloat(toDo[index + 1]))
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

    if (toDo !== undefined && parsed.length !== 1 && firstOp === undefined && secOp === undefined && toDo.length !== 1) {
      parsed.splice(openPar, 0, innerToDo)
      updateParenthesis()
      if (openPar === -1 && closePar !== -1) { // STOP IF INNER PARENTHESIS ARE BAD POSITIONED
        // console.log("ERROR ENTRO EN ESTE 2");
        // return;
        setParErr(true); scrollEnd(); return
      }
      updateOperators()
      index = 1
    }
    else if (toDo !== undefined && toDo.length === 1) {
      parsed.splice(openPar, 0, toDo[0])
      updateParenthesis()
      if (openPar === -1 && closePar !== -1) { // STOP IF INNER PARENTHESIS ARE BAD POSITIONED
        // console.log("ERROR ENTRO EN ESTE 2");
        // return;
        setParErr(true); scrollEnd(); return
      }
      updateOperators()
      index = 1
    }
  }

  //console.log("PARSED END", parsed[0].toFixed(2))
  //console.log("PARSED END", parseFloat(parsed[0]).toFixed[2])
  //console.log("PARSED END", parseFloat(parsed[0]).toFixed(2))
  //let float = parsed[0].toString()
  //let integer = parseInt(parsed[0])
  //console.log("float", float % 10)
  //console.log("integer", integer)
  //console.log("TODO END", toDo)
  console.log("Parsed End", parsed[0])
  console.log("END REACHED")

}