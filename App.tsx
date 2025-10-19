import { ReactElement, useEffect, useState, useRef, useLayoutEffect } from "react";
import {  CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions, useWindowDimensions, NativeModules, NativeEventEmitter, PixelRatio, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { StackAnimationTypes, enableScreens } from "react-native-screens";
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { dimI, navigationI } from './src/interfaces/interfaces';

const Stack = createNativeStackNavigator();

const NavigatorMapper = (animation: StackAnimationTypes, tallBar: boolean, screens: ReactElement[]) => {
  return (
    <Stack.Navigator
      //cardOverlayEnabled={true}
      //detachInactiveScreens={false}
      //id={'asd'}
      //cardStyle: { backgroundColor: 'transparent' }
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: tallBar ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        animation: animation,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        
      }}
      children={ screens.map((e: ReactElement) => e) }
    />
  )
}

const App = (): ReactElement => {


  const { MainActivity } = NativeModules;


  let tallBar = useRef<boolean>(false)

  const [ layout, setLayout ] = useState({
    "window": {"width": 0, "height": 0},
    "hingeBounds": {"left": 0, "top": 0, "right": 0, "bottom": 0},
    "insets": {"left": 0, "top": 0, "right": 0, "bottom": 0},
    "state": "portrait",
    "vmin": 0,
    "tallBar": "false" // tallNavigationBar
  });

  useEffect(() => {
    console.log("CURRENT LAYOUT", layout.state)
  },[layout])

  //let port: boolean // PORTRAIT
  //if (width > height) { setvmin = 0 }
  //else { vmin = 1 }

  const navigationRef = useNavigationContainerRef();

  const [ animation, setAnimation ] = useState<StackAnimationTypes>('none'); // NO INITIAL SCREEN ANIMATION

  let allRoutes = [{ name: 'Home' }, { name: 'About' }, { name: 'KnowMore' }]

  let routes = [
    { index: 2, routes: allRoutes },
    { index: 1, routes: allRoutes.slice(0, 2) },
    { index: 0, routes: allRoutes.slice(0, 1) }
  ]

  // useEffect(() => {
  //   console.log("ENTER USEEFFECT")
  //   const allPreloads = async () => {
  //     let resInput = await readData("savedInput") // RESPONSE INPUT
  //     let resSecInput = await readData("savedSecInput") // RESPONSE INPUT
  //     let resDate = await readData("savedDate") // RESPONSE DATE
  //     let resTallBar = await readData("savedTallBar") // RESPONSE HEIGHT
  //     let resRoute = await readData("savedRoute") // RESPONSE ROUTE

  //     if (typeof resInput === "string") setInput(resInput)
  //     if (typeof resSecInput === "string") setSecInput(resSecInput)

  //     await Font.loadAsync({
  //       ...AntDesign.font,
  //       ...Entypo.font,
  //       ...FontAwesome5.font,
  //       ...Ionicons.font,
  //       ...MaterialIcons.font,
  //       ...SimpleLineIcons.font
  //     })

  //     async function navigationBarToGestureOrViceVersa() {
  //       if (typeof resDate === "string" && typeof resTallBar === "string" && typeof resRoute === "string") {
  //         console.log("SAVED", resTallBar)
  //         console.log("CURRENT", tallBar.current)
  //         console.log("Date.now()", Date.now())
  //         console.log("parseInt(resDate)", parseInt(resDate))


  //         if (Date.now() - parseInt(resDate) < 60000 && resTallBar !== tallBar.current.toString()) {
  //           resRoute === "KnowMore" ? navigationRef.dispatch(CommonActions.reset(routes[0])) :
  //           resRoute === "About" ? navigationRef.dispatch(CommonActions.reset(routes[1])) :
  //           navigationRef.dispatch(CommonActions.reset(routes[2]))
  //         } // else console.log("WINDOWS NOT HAS CHANGED.")
  //       }
  //     }
  //     navigationBarToGestureOrViceVersa()
  //     .finally(() => {
  //       setTimeout(() => { // ONLY FIRST TIME & WHEN DEVICE WINDOW DIMENSIONS CHANGE
  //         setAnimation('slide_from_right') // SLIDE SCREEN ANIMATION
  //         BootSplash.hide()
  //       }, 200) // AVOID ICON BLINKING
  //     })
  //   }
  //   allPreloads()

    

  // }, []);

  const [ secInput, setSecInput ] = useState("");
  const [ input, setInput ] = useState("");

  useEffect(() => { // ON APP BLUR
    const blur = AppState.addEventListener('blur', () => {
      saveData("savedInput", input.toString())
      saveData("savedSecInput", secInput.toString())
      saveData("savedDate", Date.now().toString())
      saveData("savedTallBar", tallBar.current.toString())
      let array = navigationRef.getState().routes // INSIDE ANY COMPONENT: navigation.getState().routes
      saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
    })
    return () => blur.remove()
  }, [input, secInput]);

  const saveData = async (key: string, value: string) => {
    try { await AsyncStorage.setItem(key, value) }
    catch(e) { }
  };

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  FastImage.preload([{ uri: Image.resolveAssetSource(require('./src/images/profile.png')).uri }])

  const [ showModal, setShowModal ] = useState(false);
  const updateShowModal = (bool: boolean) => setShowModal(bool)

  const dynamicImport = (props: navigationI, module: any) => {
    switch (module) {
      case "Home":
        const Home = require('./src/components/Home/Home').default
        return (
          <Home
            {...props} input={input} setInput={setInput}
            setSecInput={setSecInput} secInput={secInput} vmin={layout.vmin}
            state={layout.state} width={layout.window.width} height={layout.window.height}
            hingeBounds={layout.hingeBounds} showModal={showModal} updateShowModal={updateShowModal}
            ins={layout.insets}
          />
        )
      case "About":
        const About = require('./src/components/About/About').default
        return (
          <About
            {...props} vmin={layout.vmin} width={layout.window.width} showModal={showModal}
            updateShowModal={updateShowModal} state={layout.state} twoScreens={false}
            ins={layout.insets} height={layout.window.height}
          />
        )
      case "KnowMore":
        const KnowMore = require('./src/components/KnowMore/KnowMore').default
        return (
          <KnowMore
            {...props} height={layout.window.height} state={layout.state} ins={layout.insets}
            hingeBounds={layout.hingeBounds}
          />
        )
    }
  }

  let stackScreens: ReactElement[] = [ "Home", "About", "KnowMore" ].map((e: string) => {
    return (
      <Stack.Screen
        name={e}
        key={e}
        options={{ contentStyle: { backgroundColor: "rgb(255, 255, 255)" } }} // DEFAULT APP BACKGROUND COLOR
        //options={{ contentStyle: { backgroundColor: "rgb(255, 255, 255)" }, /* cardOverlay: true, */ }} // DEFAULT APP BACKGROUND COLOR
        children={(props) => dynamicImport(props, e)}
      />
    )
  })

  let initialState = { index: 0, routes: [ { name: 'Home' } ] }; // SET NAVIGATOR INITIAL STATE TO AVOID "UNDEFINED" ON "APP BLUR SAVE LAST ROUTE" (WITHOUT NAVIGATE ANY SCREEN)

  const runOnceAvailable = useRef(true)

  const runOnce = async () => {
    const resInput = await readData("savedInput") // RESPONSE INPUT
    const resSecInput = await readData("savedSecInput") // RESPONSE INPUT
    const resDate = await readData("savedDate") // RESPONSE DATE
    const resTallBar = await readData("savedTallBar") // RESPONSE HEIGHT
    const resRoute = await readData("savedRoute") // RESPONSE ROUTE

    typeof resInput === "string" && setInput(resInput)
    typeof resSecInput === "string" && setSecInput(resSecInput)

    await Font.loadAsync({
      ...AntDesign.font,
      ...Entypo.font,
      ...FontAwesome5.font,
      ...Ionicons.font,
      ...MaterialIcons.font,
      ...SimpleLineIcons.font
    })

    async function navigationBarToGestureOrViceVersa() {
      //console.log("22222222222222222222222222")
      if (typeof resDate === "string" && typeof resTallBar === "string" && typeof resRoute === "string") {
        if (Date.now() - parseInt(resDate) < 60000 && resTallBar !== tallBar.current.toString()) {
          resRoute === "KnowMore" ? navigationRef.dispatch(CommonActions.reset(routes[0])) :
          resRoute === "About" ? navigationRef.dispatch(CommonActions.reset(routes[1])) :
          navigationRef.dispatch(CommonActions.reset(routes[2]))
        } // else console.log("WINDOWS NOT HAS CHANGED.")
      }
    }
    navigationBarToGestureOrViceVersa()
    .then(() => {
      setTimeout(() => { // ONLY FIRST TIME & WHEN DEVICE WINDOW DIMENSIONS CHANGE
        setAnimation('slide_from_right') // SLIDE SCREEN ANIMATION
        BootSplash.hide()
        runOnceAvailable.current = false
      }, 200) // AVOID ICON BLINKING
    })
  }

  useLayoutEffect(() => {
    const nativeEvent = new NativeEventEmitter(MainActivity);
    let LayoutInfoListener = nativeEvent.addListener('LayoutInfo', e => {
      //console.log("LAYOUT", e)
      console.log("LAYOUT", e.state)
      setLayout(e)
      //setLayout(Object.assign( {}, e, { "density": PixelRatio.get() } ))
      tallBar.current = e.tallBar

      if (runOnceAvailable.current) runOnce()
    });
    return () => LayoutInfoListener.remove();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      children={ NavigatorMapper(animation, tallBar.current, stackScreens) }
    />
  );
}

export default App;