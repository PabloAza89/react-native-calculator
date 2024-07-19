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

  let buttonsMapper = () => {
    let values = [
      { value: "(", port: 0, land: 0, smaller: port ? true : false }, { value: ")", port: 1, land: 1, smaller: port ? true : false }, { value: "C", port: 2, land: 2, smaller: port ? true : false },
      { value: "N", port: 3, land: 3, smaller: port ? true : false }, { value: "B", port: 4, land: 4, smaller: port ? true : false }, { value: "7", port: 5, land: 9  },
      { value: "8", port: 6, land: 10 }, { value: "9", port: 7, land: 11 }, { value: "X", port: 8, land: 6 },
      { value: "4", port: 9, land: 18 }, { value: "5", port: 10, land: 7 }, { value: "6", port: 11, land: 8 },
      { value: "-", port: 12, land: 5 }, { value: "1", port: 13, land: 15 }, { value: "2", port: 14, land: 16 },
      { value: "3", port: 15, land: 17 }, { value: "+", port: 16, land: 13 }, { value: "/", port: 17, land: 12 },
      { value: "0", port: 18, land: 14 }, { value: ".", port: 19, land: 19 }, { value: "=", port: 20, land: 20, parErr: parErr }
    ].sort((a, b) => port ? a.port - b.port : a.land - b.land)
    return values.map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} input={input} setInput={setInput} value={e.value}
        setParErr={setParErr} setSecInput={setSecInput} smaller={ e.smaller } parErr={e.parErr}
      />
    )
  }

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
            { buttonsMapper() }
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
