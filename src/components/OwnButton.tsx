import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Adder } from './Adder';

//export let demo: "s";
//const [ demo, setDemo ] = useState("");



interface OwnButtonI {
  value?: string,
  setDemo?: any,
};

export function OwnButton({ value, setDemo }: OwnButtonI): React.JSX.Element {

  function handlePress(val: any) {
    console.log("AA", val);
    {/* <Adder value={value}/> */}
    {/* <Adder value={val}/> */}
    //tF(val)
    //Adder(val)
    setDemo((prev: any) => prev + val)
    //setDemo.push(val)
    //<Adder setDemo={setDemo}/>
    //<Adder val="333"/>
    //setDemo(val)
    /* demo = val */
    /* setDemo(prev => prev + val) */
  }

  //const [ demo, setDemo ] = useState("");

  //console.log("BB", demo)

  return (

    <Text
      onPress={() => handlePress(value)}
      style={[s.ownButton]}
      adjustsFontSizeToFit={true}
      numberOfLines={1}
    >
      { value === "DEL" ? <Ionicons name='md-backspace' size={40} color='black' /> : value }
    </Text>
  );
}