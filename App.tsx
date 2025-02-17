import { ReactElement, useEffect, useState, useRef } from "react";
import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BootSplash from "react-native-bootsplash";
import * as Font from 'expo-font';
import { Image, AppState, Dimensions, useWindowDimensions, NativeModules, NativeEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image'
import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { StackAnimationTypes } from "react-native-screens";
import { dimI, navigationI } from './src/interfaces/interfaces';

const Stack = createNativeStackNavigator();

const NavigatorMapper = (animation: StackAnimationTypes, navBar: boolean, screens: ReactElement[]) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        navigationBarColor: navBar ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        animation: animation
      }}
      children={ screens.map((e: ReactElement) => e) }
    />
  )
}

const App = (): ReactElement => {

  //const { width, height } = useWindowDimensions();

  //console.log("width", width)

  // TEST //

  // const windowDimensionss = Dimensions.get('window');
  // const screenDimensionss = Dimensions.get('screen');

  // const [dimensions, setDimensions] = useState({
  //   window: windowDimensionss,
  //   screen: screenDimensionss,
  // });

  // useEffect(() => {
  //   const subscription = Dimensions.addEventListener(
  //     'change',
  //     ({window, screen}) => {
  //       setDimensions({window, screen});
  //     },
  //   );
  //   return () => subscription?.remove();
  // });

  // console.log("WINDOW AAA", dimensions.window)
  // console.log("SCREEN AAA", dimensions.screen)

  // TEST //

  let navBar = useRef<boolean>(true)

  let updateNavBar = async() => {
    const dim = Object.assign({}, ...(["screen", "window"] as "screen"[] | "window"[]).map((e) => { const { width, height } = Dimensions.get(e); return { [`${e}Width`]: width, [`${e}Height`]: height } })) as dimI

    if (dim.screenHeight - dim.windowHeight > 47 || dim.screenWidth - dim.windowWidth > 47) navBar.current = true // > 47: ANDROID SPECIFIES THAT NAVIGATION (ON-SCREEN BUTTONS) BAR MUST BE 48 DP (Density-independent Pixels)
    else navBar.current = false // NO NAVIGATION (ON-SCREEN BUTTONS) BAR PRESENT. ins.bottom WOULD BE ~ 24 DP (GESTURE NAVIGATION)
  }

  //let opw: number = width / 100 // one percent window width
  //let oph: number = height / 100 // one percent window height
  //let vmin: number

  const [ vmin, setVmin ] = useState<number>(0);

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
  const [ state, setState ] = useState('flat');
  const [ hingeBounds, setHingeBounds ] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  //const [ windowHeight, setWindowHeight ] = useState(Dimensions.get("screen").height);
  const [ window, setWindow ] = useState({
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  });

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

  const { MainActivity } = NativeModules;

  const dynamicImport = (props: navigationI, module: any) => {
    switch (module) {
      case "Home":
        const Home = require('./src/components/Home/Home').default
        return (
          <Home
            {...props} input={input} setInput={setInput}
            setSecInput={setSecInput} secInput={secInput} vmin={vmin}
            state={state} width={window.width} height={window.height}
            hingeBounds={hingeBounds} showModal={showModal} updateShowModal={updateShowModal}
          />
        )
      case "About":
        const About = require('./src/components/About/About').default
        return (
          <About
            {...props} vmin={vmin} width={window.width} showModal={showModal}
            updateShowModal={updateShowModal} state={state} twoScreens={false}
          />
        )
      case "KnowMore":
        const KnowMore = require('./src/components/KnowMore/KnowMore').default
        return <KnowMore {...props} height={window.height} state={state} />
    }
  }

  let stackScreens: ReactElement[] = [ "Home", "About", "KnowMore" ].map((e: string) => {
    return (
      <Stack.Screen
        name={e}
        key={e}
        options={{ contentStyle: { backgroundColor: "rgb(255, 255, 255)" } }} // DEFAULT APP BACKGROUND COLOR
        children={(props) => dynamicImport(props, e)}
      />
    )
  })

  let initialState = { index: 0, routes: [ { name: 'Home' } ] }; // SET NAVIGATOR INITIAL STATE TO AVOID "UNDEFINED" ON "APP BLUR SAVE LAST ROUTE" (WITHOUT NAVIGATE ANY SCREEN)

  useEffect(() => {
    const nativeEvent = new NativeEventEmitter(MainActivity);
    let LayoutInfoListener = nativeEvent.addListener('LayoutInfo', e => {
      //console.log("screen", e.screen)
      console.log("window", e.window) // WINDOW BOUNDS (APP SIZE)
      console.log("state", e.state) // 'flat' or 'half' or 'closed'
      console.log("hingeBounds", e.hingeBounds) // HINGE BOUNDS

      setState(e.state)
      setHingeBounds(e.hingeBounds)
      //setWindowHeight(e.window.bottom - e.window.top)
      setWindow(e.window)
      setVmin(e.window.width > e.window.height ? e.window.height / 100 : e.window.width / 100)
    });
    return () => LayoutInfoListener.remove();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      children={ NavigatorMapper(animation, navBar.current, stackScreens) }
    />
  );
}

export default App;