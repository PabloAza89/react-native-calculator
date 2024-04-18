import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { s } from './src/styles';
import { OwnButton } from './src/components/OwnButton';

function App(): React.JSX.Element {

//  const [ demo, setInit ] = useState<any[]>([]);
const [ init, setInit ] = useState("");
const [ resPressed, setResPressed ] = useState(false);

//let init = "3-100"
let arr0: any[] = init.split("") // ['S'P'L'I'T'E'D']
let arr1: any[] = [] // [10, x, 33, +, 3, -, 2] // WELL PARSED
let arr2: any[] = [] // [DO ALL x]
let arr3: any[] = [] // [DO ALL /]
let arr4: any[] = [] // [DO ALL +]
let arr5: any[] = [] // [DO ALL -] // FINAL RES

arr0.forEach((e, i) => { // => arr1
  if (arr1.length === 0) arr1.push(e)
  else if (!isNaN(arr0[i - 1]) && !isNaN(e)) arr1[arr1.length - 1] = arr1[arr1.length - 1].concat(e)
  else arr1.push(e)
})

arr1.forEach((e, i) => { // => arr2 // [DO ALL X]
  if (e === "x" && !isNaN(arr1[i - 1]) && !isNaN(arr1[i + 1])) arr2.push(parseInt(arr1[i - 1]) * parseInt(arr1[i + 1]))
  else if (arr1[i - 1] !== "x" && arr1[i + 1] !== "x") arr2.push(e)
})

arr2.forEach((e, i) => { // => arr3 // [DO ALL /]
  if (e === "/" && !isNaN(arr2[i - 1]) && !isNaN(arr2[i + 1])) arr3.push(parseInt(arr2[i - 1]) / parseInt(arr2[i + 1]))
  else if (arr2[i - 1] !== "/" && arr2[i + 1] !== "/") arr3.push(e)
})

arr3.forEach((e, i) => { // => arr4 // [DO ALL +]
  if (e === "+" && !isNaN(arr3[i - 1]) && !isNaN(arr3[i + 1])) arr4.push(parseInt(arr3[i - 1]) + parseInt(arr3[i + 1]))
  else if (arr3[i - 1] !== "+" && arr3[i + 1] !== "+") arr4.push(e)
})

arr4.forEach((e, i) => { // => arr5 // [DO ALL -]
  if (e === "-" && !isNaN(arr4[i - 1]) && !isNaN(arr4[i + 1])) arr5.push(parseInt(arr4[i - 1]) - parseInt(arr4[i + 1]))
  else if (arr4[i - 1] !== "-" && arr4[i + 1] !== "-") arr5.push(e)
})

  /* console.log("Adder:", init) */
  console.log("arr1:", arr1)
  console.log("arr5:", arr5)
  //console.log("Adder:", arr5[0])

  // useEffect(() => {
  //   if (resPressed) setInit(arr5[0].toString())
  //   else setInit(init)
  // }, [resPressed, arr5])

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        {/* <Text style={[s.result]}>{ init }</Text> */}
        <Text style={[s.result]}>{ resPressed ? arr5 : arr1 }</Text>
        <OwnButton init={init} setInit={setInit} value="( )"></OwnButton>
        <OwnButton init={init} setInit={setInit} setResPressed={setResPressed} value="C"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="/"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="B"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="7"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="8"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="9"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="X"></OwnButton>
        <OwnButton init={init} setInit={setInit} resPressed={resPressed} value="4"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="5"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="6"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="-"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="1"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="2"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="3"></OwnButton>
        <OwnButton init={init} setInit={setInit} resPressed={resPressed} setResPressed={setResPressed} arr1={arr1} value="+"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="M"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="0"></OwnButton>
        <OwnButton init={init} setInit={setInit} value="."></OwnButton>
        <OwnButton init={init} setInit={setInit} setResPressed={setResPressed} arr5={arr5} value="="></OwnButton>
      </View>
    </View>
  );
}

export default App;
