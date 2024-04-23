//let init = "((M20)x2)x(M3)/2+(2)".replace(/ /g,'').split("") // input without whitespaces & splitted
let init = "20)xM2x(3/2+(M2)".replace(/ /g,'').split("") // input without whitespaces & splitted

// init.unshift("(") // ADD PARENTHESIS AT BEGINNING // AGREGAR AL FINAL // TODO
// init.push(")") // ADD PARENTHESIS AT END // TODO

let parsed: any[] = []

init.forEach((e, i) => { // 
  if ((init[i - 1] === "M" || !isNaN(parseInt(init[i - 1]))) && !isNaN(parseInt(e))) parsed[parsed.length - 1] = parsed[parsed.length - 1].concat(e)
  else parsed.push(e)
})

parsed.forEach((e, i) => {
  if (e.slice(0, 1) === "M") parsed[i] = -1 * parseInt(e.slice(1, e.length))
})

//parsed

/// -----------> BEGIN PARENTHESIS STOPPERS <----------- ///

if (
  parsed.filter((e: any) => e === "(").length !== // Check if ((( and ))) amount are equal
  parsed.filter((e: any) => e === ")").length
//) { setParErr(true); return }
) { console.log("ERROR") }

//let openParFound = parsed.indexOf(")") // OPEN PARENTHESIS, MOVING INDEX
//let closeParFound = openParFound; // CLOSED PARENTHESIS



// do {
//   if (parsed[openParFound] === "(") break;
//   else openParFound--
// } while (openParFound !== -1)

// console.log(parsed)
// console.log(openParFound)
// console.log(closeParFound)

/// -----------> END PARENTHESIS STOPPERS <----------- ///

export {}