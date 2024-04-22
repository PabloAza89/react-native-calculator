import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface OwnButtonI {
  value?: any,
  input?: any,
  setInput?: any,
  resPressed?: any,
  setResPressed?: any,
  arr1?: any,
  arr5?: any,
  smaller?: boolean
};

export function OwnButton({ value, input, setInput, setResPressed, resPressed, arr1, arr5, smaller }: OwnButtonI): React.JSX.Element {
  //console.log("PROPS", props)
  function handlePress() {
    console.log("INPUT:", input)
    console.log("INPUT length:", input.length)
    // console.log("resPressed", resPressed)
    // console.log("init", init)
    // console.log("val", val)

    // test ↓↓↓
    //setInput((value * -1).toString()) // test

    if (value === "C") { setInput(""); return } // CLEAR ALL

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
      
    }

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
      value === "." ) // STOP IF ATTEMP + AND + (REPEATED OPERATORS)
    ) return

    if (
      input.slice(-1) === ")" &&
      value === "."
    ) return // STOP IF ATTEMP ).

    if (
      input.slice(-1) === "." &&
      isNaN(parseInt(value))
    ) return // STOP IF ATTEMP .. or .( or .x

    if (
      !isNaN(parseInt(input[input.length - 1])) &&
      !isNaN(parseInt(input[input.length - 2])) &&
      !isNaN(parseInt(value))
    ) return // STOP IF ATTEMP .999 or .777 (floating point number > 2)

    // if (
    //   !isNaN(parseInt(input[input.length - 2])) &&
    //   !isNaN(parseInt(input[input.length - 1])) &&
    //   (!isNaN(parseInt(value)) || value === ".")
    // ) return // STOP IF ATTEMP .9.


    if (input.length === 0) {
      if (
        value === "/" ||
        value === "." ||
        value === "+" ||
        value === "-" ||
        value === "X" ||
        value === ")"
      ) return // STOP IF ATTEMP ) FIRST
    }

    if (
      input.slice(-1) === ")" &&
      value === "("
    ) return // STOP IF ATTEMP )(

    if (
      input.slice(-1) === ")" &&
      (!isNaN(parseInt(value)) || value === "M")
    ) return // STOP IF ATTEMP )9 or )M

    if (
      !isNaN(parseInt(input.slice(-1))) && // last input is a number
      (value === "(" || value === "M")
    ) return // STOP IF ATTEMP 9( or 9M

    // if (
    //   input.slice(-1) === ")" &&
    //   !isNaN(parseInt(value))
    // ) return // STOP IF ATTEMP )9

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
    ) return // STOP IF ATTEMP M+

    // if (
    //   input.slice(-1) === "M" && // M = negative value
    //   (input.slice(-1) === " X" ||
    //   value === "/" ||
    //   value === "+" ||
    //   value === "-" ||
    //   value === "." ||
    //   value === "(" ||
    //   value === ")" ||
    //   value === "M")
    // ) return // STOP IF ATTEMP M+

    
    if (value === "X") setInput((prev: any) => prev + " x ") // set operator with spaces
    else if (value === "/") setInput((prev: any) => prev + " / ") // set operator with spaces
    else if (value === "+") setInput((prev: any) => prev + " + ") // set operator with spaces
    else if (value === "-") setInput((prev: any) => prev + " - ") // set operator with spaces
    else setInput((prev: any) => prev + value)
      //if (value === ")") return
    //   setInput((prev: any) => prev + value)
    // } 
   //setInput((prev: any) => prev + value)

    // if (resPressed && input !== "" && value === "+") {
    //   setResPressed(false);
    //   setInput(arr1[0].toString());
    //   console.log("EXECUTED")
    // }

    // if (value === "X") value = "x"

    // if (value === "C") { setResPressed(false); setInput("") }
    // else if (input === "" && !isNaN(value) || input !== "") {
    //   if (value === "=") {
    //     setResPressed(true);
    //     setInput(arr5[0].toString())
    //   }
    //   //else if (value === "C") setInit("")
    //   else if (value === "B") {
    //     let seqOne = input.split("")
    //     seqOne.pop()
    //     let seqTwo = seqOne.join("")
    //     setInput(seqTwo)
    //   }
    //   else setInput((prev: any) => prev + value)
    // }
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