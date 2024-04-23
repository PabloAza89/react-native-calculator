import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Adder } from '../functions/Adder';

interface OwnButtonI {
  value?: any,
  input?: any,
  setInput?: any,
  resPressed?: any,
  setResPressed?: any,
  arr1?: any,
  arr5?: any,
  smaller?: boolean,
  setParErr?: any
};

export function OwnButton({ value, input, setInput, setResPressed, resPressed, arr1, arr5, smaller, setParErr }: OwnButtonI): React.JSX.Element {
  function handlePress() {
    //console.log("INPUT:", input)
    // console.log("val", val)
    // test ↓↓↓
    //setInput((value * -1).toString()) // test

    if (value !== "=") setParErr(false) // RESET ERROR PARENTHESIS

    /// -----------> BEGIN STOPPERS <----------- ///

    if (value === "C") { setInput(""); return } // CLEAR INPUT AND STOP

    if (value === "B") { // Backspace
      if (input.slice(-3) === " x " || // if last input is an operator: "123 + "
        input.slice(-3) === " / " ||
        input.slice(-3) === " + " ||
        input.slice(-3) === " - ") {
        setInput(input.slice(0,-3))
        return
      } else { // else
        let seqOne = input.split("")
        seqOne.pop()
        let seqTwo = seqOne.join("")
        setInput(seqTwo)
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
    ) return

    if (
      input.slice(-1) === ")" &&
      value === "."
    ) return // STOP IF ATTEMPT ).

    if (
      input.slice(-1) === "." &&
      isNaN(parseInt(value))
    ) return // STOP IF ATTEMPT .. or .( or .x

    if (
      (!isNaN(parseInt(input[input.length - 1])) &&
      !isNaN(parseInt(input[input.length - 2])) &&
      input[input.length - 3] === "." &&
      !isNaN(parseInt(input[input.length - 4]))) &&
      (!isNaN(parseInt(value)) || value === ".")
    ) return // STOP IF ATTEMPT 3.999 or 3.77. (floating point number > 2)

    if (
      (!isNaN(parseInt(input[input.length - 1])) &&
      input[input.length - 2] === "." &&
      !isNaN(parseInt(input[input.length - 3]))) &&
      value === "."
    ) return // STOP IF ATTEMPT 3.9.

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
    ) return // STOP IF ATTEMPT )(

    if (
      input.slice(-1) === ")" &&
      (!isNaN(parseInt(value)) || value === "M")
    ) return // STOP IF ATTEMPT )9 or )M

    if (
      !isNaN(parseInt(input.slice(-1))) && // last input is a number
      (value === "(" || value === "M")
    ) return // STOP IF ATTEMPT 9( or 9M

    if (
      input.slice(-1) === "M" && // M = negative value
      (value === "X" ||
      value === "/" ||
      value === "+" ||
      value === "-" ||
      value === "." ||
      value === "(" ||
      value === ")" ||
      value === "M")
    ) return // STOP IF ATTEMPT M+


    if (
      (input.slice(-3) === " x " ||
      input.slice(-3) === " / " ||
      input.slice(-3) === " + " ||
      input.slice(-3) === " - " ||
      input.slice(-1) === "(" ||
      input.slice(-1) === "M") &&
      value === "="
    ) return // STOP IF ATTEMPT M= or +=

    /// -----------> END STOPPERS <----------- ///

    /// -----------> BEGIN CALC <----------- ///

    if (value === "=") { Adder({ input, setParErr }); return }

    /// -----------> END CALC <----------- ///

    /// -----------> BEGIN INPUT UPDATE <----------- ///

    if (value === "X") setInput((prev: any) => prev + " x ") // set operator with spaces
    else if (value === "/") setInput((prev: any) => prev + " / ") // set operator with spaces
    else if (value === "+") setInput((prev: any) => prev + " + ") // set operator with spaces
    else if (value === "-") setInput((prev: any) => prev + " - ") // set operator with spaces
    else setInput((prev: any) => prev + value)

    /// -----------> END INPUT UPDATE <----------- ///

  }


  return (
    <Text
      onPress={() => handlePress()}
      style={[ smaller ? s.ownButtonSmaller : s.ownButton ]}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
    >
      {
        value === "B" ?
        <Ionicons name='backspace' size={40} color='#363535' /> :
        value === "M" ?
        "-X" :
        value
      }
    </Text>
  );
}