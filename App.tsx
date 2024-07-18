import React, { useEffect, useState } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const Stack: any = createNativeStackNavigator();

export const NavigatorMapper = (animation: any, screens: any[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: 'rgba(0, 0, 0, 0.2)',
        animation: animation
      }}
    >
      { screens.map((e: any) => e) }
    </Stack.Navigator>
  )
}

function App(): React.JSX.Element {

  const navigationRef: any = useNavigationContainerRef();

  const [ animation, setAnimation ] = useState('none'); // NO SCREEN ANIMATION

  let routes = [
    { index: 2, routes: [{ name: 'Home' }, { name: 'About' }, { name: 'KnowMore' }] },
    { index: 1, routes: [{ name: 'Home' }, { name: 'About' }] },
    { index: 0, routes: [{ name: 'Home' }] }
  ]

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
        ...SimpleLineIcons.font
      })

      async function qq() {
        if (
          resDate !== undefined && resDate !== null &&
          resHeight !== undefined && resHeight !== null &&
          resRoute !== undefined && resRoute !== null
        ) {
          if (
            Date.now() - parseInt(resDate) < 60000 &&
            resHeight !== Dimensions.get('window').height.toString()
          ) {
            resRoute === "KnowMore" ? navigationRef.current?.dispatch(CommonActions.reset(routes[0])) :
            resRoute === "About" ? navigationRef.current?.dispatch(CommonActions.reset(routes[1])) :
            navigationRef.current?.dispatch(CommonActions.reset(routes[2]))
          } // else console.log("WINDOWS NOT HAS CHANGED.")
        }
      }
      await qq()
      .then(() => {
        setTimeout(() => { // ONLY FIRST TIME & WHEN DEVICE WINDOW HEIGHT CHANGES
          setAnimation('slide_from_right') // SLIDE SCREEN ANIMATION
          BootSplash.hide()
        }, 200) // AVOID ICON BLINKING
      })
    }
    allPreloads()
  }, []);

  const [ secInput, setSecInput ] = useState("");
  const [ input, setInput ] = useState("");

  useEffect(() => { // ON APP BLUR
    const blur = AppState.addEventListener('blur', () => {
      saveData("savedInput", input)
      saveData("savedSecInput", secInput)
      saveData("savedDate", Date.now().toString())
      saveData("savedHeight", Dimensions.get('window').height.toString())

      let array = navigationRef.current?.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      if (array !== undefined) saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
    })
    return () => blur.remove();
  }, [input, secInput]);

  const saveData = async (key: any, value:any) => {
    try { await AsyncStorage.setItem(`${key}`, value) }
    catch(e) { }
  };

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  FastImage.preload([{ uri: Image.resolveAssetSource(require('./src/images/profile.png')).uri }])

  return (
    <NavigationContainer ref={navigationRef}>
      {
        NavigatorMapper(animation,
          [<Stack.Screen
            name="Home"
            key={"Home"}
          >
            {
              (props: any) =>
              <Home
                {...props} input={input} setInput={setInput}
                secInput={secInput} setSecInput={setSecInput}
              />
            }
          </Stack.Screen>,
          <Stack.Screen
            name="About"
            key={"About"}
            component={ About }
          />,
          <Stack.Screen
            name="KnowMore"
            key={"KnowMore"}
            component={ KnowMore }
          />]

        )
      }
    </NavigationContainer>
  );
}

export default App;