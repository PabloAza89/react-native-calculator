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

//  const [ demo, setInput ] = useState<any[]>([]);
const [ input, setInput ] = useState("");
const [ resPressed, setResPressed ] = useState(false);

//let input = "3-100"
let arr0: any[] = input.split("") // ['S'P'L'I'T'E'D']
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



  console.log("arr1:", arr1)
  //console.log("arr5:", arr5)


  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        {/* <Text style={[s.result]}>{ input }</Text> */}
        {/* <Text style={[s.result]}>{ resPressed ? arr5 : arr1 }</Text> */}
        <Text style={[s.result]}>{ arr0 }</Text>
        <OwnButton input={input} setInput={setInput} value="(" smaller={true} />
        <OwnButton input={input} setInput={setInput} value=")" smaller={true} />
        <OwnButton input={input} setInput={setInput} value="C" smaller={true} setResPressed={setResPressed} />
        <OwnButton input={input} setInput={setInput} value="M" smaller={true} />
        <OwnButton input={input} setInput={setInput} value="B" smaller={true} />
        <OwnButton input={input} setInput={setInput} value="7" />
        <OwnButton input={input} setInput={setInput} value="8" />
        <OwnButton input={input} setInput={setInput} value="9" />
        <OwnButton input={input} setInput={setInput} value="X" />
        <OwnButton input={input} setInput={setInput} value="4" />
        <OwnButton input={input} setInput={setInput} value="5" />
        <OwnButton input={input} setInput={setInput} value="6" />
        <OwnButton input={input} setInput={setInput} value="-" />
        <OwnButton input={input} setInput={setInput} value="1" />
        <OwnButton input={input} setInput={setInput} value="2" />
        <OwnButton input={input} setInput={setInput} value="3" />
        <OwnButton input={input} setInput={setInput} value="+" />
        <OwnButton input={input} setInput={setInput} value="/" />
        <OwnButton input={input} setInput={setInput} value="0" />
        <OwnButton input={input} setInput={setInput} value="." />
        <OwnButton input={input} setInput={setInput} value="=" setResPressed={setResPressed} arr5={arr5}  />
      </View>
    </View>
  );
}

export default App;
