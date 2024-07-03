import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer, useRoute, useNavigationContainerRef, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
import {Dimensions, AppState} from 'react-native';
import { opw, /* ins, */ /* dH, wH, */ aB/* , nB */ } from './src/components/constants';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
//let ins = useSafeAreaInsets(); // insets
//import { SafeAreaView } from 'react-native-safe-area-context';

import {
  //SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
 

      await new Promise<void>((resolve) => {
        
        console.log("A VER 2222 routeGo", routeGo)
        //setFinished(true)
        //navigation.navigate(resRoute)
          //navigation.navigate("About")
          //BootSplash.hide()
          resolve();
        
      }).then(() => {
        //navigation.navigate("About")
        BootSplash.hide()
      })

    }

    qq()


  }, []);

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  //routeGo.current = "About"
  
  // useEffect(() => {
  //   routeGo.current = "About"
  // },[])

  

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
          options={{
            //animation: 'slide_from_left',
            //animation: 'slide_from_right',
            //animationDuration: 3500,
            //animation: 'slide_from_right',
            //animationDuration: 4000
            //animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen
          name="About"
          component={ About }
          options={{
            //animation: 'slide_from_left',
            //animation: 'slide_from_right',
            //animationDuration: 3500,
            //animationDuration: 4000
            //animationTypeForReplace: 'pop',
          }}
        />
        <Stack.Screen
          name="KnowMore"
          component={ KnowMore }
          options={{
            //animation: 'slide_from_left',
            //animation: 'slide_from_right',
            //animationDuration: 3500,
            //animationDuration: 4000
            //animationTypeForReplace: 'pop',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;