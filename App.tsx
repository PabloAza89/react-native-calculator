import { ReactElement, useEffect, useState } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions, useWindowDimensions, StatusBar, ViewProps } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets, SafeAreaProvider, SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';

const Stack: any = createNativeStackNavigator();

export const NavigatorMapper = (animation: any, navBarColor: any, screens: any[]) => {
  // let ins = useSafeAreaInsets()
  // console.log("INS", ins)
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        //navigationBarColor: 'rgba(0, 0, 0, 0.2)',
        //navigationBarColor: 'red',
        navigationBarColor: navBarColor,
        //navigationBarColor: 'transparent',
        animation: animation
      }}
    >
      { screens.map((e: any) => e) }
    </Stack.Navigator>
  )
}

function App(): ReactElement {

  const { width, height } = useWindowDimensions();
  //console.log("APP WIDTH", width)
  //console.log("APP HEIGHT", height)
  //let heightScreen = Dimensions.get('screen').height
  let statusBar = StatusBar.currentHeight

  //console.log("HEIGHT SCREEN", heightScreen)
  let dim = Dimensions.get('screen').height
  console.log("SCREEN HEIGHT", dim)
  console.log("WINDOW HEIGHT", height)
  console.log("STATUS BAR", statusBar)

  let navBarColor = 'transparent' // DEFAULT NAVIGATION BAR COLOR

  if (Dimensions.get('screen').height - height > 47) {
    navBarColor = 'rgba(0, 0, 0, 0.2)'
    console.log("NAVBAR PRESENT")
  }
  else {
    navBarColor = 'transparent'
    console.log("NAVBAR NOT PRESENT")
  }

  //console.log("TurboModule", TurboModule)

  //let qq = useSafeArea()
  
  //console.log("ViewProps", ViewProps)
  // if (withSafeAreaInsets !== null) {
  //   console.log("withSafeAreaInsets", withSafeAreaInsets)
  // }
  

  // <SafeAreaProvider>
  //   return (let ins = useSafeAreaInsets(); // insets)
  
  // </SafeAreaProvider>

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
            resHeight !== height.toString()
          ) {
            resRoute === "KnowMore" ? navigationRef.current?.dispatch(CommonActions.reset(routes[0])) :
            resRoute === "About" ? navigationRef.current?.dispatch(CommonActions.reset(routes[1])) :
            navigationRef.current?.dispatch(CommonActions.reset(routes[2]))
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

      //let array = navigationRef.current?.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      //if (array !== undefined) saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
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

  return (
    <NavigationContainer ref={navigationRef}>
      { NavigatorMapper(animation, navBarColor, stackScreens) }
    </NavigationContainer>

  );
}

export default App;