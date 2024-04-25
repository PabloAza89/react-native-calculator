import React, { useState, useEffect, useRef } from 'react';
//import type { MutableRefObject } from 'react';
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

useEffect(() => {
  scrollEnd()
}, [input])

  //console.log("arr1:", arr1)
  //console.log("arr5:", arr5)
  //console.log("INPUT:", input)

  //const scrollRef = useRef();

  // const onPressTouch = () => {
  //   scrollRef.current?.scrollTo({
  //     x: 0,
  //     animated: true,
  //   });
  // }

  //const scrollRef = useRef(null);
  const scrollRef = React.createRef<ScrollView>();

  const scrollEnd = () => {
    //if (scrollRef.current !== null) (scrollRef.current as any).scrollToEnd({ animated: true })
    //if (scrollRef.current !== null) scrollRef.current.scrollToEnd({ animated: true })
      scrollRef.current?.scrollToEnd({ animated: false })
      
    

  }

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        { parErr && <Text style={s.parErr}>CHECK PARENTHESIS</Text> }
        <View style={[s.displayContainer]}>
          <ScrollView
            overScrollMode="never"
            //ref={scrollRef}
            ref={scrollRef}
            //onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
            //onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
            // bounces={false}
            // bouncesZoom={false}
            horizontal={true}
            //automaticallyAdjustContentInsets={true}
          >
            <Text style={[s.mainResult]}>{ input.replaceAll(/N/g,"-") }</Text>
          </ScrollView>
        </View>
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="(" setParErr={setParErr} smaller={true} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value=")" setParErr={setParErr} smaller={true} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="C" setParErr={setParErr} smaller={true} setResPressed={setResPressed} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="N" setParErr={setParErr} smaller={true} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="B" setParErr={setParErr} smaller={true} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="7" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="8" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="9" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="X" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="4" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="5" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="6" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="-" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="1" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="2" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="3" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="+" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="/" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="0" setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="." setParErr={setParErr} />
        <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="=" setParErr={setParErr} parErr={parErr} setResPressed={setResPressed} />
      </View>
    </View>
  );
}

export default App;
