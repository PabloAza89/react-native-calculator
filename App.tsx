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
import { s } from './src/styles/styles';
import { OwnButton } from './src/components/OwnButton';

function App(): React.JSX.Element {

//  const [ demo, setInput ] = useState<any[]>([]);
const [ input, setInput ] = useState("");
const [ parErr, setParErr ] = useState(false);
const [ resPressed, setResPressed ] = useState(false);

//let input = "3-100"
//let init: any[] = input.split("") // ['S'P'L'I'T'E'D']
// let arr1: any[] = [] // [10, x, 33, +, 3, -, 2] // WELL PARSED
// let arr2: any[] = [] // [DO ALL x]
// let arr3: any[] = [] // [DO ALL /]
// let arr4: any[] = [] // [DO ALL +]
// let arr5: any[] = [] // [DO ALL -] // FINAL RES

// arr0.forEach((e, i) => { // => arr1
//   if (arr1.length === 0) arr1.push(e)
//   else if (!isNaN(arr0[i - 1]) && !isNaN(e)) arr1[arr1.length - 1] = arr1[arr1.length - 1].concat(e)
//   else arr1.push(e)
// })



  //console.log("arr1:", arr1)
  //console.log("arr5:", arr5)
  //console.log("INPUT:", input)

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        { parErr && <Text style={s.parErr}>CHECK PARENTHESIS</Text> }
        {/* <Text style={s.parErr}>CHECK PARENTHESIS</Text> */}
        <Text style={[s.result]}>{ input.replaceAll(/N/g,"-") }</Text>
        <OwnButton input={input} setInput={setInput} value="(" setParErr={setParErr} smaller={true} />
        <OwnButton input={input} setInput={setInput} value=")" setParErr={setParErr} smaller={true} />
        <OwnButton input={input} setInput={setInput} value="C" setParErr={setParErr} smaller={true} setResPressed={setResPressed} />
        <OwnButton input={input} setInput={setInput} value="N" setParErr={setParErr} smaller={true} />
        <OwnButton input={input} setInput={setInput} value="B" setParErr={setParErr} smaller={true} />
        <OwnButton input={input} setInput={setInput} value="7" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="8" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="9" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="X" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="4" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="5" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="6" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="-" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="1" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="2" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="3" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="+" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="/" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="0" setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="." setParErr={setParErr} />
        <OwnButton input={input} setInput={setInput} value="=" setParErr={setParErr} setResPressed={setResPressed} />
      </View>
    </View>
  );
}

export default App;
