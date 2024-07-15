import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import { useNavigationState, CommonActions, NavigationContainer, useRoute, useNavigationContainerRef, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
//import { Dimensions, AppState } from 'react-native';
import * as Font from 'expo-font';
//import { Font } from 'expo';
//import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { opw, /* ins, */ /* dH, wH, */ aB/* , nB */ } from './src/components/constants';

import { SafeAreaInsetsContext, useSafeAreaInsets, SafeAreaProvider  } from 'react-native-safe-area-context';
//let ins = useSafeAreaInsets(); // insets
//import { SafeAreaView } from 'react-native-safe-area-context';

import {
  Image,
  AppState,
  Dimensions,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
//import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { s } from './src/components/KnowMore/KnowMoreCSS';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack: any = createNativeStackNavigator();


function App(): React.JSX.Element {



  const navigationRef: any = useNavigationContainerRef();


  
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

  //let res = await readData("savedRoute") // RESPONSE ROUTE

  //const [ routeGo, setRouteGo ] = useState('KnowMore')
  //let routeGo = useRef('KnowMore')
  let routeGo = useRef('Home')
  //routeGo.current = 'KnowMore'
  const [ finished, setFinished ] = useState(false)
  //let resRoute = useRef<any>("Home")

  useEffect(() => {
    const allPreloads = async () => {

      let resInput = await readData("savedInput") // RESPONSE INPUT
      let resSecInput = await readData("savedSecInput") // RESPONSE INPUT
      let resDate = await readData("savedDate") // RESPONSE DATE
      let resHeight = await readData("savedHeight") // RESPONSE HEIGHT
      let resRoute = await readData("savedRoute") // RESPONSE ROUTE

      if (resInput !== undefined && resInput !== null) setInput(resInput)
      if (resSecInput !== undefined && resSecInput !== null) setSecInput(resSecInput)
 


      await Font.loadAsync({
        ...AntDesign.font,
        ...Entypo.font,
        ...FontAwesome5.font,
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...SimpleLineIcons.font,
        //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      })

      async function qq() {
        if (resDate !== undefined && resDate !== null && resHeight !== undefined && resHeight !== null && resRoute !== undefined && resRoute !== null) {
          //   console.log("QQ DIFFERENCE", Date.now() - parseInt(resDate))
          if (Date.now() - parseInt(resDate) < 60000 && resHeight !== Dimensions.get('window').height.toString()) {
            console.log("WINDOWS HAS CHANGED !")
            navigationRef.current?.navigate(resRoute)
            //navigationRef.current?.navigate('About') // INSIDE ANY COMPONENT: navigation.navigate(resRoute)
            //await BootSplash.hide()
          } else console.log("WINDOWS NOT HAS CHANGED.")
        } 

        //console.log("resDate !== undefined", resDate !== undefined)
        //console.log("resDate !== null", resDate !== null)
        // console.log("resHeight !== undefined", resHeight !== undefined)
        // console.log("resHeight !== null", resHeight !== null)
        // console.log("resRoute !== null", resRoute !== undefined)
        // console.log("resRoute !== null", resRoute !== null)

      }

      await qq()
      
      
      .then(() => {

        

        //setTimeout(() => BootSplash.hide(), 200) // AVOID ICON BLINKING
        setTimeout(() => {
          //                                                             la primera vez y
          console.log("ENTRO ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") // cuando cambia el height
          BootSplash.hide()
        }, 200) // AVOID ICON BLINKING
      })
    }
    allPreloads()
  }, []);

  const [ secInput, setSecInput ] = useState("");
  const [ input, setInput ] = useState("");

  useEffect(() => { // ON APP FOCUS
    const focus = AppState.addEventListener('focus', async () => {
      //console.log("FOCUS")

      // let resInput = await readData("savedInput") // RESPONSE INPUT
      // let resSecInput = await readData("savedSecInput") // RESPONSE INPUT
      // let resDate = await readData("savedDate") // RESPONSE DATE
      // let resHeight = await readData("savedHeight") // RESPONSE HEIGHT
      // let resRoute = await readData("savedRoute") // RESPONSE ROUTE

      // if (resInput !== undefined && resInput !== null) setInput(resInput)
      // if (resSecInput !== undefined && resSecInput !== null) setSecInput(resSecInput)

      //if (resDate !== undefined && resDate !== null) console.log("HOME DIFFERENCE", Date.now() - parseInt(resDate))
      //if (resHeight !== undefined && resHeight !== null) console.log("HOME RETRIEVE SAVED HEIGHT", resHeight)

      //if (resRoute !== undefined && resRoute !== null) console.log("HOME SAVED ROUTE", resRoute)


      // if (resDate !== undefined && resDate !== null && resHeight !== undefined && resHeight !== null && resRoute !== undefined && resRoute !== null) {
      // //   console.log("QQ DIFFERENCE", Date.now() - parseInt(resDate))
      //     if (Date.now() - parseInt(resDate) < 60000 && resHeight !== Dimensions.get('window').height.toString()) {
      // //     //console.log("typeof parseInt(resHeight)", typeof resHeight)
      // //     //console.log("typeof wH", wH)
      //       console.log("WINDOWS HAS CHANGED !")

      //       //navigation.navigate('About')
      //       //navigation.navigate(resRoute)
      //       //navigationRef.current?.navigate(resRoute) // INSIDE ANY COMPONENT: navigation.navigate(resRoute)
      //       await navigationRef.current?.navigate(resRoute).then(() => {
      //         //setTimeout(() => BootSplash.hide(), 200) // AVOID ICON BLINKING
      //         setTimeout(() => {
      //           //                                                             la primera vez y
      //           console.log("ENTRO ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") // cuando cambia el height
      //           BootSplash.hide()
      //         }, 200) // AVOID ICON BLINKING
      //       })
      //       //navigationRef.current?.navigate('About') // INSIDE ANY COMPONENT: navigation.navigate(resRoute)
      //       //await BootSplash.hide()

      //     } /* else {
      //       console.log("WINDOWS NOT HAS CHANGED.")
      //       setTimeout(() => {
      //         //                                                             la primera vez y
      //         console.log("ENTRO ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") // cuando cambia el height
      //         BootSplash.hide()
      //       }, 200) // AVOID ICON BLINKING
      //         //await BootSplash.hide()
      //     } */
      //   }
    }
  )
    return () => focus.remove();
  }, []);

  useEffect(() => { // ON APP BLUR
    const blur = AppState.addEventListener('blur', () => {
      saveData("savedInput", input)
      saveData("savedSecInput", secInput)
      saveData("savedDate", Date.now().toString())
      saveData("savedHeight", Dimensions.get('window').height.toString())
      //console.log("APP CURRENT HEIGHT", Dimensions.get('window').height.toString())

      let array = navigationRef.current?.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      if (array !== undefined) {
        //console.log("BLUR SAVE ROUTE", array[array.length - 1].name)
        saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
      }
      
    })
    return () => blur.remove();
  }, []);

  const saveData = async (key: any, value:any) => {
    try { await AsyncStorage.setItem(`${key}`, value) }
    catch(e) { }
  };


  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };



  let rrr = async () => {
    routeGo.current = "About"
    //routeGo.current = "KnowMore"
    //routeGo.current = "Home"
  }

  rrr()

  let initialState = {
    index: 0, // to load the second screen which is LastNameView
    routes: [
      { name: 'Home' },
      /* { name: 'About' }, */
      /* { name: 'KnowMore' }, */
    ],
  };

  FastImage.preload([{ uri: Image.resolveAssetSource(require('./src/images/profile.png')).uri }])

  //const testRef = useNavigationContainerRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          navigationBarColor: 'rgba(0, 0, 0, 0.2)',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
        >
          {
            (props: any) =>
              <Home
                {...props} input={input} setInput={setInput}
                secInput={secInput} setSecInput={setSecInput}
              />
          }
        </Stack.Screen>
        <Stack.Screen
          name="About"
          component={ About }
        />
        <Stack.Screen
          name="KnowMore"
          component={ KnowMore }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;