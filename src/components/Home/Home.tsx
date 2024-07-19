import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home({ navigation: { navigate }, vmax, vmin, opw, oph, port, input, setInput, secInput, setSecInput }: any): React.JSX.Element {


  let ins = useSafeAreaInsets(); // insets
  const dH = Dimensions.get('screen').height; // deviceHeight
  const wH = Dimensions.get('window').height; // windowHeight
  const [ parErr, setParErr ] = useState(false);

  console.log("INS", ins, "OPW", opw, "OPH", oph)

  useEffect(() => {
    scrollEnd()
  }, [input])

  //console.log("WIDTH WIDTH", width, "HEIGHT HEIGHT",height)

  const scrollRefUpper = React.createRef<ScrollView>();
  const scrollRefCenter = React.createRef<ScrollView>();

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [ nB, setNb ] = useState(false)

  const saveData = async (key: any, value:any) => {
    try { await AsyncStorage.setItem(`${key}`, value) }
    catch(e) { }
  };

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  const getAllKeys = async () => {
    let keys = []
    try { console.log(await AsyncStorage.getAllKeys()) }
    catch(e) { }
  }

  const removeData = async (key: any) => {
    try { await AsyncStorage.removeItem(key) }
    catch(e) { }
  }

  //export let asd = 0

  return (

      
    
    <View style={[s.background, { height: oph * 100 + ins.bottom, backgroundColor: 'lightblue', }]}>
      {/* <View style={{ height: oph * 100, alignSelf: 'center' }}> */}
        
          {/* <View style={[s.background, { height: vmax * 100 + ins.bottom }]}> */}
          

          <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>
          <View
            style={[
              s.contour,
              port ?
              { width: vmin * 90, height: vmin * 129.6, paddingTop: vmin * 1.5, paddingBottom: vmin * 1.5 } :
              { width: vmin * 156, height: vmin * 85.6, paddingTop: vmin * 1.5, paddingBottom: vmin * 1.5 }
            ]}
          >
            { parErr && <Text style={[ s.parErr, { width: vmin * 86, } ]}>CHECK PARENTHESIS</Text> }
            <View
              style={[
                s.displayContainer,
                port ?
                { width: vmin * 86, height: vmin * 20, paddingLeft: vmin * 2, paddingRight: vmin * 2, } :
                { width: vmin * 152, height: vmin * 20, paddingLeft: vmin * 2, paddingRight: vmin * 2, }
              ]}
            >
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[ s.secondaryResult, { height: vmin * 6, lineHeight: vmin * 6, } ]}>{ secInput.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[ s.mainResult, { height: vmin * 8, lineHeight: vmin * 8 } ]}>{ input.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <Text style={[s.secondaryResult]} />
            </View>
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="(" setParErr={setParErr} setSecInput={setSecInput} smaller={ port ? true : false } />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value=")" setParErr={setParErr} setSecInput={setSecInput} smaller={ port ? true : false } />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="C" setParErr={setParErr} setSecInput={setSecInput} smaller={ port ? true : false } />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="N" setParErr={setParErr} setSecInput={setSecInput} smaller={ port ? true : false } />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="B" setParErr={setParErr} setSecInput={setSecInput} smaller={ port ? true : false } />
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
              style={[ s.question, { borderRadius: (vmin * 50) / 2, left: ((vmin * 90) / 2) - 23 } ]}
              onPress={() => navigate('About')}
            >
              <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
            </TouchableHighlight>

          </View>
          
          
          {/* </View> */}
          </View>
      
          
        


  );
}

export default Home;
