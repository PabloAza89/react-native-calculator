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
  init?: any,
  setInit?: any,
  resPressed?: any,
  setResPressed?: any,
  arr1?: any,
  arr5?: any
};

export function OwnButton({ value, init, setInit, setResPressed, resPressed, arr1, arr5 }: OwnButtonI): React.JSX.Element {
  //console.log("PROPS", props)
  function handlePress() {

    // console.log("resPressed", resPressed)
    // console.log("init", init)
    // console.log("val", val)
    if (resPressed && init !== "" && value === "+") {
      setResPressed(false);
      setInit(arr1[0].toString());
      console.log("EXECUTED")
    }

    if (value === "X") value = "x"

    if (value === "C") { setResPressed(false); setInit("") }
    else if (init === "" && !isNaN(value) || init !== "") {
      if (value === "=") {
        setResPressed(true);
        setInit(arr5[0].toString())
      }
      //else if (value === "C") setInit("")
      else if (value === "B") {
        let seqOne = init.split("")
        seqOne.pop()
        let seqTwo = seqOne.join("")
        setInit(seqTwo)
      }
      else setInit((prev: any) => prev + value)

    }
    

  }


  return (

    <Text
      onPress={() => handlePress()}
      style={[s.ownButton]}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
    >
      {
        value === "B" ?
        <Ionicons name='backspace' size={40} color='#363535' /> :
        value === "M" ?
        <MaterialCommunityIcons name='plus-minus-variant' size={40} color='#363535' /> :
        value }
    </Text>
  );
}