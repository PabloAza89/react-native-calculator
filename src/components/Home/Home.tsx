import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, Animated, useAnimatedValue,
  Pressable, TouchableHighlight, NativeModules, NativeEventEmitter } from 'react-native';
import { s } from './HomeCSS';
import About from '../About/About';
import OwnButton from '../OwnButton/OwnButton';
import KnowMore from '../KnowMore/KnowMore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';
import { portButtons, landButtons } from './Buttons';

const Home = ({ navigation, route, vmin, port, input, secInput, setInput, setSecInput,
  state, width, height, opw, oph, hingeBounds, showModal, updateShowModal, /* MainActivity, ClassTest */ }: any): ReactElement =>{
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {

  const { navigate } = navigation

  //state === 'book' && navigate('Home')

  const [ showKnowMore, setShowKnowMore ] = useState(false)

  //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA", route)
  useEffect(() => {
    const lastRoute = route.params?.lastRoute
    //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA", route.params)
    //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA", lastRoute)
    //if (lastRoute === 'KnowMore') setShowKnowMore(true)
    lastRoute === 'KnowMore' && setShowKnowMore(true)
    lastRoute === 'About' && setShowKnowMore(false)
  }, [route])

  let ins = useSafeAreaInsets(); // insets

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => scrollEnd(), [input])

  const scrollRefUpper = useRef<ScrollView>(null);
  const scrollRefCenter = useRef<ScrollView>(null);

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  // const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%' }
  // const lastButtonLand = { value: "=", parErr: parErr, size: '12%' }

  const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%', margin: '2%' }
  const lastButtonLand = { value: "=", parErr: parErr, size: `${92/7}%`, margin: '1%' }

  // let buttonsMapper = () => {

  //   return portButtons.map(e =>
  //     <OwnButton
  //       key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
  //       setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
  //       vmin={vmin}
  //     />
  //   )
  // }

  console.log("ins", ins)

  const parsedWidth = width - ins.left - ins.right
  const parsedHeight = height - ins.top - ins.bottom

  const parsedPort = parsedWidth > parsedHeight ? false : true

  const testRef = useRef(null);

  //if (testRef.current !== null) console.log("A VER", testRef.current)
  //console.log("A VER", x, y, width, height)

  //const [ test, setTest ] = useState(0)

  //console.log("PARR ERR", parErr)
  console.log("HEIGHT HEIGHT", height)
  console.log("WIDTH WIDTH", width)

  const [ calcLeft, setCalcLeft ] = useState(true)

  const switchSide = () => setCalcLeft(!calcLeft)
  const nextScreen = () => setShowKnowMore(!showKnowMore)

  // const [ showModal, setShowModal ] = useState(false);
  // const updateShowModal = (bool: boolean) => setShowModal(bool)

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  const KnowMoreScreen =
    <KnowMore
      navigation={navigation} opw={opw} port={port} height={height}
      //navigate={navigate} opw={opw} port={port} height={height}
      setCalcRight={setCalcLeft}
      calcRight={calcLeft} switchSide={switchSide} twoScreens={true} nextScreen={nextScreen}
    />;

  const AboutScreen =
    <About
      navigation={navigation} vmin={vmin}
      //navigate={navigate} vmin={vmin}
      currWidth={ calcLeft ? width - hingeBounds.right - ins.left : hingeBounds.left - ins.left }
      switchSide={switchSide} twoScreens={true} nextScreen={nextScreen}
      showModal={showModal} updateShowModal={updateShowModal}
    />;

  const PortButtons =
    portButtons.concat(lastButtonPort).map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} small={e.small} fontSize={oph}
      />
    );

  const LandButtons =
    landButtons.concat(lastButtonLand).map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} fontSize={opw} type={state}
      />
    );

  const PortCalc =
    <View // OUTLINE PORTRAIT
      style={[ s.outline, { marginTop: ins.top, marginBottom: ins.bottom } ]}
      children={
        <View style={[ s.contour, { aspectRatio: 2/3, width: parsedWidth , maxHeight: parsedHeight - 100 } ]}>
          <View style={[ s.displayContainer, s.displayContainerPort, { height: `${(28.4/3)*2}%`, paddingLeft: vmin * 1, paddingRight: vmin * 1 } ]}>
            <ScrollView
              overScrollMode="never"
              ref={scrollRefUpper}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ height: '30%' }}
              children={ <Text style={[ s.secondaryResult, { fontSize: oph * 2.7 } ]} children={ secInput.replaceAll(/N/g,"-") } /> }
            />
            <ScrollView
              overScrollMode="never"
              ref={scrollRefCenter}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ height: '40%' }}
              children={ <Text style={[ s.mainResult, { fontSize: oph * 4.5, lineHeight: oph * 4.5 } ]} children={ input.replaceAll(/N/g,"-") } /> }
            />
            <View
              style={{ height: '30%' }}
              children={ parErr && <Text style={[ s.parErr, { fontSize: oph * 2.1 } ]} children={`CHECK PARENTHESIS`} /> }
            />
          </View>

          { PortButtons }

        </View>
      }
    />;

  const ModalBackgroundOtherScreen =
    <Animated.View
      style={[ s.modalBackgroundOtherScreen, { opacity: fadeAnim, pointerEvents: showModal ? 'auto' : 'none' } ]}
      children={
        <Pressable
          style={[ s.modalBackgroundOtherScreenPressable, { paddingTop: ins.top, paddingBottom: ins.bottom } ]}
          onPress={() => updateShowModal(false)}
        />
      }
    />

  useEffect(() => {
    showModal ? fadeIn() : fadeOut()
  }, [showModal])

   const { MainActivity, TestModule } = NativeModules;

  // useEffect(() => {
  //   const nativeEvent = new NativeEventEmitter(MainActivity);

  //   let angleListener = nativeEvent.addListener('angle', e => {
  //     console.log("angleASDASD", e) // HINGE ANGLE
  //   });
  //   return () => {
  //     angleListener.remove();
  //   }
  // }, []);


  const onPressTest = async () => {
    try {
      //console.log("CLICKED", await MainActivity.callFromReact())
      //console.log("CLICKED", await MainActivity.getMainComponentName())
      //console.log("CLICKED", await MainActivity.getMainComponentName())
      //console.log("CLICKED", await MainActivity.TestClass.getName())
      //console.log("CLICKED", await MainActivity.testFunc())
      console.log("CLICKED", await TestModule.testFunc())
      
      
    }
    catch(e) {
      console.log("ERROR", e)
    }
    
  };

  return (
    <View style={[ s.background ]}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      {
        //state === 'cleanFullscreen' ?
        true ?

        <>
          { PortCalc }
          <TouchableHighlight
            underlayColor="#8aaeba"
            activeOpacity={1}

            style={[
              s.question,
              { borderRadius: (vmin * 50) / 2, right: 90, bottom:110 }

            ]}

            // style={[
            //   s.question,
            //   { borderRadius: (vmin * 50) / 2 },
            //   port ?
            //   { left: ((vmin * 90) / 2) - 23, bottom: -54 } :
            //   { top: ((vmin * 90) / 2) - 23, right: -54 },
            // ]}
            //onPress={() => navigate('About')}
            onPress={() => onPressTest()}
            children={ <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' /> }
          />
        </>

        :

        state === 'tabletop' ?

        <View style={[ s.tabletopContainer ]} /* TABLETOP */>
          <View /* UPPER SIDE */
            style={[ s.upperScreenTabletop, { height: hingeBounds.top, paddingTop: ins.top  } ]} /* UPPER SIDE */
            children={
              <View
                style={[ s.outline ]}
                children={
                  <View style={[ s.contour, { aspectRatio: 7/1, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
                    <View style={[ s.displayContainer, s.displayContainerLand, { height: `${((100 / 7) - 2) * 7}%`, paddingLeft: vmin * 1, paddingRight: vmin * 1 } ]}>
                      <ScrollView
                        overScrollMode="never"
                        ref={scrollRefUpper}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ height: '30%' }}
                        children={ <Text style={[ s.secondaryResult, { fontSize: opw * 2.6 } ]} children={secInput.replaceAll(/N/g,"-")} /> }
                      />
                      <ScrollView
                        overScrollMode="never"
                        ref={scrollRefCenter}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ height: '40%' }}
                        children={ <Text style={[ s.mainResult, { fontSize: opw * 4.7, lineHeight: opw * 4.7 } ]} children={ input.replaceAll(/N/g,"-") } /> }
                      />
                      <View
                        style={{ height: '30%' }}
                        //children={ parErr && <Text style={[ s.parErr, { fontSize: opw * 2.1 } ]} children={'CHECK PARENTHESIS'} /> }
                        children={ true && <Text style={[ s.parErr, { fontSize: opw * 2.1 } ]} children={'CHECK PARENTHESIS'} /> }
                      />
                    </View>
                  </View>
                }
              />
            }
          />
          <View /* LOWER SIDE */
            style={[ s.lowerScreenTabletop, { top: hingeBounds.bottom - hingeBounds.top, height: height - hingeBounds.bottom, paddingBottom: ins.bottom } ]} /* LOWER SIDE */
            children={
              <View
                style={[ s.outline ]}
                children={
                  <View style={[ s.contour, { aspectRatio: 7/3, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
                    <View
                      style={[ s.landButtonsContainer ]}
                      children={LandButtons}
                    />
                  </View>
                }
              />
            }
          />
        </View>
        
        :

        state === 'book' ?

        <View style={[ s.bookContainer ]} /* BOOK */>
          <View style={[ s.leftScreenBook, { width: hingeBounds.left - ins.left } ]} /* LEFT SIDE */ >
            { calcLeft && ModalBackgroundOtherScreen }
            { calcLeft ? PortCalc : ( showKnowMore ? KnowMoreScreen : AboutScreen ) }
          </View>
          <View style={[ s.rightScreenBook, { width: width - hingeBounds.right - ins.left } ]} /* RIGHT SIDE */ >
            { !calcLeft && ModalBackgroundOtherScreen }
            { calcLeft ? ( showKnowMore ? KnowMoreScreen : AboutScreen ) : PortCalc }
          </View>
        </View>

        :

        <View style={{ backgroundColor: 'darkblue' }} /* OUTLINE LANDSCAPE */>
          <View style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
            <View
              style={[ // `${(11.14/4)*7}%`
                s.displayContainer,
                { width: '98%', marginLeft: '1%', height: `${(((400 / 7) - (((92/7)*3)+5)) / 4) * 7}%`, marginTop: '1%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
              ]}
            >
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '30%' }}
                children={ <Text style={[ s.secondaryResult, { fontSize: opw * 2.6 } ]} children={secInput.replaceAll(/N/g,"-")} /> }
              />
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '40%' }}
                children={ <Text style={[ s.mainResult, { fontSize: opw * 4.7, lineHeight: opw * 4.7 } ]} children={ input.replaceAll(/N/g,"-") } /> }
              />
              <View
                style={{ height: '30%' }}
                children={
                  //parErr &&
                  true &&
                  <Text style={[ s.parErr, { fontSize: opw * 2.1 } ]} children={`CHECK PARENTHESIS`} />
                }
              />
            </View>

            { LandButtons }

          </View>
        </View>

        
      }
        
    </View>
  );
}

export default Home;
