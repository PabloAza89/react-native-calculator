import { ReactElement } from 'react';
import { TouchableHighlight } from 'react-native';
import { Text } from '../../utils/Text';
import { s } from './OwnButtonCSS';
import { Ionicons } from '@expo/vector-icons';
import { Adder } from '../../utils/Adder';
import { OwnButtonI } from '../../interfaces/interfaces';

//export function OwnButton({ scrollEnd, parErr, value, input, setInput, smaller, setParErr, setSecInput, vmin }: OwnButtonI): ReactElement {
export function OwnButton({
  /* scrollEnd, */ /* parErr, */ value, /* input, */ /* setInput, */ /* setParErr, */
  /* setSecInput, */ size, margin, fontSize, small, state, /* update, */ handlePress
}: any): ReactElement {
  // async function handlePress() {

  //   if (value !== "=") setParErr(false) // RESET ERROR PARENTHESIS

  //   /// -----------> BEGIN STOPPERS <----------- ///

  //   if (input.current.length === input.current.replace(/ /g,'').length && value === "=") { scrollEnd(); return } // STOP IF INPUT IS "1e+38" or "1e+" or IF THERE IS NO OPERATION SIGN AND ATTEMPT = //

  //   if (parErr === true && value === "=") { scrollEnd(); return } // STOP IF PARENTHESIS ERROR IS DISPLAYED & ATTEMPT "=" // OJO ESTE IBA PRIMERO // TEST

  //   if (value === "C") { input.current = ""; setSecInput(""); return } // CLEAR INPUT AND STOP

  //   let splitted: string[] = input.current.replace(/ /g,'').split("") // OK

  //   if (
  //     value === "=" &&
  //     splitted.filter((e: string) => e === "(").length !== // STOP IF ((( AND ))) AMOUNT ARE UNEQUAL
  //     splitted.filter((e: string) => e === ")").length
  //   ) { setParErr(true); scrollEnd(); return }

  //   if (
  //     value === "=" &&
  //     splitted.indexOf("x") === -1 &&
  //     splitted.indexOf("/") === -1 &&
  //     splitted.indexOf("+") === -1 &&
  //     splitted.indexOf("-") === -1
  //   ) { scrollEnd(); return } // STOP IF "=" IS PRESSED & INPUT DONT HAVE x / + or -

  //   if (value === "B") { // Backspace
  //     if (input.current.slice(-3) === " x " || // if last input is an operator: "123 + "
  //       input.current.slice(-3) === " / " ||
  //       input.current.slice(-3) === " + " ||
  //       input.current.slice(-3) === " - ") {
  //       input.current = input.current.slice(0,-3);
  //       setSecInput("");
  //       return
  //     }
  //     else if (input.slice(-8) === "Infinity") { // if last input is Infinity: "Infinity" // TEST
  //       input.current = input.current.slice(0,-8)
  //       setSecInput("");
  //       return
  //     }
  //     else { // else
  //       let seqOne = input.current.split("");
  //       seqOne.pop();
  //       let seqTwo = seqOne.join("");
  //       input.current = seqTwo;
  //       setSecInput("");
  //       return
  //     }
  //   } // EDIT PREVIOUS INPUT AND STOP

  //   if (
  //     (input.current.slice(-3) === " x " ||
  //     input.current.slice(-3) === " / " ||
  //     input.current.slice(-3) === " + " ||
  //     input.current.slice(-3) === " - " ||
  //     input.current.slice(-1) === "(") &&
  //     (value === "X" ||
  //     value === "/" ||
  //     value === "+" ||
  //     value === "-" ||
  //     value === ")" ||
  //     value === "." ) // STOP IF ATTEMPT + AND + (REPEATED OPERATORS)
  //   ) { scrollEnd(); return }

  //   if (
  //     input.current.slice(-1) === ")" &&
  //     value === "."
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT ).

  //   if (
  //     input.current.slice(-1) === "." &&
  //     isNaN(parseInt(value))
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT .. or .( or .x

  //   if (
  //     (!isNaN(parseInt(input.current[input.current.length - 1])) &&
  //     !isNaN(parseInt(input.current[input.current.length - 2])) &&
  //     input.current[input.current.length - 3] === "." &&
  //     !isNaN(parseInt(input.current[input.current.length - 4]))) &&
  //     (!isNaN(parseInt(value)) || value === ".")
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT 3.999 or 3.77. (floating point number > 2)

  //   if (
  //     (!isNaN(parseInt(input.current[input.current.length - 1])) &&
  //     input.current[input.current.length - 2] === "." &&
  //     !isNaN(parseInt(input.current[input.current.length - 3]))) &&
  //     value === "."
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT 3.9.

  //   if (input.current.length === 0) {
  //     if (
  //       value === "/" ||
  //       value === "." ||
  //       value === "+" ||
  //       value === "-" ||
  //       value === "X" ||
  //       value === ")"
  //     ) return // STOP IF ATTEMPT ) FIRST
  //   }

  //   if (
  //     input.current.slice(-1) === ")" &&
  //     value === "("
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT )(

  //   if (
  //     input.current.slice(-1) === ")" &&
  //     (!isNaN(parseInt(value)) || value === "N")
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT )9 or )N

  //   if (
  //     !isNaN(parseInt(input.current.slice(-1))) && // last input is a number
  //     (value === "(" || value === "N")
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT 9( or 9N

  //   if (
  //     input.current.slice(-1) === "N" && // N = negative value
  //     (value === "X" ||
  //     value === "/" ||
  //     value === "+" ||
  //     value === "-" ||
  //     value === "." ||
  //     value === "(" ||
  //     value === ")" ||
  //     value === "N")
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT N+

  //   if (
  //     (input.current.slice(-3) === " x " ||
  //     input.current.slice(-3) === " / " ||
  //     input.current.slice(-3) === " + " ||
  //     input.current.slice(-3) === " - " ||
  //     input.current.slice(-1) === "(" ||
  //     input.current.slice(-1) === "N" ||
  //     input.current.length === 0) &&
  //     value === "="
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT N= or += or ""=

  //   if (input.current.includes("Infinity") && value === "=") { input.current = "Infinity"; setSecInput(input.current); scrollEnd(); return } // STOP IF INPUT INCLUDES "INFINITY" & ATTEMPT "=" // TEST

  //   if (
  //     input.current.slice(-8) === "Infinity" &&
  //     (value === "(" ||
  //     value === "N" ||
  //     !isNaN(parseInt(value)) ||
  //     value === ".")
  //   ) { scrollEnd(); return } // STOP IF ATTEMPT Infinity( or InfinityN or Infinity9 or Infinity. // TEST

  //   /// -----------> END STOPPERS <----------- ///

  //   /// -----------> BEGIN CALC <----------- ///

  //   if (value === "=") { Adder({ scrollEnd, input, setInput, setSecInput, setParErr }); return }

  //   /// -----------> END CALC <----------- ///

  //   /// -----------> BEGIN INPUT UPDATE <----------- ///

  //   if (value === "X") { setInput((prev: string) => prev + " x "); setSecInput("") } // set operator with spaces
  //   else if (value === "/") { setInput((prev: string) => prev + " / "); setSecInput("") } // set operator with spaces
  //   else if (value === "+") { setInput((prev: string) => prev + " + "); setSecInput("") } // set operator with spaces
  //   else if (value === "-") { setInput((prev: string) => prev + " - "); setSecInput("") } // set operator with spaces
  //   else { input.current = input.current + value; setSecInput("") }

  //   console.log("AAAAAAAAAAAAAA")
  //   //update(Math.random())
  //   update({})
  //   //else { setInput((prev: string) => prev + value); setSecInput("") }

  //   /// -----------> END INPUT UPDATE <----------- ///
  // }

  //console.log("OWN BUTTON", input)
  console.log("OWN BUTTON")

  return (
    <TouchableHighlight
      underlayColor="#dddddd"
      activeOpacity={1}
      style={[ state === 'tabletop' ? s.ownButtonTabletop : s.ownButton, { width: size, marginLeft: margin } ]}
      onPress={() => handlePress(value)}
      children={
        <Text
          style={[ s.text, { fontSize: small ? fontSize * 10 : fontSize * 12 } ]}
          children={
            value === "B" ?
            <Ionicons name='backspace' size={ small ? fontSize * 10 : fontSize * 12 } color='rgba(0, 0, 0, .54)' /> :
            value === "N" ?
            "-X" :
            value === "-" ?
            "–" :
            value
          }
        />
      }
    />
  );
}

export default OwnButton;