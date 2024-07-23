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

export const NavigatorMapper = (animation: any, navBar: any, screens: any[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: navBar ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        animation: animation
      }}
    >
      { screens.map((e: any) => e) }
    </Stack.Navigator>
  )
}

function App(): ReactElement {

  const { width, height } = useWindowDimensions();

  //let navBar = true // NAVIGATION BAR (ON-SCREEN) BUTTONS
  const [ navBar, setNavBar ] = useState(false)
  
  

  //console.log("Dimensions.get('screen').height - height > 47", Dimensions.get('screen').height - height > 47)
  //console.log("Dimensions.get('screen').width - width > 47", Dimensions.get('screen').width - width > 47)

  if (Dimensions.get('screen').height - height > 47 || Dimensions.get('screen').width - width > 47) {
    //console.log("NAVBAR PRESENT")
    navBar = true// > 47: ANDROID SPECIFIES THAT NAVIGATION (ON-SCREEN BUTTONS) BAR MUST BE 48 DP (Density-independent Pixels)
  }
  else {
    //console.log("NAVBAR NOT PRESENT.")
    navBar = false // NO NAVIGATION (ON-SCREEN BUTTONS) BAR PRESENT. ins.bottom WOULD BE ~ 24 DP (GESTURE NAVIGATION)
  }

  // useEffect(() => {
  //   if (Dimensions.get('screen').height - height > 47 || Dimensions.get('screen').width - width > 47) {
  //     //console.log("NAVBAR PRESENT")
  //     //navBar = true// > 47: ANDROID SPECIFIES THAT NAVIGATION (ON-SCREEN BUTTONS) BAR MUST BE 48 DP (Density-independent Pixels)
  //     setNavBar(true)
  //   }
  //   else {
  //     //console.log("NAVBAR NOT PRESENT.")
  //     //navBar = false // NO NAVIGATION (ON-SCREEN BUTTONS) BAR PRESENT. ins.bottom WOULD BE ~ 24 DP (GESTURE NAVIGATION)
  //     setNavBar(false)
  //   }

  // }, [width, height])

  let opw = width / 100 // one percent window width
  let oph = height / 100 // one percent window height
  let vmin
  let port // PORTRAIT
  if (width > height) { vmin = oph, port = false }
  else { vmin = opw, port = true }

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
      //let resHeight = await readData("savedHeight") // RESPONSE HEIGHT
      let resNavBar = await readData("savedNavBar") // RESPONSE HEIGHT
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
          resNavBar !== undefined && resNavBar !== null &&
          resRoute !== undefined && resRoute !== null
        ) {
          //console.log("resHeight", resHeight)
          //console.log("resNavBar", resNavBar)

          // console.log("screen height", Dimensions.get('screen').height.toString())
          // console.log("screen width", Dimensions.get('screen').width.toString())
          // console.log("window height", Dimensions.get('window').height.toString())
          // console.log("window width", Dimensions.get('window').width.toString())
          console.log("resNavBar", resNavBar)
          console.log("navBar.toString()", navBar.toString())
          if (
            Date.now() - parseInt(resDate) < 60000 &&
            resNavBar !== navBar.toString()
            /* &&
            resHeight !== Dimensions.get('window').height.toString() &&
            resHeight !== Dimensions.get('window').width.toString() */
          ) {
            console.log("WINDOWS HAS CHANGED !!")
            resRoute === "KnowMore" ? navigationRef.dispatch(CommonActions.reset(routes[0])) :
            resRoute === "About" ? navigationRef.dispatch(CommonActions.reset(routes[1])) :
            navigationRef.dispatch(CommonActions.reset(routes[2]))
          }  else console.log("WINDOWS NOT HAS CHANGED.")
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
  }, [navBar]);

  const [ secInput, setSecInput ] = useState("");
  const [ input, setInput ] = useState("");

  useEffect(() => { // ON APP BLUR
    const blur = AppState.addEventListener('blur', () => {
      saveData("savedInput", input)
      saveData("savedSecInput", secInput)
      saveData("savedDate", Date.now().toString())
      //saveData("savedHeight", height.toString())
      saveData("savedNavBar", navBar.toString())

      let array = navigationRef.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
    })
    return () => blur.remove();
  }, [input, secInput, height, navBar]);

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
          {...props} input={input} setInput={setInput} secInput={secInput}
          setSecInput={setSecInput} vmin={vmin} port={port}
        />
      }
    </Stack.Screen>,
    <Stack.Screen
      name="About"
      key={"About"}
    >
      { (props: any) => <About {...props} vmin={vmin} /> }
    </Stack.Screen>,
    <Stack.Screen
      name="KnowMore"
      key={"KnowMore"}
    >
      { (props: any) => <KnowMore {...props} opw={opw} port={port} /> }
    </Stack.Screen>
  ]

  let initialState = { index: 0, routes: [ { name: 'Home' } ] }; // SET NAVIGATOR INITIAL STATE TO AVOID "UNDEFINED" ON "APP BLUR SAVE LAST ROUTE" (WITHOUT NAVIGATE ANY SCREEN)

  //console.log("navBar de arriba", navBar.toString())

  return (
    <NavigationContainer ref={navigationRef} initialState={initialState}>
      { NavigatorMapper(animation, navBar, stackScreens) }
    </NavigationContainer>

  );
}

export default App;