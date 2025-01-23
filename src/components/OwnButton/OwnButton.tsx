import { ReactElement } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { s } from './OwnButtonCSS';
import { Ionicons } from '@expo/vector-icons';
import { Adder } from '../../functions/adder';
import { OwnButtonI } from '../../interfaces/interfaces';

//export function OwnButton({ scrollEnd, parErr, value, input, setInput, smaller, setParErr, setSecInput, vmin }: OwnButtonI): ReactElement {
export function OwnButton({
  scrollEnd, parErr, value, input, setInput, smaller, setParErr,
  setSecInput, vmin, size, opw, oph, margin, small, fontSize, type
}: any): ReactElement {
  async function handlePress() {

    if (value !== "=") setParErr(false) // RESET ERROR PARENTHESIS

    /// -----------> BEGIN STOPPERS <----------- ///

    if (input.length === input.replace(/ /g,'').length && value === "=") { scrollEnd(); return } // STOP IF INPUT IS "1e+38" or "1e+" or IF THERE IS NO OPERATION SIGN AND ATTEMPT = //

    if (parErr === true && value === "=") { scrollEnd(); return } // STOP IF PARENTHESIS ERROR IS DISPLAYED & ATTEMPT "=" // OJO ESTE IBA PRIMERO // TEST

    if (value === "C") { setInput(""); setSecInput(""); return } // CLEAR INPUT AND STOP

    let splitted: string[] = input.replace(/ /g,'').split("") // OK

    if (
      value === "=" &&
      splitted.filter((e: string) => e === "(").length !== // STOP IF ((( AND ))) AMOUNT ARE UNEQUAL
      splitted.filter((e: string) => e === ")").length
    ) { setParErr(true); scrollEnd(); return }

    if (
      value === "=" &&
      splitted.indexOf("x") === -1 &&
      splitted.indexOf("/") === -1 &&
      splitted.indexOf("+") === -1 &&
      splitted.indexOf("-") === -1
    ) { scrollEnd(); return } // STOP IF "=" IS PRESSED & INPUT DONT HAVE x / + or -

    if (value === "B") { // Backspace
      if (input.slice(-3) === " x " || // if last input is an operator: "123 + "
        input.slice(-3) === " / " ||
        input.slice(-3) === " + " ||
        input.slice(-3) === " - ") {
        setInput(input.slice(0,-3));
        setSecInput("");
        return
      }
      else if (input.slice(-8) === "Infinity") { // if last input is Infinity: "Infinity" // TEST
        setInput(input.slice(0,-8));
        setSecInput("");
        return
      }
      else { // else
        let seqOne = input.split("");
        seqOne.pop();
        let seqTwo = seqOne.join("");
        setInput(seqTwo);
        setSecInput("");
        return
      }
    } // EDIT PREVIOUS INPUT AND STOP

    if (
      (input.slice(-3) === " x " ||
      input.slice(-3) === " / " ||
      input.slice(-3) === " + " ||
      input.slice(-3) === " - " ||
      input.slice(-1) === "(") &&
      (value === "X" ||
      value === "/" ||
      value === "+" ||
      value === "-" ||
      value === ")" ||
      value === "." ) // STOP IF ATTEMPT + AND + (REPEATED OPERATORS)
    ) { scrollEnd(); return }

    if (
      input.slice(-1) === ")" &&
      value === "."
    ) { scrollEnd(); return } // STOP IF ATTEMPT ).

    if (
      input.slice(-1) === "." &&
      isNaN(parseInt(value))
    ) { scrollEnd(); return } // STOP IF ATTEMPT .. or .( or .x

    if (
      (!isNaN(parseInt(input[input.length - 1])) &&
      !isNaN(parseInt(input[input.length - 2])) &&
      input[input.length - 3] === "." &&
      !isNaN(parseInt(input[input.length - 4]))) &&
      (!isNaN(parseInt(value)) || value === ".")
    ) { scrollEnd(); return } // STOP IF ATTEMPT 3.999 or 3.77. (floating point number > 2)

    if (
      (!isNaN(parseInt(input[input.length - 1])) &&
      input[input.length - 2] === "." &&
      !isNaN(parseInt(input[input.length - 3]))) &&
      value === "."
    ) { scrollEnd(); return } // STOP IF ATTEMPT 3.9.

    if (input.length === 0) {
      if (
        value === "/" ||
        value === "." ||
        value === "+" ||
        value === "-" ||
        value === "X" ||
        value === ")"
      ) return // STOP IF ATTEMPT ) FIRST
    }

    if (
      input.slice(-1) === ")" &&
      value === "("
    ) { scrollEnd(); return } // STOP IF ATTEMPT )(

    if (
      input.slice(-1) === ")" &&
      (!isNaN(parseInt(value)) || value === "N")
    ) { scrollEnd(); return } // STOP IF ATTEMPT )9 or )N

    if (
      !isNaN(parseInt(input.slice(-1))) && // last input is a number
      (value === "(" || value === "N")
    ) { scrollEnd(); return } // STOP IF ATTEMPT 9( or 9N

    if (
      input.slice(-1) === "N" && // N = negative value
      (value === "X" ||
      value === "/" ||
      value === "+" ||
      value === "-" ||
      value === "." ||
      value === "(" ||
      value === ")" ||
      value === "N")
    ) { scrollEnd(); return } // STOP IF ATTEMPT N+


    if (
      (input.slice(-3) === " x " ||
      input.slice(-3) === " / " ||
      input.slice(-3) === " + " ||
      input.slice(-3) === " - " ||
      input.slice(-1) === "(" ||
      input.slice(-1) === "N" ||
      input.length === 0) &&
      value === "="
    ) { scrollEnd(); return } // STOP IF ATTEMPT N= or += or ""=

    if (input.includes("Infinity") && value === "=") { setInput("Infinity"); setSecInput(input); scrollEnd(); return } // STOP IF INPUT INCLUDES "INFINITY" & ATTEMPT "=" // TEST

    if (
      input.slice(-8) === "Infinity" &&
      (value === "(" ||
      value === "N" ||
      !isNaN(parseInt(value)) ||
      value === ".")
    ) { scrollEnd(); return } // STOP IF ATTEMPT Infinity( or InfinityN or Infinity9 or Infinity. // TEST

    /// -----------> END STOPPERS <----------- ///

    /// -----------> BEGIN CALC <----------- ///

    if (value === "=") { Adder({ scrollEnd, input, setInput, setSecInput, setParErr }); return }

    /// -----------> END CALC <----------- ///

    /// -----------> BEGIN INPUT UPDATE <----------- ///

    if (value === "X") { setInput((prev: string) => prev + " x "); setSecInput("") } // set operator with spaces
    else if (value === "/") { setInput((prev: string) => prev + " / "); setSecInput("") } // set operator with spaces
    else if (value === "+") { setInput((prev: string) => prev + " + "); setSecInput("") } // set operator with spaces
    else if (value === "-") { setInput((prev: string) => prev + " - "); setSecInput("") } // set operator with spaces
    else { setInput((prev: string) => prev + value); setSecInput("") }

    /// -----------> END INPUT UPDATE <----------- ///

  }

  //console.log("AAA", oph)
  //console.log("MARGIN", margin)

  return (
    <TouchableHighlight
      underlayColor="#dddddd"
      activeOpacity={1}
      style={[ type === 'tabletop' ? s.ownButtonTabletop : s.ownButton, { width: size, marginLeft: margin, /* marginTop: '1%' */ } ]}
      onPress={() => handlePress()}
      children={
        <Text
          //style={[ s.text, { fontSize: small ? vmin * 5.5 : vmin * 6 } ]} // fontSize
          style={[ s.text, { fontSize: small ? fontSize * 12 : fontSize * 12 } ]} // fontSize
          children={
            value === "B" ?
            <Ionicons name='backspace' size={small ? fontSize * 12 : fontSize * 12 } color='rgba(0, 0, 0, .5)' /> :
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