import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import RNBootSplash from "react-native-bootsplash";
import {Dimensions, AppState} from 'react-native';
import { opw, ins, /* dH, wH, */ aB/* , nB */ } from './src/components/constants';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Stack: any = createNativeStackNavigator();

function App(): React.JSX.Element {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [ nB, setNb ] = useState(false)

  // useEffect(() => {

  //   let dH = Dimensions.get('screen').height; // deviceHeight
  //   let wH = Dimensions.get('window').height; // windowHeight

    

  //   const focusCheck = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');

  //       if ((dH - ins.top) === wH) setNb(false) // navBar NOT PRESENT
  //       else setNb(true) // navBar PRESENT

  //       console.log("dH", dH)
  //       console.log("wH", wH)

  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     //console.log('AppState', appState.current);
  //   });

  //   return () => focusCheck.remove()
  // }, []);

  // useEffect(() => {
  //   let deviceHeight = Dimensions.get('screen').height;
  //   let windowHeight = Dimensions.get('window').height;

  //   console.log("deviceHeight", deviceHeight, "windowHeight", windowHeight)

  // }, [])

  //let nB: boolean = false // navBar present ?

  //const [ nB, setNb ] = useState(false)

  //let nB = useRef<any>() // navBar present ?

  // useEffect(() => {
  //   let dH = Dimensions.get('screen').height; // deviceHeight
  //   let wH = Dimensions.get('window').height; // windowHeight

  //   //console.log("deviceHeight", deviceHeight, "windowHeight", windowHeight)

  //   // if ((dH - ins.top) === wH) nB.current = false // navBar NOT PRESENT
  //   // else nB.current = true // navBar PRESENT

  //   // if ((dH - ins.top) === wH) setNb(false) // navBar NOT PRESENT
  //   // else setNb(true) // navBar PRESENT

  //   // console.log("ENTER")

  // }, [])



  
  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await RNBootSplash.hide({ fade: true });
  //     console.log("Bootsplash has been hidden successfully");
  //   });
  // }, []);

  // useEffect(() => {
  //   RNBootSplash.hide({ fade: true })
  //   //RNBootSplash.hide()
  // }, [])

  // <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
  // different === navigationBar Enabled

  
  //console.log(Dimensions)

  return (

    
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          //headerTintColor: 'red',
          // headerStyle: {
          //   backgroundColor: 'red'
          // }
          navigationBarColor: 'rgba(0, 0, 0, 0.2)', // BOTTOM
          //navigationBarColor: nB ? 'rgba(0, 0, 0, 0.2)' : 'transparent', // BOTTOM
          // tabBarOptions: {
          //   activeTintColor: 'red'
          // },
          // activeTintColor: 'red',
          // inactiveTintColor: 'gray',
          //headerTransparent: true
          //tabBarActiveTintColor: 'red',
          //tabBarInactiveTintColor: 'red',
          //windowLightStatusBar: true
          //navigationBarColor: nB ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // BOTTOM
          //navigationBarColor: nB ? 'rgba(0, 0, 0, 0.2)' : 'transparent', // BOTTOM
          //navigationBarColor: 'red', // BOTTOM
          //navigationBarHidden: true, // BOTTOM
        }}
      >
        <Stack.Screen
          name="Home"
          component={ Home }
          options={{ animation: 'slide_from_right' }}
        />
        {/* <Stack.Screen
          name="About"
          component={ About }
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="KnowMore"
          component={ KnowMore }
          options={{ animation: 'slide_from_right' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;