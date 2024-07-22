import { ReactElement, useEffect, useState } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

const Stack: any = createNativeStackNavigator();

export const NavigatorMapper = (animation: any, navBarColor: any, screens: any[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: navBarColor,
        animation: animation
      }}
    >
      { screens.map((e: any) => e) }
    </Stack.Navigator>
  )
}

function App(): ReactElement {

  const { width, height } = useWindowDimensions();

  let navBarColor = 'transparent' // DEFAULT NAVIGATION BAR COLOR

  if (Dimensions.get('screen').height - height > 47) navBarColor = 'rgba(0, 0, 0, 0.2)' // > 47: ANDROID SPECIFIES THAT NAVIGATION (ON-SCREEN BUTTONS) BAR MUST BE 48 DP (Density-independent Pixels)
  else navBarColor = 'transparent' // NO NAVIGATION (ON-SCREEN BUTTONS) BAR PRESENT. ins.bottom WOULD BE ~ 24 DP (GESTURE NAVIGATION)

  let opw = width / 100 // one percent window width
  let oph = height / 100 // one percent window height
  let vmax
  let vmin
  let port // PORTRAIT
  if (width > height) {vmax = opw; vmin = oph, port = false }
  else {vmax = oph; vmin = opw, port = true }

  const navigationRef: any = useNavigationContainerRef();

  const [ animation, setAnimation ] = useState('none'); // NO INITIAL SCREEN ANIMATION

  let allRoutes = [{ name: 'Home' }, { name: 'About' }, { name: 'KnowMore' }]

  let routes = [
    { index: 2, routes: allRoutes },
    { index: 1, routes: allRoutes.slice(0, 2) },
    { index: 0, routes: allRoutes.slice(0, 1) }
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

      async function windowSizeHasChanged() {
        if (
          resDate !== undefined && resDate !== null &&
          resHeight !== undefined && resHeight !== null &&
          resRoute !== undefined && resRoute !== null
        ) {
          if (
            Date.now() - parseInt(resDate) < 60000 &&
            resHeight !== Dimensions.get('window').height.toString()
          ) {
            resRoute === "KnowMore" ? navigationRef.dispatch(CommonActions.reset(routes[0])) :
            resRoute === "About" ? navigationRef.dispatch(CommonActions.reset(routes[1])) :
            navigationRef.dispatch(CommonActions.reset(routes[2]))
          } // else console.log("WINDOWS NOT HAS CHANGED.")
        }
      }
      await windowSizeHasChanged()
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
      saveData("savedHeight", height.toString())

      let array = navigationRef.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
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

  let stackScreens = [
    <Stack.Screen
      name="Home"
      key={"Home"}
    >
      {
        (props: any) =>
        <Home
          {...props} input={input} setInput={setInput}
          secInput={secInput} setSecInput={setSecInput}
          opw={opw} oph={oph} vmax={vmax} vmin={vmin} port={port}
        />
      }
    </Stack.Screen>,
    <Stack.Screen
      name="About"
      key={"About"}
    >
      { (props: any) => <About {...props} opw={opw} oph={oph} vmax={vmax} vmin={vmin} /> }
    </Stack.Screen>,
    <Stack.Screen
      name="KnowMore"
      key={"KnowMore"}
    >
      { (props: any) => <KnowMore {...props} opw={opw} oph={oph} vmax={vmax} vmin={vmin} port={port} /> }
    </Stack.Screen>
  ]

  let initialState = { index: 0, routes: [ { name: 'Home' } ] }; // SET NAVIGATOR INITIAL STATE TO AVOID "UNDEFINED" ON "APP BLUR SAVE LAST ROUTE" (WITHOUT NAVIGATE ANY SCREEN)

  return (
    <NavigationContainer ref={navigationRef} initialState={initialState}>
      { NavigatorMapper(animation, navBarColor, stackScreens) }
    </NavigationContainer>

  );
}

export default App;