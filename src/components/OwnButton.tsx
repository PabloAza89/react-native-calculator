import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface OwnButtonI {
  value?: string,
  demo?: any,
  setDemo?: any,
};

export function OwnButton({ value, demo, setDemo }: OwnButtonI): React.JSX.Element {

  function handlePress(val: any) {

    if (demo === "" && !isNaN(val) || demo !== "") {
      if (val === "=") {

      }
      else if (val === "C") setDemo("")
      else if (val === "B") {
        let seqOne = demo.split("")
        seqOne.pop()
        let seqTwo = seqOne.join("")
        setDemo(seqTwo)
      }
      else setDemo((prev: any) => prev + val)

    }
    

  }


  return (

    <Text
      onPress={() => handlePress(value)}
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