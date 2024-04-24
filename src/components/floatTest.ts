//let init = input.replace(/ /g,'').split("") // OK
//let init = "(((2x3+3) x 3 + 2) x 4 / 4)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "((2x3+3) x 3 + 2) x 4 / 4".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(3 x 4)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(3) x (1)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(3) x 5".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "20)x(3+(2)".replace(/ /g,'').split("") // FIRST LEVEL ERROR
//let init = "(2x3)/2)+(2".replace(/ /g,'').split("") // SECOND LEVEL ERROR

//let init = "(2+2x3)x(3)".replace(/ /g,'').split("") //
//let init = "(2+M2.1)x(3)".replace(/ /g,'').split("") //
let init = "(M2.12)x(3.45)".replace(/ /g,'').split("") //

/// -----------> BEGIN PARENTHESIS STOPPERS <----------- ///

if (
  init.filter((e: any) => e === "(").length !== // Check if ((( and ))) amount are equal
  init.filter((e: any) => e === ")").length
//) { setParErr(true); return }
) { console.log("ERROR") }

/// -----------> END PARENTHESIS STOPPERS <----------- ///

let parsed: any[] = []

console.log(init)

init.forEach((e: any, i: any) => { // ADD 'M37' or '99' JOINED, ELSE PUSH x ALONE
  if ((init[i - 1] === "M" || init[i - 1] === "." || !isNaN(parseInt(init[i - 1]))) && (!isNaN(parseInt(e)) || e === ".") ) {
    console.log(e)
    console.log(parsed)
    parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
    console.log(parsed)
    //let target = parsed[parsed.length - 1]
    //parsed[parsed.length - 1] = target.concat(e)

  }
  else parsed.push(e)
})

console.log(parsed)

parsed.forEach((e, i) => { // M95 => -1 * 95 // NEGATIVE PARSER
  if (e.slice(0, 1) === "M") parsed[i] = -1 * parseFloat(e.slice(1, e.length))
})

console.log(parsed)


// console.log(!isNaN(parseInt(parsed[2])))

// console.log(parsed)

export {}