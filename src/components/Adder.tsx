import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Text
} from 'react-native';
import { s } from '../styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OwnButton } from './OwnButton';

//export let demo: "s";
//const [ demo, setDemo ] = useState("");



/* type OwnButtonP = PropsWithChildren<{
  value: string;
}>; */

/* interface AdderI {
  value?: any,
  setDemo?: any
} */

type AdderI = {
  val: any;
};

export function Adder(val: any): React.JSX.Element {
//export function Adder(props: AdderI) {
//export default function Adder({ value }: AdderI) {
  //console.log("Adder:", value)
  //console.log("Adder:", props)


  //const [ demo, setDemo ] = useState("");

  //console.log("Adder:", demo)
  //  let arr = []
  //  arr.push(props)
  // console.log("Adder:", arr)
  //console.log("Adder:", val)

 /*  function tF(xx: any) {
    console.log("ADDER:", xx)
  } */
  // function handlePress(val: any) {
  //   //console.log("Adder:", value)
  //   /* demo = val */
  //   //setDemo(prev => prev + val)
  // }

  

  // console.log("Demo:", demo)

  // //console.log("BB", demo)
  // //console.log("BB", value)
  return (<></>)
  /* return (
    
      <OwnButton setDemo={setDemo}/>
    
  ); */
}