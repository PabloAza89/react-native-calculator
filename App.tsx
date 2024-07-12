import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer, useRoute, useNavigationContainerRef, getFocusedRouteNameFromRoute } from '@react-navigation/native';
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

import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
//let ins = useSafeAreaInsets(); // insets
//import { SafeAreaView } from 'react-native-safe-area-context';

import {
  //SafeAreaView,
  //SafeAreaProvider,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
//import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { s } from './src/components/KnowMore/KnowMoreCSS';
//import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack: any = createNativeStackNavigator();


function App(): React.JSX.Element {



  const navigationRef = useNavigationContainerRef();


  
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
    
    const qq = async () => {
      
      let response = await readData("savedRoute") // RESPONSE ROUTE

      if (response !== undefined && response !== null) {
        //setRouteGo(response)
        //setRouteGo(response)
        //setRouteGo({ name : 'About'})
        console.log("ENTRO ACA", response)
        console.log("ENTRO ACA typeof", typeof response)
        //routeGo.current = response.toString()
      }

      await Font.loadAsync({
        ...AntDesign.font,
        ...Entypo.font,
        ...FontAwesome5.font,
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...SimpleLineIcons.font,
        //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }).then(() => {
        //navigation.navigate("About")
        //setLoadingComplete(true);
        //BootSplash.hide()
        setTimeout(() => BootSplash.hide(), 200) // AVOID ICON BLINKING
      })
    }

    qq()


  }, []);


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


  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      //onReady={() => BootSplash.hide()}
    >
      <Stack.Navigator
        //initialRouteName="Home"
        //initialRouteName={routeGo}
        //initialRouteName={routeGo.name}
        //initialRouteName={routeGo.current}
        //initialRouteName="About"
        //initialRouteName={""}
        //</NavigationContainer>initialRouteName={routeGo.current}
        //initialRouteName={"About"}
       //initialRouteName={finished ? routeGo : "Home"}
        //routeGo
        //initialRouteName={resRoute.current}
        screenOptions={{
          //gestureDirection: "horizontal-inverted",
          headerShown: false,
          gestureEnabled: false,
          //lazy: false,
          // animationDuration: 1500,
          // animation: 'slide_from_right',
          // animationEnabled:false,
          // transitionConfig: () => ({
          //   transitionSpec: {
          //     duration:0,
          //     timing: 0,
          //   },
          // }),
          //headerTintColor: 'red',
          // headerStyle: {
          //   backgroundColor: 'red'
          // }
          navigationBarColor: 'rgba(0, 0, 0, 0.2)', // BOTTOM
          animation: 'slide_from_right',
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
        />
        <Stack.Screen
          name="About"
          component={ About }
        />
        <Stack.Screen
          name="KnowMore"
          //component={ KnowMore }
        >
          {(props: any) => <KnowMore {...props} /* qqq={qqq} ins={ins} setIns={setIns} */ />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;