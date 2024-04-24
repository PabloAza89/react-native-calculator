//let init = input.replace(/ /g,'').split("") // OK
//let init = "(((2x3+3) x 3 + 2) x 4 / M4.1)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "((2x3+M3.1) x 3 + 2) x 4 / 4".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(3 x M4.5)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(M3.4) x (1)".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "(3) x M5.1".replace(/ /g,'').split("") // input without whitespaces & splitted
//let init = "20)x(3+(M2.1)".replace(/ /g,'').split("") // FIRST LEVEL ERROR
//let init = "(2xM3.1)/2)+(2".replace(/ /g,'').split("") // SECOND LEVEL ERROR

//let init = "(2+2x3)x(M3.3)".replace(/ /g,'').split("") //
//let init = "(2+M2.99)x(3)".replace(/ /g,'').split("") //
let init = "(M2.12)x(3.45)".replace(/ /g,'').split("") //

/// -----------> BEGIN PARENTHESIS STOPPERS <----------- ///

if (
  init.filter((e: any) => e === "(").length !== // Check if ((( and ))) amount are equal
  init.filter((e: any) => e === ")").length
//) { setParErr(true); return }
) { console.log("ERROR") }

/// -----------> END PARENTHESIS STOPPERS <----------- ///

let parsed: any[] = []

init.forEach((e: any, i: any) => { // ADD 'M37' or '99' or '7.32' JOINED, ELSE PUSH x ALONE
  if (
    (init[i - 1] === "M" || init[i - 1] === "." || !isNaN(parseInt(init[i - 1]))) &&
    (!isNaN(parseInt(e)) || e === ".")
  ) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

parsed.forEach((e, i) => { // M95 => -1 * 95 // NEGATIVE PARSER
  if (e.slice(0, 1) === "M") parsed[i] = -1 * parseFloat(e.slice(1, e.length))
})




export {}