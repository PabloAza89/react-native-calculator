
interface AdderI {
  scrollEnd?: any,
  input?: any,
  setInput?: any,
  setSecInput?: any,
  setParErr?: any
}

export function Adder({ scrollEnd, input, setInput, setSecInput, setParErr }: AdderI) {

  let init = input.replace(/ /g,'').split("") // OK
  //let init = input.split("") // OK
  //let init = "-3059.2703999999994 + 1".split("") // OK
  

  console.log("INPUT:", input)

  /// -----------> BEGIN NEGATIVE & FLOATING POINT PARSER <----------- ///

  let parsed: any[] = []

  init.forEach((e: any, i: any) => { // ADD 'N37' or '99' or '7.32' JOINED, ELSE PUSH x ALONE
    /* if (e === " ") return
    else  */if (
      (init[i - 1] === "N" || init[i - 1] === "." || !isNaN(parseInt(init[i - 1])) || init[i - 1] === "e" || (init[i - 2] === "e" && init[i - 1] === "+") || (init[i - 2] === "e" && init[i - 1] === "-")) &&
      (!isNaN(parseInt(e)) || e === "." || e === "e" || (init[i - 1] === "e" && e === "+") || (init[i - 1] === "e" && e === "-"))
    ) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
    else parsed.push(e)
  })

  console.log("FIRST PARSING:", parsed)

  parsed.forEach((e, i) => { // N95 => -1 * 95 // NEGATIVE PARSER
    if (e.slice(0, 1) === "N") parsed[i] = -1 * parseFloat(e.slice(1, e.length))
  })

  console.log("SECOND PARSING:", parsed)
  //return // DEV

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
  let firOp: any;

  let opOne: any = { // OPERATION ONE ==> x OR /
    'x': function(a: any, b: any) { return (parseFloat(a) * parseFloat(b)).toFixed(4) }, // DECIMAL LIMITED TO 4 PLACES === 10 THOUSANDTHS
    '/': function(a: any, b: any) { return (parseFloat(a) / parseFloat(b)).toFixed(4) }
    // 'x': function(a: any, b: any) { return parseFloat(a) * parseFloat(b) },
    // '/': function(a: any, b: any) { return parseFloat(a) / parseFloat(b) }
  };

  let foundPlus: any;
  let foundMin: any;
  let secOp: any;

  let opTwo: any = { // OPERATION ONE ==> + OR -
    '+': function(a: any, b: any) { return (parseFloat(a) + parseFloat(b)).toFixed(4) },
    '-': function(a: any, b: any) { return (parseFloat(a) - parseFloat(b)).toFixed(4) }
  };

  function updateOperators() { // firOp & secOp
    //console.log("AA", toDo.indexOf("x"))
    
      //console.log("BB", toDo)
      foundMul = toDo && toDo.indexOf("x") // UPDATE x INDEX
      foundDiv = toDo && toDo.indexOf("/") // UPDATE / INDEX
      if (foundMul < foundDiv && foundMul > 0 || foundMul > 0 && foundDiv === -1) firOp = "x"
      if (foundDiv < foundMul && foundDiv > 0 || foundDiv > 0 && foundMul === -1) firOp = "/"
      if (foundMul === -1 && foundDiv === -1) firOp = undefined;

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
      toDo[index] === firOp &&
      !isNaN(parseFloat(toDo[index + 1]))
    ) {
      innerToDo = opOne[firOp](toDo[index - 1], toDo[index + 1])
      toDo.splice(index - 1, 3)
      toDo.splice(index - 1, 0, innerToDo)
      index = 1
    }
    else if (toDo !== undefined && // DO ALL + OR -
      firOp === undefined &&
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

    updateOperators() // firOp & secOp

    if (toDo !== undefined && parsed.length !== 1 && firOp === undefined && secOp === undefined && toDo.length !== 1) {
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

  
  //setSecInput(input)
  //setInput(parsed[0])
  //console.log("input abajo:", input)
  
  setSecInput(input)
  //setInput(parseFloat(parsed[0]).toString()) // parsed[0] CAN BE NUMBER OR STRING // parseFloat REMOVES EXTRA 00
  //if (parsed[0] !== undefined) setInput(parsed[0].toString())

  let resultToArray = parsed[0].toString().split("")
  //let stringify = parsed[0].toString()
  if (resultToArray[0] === "-") {
    let splitted = parseFloat(resultToArray.join("")).toString().split("");
    splitted.splice(0, 1, "N");
    setInput(splitted.join(""))
    console.log("result 1:", splitted.join(""))
    //stringify.splice(0, 1, "N");
    
    //resultToArray.splice(0, 1, "N");
    //console.log("resultToArray 1:", resultToArray.join(""))
    //let ActualResultToArray = parseFloat(resultToArray.join(""))
    //console.log("resultToArray 1", resultToArray.join(""))
    //setInput(ActualResultToArray.toString())
    //setInput(resultToArray.join(""))
    //setInput(parseFloat(resultToArray.join("")).toString())
  } else {
    //console.log("resultToArray 2:", resultToArray.join(""))
    //let ActualResultToArray = parseFloat(resultToArray.join(""))
    //console.log("resultToArray 2", resultToArray.join(""))
    //setInput(ActualResultToArray.toString())
    setInput(parseFloat(resultToArray.join("")).toString())

    //setInput(resultToArray.join(""))
    //console.log("resultToArray 2", resultToArray.join(""))
    //setInput(parseFloat(resultToArray.join("")).toString())
  }

  //setInput(parsed[0].toString())

  console.log("Final result:", parsed[0])
  console.log("END REACHED")

}