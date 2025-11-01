import React, { ReactElement, useState, useRef, useEffect, MutableRefObject } from 'react';
import { ScrollView, StatusBar, View, Animated,
  useAnimatedValue, Pressable, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import About from '../About/About';
import OwnButton from '../OwnButton/OwnButton';
import KnowMore from '../KnowMore/KnowMore';
import { SimpleLineIcons } from '@expo/vector-icons';
import { HomeI, counterI, goUpI } from '../../interfaces/interfaces';
import { Text } from '../../utils/Text';
import { portButtons, landButtons } from '../../utils/Buttons';

const Home = ({ navigation, input, secInput, setSecInput, setInput, vmin, state,
  width, height, route, /* opw, */ hingeBounds, showModal, updateShowModal, ins, maxVerticalInset, maxHorizontalInset, update }: any): ReactElement => {
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {


  //console.log("OOOOOOOOOOO width", width)
  console.log("XXXXXXXXXXXX INPUT", typeof input)

  const { navigate } = navigation

  const [ showKnowMore, setShowKnowMore ] = useState(false)

  useEffect(() => {
    const lastRoute = route.params?.lastRoute
    lastRoute === 'KnowMore' && setShowKnowMore(true)
    lastRoute === 'About' && setShowKnowMore(false)
  }, [route])

  //let ins = useSafeAreaInsets(); // insets

  // const  ins = {
  //   left: 1,
  //   top: 1,
  //   right: 1,
  //   bottom: 1
  // }

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => scrollEnd(), [input.current])

  const scrollRefUpper = useRef<ScrollView>(null);
  const scrollRefCenter = useRef<ScrollView>(null);

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%', margin: '2%' }
  const lastButtonLand = { value: "=", parErr: parErr, size: `${92/7}%`, margin: '1%' }

  //console.log("HEIGHT HEIGHT", height)
  //console.log("WIDTH WIDTH", width)

  //const maxLeftOrRight = ins.left > ins.right ? ins.left * 2 : ins.right * 2
  //const maxTopOrBottom = ins.top > ins.bottom ? ins.top * 2 : ins.bottom * 2

  const parsedHorizontalInset = maxHorizontalInset * 2
  const parsedVerticalInset = maxVerticalInset * 2

  const preParsedWidth = width - parsedHorizontalInset
  const preParsedHeight = height - parsedVerticalInset

  const parsedWidth = preParsedWidth > 950 ? 950 : preParsedWidth
  const parsedHeight = preParsedHeight > 900 ? 900 : preParsedHeight

  const [ calcLeft, setCalcLeft ] = useState(true)
  const [ aboutUp, setAboutUp ] = useState(true)
  const [ showCalc, setShowCalc ] = useState(true)

  const switchSide = () => state === 'tabletop' ? setAboutUp(!aboutUp) : setCalcLeft(!calcLeft)
  const nextScreen = () => state === 'tabletop' ? setShowCalc(true) : setShowKnowMore(!showKnowMore)

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {} //Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => {} //Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  const [ OPCQH, setOPCQH ] = useState(0) // onePercentContainerQueryHeight

  const sharedProps = { width, height, state, ins, hingeBounds, maxVerticalInset, maxHorizontalInset, vmin, nextScreen, switchSide, navigation, aboutUp }

  const AboutScreen =
    <About
      {...sharedProps} showModal={showModal} updateShowModal={updateShowModal}
      calcLeft={calcLeft} twoScreens
    />;

  const KnowMoreScreen =
    <KnowMore {...sharedProps} twoScreens />;

  //////////////////////////////////////////////////////

  function handlePress(value: string) {
  
      if (value !== "=") setParErr(false) // RESET ERROR PARENTHESIS
  
      /// -----------> BEGIN STOPPERS <----------- ///
  
      if (input.current.length === input.current.replace(/ /g,'').length && value === "=") { scrollEnd(); return } // STOP IF INPUT IS "1e+38" or "1e+" or IF THERE IS NO OPERATION SIGN AND ATTEMPT = //
  
      if (parErr === true && value === "=") { scrollEnd(); return } // STOP IF PARENTHESIS ERROR IS DISPLAYED & ATTEMPT "=" // OJO ESTE IBA PRIMERO // TEST
  
      if (value === "C") { input.current = ""; setSecInput(""); return } // CLEAR INPUT AND STOP
  
      let splitted: string[] = input.current.replace(/ /g,'').split("") // OK
  
      if (
        value === "=" &&
        splitted.filter((e: string) => e === "(").length !== // STOP IF ((( AND ))) AMOUNT ARE UNEQUAL
        splitted.filter((e: string) => e === ")").length
      ) { setParErr(true); scrollEnd(); return }
  
      if (
        value === "=" &&
        splitted.indexOf("x") === -1 &&
        splitted.indexOf("/") === -1 &&
        splitted.indexOf("+") === -1 &&
        splitted.indexOf("-") === -1
      ) { scrollEnd(); return } // STOP IF "=" IS PRESSED & INPUT DONT HAVE x / + or -
  
      if (value === "B") { // Backspace
        if (input.current.slice(-3) === " x " || // if last input is an operator: "123 + "
          input.current.slice(-3) === " / " ||
          input.current.slice(-3) === " + " ||
          input.current.slice(-3) === " - ") {
          input.current = input.current.slice(0,-3);
          setSecInput("");
          return
        }
        else if (input.slice(-8) === "Infinity") { // if last input is Infinity: "Infinity" // TEST
          input.current = input.current.slice(0,-8)
          setSecInput("");
          return
        }
        else { // else
          let seqOne = input.current.split("");
          seqOne.pop();
          let seqTwo = seqOne.join("");
          input.current = seqTwo;
          setSecInput("");
          return
        }
      } // EDIT PREVIOUS INPUT AND STOP
  
      if (
        (input.current.slice(-3) === " x " ||
        input.current.slice(-3) === " / " ||
        input.current.slice(-3) === " + " ||
        input.current.slice(-3) === " - " ||
        input.current.slice(-1) === "(") &&
        (value === "X" ||
        value === "/" ||
        value === "+" ||
        value === "-" ||
        value === ")" ||
        value === "." ) // STOP IF ATTEMPT + AND + (REPEATED OPERATORS)
      ) { scrollEnd(); return }
  
      if (
        input.current.slice(-1) === ")" &&
        value === "."
      ) { scrollEnd(); return } // STOP IF ATTEMPT ).
  
      if (
        input.current.slice(-1) === "." &&
        isNaN(parseInt(value))
      ) { scrollEnd(); return } // STOP IF ATTEMPT .. or .( or .x
  
      if (
        (!isNaN(parseInt(input.current[input.current.length - 1])) &&
        !isNaN(parseInt(input.current[input.current.length - 2])) &&
        input.current[input.current.length - 3] === "." &&
        !isNaN(parseInt(input.current[input.current.length - 4]))) &&
        (!isNaN(parseInt(value)) || value === ".")
      ) { scrollEnd(); return } // STOP IF ATTEMPT 3.999 or 3.77. (floating point number > 2)
  
      if (
        (!isNaN(parseInt(input.current[input.current.length - 1])) &&
        input.current[input.current.length - 2] === "." &&
        !isNaN(parseInt(input.current[input.current.length - 3]))) &&
        value === "."
      ) { scrollEnd(); return } // STOP IF ATTEMPT 3.9.
  
      if (input.current.length === 0) {
        if (
          value === "/" ||
          value === "." ||
          value === "+" ||
          value === "-" ||
          value === "X" ||
          value === ")"
        ) return // STOP IF ATTEMPT ) FIRST
      }
  
      if (
        input.current.slice(-1) === ")" &&
        value === "("
      ) { scrollEnd(); return } // STOP IF ATTEMPT )(
  
      if (
        input.current.slice(-1) === ")" &&
        (!isNaN(parseInt(value)) || value === "N")
      ) { scrollEnd(); return } // STOP IF ATTEMPT )9 or )N
  
      if (
        !isNaN(parseInt(input.current.slice(-1))) && // last input is a number
        (value === "(" || value === "N")
      ) { scrollEnd(); return } // STOP IF ATTEMPT 9( or 9N
  
      if (
        input.current.slice(-1) === "N" && // N = negative value
        (value === "X" ||
        value === "/" ||
        value === "+" ||
        value === "-" ||
        value === "." ||
        value === "(" ||
        value === ")" ||
        value === "N")
      ) { scrollEnd(); return } // STOP IF ATTEMPT N+
  
      if (
        (input.current.slice(-3) === " x " ||
        input.current.slice(-3) === " / " ||
        input.current.slice(-3) === " + " ||
        input.current.slice(-3) === " - " ||
        input.current.slice(-1) === "(" ||
        input.current.slice(-1) === "N" ||
        input.current.length === 0) &&
        value === "="
      ) { scrollEnd(); return } // STOP IF ATTEMPT N= or += or ""=
  
      if (input.current.includes("Infinity") && value === "=") { input.current = "Infinity"; setSecInput(input.current); scrollEnd(); return } // STOP IF INPUT INCLUDES "INFINITY" & ATTEMPT "=" // TEST
  
      if (
        input.current.slice(-8) === "Infinity" &&
        (value === "(" ||
        value === "N" ||
        !isNaN(parseInt(value)) ||
        value === ".")
      ) { scrollEnd(); return } // STOP IF ATTEMPT Infinity( or InfinityN or Infinity9 or Infinity. // TEST
  
      /// -----------> END STOPPERS <----------- ///
  
      /// -----------> BEGIN CALC <----------- ///
  
      //if (value === "=") { Adder({ scrollEnd, input, setInput, setSecInput, setParErr }); return }
  
      /// -----------> END CALC <----------- ///
  
      /// -----------> BEGIN INPUT UPDATE <----------- ///
  
      if (value === "X") { setInput((prev: string) => prev + " x "); setSecInput("") } // set operator with spaces
      else if (value === "/") { setInput((prev: string) => prev + " / "); setSecInput("") } // set operator with spaces
      else if (value === "+") { setInput((prev: string) => prev + " + "); setSecInput("") } // set operator with spaces
      else if (value === "-") { setInput((prev: string) => prev + " - "); setSecInput("") } // set operator with spaces
      else { input.current = input.current + value; setSecInput("") }
  
      console.log("AAAAAAAAAAAAAA")
      //update(Math.random())
      update({})
      //else { setInput((prev: string) => prev + value); setSecInput("") }
  
      /// -----------> END INPUT UPDATE <----------- ///
    }

  /////////////////////////////////////////////////////////

  const PortButtons =
    portButtons.concat(lastButtonPort).map((e, i) =>
      <OwnButton
        key={i} value={e.value} size={e.size} margin={e.margin} 
        fontSize={OPCQH/1.5} small={e.small}
        handlePress={handlePress}
      />
    );

  const LandButtons =
    landButtons.concat(lastButtonLand).map((e, i) =>
      <OwnButton
        key={i} value={e.value} size={e.size} margin={e.margin}
         fontSize={OPCQH} state={state}
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
              children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 6 } ]} children={ input.current.replaceAll(/N/g,"-") } /> }
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
        children={ <Text style={[ s.mainResult, { fontSize: OPCQH * 9, lineHeight: OPCQH * 9.2 } ]} children={ input.current.replaceAll(/N/g,"-") } /> }
      />
      <View
        style={{ height: '30%' }}
        children={ parErr && <Text style={[ s.parErr, { fontSize: OPCQH * 5.5 } ]} children={'CHECK PARENTHESIS'} /> }
      />
    </>;

  const LandCalc =
    <View style={[ s.outline, { marginBottom: ins.bottom, marginTop: ins.top, /* marginRight: 100, marginLeft: ins.left */ } ]}>
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
      style={[ s.ModalForegroundScreen, { backgroundColor: 'orange',opacity: 0/* fadeAnim */, pointerEvents: showModal ? 'auto' : 'none' } ]}
      children={
        <Pressable
          style={[ s.ModalForegroundScreenPressable, {  paddingTop: ins.top, paddingBottom: ins.bottom } ]}
          onPress={() => {console.log('CLICKED Home');updateShowModal(false)}}
        />
      }
    />

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  let currIndex = useAnimatedValue(0);

  const [ c, sC ] = useState([[0, 0, 255], [255, 0, 255]]) // color, setColor

  let currentColor = currIndex.interpolate({
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
    // if (state === 'tabletop' && !aboutUp) nextColor(1)
    // else { currIndex.stopAnimation() }
    //currIndex.stopAnimation()
    //currIndex.stopAnimation()
    // !showCalc && aboutUp
    // if (state === 'tabletop' && showCalc) { //nextColor(1) // START COLORS
    //   sC([[0, 0, 255], [255, 0, 255]])
    //   nextColor(1) // START COLORS
    // } else {
    //   currIndex.stopAnimation()
    //   sC([[255, 255, 255], [255, 255, 255]])
    // }
    // if (state === 'tabletop' && showCalc) { //nextColor(1) // START COLORS
    //   sC([[0, 0, 255], [255, 0, 255]])
    //   nextColor(1) // START COLORS
    // } else {
    //   currIndex.stopAnimation()
    //   sC([[255, 255, 255], [255, 255, 255]])
    // }
    // (state === 'tabletop' && showCalc) ? qq : 'white'
  }, [state])

  //console.log("INS", ins)
  //console.log("HOME CONSOLE LOG")

  return (
    <View style={s.background}>
      {/* <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} /> */}
      {
        state === 'flat' ?

        PortCalc :

        state === 'tabletop' ?

        <View style={s.tabletopContainer}>
          <View /* UPPER SIDE */
            style={[ s.upperScreenTabletop, { height: hingeBounds.top, width: hingeBounds.right /* paddingRight: ins.right */ } ]}
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
            style={[ s.lowerScreenTabletop, { top: hingeBounds.bottom - hingeBounds.top, height: height - hingeBounds.bottom, width: hingeBounds.right, backgroundColor: (state === 'tabletop' && showCalc) ? currentColor : 'white' } ]}
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
