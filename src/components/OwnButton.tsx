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

    // console.log("resPressed", resPressed)
    // console.log("init", init)
    // console.log("val", val)
    if (resPressed && input !== "" && value === "+") {
      setResPressed(false);
      setInput(arr1[0].toString());
      console.log("EXECUTED")
    }

    if (value === "X") value = "x"

    if (value === "C") { setResPressed(false); setInput("") }
    else if (input === "" && !isNaN(value) || input !== "") {
      if (value === "=") {
        setResPressed(true);
        setInput(arr5[0].toString())
      }
      //else if (value === "C") setInit("")
      else if (value === "B") {
        let seqOne = input.split("")
        seqOne.pop()
        let seqTwo = seqOne.join("")
        setInput(seqTwo)
      }
      else setInput((prev: any) => prev + value)
    }
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