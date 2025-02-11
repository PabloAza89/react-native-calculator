import React, { ReactElement, useState, useRef, useEffect, MutableRefObject } from 'react';
import { ScrollView, StatusBar, Text, View, Animated,
  useAnimatedValue, Pressable, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import About from '../About/About';
import OwnButton from '../OwnButton/OwnButton';
import KnowMore from '../KnowMore/KnowMore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI, counterI, goUpI } from '../../interfaces/interfaces';
import { portButtons, landButtons } from './Buttons';

const Home = ({ navigation, input, secInput, setSecInput, setInput, vmin, state,
  width, height, route, opw, hingeBounds, showModal, updateShowModal }: any): ReactElement => {
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
  const [ aboutUp, setAboutUp ] = useState(true)
  const [ showCalc, setShowCalc ] = useState(true)

  const switchSide = () => state === 'tabletop' ? setAboutUp(!aboutUp) : setCalcLeft(!calcLeft)
  const nextScreen = () => state === 'tabletop' ? setShowCalc(true) : setShowKnowMore(!showKnowMore)

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  const [ OPCQH, setOPCQH ] = useState(0) // onePercentContainerQueryHeight

  const AboutScreen =
    <About
      navigation={navigation} vmin={vmin}
      //currWidth={ hingeBounds === undefined ? width : calcLeft ? width - hingeBounds.right - ins.right : hingeBounds.left - ins.left }
      currWidth={
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
      navigation={navigation} opw={opw} height={height}
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
        children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 10, lineHeight: OPCQH * 10.2 } ]} children={ input.replaceAll(/N/g,"-") } /> }
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

  //console.log("INS", ins)

  //const [ counter, setCounter ] = useState<counterI>({ "0": 0, "1": 250, "2": 0 });
  //const [ currIdx, setCurrIdx ] = useState(Math.floor(Math.random() * 3)); // CURRENT INDEX A // BETWEEN 0 AND 2
  //const goUp: MutableRefObject<goUpI> = useRef({ "0": true, "1": false, "2": true });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let newANum = () => setCurrIdx(Math.floor(Math.random() * 3)) // BETWEEN 0 AND 2
  //                                    Math.floor(Math.random() * 2) // BETWEEN 0 AND 1

  //     if (counter[currIdx] > 250) { goUp.current[currIdx.toString() as keyof goUpI] = false; newANum() }
  //     else if (counter[currIdx] < 5) { goUp.current[currIdx.toString() as keyof goUpI] = true; newANum() }
  //     if (goUp.current[currIdx.toString() as keyof goUpI]) setCounter({ ...counter, [currIdx]: counter[currIdx] + 5 })
  //     else setCounter({ ...counter, [currIdx]: counter[currIdx] - 5 })
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [counter, currIdx, goUp])

  // const first = useAnimatedValue(0);
  // const second = useAnimatedValue(255);
  // const third = useAnimatedValue(0);

  // const asdRef: any = useRef({ 0: first, 1: second, 2: third });
  // let newIndex = 0
  // const newIndexFunc = () => newIndex = Math.floor(Math.random() * 3)

  //let colorVariables = `${first._value}, ${second}, ${third}`

  // const goUp = () => Animated.timing(asdRef.current[newIndex], { toValue: 255, duration: 5100, useNativeDriver: true }).start(
  //   ({finished}) => {
  //     if (finished) {
  //       newIndexFunc()
  //       if (asdRef.current[newIndex] === 0) goUp()
  //       else goDown()
  //     }
  //   }
  // );
  // const goDown = () => Animated.timing(asdRef.current[newIndex], { toValue: 0, duration: 5100, useNativeDriver: true }).start(
  //   ({finished}) => {
  //     if (finished) {
  //       newIndexFunc()
  //       if (asdRef.current[newIndex] === 0) goUp()
  //       else goDown()
  //     }
  //   }
  // );

  //console.log(`colorVariables ${colorVariables}`)

  // useEffect(() => {
  //   goUp()
  // }, [])

  let currentColor = useAnimatedValue(0);

  const first = 0
  const second = 255
  const third = 0

  //const curr = [0, 255, 0]
  //const trgt = [0, 255, 255]

  //const [ tgt, setTgt ] = useState([[0, 255, 0], [0, 255, 255]])
  
  //const tgt = useRef([[0, 255, 0], [0, 255, 255]])
  const [ tgt, setTgt ] = useState([[0, 255, 0], [0, 255, 255]])

  const inputRef = useRef([0, 1])

  //const [ colors, setColors ] = useState([`rgb(${tgt[0][0]}, ${tgt[0][1]}, ${tgt[0][2]})`, `rgb(${tgt[1][0]}, ${tgt[1][1]}, ${tgt[1][2]})`])
  //const colors = useRef([`rgb(${tgt.current[0][0]}, ${tgt.current[0][1]}, ${tgt.current[0][2]})`, `rgb(${tgt.current[1][0]}, ${tgt.current[1][1]}, ${tgt.current[1][2]})`])
  //const colors = [`rgb(${tgt.current[0][0]}, ${tgt.current[0][1]}, ${tgt.current[0][2]})`, `rgb(${tgt.current[1][0]}, ${tgt.current[1][1]}, ${tgt.current[1][2]})`]

  let qq = currentColor.interpolate({
    inputRange: inputRef.current,
    outputRange: [`rgb(${tgt[0][0]}, ${tgt[0][1]}, ${tgt[0][2]})`, `rgb(${tgt[1][0]}, ${tgt[1][1]}, ${tgt[1][2]})`]
    //outputRange: colors
  });

  // currentColor.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['rgb(0, 255, 0)', 'rgb(0, 255, 255)']
  //   outputRange: ['rgb(0, 0, 255)', 'rgb(255, 0, 255)']
  // })

  //Animated.timing(currentColor, { toValue: 1, duration: 20000, useNativeDriver: true }).start();
  //const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

  //console.log("CURRENT", colors[0], "TARGET", colors[1])

  const valVal = useRef(1)

  // const newColors = () => {
  //   tgt.current = [[0, 0, 255], [255, 0, 255]]
  //   valVal.current = 0
  // }

  // const updateValues = () => {

  // }

  const startAAA = () => Animated.timing(currentColor, { toValue: 1, duration: 10000, useNativeDriver: true }).start(
    ({finished}) => {
      if (finished) {

        // currentColor.setValue(0);
        // setTgt([[0, 0, 255], [255, 0, 255]])
        // startAAA()

        currentColor.setValue(0);
        //setTgt([[0, 0, 255], [255, 0, 255]])
        setTgt(curr => {
          

          //let neww = curr[1]
          let targett = [...curr[1]]
          //neww = [curr[1]]
          let randomIndex = Math.floor(Math.random() * 3)

          if (curr[1][randomIndex] === 255) {
            targett[randomIndex] = 0
          } else {
            targett[randomIndex] = 255
          }

          console.log("OLD", [curr[0], curr[1]])
          console.log("NEW", [curr[1], targett])

          return [curr[1], targett]
        })
        startAAA()


      }
    }
  );

  // const startBBB = () => Animated.timing(currentColor, { toValue: 1, duration: 10000, useNativeDriver: true }).start(
  //   ({finished}) => {
  //     if (finished) {
  //       //setTgt([[0, 0, 255],[255, 0, 255]])
  //       //valVal.current = 0
  //       //newColors()
  //       //startASD()
  //       currentColor.setValue(0);
  //       setTgt([[0, 255, 0], [0, 255, 255]])
  //       startAAA()
  //     }
  //   }
  // );

  startAAA()



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
