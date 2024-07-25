import { ReactElement, useEffect, useState, useRef } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions, useWindowDimensions, type ScaledSize } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { StackAnimationTypes } from "react-native-screens";

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Home: { input: string, setInput: string, secInput: string, setSecInput: string, vmin: number, port: boolean }
  About: { vmin: number },
  KnowMore: { opw: number, port: boolean }
};

type ScreenT = NativeStackScreenProps<RootStackParamList>;

export const NavigatorMapper = (animation: StackAnimationTypes, navBar: boolean, screens: ReactElement[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: navBar ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        animation: animation
      }}
    >
      { screens.map((e: ReactElement) => e) }
    </Stack.Navigator>
  )
}

function App(): ReactElement {

  const { width, height } = useWindowDimensions();

  let navBar = useRef<boolean>(true)

  type dim = {
    screen: 'screen'
    window: 'window'
  }

  // interface dim {
  //   e: string
  //   screen: string
  // }



  interface dimI {
    screenHeight: number,
    screenWidth: number,
    windowHeight: number,
    windowWidth: number
  }

  let updateNavBar = async() => {
    const dim = Object.assign({}, ...(["screen", "window"] as "screen"[] | "window"[]).map((e) => { const { width, height } = Dimensions.get(e); return { [`${e}Width`]: width, [`${e}Height`]: height } })) as dimI

    if (dim.screenHeight - dim.windowHeight > 47 || dim.screenWidth - dim.windowWidth > 47) navBar.current = true // > 47: ANDROID SPECIFIES THAT NAVIGATION (ON-SCREEN BUTTONS) BAR MUST BE 48 DP (Density-independent Pixels)
    else navBar.current = false // NO NAVIGATION (ON-SCREEN BUTTONS) BAR PRESENT. ins.bottom WOULD BE ~ 24 DP (GESTURE NAVIGATION)
  }

  let opw: number = width / 100 // one percent window width
  let oph: number = height / 100 // one percent window height
  let vmin: number
  let port: boolean // PORTRAIT
  if (width > height) { vmin = oph, port = false }
  else { vmin = opw, port = true }

  const navigationRef = useNavigationContainerRef();

  const [ animation, setAnimation ] = useState<StackAnimationTypes>('none'); // NO INITIAL SCREEN ANIMATION

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
          await updateNavBar()
          if (Date.now() - parseInt(resDate) < 60000 && resNavBar !== navBar.current.toString()) {
            resRoute === "KnowMore" ? navigationRef.dispatch(CommonActions.reset(routes[0])) :
            resRoute === "About" ? navigationRef.dispatch(CommonActions.reset(routes[1])) :
            navigationRef.dispatch(CommonActions.reset(routes[2]))
          } // else console.log("WINDOWS NOT HAS CHANGED.")
        }
      }
      windowSizeHasChanged()
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
      saveData("savedNavBar", navBar.current.toString())

      let array = navigationRef.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
    })
    return () => blur.remove();
  }, [input, secInput]);

  const saveData = async (key: string, value: string) => {
    try { await AsyncStorage.setItem(`${key}`, value) }
    catch(e) { }
  };

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  FastImage.preload([{ uri: Image.resolveAssetSource(require('./src/images/profile.png')).uri }])

  let stackScreens: ReactElement[] = [
    <Stack.Screen
      name="Home"
      key={"Home"}
    >
      {
        (props: ScreenT) =>
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
      { (props: ScreenT) => <About {...props} vmin={vmin} /> }
    </Stack.Screen>,
    <Stack.Screen
      name="KnowMore"
      key={"KnowMore"}
    >
      { (props: ScreenT) => <KnowMore {...props} opw={opw} port={port} /> }
    </Stack.Screen>
  ]

  let initialState = { index: 0, routes: [ { name: 'Home' } ] }; // SET NAVIGATOR INITIAL STATE TO AVOID "UNDEFINED" ON "APP BLUR SAVE LAST ROUTE" (WITHOUT NAVIGATE ANY SCREEN)

  return (
    <NavigationContainer ref={navigationRef} initialState={initialState}>
      { NavigatorMapper(animation, navBar.current, stackScreens) }
    </NavigationContainer>
  );
}

export default App;