import React, { ReactElement, useState, useRef, useEffect } from 'react';
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
  state, width, height, opw, oph, hingeBounds, showModal, updateShowModal, /* MainActivity, ClassTest */ }: any): ReactElement => {
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {

  const { navigate } = navigation

  const [ showKnowMore, setShowKnowMore ] = useState(false)

  useEffect(() => {
    const lastRoute = route.params?.lastRoute
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

  const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%', margin: '2%' }
  const lastButtonLand = { value: "=", parErr: parErr, size: `${92/7}%`, margin: '1%' }

  const parsedWidth = width - ins.left - ins.right
  const parsedHeight = height - ins.top - ins.bottom

  const [ calcLeft, setCalcLeft ] = useState(true)

  const switchSide = () => setCalcLeft(!calcLeft)
  const nextScreen = () => setShowKnowMore(!showKnowMore)

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  const [ OPCQH, setOPCQH ] = useState(0) // onePercentContainerQueryHeight

  const KnowMoreScreen =
    <KnowMore
      navigation={navigation} opw={opw} port={port} height={height}
      switchSide={switchSide} twoScreens={true} nextScreen={nextScreen}
    />;

  console.log("AAA", width)
  console.log("INS", ins)
  console.log("INHEBOUNDS", hingeBounds)

  const AboutScreen =
    <About
      navigation={navigation} vmin={vmin}
      //currWidth={ calcLeft ? width - hingeBounds.right - ins.right : hingeBounds.left - ins.left }
      currWidth={ hingeBounds === undefined ? width : calcLeft ? width - hingeBounds.right - ins.right : hingeBounds.left - ins.left }
      switchSide={switchSide} twoScreens={true} nextScreen={nextScreen}
      showModal={showModal} updateShowModal={updateShowModal}
    />;

  const PortButtons =
    portButtons.concat(lastButtonPort).map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} small={e.small} fontSize={OPCQH/1.5}
      />
    );

  const LandButtons =
    landButtons.concat(lastButtonLand).map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} fontSize={OPCQH} type={state}
      />
    );

  const ButtonAbout =
      <TouchableHighlight
        underlayColor="#8aaeba"
        //underlayColor="red"
        activeOpacity={1}

        style={[
          s.question,
          { borderRadius: 21 }
          //{ borderRadius: (vmin * 50) / 2, left: (parsedWidth - 30) / 2, bottom: -52 }
          //{ borderRadius: (vmin * 50) / 2, right: 90, bottom:110 }

        ]}

        // style={[
        //   s.question,
        //   { borderRadius: (vmin * 50) / 2 },
        //   port ?
        //   { left: ((vmin * 90) / 2) - 23, bottom: -54 } :
        //   { top: ((vmin * 90) / 2) - 23, right: -54 },
        // ]}
        onPress={() => navigate('About')}
        //onPress={() => onPressTest()}
        children={ <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' /> }
      />

  //onLayout={e => setOPCQH(e.nativeEvent.layout.height / 100)}
  const PortCalc =
    <View
      style={[ s.outline, { marginTop: ins.top, marginBottom: ins.bottom } ]}
      children={
        <View onLayout={e => setOPCQH(e.nativeEvent.layout.height / 100)} style={[ s.contour, { aspectRatio: 2/3, width: parsedWidth - 30, maxHeight: parsedHeight - 130 } ]}>
        {/* <View style={[ s.contour, { aspectRatio: 2/3, width: parsedWidth - 30, maxHeight: parsedHeight - 130 } ]}> */}
          <View style={[ s.displayContainer, s.displayContainerPort, { height: `${(28.4/3)*2}%`, paddingLeft: vmin * 1, paddingRight: vmin * 1 } ]}>
            <ScrollView
              overScrollMode="never"
              ref={scrollRefUpper}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ height: '30%' }}
              children={ <Text style={[ s.secondaryResult, { fontSize: OPCQH * 3 } ]} children={ secInput.replaceAll(/N/g,"-") } /> }
            />
            <ScrollView
              overScrollMode="never"
              ref={scrollRefCenter}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ height: '40%' }}
              children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 6 } ]} children={ input.replaceAll(/N/g,"-") } /> }
            />
            <View
              style={{ height: '30%' }}
              children={ /* parErr && */ <Text style={[ s.parErr, { fontSize: OPCQH * 3 } ]} children={`CHECK PARENTHESIS`} /> }
            />
          </View>

          { PortButtons }
          
          <View
            style={[ s.questionContainer, { width: '100%', height: 42, bottom: -55 } ]}
            //children={ ButtonAbout }
          >
            { state !== 'book' && ButtonAbout }
          </View>

        </View>
      }
    />;

  const refWidth = useRef(null);

  //console.log("REF REF", refWidth?.current?.getBoundingClientRect());
  //console.log("REF REF", refWidth.current?.viewConfig?.validAttributes.style)

  // ref={refWidth}

  const LandCalc =
    <View style={[ s.outline, { marginBottom: ins.bottom, marginTop: ins.top } ]}>
      {/* <View ref={refWidth} style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 130, maxHeight: parsedHeight - 30 } ]}> */}
      <View onLayout={e => setOPCQH(e.nativeEvent.layout.height / 100)} style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 130, maxHeight: parsedHeight - 30 } ]}>
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
            children={ <Text style={[ s.secondaryResult, { fontSize: OPCQH * 5.5 } ]} children={ secInput.replaceAll(/N/g,"-") } /> }
          />
          <ScrollView
            overScrollMode="never"
            ref={scrollRefCenter}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: '40%' }}
            children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 10, lineHeight: OPCQH * 10.2 } ]} children={ input.replaceAll(/N/g,"-") } /> }
          />
          <View
            style={{ height: '30%' }}
            children={
              true && //parErr &&
              <Text style={[ s.parErr, { fontSize: OPCQH * 5.5 } ]} children={`CHECK PARENTHESIS`} />
            }
          />
        </View>

        { LandButtons }

        <View
          style={[ s.questionContainer, { width: 42, height: '100%', right: -55 } ]}
          children={ ButtonAbout }
        />

      </View>
    </View>;



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

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  console.log("HEIGHT", height)
  console.log("state state", state)

  return (
    <View style={[ s.background ]}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      {
        state === 'fullscreen' ?

        PortCalc :

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
            style={[ s.lowerScreenTabletop, { top: hingeBounds.bottom - hingeBounds.top, height: height - hingeBounds.bottom - ins.bottom } ]} /* LOWER SIDE */
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
        </View> :

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
        </View> : // closed or no fold device

        state === 'portrait' ?

        PortCalc :

        LandCalc // landscape 

      }
    </View>
  );
}

export default Home;
