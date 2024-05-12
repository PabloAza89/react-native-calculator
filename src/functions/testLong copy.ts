import { createIconSetFromFontello } from "@expo/vector-icons"

  //let init = input.replace(/ /g,'').split("") // OK
  //let init = "4.6+2.3".replace(/ /g,'').split("") // OK

  let init = "N2.0808652e+20 x 365".replace(/ /g,'').split("") // OK
  //let init = "100034000000.1 + 3".replace(/ /g,'').split("") // OK

  //let init = "(1040434.12+0.11) x N1".replace(/ /g,'').split("") // OK
  //console.log("asdasd")
  //let init = "(104043257603400000000.12+0.11)xN1".replace(/ /g,'').split("") // OK
  //let init = "(100003000000000.12+0.11)xN23.87".replace(/ /g,'').split("") //
  //let init = "(1000030000.12+0.11)xN23.87".replace(/ /g,'').split("") //
  //let init = "(0.12+0.11)xN23.87".replace(/ /g,'').split("") //
  //let init = "456456464789742123123123333123123x3".replace(/ /g,'').split("") //
  //let init = "456456464789742123123123333123123x3".replace(/ /g,'').split("") //
  //let init = "12000007000000.12+0.11".replace(/ /g,'').split("") //
  //let init = "2x3/2x7/89".replace(/ /g,'').split("") //
  //let init = "2x3/2x7/8912312".replace(/ /g,'').split("") //
  //let init = "2x3/2x7/8123232323678678678".replace(/ /g,'').split("") //
  //let init = "456456464789742123123123333123123x3".replace(/ /g,'').split("") //
  //let init = "45645646478x3".replace(/ /g,'').split("") //
  //let init = "456456464789742123123123333123123 x 3".replace(/ /g,'').split("") //
  
  //let init = "12000007000000.12+0.11".replace(/ /g,'').split("") //
  //let init = "2x3/2x7/89".replace(/ /g,'').split("") //
  //let init = "2x3/2x7/8912312".replace(/ /g,'').split("") //
  //let init = "4.6+2.3".replace(/ /g,'').split("") //
  
  
  //let init = "".replace(/ /g,'').split("") //
  //let init = "".replace(/ /g,'').split("") //

  //console.log("INPUT:", input)

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
      //setParErr(true); return
      console.log("ERROR PARENTHESIS")
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
    //setParErr(true); scrollEnd(); return
    console.log("ERROR PARENTHESIS")
  }

  let foundMul: any;
  let foundDiv: any;
  let firOp: any;

  let opOne: any = { // OPERATION ONE ==> x OR /
    'x': function(a: any, b: any) { return parseFloat(a) * parseFloat(b) }, // DECIMAL LIMITED TO 4 PLACES === 10 THOUSANDTHS
    '/': function(a: any, b: any) { return parseFloat(a) / parseFloat(b) }
  };

  let foundPlus: any;
  let foundMin: any;
  let secOp: any;

  let opTwo: any = { // OPERATION ONE ==> + OR -
    '+': function(a: any, b: any) { return parseFloat(a) + parseFloat(b) },
    '-': function(a: any, b: any) { return parseFloat(a) - parseFloat(b) }
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
        //setParErr(true); scrollEnd(); return
        console.log("ERROR PARENTHESIS")
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
        //setParErr(true); scrollEnd(); return
        console.log("ERROR PARENTHESIS")
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
  
  //setSecInput(input)

  //let rawToArray = parseFloat(Number(parsed[0]).toFixed(4)).toString().split("") // parsed[0] CAN BE NUMBER OR STRING // parseFloat REMOVES EXTRA 00
  let rawToArray = parsed[0].toString().split("") // parsed[0] CAN BE NUMBER OR STRING // parseFloat REMOVES EXTRA 00
  let prefix = rawToArray[0] // FILTER "-" IF EXISTS
  let result // result always as [ "A", "R", "R", "A", "Y" ]

  console.log(rawToArray)
  //if (rawToArray.includes("e")) {
    //rawToArray.join("")

  //} else 

  // if (rawToArray.includes("e")) {

  // }
  
  //if (!rawToArray.includes("e")) { // LIMIT DECIMALS TO 4 POSITIONS // NUMBER IS NOT IN SCIENTIFIC NOTATION
    //let prevMinus = rawToArray.filter((e: any) => e !== "-" && e !== ".")
    let prevMinus
    console.log(rawToArray)


    if (rawToArray[0] === "-") prevMinus = rawToArray.slice(1, rawToArray.length) // preventMinus


    
    else prevMinus = rawToArray

    //console.log(prevMinus)

    //let numberIsLargeInt = 
    //console.log( prevMinus.slice(0,12) )
    //console.log( prevMinus.length > 12 )
    //console.log( !prevMinus.includes("e") )
    //console.log( !prevMinus.slice(0,12).includes(".") )
    //console.log( !prevMinus.slice(0,12).includes("e") )


    //let numberIsLargeInt = prevMinus.length > 12 && !prevMinus.includes("e") && !prevMinus.slice(0,12).includes(".")
    //console.log(numberIsLargeInt)
    console.log( prevMinus.indexOf(".") > 11 )
    console.log(prevMinus)
    console.log(prevMinus.indexOf("."))
    console.log(prevMinus.slice(0,12))
    console.log( /[0-9]/.test("") )
    console.log( prevMinus.slice(0,12).every((e:any) => /[0-9]/.test(e)) )

    //let qq = (() => { return "33" })()

    let isScientific = prevMinus.includes("e")
    let dotIndex = prevMinus.indexOf(".")
    let intLength =
      !isScientific && prevMinus.indexOf(".") !== -1 ?
      prevMinus.slice(0, dotIndex).length :
      !isScientific && prevMinus.indexOf(".") === -1 ?
      prevMinus.length :
      undefined
    let spacesLeft = 12 - intLength

    console.log(isScientific)
    console.log(dotIndex)
    console.log(intLength)
    console.log(spacesLeft)

    // if (!prevMinus.includes("e") && prevMinus.slice(0,12).every((e:any) => /[0-9]/.test(e)) && prevMinus.indexOf(".") < 15) {
    //   console.log("aca")
    // }

    if (intLength > 12) { // LARGE INT
      console.log("aca")
      console.log( prevMinus.join("") )
      let slice2 = prevMinus.slice(0, 8)
      let dot11
      let largeRefInt
      console.log(slice2)
      for (let i = 7; i >= 0 ; i--) {
        console.log(i)
        console.log(slice2)
        console.log(slice2[i])
        if (slice2[i] !== "0" && slice2[i] !== undefined) { largeRefInt = i; break }
      }

      console.log(largeRefInt)

      console.log( (parseFloat(parseFloat(prevMinus.join("")).toExponential(largeRefInt))).toExponential() )
      //console.log( parseFloat(prevMinus.join("")).toExponential(largeRefInt) )

      //console.log(parseFloat(prevMinus.join("")).toExponential(largeRefInt))
      //result = (parseFloat(prevMinus.join("")).toExponential(largeRefInt)).split("")
      result = (parseFloat(parseFloat(prevMinus.join("")).toExponential(largeRefInt))).toExponential().split("")
      console.log(result)


    }

    else if (intLength < 13) { // SMALL INT
      console.log("aca")
      console.log(isScientific)
      console.log(dotIndex)
      console.log(intLength)
      console.log(spacesLeft)

      console.log( parseFloat(prevMinus.join("")).toFixed(spacesLeft) )
      console.log( parseFloat(parseFloat(prevMinus.join("")).toFixed(spacesLeft)) )
      //result = parseFloat(prevMinus.join("")).toFixed(spacesLeft).split("")
      result = parseFloat(parseFloat(prevMinus.join("")).toFixed(spacesLeft)).toString().split("")
      console.log(result)

    }

    else if (isScientific) { // NUMBER IS IN SCIENTIFIC NOTATION, // SEGUIR ACA
      console.log("aca")

      console.log("aca")
      console.log(isScientific)
      console.log(dotIndex)
      console.log(intLength)
      console.log(spacesLeft)

      result = (parseFloat(prevMinus.join("")).toExponential(8)).split("") // TESTING+1
      console.log(result)

      if (dotIndex !== -1) { // S.N. IS LIKE -2.44182584e-7
        console.log("aca")
      }

      let dot22 = prevMinus.indexOf(".")
      console.log(dot22)
      let integerFoundASD

      if (dot22 !== -1) { // Number is like -2.44182584e-7
        let sliceNew = prevMinus.slice(dot22+1, dot22 + 9);
        console.log(sliceNew)
        for (let i = 7; i >= 0 ; i--) {
          console.log(i)
          //console.log(sliceNew[i])
          if (sliceNew[i] !== "0" && sliceNew[i] !== undefined) { integerFoundASD = i; break }
        }

        console.log(integerFoundASD)

        console.log(parseFloat(prevMinus.join("")).toExponential(integerFoundASD))
        //result = (parseFloat(prevMinus.join("")).toExponential(integerFoundASD+1)).split("") // TESTING+1
        result = (parseFloat(prevMinus.join("")).toExponential(integerFoundASD)).split("") // TESTING+1
        console.log(result)
        // [ 7 . 5 9 5 1 5 8 0 e + 2 2 ]

        while ( result[result.indexOf("e")-1] === "0") {
          result.splice(result.indexOf("e")-1, 1)
        }
        console.log(result)

      }
      // else { // Number is like 1e+21
      //   console.log("aca")
      //   console.log(prevMinus)
      //   result = prevMinus
      //   console.log(result)
      // }


    }

    // else if (!prevMinus.includes("e") && prevMinus.length > 12 && !prevMinus.slice(0,12).includes(".")) { // LARGE INT
    // //if (prevMinus.length > 12 && !prevMinus.includes("e") && prevMinus.indexOf(".") > 11) { // LARGE & INT
      
    // }



    else if (!prevMinus.includes("e") && prevMinus.includes(".")) { // NUMBER IS NOT IN SCIENTIFIC NOTATION & IS DECIMAL
      console.log("aca")
      let testSlice = prevMinus.slice(0, 14)
      console.log(testSlice)
      let arrayAfterDot = prevMinus.slice(prevMinus.indexOf(".")+1)
      console.log(arrayAfterDot)

      console.log( parseFloat(parseFloat(prevMinus.join("")).toFixed(arrayAfterDot.length-2)).toString().split("") )
      console.log(arrayAfterDot.length-1)
      result = parseFloat(parseFloat(prevMinus.join("")).toFixed(arrayAfterDot.length-2)).toString().split("")
      console.log(result)

      // if (arrayAfterDot.length > 12) { // DECIMALS ARE LARGER THAN 12
      //   console.log("aca")
      //   console.log(prevMinus.join(""))
      //   result = parseFloat(prevMinus.join("")).toFixed(11).split("")
      //   console.log( parseFloat(prevMinus.join("")).toFixed(11) ) // OJO con toFixed(12)
      //   //parseInt(prevMinus.join("")).toFixed(11)
      //   //console.log(parseInt(prevMinus.join("")).toFixed(11))
      // } else { // DECIMALS ARE SMALLER THAN 12
      //   console.log("aca")
      //   console.log( parseFloat(prevMinus.join("")).toString().split("") )
      //   result = parseFloat(prevMinus.join("")).toString().split("")
      //   console.log(result)
      // }

      //console.log(lengthAfterDot.length)
      //console.log(parseFloat(prevMinus.join("")).toFixed(4).split("")) // TEST
      //prevMinus = parseFloat(prevMinus.join("")).toFixed(4).split("") // TEST
      //prevMinus = (parseFloat(prevMinus.join(""))).toFixed(14).split("") // TEST
    }
    
    //prevMinus = rawToArray.join

    //let prevMinus = rawToArray.filter((e: any) => e !== "-") // DOT IS TREATED AS A MAIN CHARACTER
    //console.log(prevMinus)
    //if ()
    //if ((parseInt(rawToArray.join("")) > 9 || parseInt(rawToArray.join("")) < -9) && prevMinus.length > 16) {
    //if ((parseInt(rawToArray.join("")) > 9 || parseInt(rawToArray.join("")) < -9) && prevMinus.length > 16) {
    //if ((Number(rawToArray.join("")) > 9 || Number(rawToArray.join("")) < -9) && prevMinus.length > 16) {
    //if (prevMinus.length > 12) {
    //if (Number(rawToArray.join("")) > 9 && prevMinus.length > 16) {
    //console.log(prevMinus)
    //console.log(rawToArray.join(""))
    //if (prevMinus.length > 16) {
    //console.log(prevMinus)
    //console.log( parseFloat(prevMinus.join("")).toFixed(7) )

    


    //else if (prevMinus.length > 12 && !prevMinus.includes(".")) { // NUMBER IS INTEGER AND LARGER
    else if (prevMinus.length > 12 && !prevMinus.includes(".")) { // NUMBER IS INTEGER AND LARGER
      console.log("aca")
    //if (true) {
      //let parsed = parseInt(prevMinus.slice(0, 8).join(""))
      //console.log(rawToArray[0])
      //if ()
      let slice2 = prevMinus.slice(0, 8)
      let dot11
      let largeRefInt
      console.log(slice2)

      if (slice2.includes(".")) { // slice have . and is large
        console.log("aca")
        dot11 = slice2.indexOf(".")
        console.log(dot11)
        let integerFound

        let sliceNew = prevMinus.slice(dot11+1, dot11 + 9);
        console.log(sliceNew)
        for (let i = 7; i >= 0 ; i--) {
          console.log(i)
          
          //console.log(sliceNew[i])
          if (sliceNew[i] !== "0" && sliceNew[i] !== undefined) { integerFound = i; break }
        }

        console.log(integerFound)
        console.log( parseFloat(Number(prevMinus.join("")).toFixed(integerFound)) )
        console.log(sliceNew)

        console.log( parseFloat(Number(prevMinus.join("")).toFixed(integerFound)) )
        result = (parseFloat(Number(prevMinus.join("")).toFixed(integerFound+1)).toString()).split("") // TESTING+1
        console.log(result)
        //console.log( (  Number(prevMinus.join("")) ).toFixed(integerFound) )

        //console.log(largeRefInt)
        //console.log(parseFloat(prevMinus.join("")).toExponential(largeRefInt))
        //result = (parseFloat(prevMinus.join("")).toExponential(largeRefInt)).split("")
        

        
      } else { // slice dont have . and is large
        console.log("aca")
        console.log(slice2)
        
        console.log(largeRefInt)
        //slice = prevMinus.slice(1, 9);
        for (let i = 7; i >= 0 ; i--) {
          console.log(i)
          console.log(slice2)
          console.log(slice2[i])
          if (slice2[i] !== "0" && slice2[i] !== undefined) { largeRefInt = i; break }
        }

        console.log(largeRefInt)

        console.log( (parseFloat(parseFloat(prevMinus.join("")).toExponential(largeRefInt))).toExponential() )
        //console.log( parseFloat(prevMinus.join("")).toExponential(largeRefInt) )

        //console.log(parseFloat(prevMinus.join("")).toExponential(largeRefInt))
        //result = (parseFloat(prevMinus.join("")).toExponential(largeRefInt)).split("")
        result = (parseFloat(parseFloat(prevMinus.join("")).toExponential(largeRefInt))).toExponential().split("")
        console.log(result)

      }

      

      // let prefix = rawToArray[0]
      // let dot = prevMinus.indexOf(".")
      // console.log(dot)
      // let slice
      // let intAfterDot

      // if (dot !== -1) { // DOT
      //   console.log("aca")
      //   slice = prevMinus.slice(dot+1, dot + 9);
      //   for (let i = 7; i >= 0 ; i--) {
      //     console.log(i)
      //     console.log(slice)
      //     console.log(slice[i])
      //     if (slice[i] !== "0" && slice[i] !== undefined) { intAfterDot = i; break }
      //   }

      // } else { // NO DOT
      //   console.log("aca")
      //   slice = prevMinus.slice(1, 9);
      //   for (let i = 7; i >= 0 ; i--) {
      //     console.log(i)
      //     console.log(slice)
      //     console.log(slice[i])
      //     if (slice[i] !== "0" && slice[i] !== undefined) { intAfterDot = i; break }
      //   }
      // }
      
      
      //console.log(rawToArray)
      //console.log(Number(prevMinus.join("")) > 9)
      // console.log(slice)
      // console.log(intAfterDot)
      //console.log(prevMinus)

      //console.log(parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot)))
      //console.log(prevMinus.join(""))
      //                                                                                                          PARSEFLOAT < NON-PARSEFLOAT
      // if (intAfterDot !== undefined && !rawToArray.includes("e") && (parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot))).toString().length < prevMinus.join("").length) {
      //   rawToArray = (parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot))).toString().split("") // OJO TEST intAfterDot+1 or intAfterDot
      //   console.log(rawToArray)
      // }
      // else {
      //   console.log(rawToArray)
      //   console.log(prevMinus)
      //   let dotTT = rawToArray.indexOf(".")
      //   let sliceEE
      //   let intAfterDotTT
      //   console.log(dotTT)
      //   if (dot !== -1) {
      //     console.log("aca")
      //     //sliceEE = prevMinus.slice(dotTT+1, dotTT + 9);
      //     sliceEE = prevMinus.slice(0, 8);

      //     for (let i = 7; i >= 0 ; i--) {
      //       if (sliceEE[i] !== "0") { intAfterDotTT = i; break }
      //     }
      //   }
        
      //   if (intAfterDotTT !== undefined) {
      //     rawToArray = (((parseFloat(prevMinus.join("")))).toExponential(intAfterDotTT)).toString().split("") // TEST intAfterDotTT+1 // OJO ACA
      //     console.log(intAfterDotTT)
      //     console.log(sliceEE)
      //     console.log(rawToArray)
      //   }
          
      // }
      //console.log(parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot)))
      //rawToArray = (parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot))).toString().split("")
      //rawToArray = (parseFloat((parseFloat(prevMinus.join(""))).toFixed(intAfterDot))).toExponential(intAfterDot).toString().split("")
      //if (prefix === "-") rawToArray.unshift("-")
      //  console.log("aca")

    } else {
      console.log("aca")
      console.log(prevMinus)
      result = (parseFloat(prevMinus.join(""))).toString().split("")
      console.log(result)
    }
    
    
    //  else {
    //   console.log("ENTRO ACA")
    //   rawToArray = parseFloat(parseFloat(rawToArray.join("")).toFixed(4)).toString().split("")
    //   console.log(rawToArray)
    //   //rawToArray = parseFloat(rawToArray.join("")).toString().split("")
    // }
  //} // ELSE DON'T LIMIT DECIMALS TO 4 POSITIONS // NUMBER IS IN SCIENTIFIC NOTATION

  // else {
  //   setInput(parseFloat(rawToArray.join("")).toString())
  // }

  //setInput(parsed[0].toString())

  // a lo ultimo

  

  //setInput(slice.join(""))
  //setInput(rawToArray.join(""))

  console.log("Final result:", parsed[0])
  //console.log(rawToArray.join(""))
  //if (Number(rawToArray.join("")) > 10) console.log(parseFloat(rawToArray.join("")))
  //else console.log(rawToArray.join(""))
  //console.log(parseFloat(rawToArray.join("")))

  //if (Number(rawToArray.join("")) < 10) console.log(parseFloat(rawToArray.join("")))
  //else console.log(rawToArray.join(""))

  console.log(prevMinus)
  //console.log(rawToArray)
  //if (prevMinus.length > 16) console.log(parseFloat(rawToArray.join("")))
  //else console.log(rawToArray.join(""))

  // if (prevMinus.length < 16) {
  //   console.log(rawToArray)
  //   console.log(parseFloat(rawToArray.join("")))
  //   rawToArray = (parseFloat(rawToArray.join(""))).toString().split("")
  //   if (rawToArray[0] === "-") { // NEGATIVE PARSER
  //     console.log(rawToArray)
  //     rawToArray.splice(0, 1, "N")
  //     console.log(rawToArray)
  //   }
  //   console.log(rawToArray.join("")) // RESPONSE 1
  // }
  // else {
  //   console.log(rawToArray)
  //   if (rawToArray[0] === "-") { // NEGATIVE PARSER
  //     console.log(rawToArray)
  //     rawToArray.splice(0, 1, "N")
  //     console.log(rawToArray)
  //   }
  //   console.log(rawToArray.join("")) // RESPONSE 2
  // }
  console.log(prefix)
  if (prefix === "-") { // NEGATIVE PARSER
    console.log(result)
    result?.splice(0,0,"N")
    //result = result?.join("")
    console.log(result)
  }

  console.log(result?.join("")) // FINAL RESULT
  
export {}