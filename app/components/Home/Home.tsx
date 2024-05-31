import React, { useState, useEffect } from 'react';
// import { 
//   StatusBar,
//   setStatusBarBackgroundColor,
//   setStatusBarHidden,
//   setStatusBarTranslucent
// } from 'expo-status-bar';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
//import SafeAreaView from 'react-native-safe-area-context';
//import SafeAreaView from 'react-native-safe-area-view';
//import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home({ navigation }: any): React.JSX.Element {

  const [ input, setInput ] = useState("");
  const [ secInput, setSecInput ] = useState("");
  const [ parErr, setParErr ] = useState(false);

  useEffect(() => {
    scrollEnd()
  }, [input])

  const scrollRefUpper = React.createRef<ScrollView>();
  const scrollRefCenter = React.createRef<ScrollView>();

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  //() => StatusBar.setStatusBarBackgroundColor('yellow', animated)

  //setStatusBarBackgroundColor('lightblue', true)
  //setStatusBarBackgroundColor('red', true)
  //setStatusBarBackgroundColor('blue', true)
  //setStatusBarBackgroundColor('transparent', true)

  //setStatusBarHidden(true, 'none')
  //setStatusBarHidden(false, 'none')

  //setStatusBarTranslucent(false)
  //setStatusBarTranslucent(true)

  return (


        <View style={[s.background]}>
          {/* <StatusBar translucent={true} backgroundColor={'transparent'}/> */}
          {/* <StatusBar translucent={false} backgroundColor={'red'}/> */}
          {/* <StatusBar style="dark"/> */}
          {/* <StatusBar style="light" /> */}
          {/* <StatusBar style="inverted"/> */}
          {/* <StatusBar style="auto" translucent={false}  backgroundColor={'red'} /> */}
          {/* <StatusBar style="dark" translucent={true} backgroundColor={'transparent'} /> */}
          {/* <StatusBar style="dark"/> */}
         {/*  <StatusBar
            //style="dark"
            //style="light"
            //StatusBarStyle='light'
            //translucent
            translucent={true}
            //translucent={false}
            //hidden={false}
            //hidden={true}
            // style={backgroundColor={'yellow'}}
            //backgroundColor={'#ffff00'}
            //backgroundColor={'transparent'}
            //backgroundColor={'yellow'}
          /> */}
          <View style={[s.contour]}>
            { parErr && <Text style={s.parErr}>CHECK PARENTHESIS</Text> }
            <View style={[s.displayContainer]}>
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[s.secondaryResult]}>{ secInput.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[s.mainResult]}>{ input.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <Text style={[s.secondaryResult]} />
            </View>
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="(" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value=")" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="C" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="N" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="B" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="7" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="8" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="9" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="X" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="4" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="5" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="6" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="-" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="1" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="2" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="3" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="+" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="/" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="0" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="." setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="=" setParErr={setParErr} setSecInput={setSecInput} parErr={parErr} />

            <TouchableHighlight
              underlayColor="#8aaeba"
              activeOpacity={1}
              style={s.question}
              onPress={() => navigation.navigate('About')}
            >
              <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
            </TouchableHighlight>
          </View>
          
        </View>

     

   

  );
}

export default Home;
