import React, { ReactElement, useState, useRef, useEffect, MutableRefObject } from 'react';
import { ScrollView, StatusBar, View, Animated,
  useAnimatedValue, Pressable, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import About from '../About/About';
import OwnButton from '../OwnButton/OwnButton';
import KnowMore from '../KnowMore/KnowMore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI, counterI, goUpI } from '../../interfaces/interfaces';
import { Text } from '../../utils/Text';
import { portButtons, landButtons } from '../../utils/Buttons';

const Home = ({ navigation, input, secInput, setSecInput, setInput, vmin, state,
  width, height, route, /* opw, */ hingeBounds, showModal, updateShowModal }: any): ReactElement => {
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {

  const { navigate } = navigation

  const [ showKnowMore, setShowKnowMore ] = useState(false)

  useEffect(() => {
    const lastRoute = route.params?.lastRoute
    lastRoute === 'KnowMore' && setShowKnowMore(true)
    lastRoute === 'About' && setShowKnowMore(false)
  }, [route])

  //let ins = useSafeAreaInsets(); // insets

  const  ins = {
    left: 1,
    top: 1,
    right: 1,
    bottom: 1
  }

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
  const [ aboutUp, setAboutUp ] = useState(true)
  const [ showCalc, setShowCalc ] = useState(true)

  const switchSide = () => state === 'tabletop' ? setAboutUp(!aboutUp) : setCalcLeft(!calcLeft)
  const nextScreen = () => state === 'tabletop' ? setShowCalc(true) : setShowKnowMore(!showKnowMore)

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {}//Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => {}//Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  const [ OPCQH, setOPCQH ] = useState(0) // onePercentContainerQueryHeight

  const AboutScreen =
    <About
      navigation={navigation} vmin={vmin}
      //currWidth={ hingeBounds === undefined ? width : calcLeft ? width - hingeBounds.right - ins.right : hingeBounds.left - ins.left }
      width={
        state === 'book' && calcLeft ? width - hingeBounds.right - ins.right :
        state === 'book' && !calcLeft ? hingeBounds.left - ins.left :
        width
      }
      //currWidth={width}
      showModal={showModal} updateShowModal={updateShowModal}
      state={state} twoScreens={true}
      switchSide={switchSide} nextScreen={nextScreen} aboutUp={aboutUp}
    />;

  const KnowMoreScreen =
    <KnowMore
      navigation={navigation} /* opw={opw} */ height={height}
      state={state} switchSide={switchSide}
      twoScreens={true} nextScreen={nextScreen}
      aboutUp={aboutUp} hingeBounds={hingeBounds}
    />;

  const PortButtons =
    portButtons.concat(lastButtonPort).map((e, i) =>
      <OwnButton
        key={i} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} setParErr={setParErr} setSecInput={setSecInput}
        size={e.size} margin={e.margin} fontSize={OPCQH/1.5} small={e.small}
      />
    );

  const LandButtons =
    landButtons.concat(lastButtonLand).map((e, i) =>
      <OwnButton
        key={i} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} setParErr={setParErr} setSecInput={setSecInput}
        size={e.size} margin={e.margin} fontSize={OPCQH} state={state}
      />
    );

  const ButtonAbout =
    <TouchableHighlight
      underlayColor="#8aaeba"
      activeOpacity={1}
      style={s.question}
      onPress={() => state === 'tabletop' ? setShowCalc(false) : navigate('About')}
      children={ <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' /> }
    />;

  const PortCalc =
    <View
      style={[ s.outline, { marginTop: ins.top, marginBottom: ins.bottom } ]}
      children={
        <View onLayout={e => setOPCQH(e.nativeEvent.layout.height / 100)} style={[ s.contour, { aspectRatio: 2/3, width: parsedWidth - 30, maxHeight: parsedHeight - 130 } ]}>
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
              children={ parErr && <Text style={[ s.parErr, { fontSize: OPCQH * 3 } ]} children={`CHECK PARENTHESIS`} /> }
            />
          </View>

          { PortButtons }

          <View
            style={[ s.questionContainer, { width: '100%', height: 42, bottom: -55 } ]}
            children={ state !== 'book' && ButtonAbout }
          />

        </View>
      }
    />;

  const LandCalcDisplay =
    <>
      <ScrollView
        overScrollMode="never"
        ref={scrollRefUpper}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ height: '30%' }}
        children={ <Text style={[ s.secondaryResult, { fontSize: OPCQH * 5.5 } ]} children={secInput.replaceAll(/N/g,"-")} /> }
      />
      <ScrollView
        overScrollMode="never"
        ref={scrollRefCenter}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ height: '40%' }}
        children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 9, lineHeight: OPCQH * 9.2 } ]} children={ input.replaceAll(/N/g,"-") } /> }
      />
      <View
        style={{ height: '30%' }}
        children={ parErr && <Text style={[ s.parErr, { fontSize: OPCQH * 5.5 } ]} children={'CHECK PARENTHESIS'} /> }
      />
    </>;

  const LandCalc =
    <View style={[ s.outline, { marginBottom: ins.bottom, marginTop: ins.top } ]}>
      <View onLayout={e => setOPCQH(e.nativeEvent.layout.height / 100)} style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 130, maxHeight: parsedHeight - 30 } ]}>
        <View
          style={[ // `${(11.14/4)*7}%`
            s.displayContainer,
            { width: '98%', marginLeft: '1%', height: `${(((400 / 7) - (((92/7)*3)+5)) / 4) * 7}%`, marginTop: '1%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
          ]}
          children={ LandCalcDisplay }
        />

        { LandButtons }

        <View
          style={[ s.questionContainer, { width: 42, height: '100%', right: -55 } ]}
          children={ ButtonAbout }
        />

      </View>
    </View>;

  const ModalForegroundScreen =
    <Animated.View
      style={[ s.ModalForegroundScreen, { opacity: fadeAnim, pointerEvents: showModal ? 'auto' : 'none' } ]}
      children={
        <Pressable
          style={[ s.ModalForegroundScreenPressable, { paddingTop: ins.top, paddingBottom: ins.bottom } ]}
          onPress={() => updateShowModal(false)}
        />
      }
    />

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  let currIndex = useAnimatedValue(0);

  const [ c, sC ] = useState([[0, 0, 255], [255, 0, 255]]) // color, setColor

  let qq = currIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [`rgb(${c[0][0]}, ${c[0][1]}, ${c[0][2]})`, `rgb(${c[1][0]}, ${c[1][1]}, ${c[1][2]})`]
  });

  //let qq = 'rgb(255, 255, 255)'

  const updateValues = (num: any) => {
    sC(curr => {
      let copy = [...curr[num]]
      let randomIndex = Math.floor(Math.random() * 3) // 0, 1 or 2
      curr[num][randomIndex] === 255 ? copy[randomIndex] = 0 : copy[randomIndex] = 255
      return num === 1 ? [copy, curr[1]] : [curr[0], copy]
    })
    nextColor(+Boolean(!num))
  }

  const nextColor = (toValue: number) =>
    Animated.timing(currIndex, { toValue: toValue, duration: 5100, useNativeDriver: true, isInteraction: false }).start(
      ({finished}) => finished && updateValues(toValue)
    );

  useEffect(() => {
    state === 'tabletop' && nextColor(1)
    return () => currIndex.stopAnimation()
  }, [state])

  //console.log("INS", ins)
  console.log("TEST 123")

  return (
    <View style={s.background}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      {
        state === 'fullscreen' ?

        PortCalc :

        state === 'tabletop' ?

        <View style={s.tabletopContainer}>
          <View /* UPPER SIDE */
            style={[ s.upperScreenTabletop, { height: hingeBounds.top, width: hingeBounds.right, /* paddingRight: ins.right */ } ]}
          >

            {
              showCalc &&
              <View
                style={s.outline}
                children={
                  <View
                    onLayout={e => setOPCQH((e.nativeEvent.layout.height * 4) / 100)}
                    style={[ s.contour, { aspectRatio: 7/1, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}
                  >
                    <View
                      style={[ s.displayContainer, s.displayContainerLand, { height: `${((100 / 7) - 2) * 7}%`, paddingLeft: vmin * 1, paddingRight: vmin * 1 } ]}
                      children={ LandCalcDisplay }
                    />
                    <View
                      style={[ s.questionContainer, { width: '100%', height: 42, bottom: -55 } ]}
                      children={ state !== 'book' && ButtonAbout }
                    />
                  </View>
                }
              />
            }

            { ModalForegroundScreen }
            { !showCalc && (aboutUp ? AboutScreen : KnowMoreScreen) }

          </View>
          <Animated.View /* LOWER SIDE */
            style={[ s.lowerScreenTabletop, { top: hingeBounds.bottom - hingeBounds.top, height: height - hingeBounds.bottom, width: hingeBounds.right, backgroundColor: qq } ]}
          >

            {
              showCalc &&
              <View
                style={[ s.outline, { marginBottom: ins.bottom } ]}
                children={
                  <View
                    style={[ s.contour, { aspectRatio: 7/3, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}
                    children={ <View style={s.landButtonsContainer} children={LandButtons} /> }
                  />
                }
              />
            }

            { ModalForegroundScreen }
            { !showCalc && ( aboutUp ? KnowMoreScreen : AboutScreen ) }

          </Animated.View>
        </View> :

        state === 'book' ?

        <View style={s.bookContainer} /* BOOK */>
          <View style={[ s.leftScreenBook, { width: hingeBounds.left - ins.left } ]} /* LEFT SIDE */ >
            { ModalForegroundScreen }
            { calcLeft ? PortCalc : ( showKnowMore ? KnowMoreScreen : AboutScreen ) }
          </View>
          <View style={[ s.rightScreenBook, { left: hingeBounds.right - hingeBounds.left, width: width - hingeBounds.right - ins.right } ]} /* RIGHT SIDE */ >
            { ModalForegroundScreen }
            { calcLeft ? ( showKnowMore ? KnowMoreScreen : AboutScreen ) : PortCalc }
          </View>
        </View> :

        state === 'portrait' ?

        PortCalc :

        LandCalc

      }
    </View>
  );
}

export default Home;
