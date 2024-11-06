import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableHighlight, NativeModules, Button } from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';

function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput }: HomeI): ReactElement {

  //const { MainActivity } = NativeModules;
  //const { MainActivity } = NativeModules;
  //const { test } = NativeModules;
  
  
  //CalendarModule.createCalendarEvent()

  //console.log("AA", )
  //console.log("AA", CalendarModule.createCalendarEvent())

  //console.log("MAIN ACTIVITY", MainActivity.getActivity())
  //console.log("MAIN ACTIVITY", MainActivity.bbb !== null ? MainActivity.bbb : undefined)
  //console.log("MAIN ACTIVITY", MainActivity.bbb)
  //console.log("MAIN ACTIVITY", NativeModules)
  //console.log("MAIN ACTIVITY", CalendarModule.getName())
  //console.log("MAIN ACTIVITY", MainActivity.ReactActivity().ccc())
  //console.log("MAIN ACTIVITY", MainActivity.ccc)
  //console.log("NativeModules", NativeModules)
  //console.log("NativeModules", MainActivity.ccc())
  //console.log("MAIN ACTIVITY", MainActivity.obtainWindowMetrics())

  let ins = useSafeAreaInsets(); // insets

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => {
    scrollEnd()
  }, [input])

  const scrollRefUpper = useRef<ScrollView>(null);
  const scrollRefCenter = useRef<ScrollView>(null);

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  //console.log("PORT", port)

  let buttonsMapper = () => {
    let values = [
      { value: "(", port: 0, land: 0, smaller: port ? true : false }, { value: ")", port: 1, land: 1, smaller: port ? true : false }, { value: "C", port: 2, land: 2, smaller: port ? true : false },
      { value: "N", port: 3, land: 3, smaller: port ? true : false }, { value: "B", port: 4, land: 4, smaller: port ? true : false }, { value: "7", port: 5, land: 9 },
      { value: "8", port: 6, land: 10 }, { value: "9", port: 7, land: 11 }, { value: "X", port: 8, land: 6 },
      { value: "4", port: 9, land: 18 }, { value: "5", port: 10, land: 7 }, { value: "6", port: 11, land: 8 },
      { value: "-", port: 12, land: 5 }, { value: "1", port: 13, land: 15 }, { value: "2", port: 14, land: 16 },
      { value: "3", port: 15, land: 17 }, { value: "+", port: 16, land: 13 }, { value: "/", port: 17, land: 12 },
      { value: "0", port: 18, land: 14 }, { value: ".", port: 19, land: 19 }, { value: "=", port: 20, land: 20, parErr: parErr }
    ].sort((a, b) => port ? a.port - b.port : a.land - b.land)
    return values.map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin}
      />
    )
  }

  const { CalendarModule, MainActivity, reactNativeCalculator } = NativeModules;

  //const onPress = () => {
  const onPress = async () => {
    //console.log("CLICKED", await CalendarModule.getString())
    //console.log("CLICKED", await MainActivity.aaa)
    //console.log("CLICKED", await NativeModules.reactNativeCalculator.aaa())
    //console.log("CLICKED", await MainActivity.aaa())
    //console.log("CLICKED", await CalendarModule.getString())
    //console.log("CLICKED", await CalendarModule.getStringa())
    //console.log("CLICKED", await CalendarModule.getStringa())
    //console.log("CLICKED", await CalendarModule.aaa())
    //console.log("CLICKED", await CalendarModule)
    //console.log("CLICKED", await CalendarModule.aaa())
    //console.log("CLICKED", await typeof NativeModules)
    console.log("CLICKED", await CalendarModule.aaa())
  };

  return (
    <View style={[s.background, { height: '100%', backgroundColor: 'lightblue' }]}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>

      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </View>
  );
}

export default Home;
