//let init = "(((10x2x3/2+2)+2x2)x2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET LATER
//let init = "20)x2x(3/2+(2)".split("") // ['S'P'L'I'T'E'D'] // TEST PARENTHESIS ERROR
let init = "20)x2x(3/2+(2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(20x6/2+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(120/2+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(60+2)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET
//         "(62)".split("") // ['S'P'L'I'T'E'D'] // TEST TARGET

let parsed = [] // [10, x, 30, +, 3, -, 2] // WELL PARSED // UPDATED EVERY ( PARENTHESIS ) CALC

if (init[0] !== "(" && init[init.length - 1] !== ")") { // Add ( and ) to beginning and end
  init.unshift("(")
  init.push(")")
}

let error = "";

init.forEach((e, i) => { // => first parsed result
  if (parsed.length === 0) parsed.push(e)
  else if (!isNaN(init[i - 1]) && !isNaN(e)) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

if (
  init.filter(e => e === "(").length !==
  init.filter(e => e === ")").length
) error = "ERROR" // Check if ((( and ))) amount are equal

///

checkOpenPar = parsed.indexOf(")") // FIND FIRST OPEN ( PARENTHESIS NEXT TO ), MOVING INDEX
checkClosePar = checkOpenPar; // FIND FIRST CLOSED ) PARENTHESIS

do {
  if (parsed[checkOpenPar] === "(") break;
  else checkOpenPar--
} while (checkOpenPar !== -1)

//let este = parsed.splice(checkOpenPar, checkClosePar - (checkOpenPar - 1)) // Extract toDo from Main (init)

console.log(checkOpenPar)
console.log(checkClosePar)

if (
  checkOpenPar === -1 && checkClosePar !== -1 ||
  checkOpenPar !== -1 && checkClosePar === -1
) error = "ERROR" // Check if ")( ()"" are bad positioned

///


console.log(init)
console.log(error)