import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  Dimensions,
  InteractionManager,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { counterI } from '../../interfaces/interfaces';

function KnowMore({ navigation: { navigate } }: any): React.JSX.Element {

  const {height, width, scale, fontScale} = useWindowDimensions()

  //console.log("test HEIGHT", height, "test WIDTH", width)

  // useEffect(() => {
  //   console.log("test HEIGHT", height, "test WIDTH", width)
  // }, [width])

  let opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw
  let hph = Dimensions.get('window').height; // hundredPercentHeight = 100%vh
  let dH = Dimensions.get('screen').height; // deviceHeight
  let wH = Dimensions.get('window').height; // windowHeight

  let ins = useSafeAreaInsets(); // insets

  // useEffect(() => {
  //   console.log("INS", ins);
  //   console.log("window height", hph)
  //   console.log("device height", dH)
  // }, [])

  useEffect(() => {
    //console.log("INS", ins);
    console.log("window height", hph)
    console.log("device height", dH)
  }, [hph])

//   console.log("INS", ins);
//   console.log("window height", hph)
// console.log("device height", dH)

  let aB: number = (dH - ins.top) === wH ? 0 : ins.bottom // additionalBottom

  const scrollRef = useRef<any>();

  const onFabPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  }

  const [ counter, setCounter ] = useState<counterI>({ "0": 0, "1": 250, "2": 0 });
  const [ currIdx, setCurrIdx ] = useState(Math.floor(Math.random() * 3)); // CURRENT INDEX A // BETWEEN 0 AND 2
  const goUp: any = useRef({ "0": true, "1": false, "2": true });

  useEffect(() => {
    const interval = setInterval(() => {
      let newANum = () => setCurrIdx(Math.floor(Math.random() * 3)) // BETWEEN 0 AND 2

      if (counter[currIdx] > 250) { goUp.current[currIdx] = false; newANum() }
      else if (counter[currIdx] < 5) { goUp.current[currIdx] = true; newANum() }
      if (goUp.current[currIdx]) setCounter({ ...counter, [currIdx]: counter[currIdx] + 5 })
      else setCounter({ ...counter, [currIdx]: counter[currIdx] - 5 })
    }, 100);

    return () => clearInterval(interval);
  }, [counter, currIdx, goUp])

  let targetWidth = (opw * 95) - 40

  // let colors = [
  //   `rgba(${counter["0"]}, ${counter["1"]}, ${counter["2"]}, 0.9)`,
  //   `rgba(255, 255, 255, 0.9)`
  // ]

  let lazyLoad = [
    <View key={0} style={s.eachItem}>
      <Text style={s.leftItem}>
        -X
      </Text>
      <Text style={s.rightItem}>
        Negative number. Press it before your number.
      </Text>
    </View>,
    <View key={1} style={s.eachItem}>
      <Text style={s.leftItem}>
        ( )
      </Text>
      <Text style={s.rightItem}>
        Chain any amount of parenthesis and
        calculator will parse the result,
        following the next rules:{"\n"}
        <View style={[s.eachItemInner,{ width: targetWidth }]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            Innermost parentheses calc will be done.
          </Text>
        </View>
        <View style={[s.eachItemInner,{ width: targetWidth }]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            Inside that parentheses, or if not present, will do the next,
            from left to right, in this order:
            All 'x', then all '/', then all '+' and finally all '-'.
          </Text>
        </View>
      </Text>
      <Text style={s.rightItem}>
        Then will quit that parenthesis, if exists,
        and do the same as above.
      </Text>
    </View>,
    <View key={2} style={s.eachItem}>
      <Text style={[s.leftItem, s.sn]}>
        1e+12
      </Text>
      <Text style={s.rightItem}>
        If the integer side, in the result,
        is more than 12 digits (e.g.: 1000000000001.23 + 1.23),
        it will be converted to scientific notation.{"\n"}
        Results in scientific notation are parsed as follows:
        <View style={[s.eachItemInner,{ width: targetWidth }]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If exponent have 1 digits, decimal part are 8 places.
          </Text>
        </View>
        <View style={[s.eachItemInner,{ width: targetWidth }]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If exponent have 2 digits, decimal part are 7 places. And so..
          </Text>
        </View>
        <View style={[s.eachItemInner,{ width: targetWidth }]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If decimal part have trailing zeros, they will be removed.
          </Text>
        </View>
      </Text>
    </View>,
    <View key={3} style={s.eachItem}>
      <FontAwesome5
        name='infinity'
        size={30}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem}>
        Numbers largers than 1.797693e+307 (positive or negative)
        are treated as Infinity. After that,
        every calc will output Infinity, or -Infinity, as applicable.
      </Text>
    </View>,
    <View key={4} style={s.eachItem}>
      <Entypo
        name='new'
        size={30}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem}>
        All new input characters are placed to the right.
      </Text>
    </View>,
    <View key={5} style={s.eachItem}>
      <Ionicons
        name='backspace'
        size={40}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem}>
        Erase the last character.
      </Text>
    </View>,
    <View key={6} style={s.eachItem}>
      <Text style={s.leftItem}>
        C
      </Text>
      <Text style={s.rightItem}>
        Delete the entire input.
      </Text>
    </View>,
    <View key={7} style={s.eachItem}>
      <Text style={[s.leftItem, s.dot]}>
        .
      </Text>
      <Text style={s.rightItem}>
        Decimal numbers can have up to two digits maximum.
        But decimal results can be more than 2 digits long !
      </Text>
    </View>,
    <View key={8} style={s.eachItem}>
      <Text style={s.leftItem}>
        =
      </Text>
      <Text style={s.rightItem}>
        If there is no calc to do ('x', '/', '+' or '-')
        '=' will not work.{"\n"}
        If calc is valid, result will be shown and,
        in a smaller upper place, the current calc will be shown.{"\n"}
        If result or current calc is larger than screen,
        you can scroll to see entire result/calc.
      </Text>
    </View>,
    <View key={9} style={[s.eachItem, { marginBottom: aB + 20 } ]}>
      <MaterialIcons
        name='phonelink-erase'
        size={30}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem}>
        This App does not have access to your device.
      </Text>
    </View>
  ]

  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>  setLoaded(true));
    return () => interactionPromise.cancel();
  }, []);

  function handleScroll (event: any) {
    event.nativeEvent.contentOffset.y > 100 ? setShowButton(true) : setShowButton(false)
  }

  const [ showButton, setShowButton ] = useState(false)

  let colorVariables = `${counter["0"]}, ${counter["1"]}, ${counter["2"]}`
  let colorVariables2 = `${counter["0"]*2}, ${counter["1"]*2}, ${counter["2"]*2}`

  return (
    <View style={{ height: '100%' }}>
      <LinearGradient
        colors={[ `rgba(${colorVariables}, 0.7)`, `rgba(255, 255, 255, 1)` ]}
        style={s.linearGradient}
        start={{ x: 0, y: 1}} //  x0__x1/y0
        end={{x: 1, y: 0}}    //      |y1
      >
        <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
        {/* <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'rgba(255,255,255,0.3)'} /> */}
      </LinearGradient>
      
      <LinearGradient
        colors={[ `rgba(${colorVariables}, 0.9)`, `rgba(255, 255, 255, 0.9)` ]}
        //colors={[ `rgba(255, 255, 255, 0.9)`, `rgba(${colorVariables}, 0.9)`  ]}
        //style={[ s.linearGradientStatus, { height: ins.top } ]}
        //style={[ s.linearGradientStatus, { height: dH, top: (-dH + ins.top) } ]}
        style={[ s.linearGradientStatus, { height: ins.top, /* height: 24, width: '100%', */ /* flex: 1, */ /* position: 'absolute', */ /* , top: dH */  }]}
        //FractionalOffset={false}
        //start={{ x: 0, y: (hph / (ins.top / 2)) - ins.top }} // x = from left // y = from top
        //start={{ x: 0, y: 30 }} // x = from left // y = from top
        //start={{ x: 0, y: 32.6 }} // x = from left // y = from top
        //start={{ x: 0, y: (hph / ins.top)*2 }} // x = from left // y = from top
        //start={{ x: 0, y: (392.72 / ins.top)*2 }} // x = from left // y = from top
        //start={{ x: 0, y: 29.5 }} // x = from left // y = from top
        //start={{ x: 0, y: 29 }} // x = from left // y = from top
        //start={{ x: 0, y: 29.5 }} // x = from left // y = from top
        //start={{ x: 0, y: 28.66 }} // x = from left // y = from top
        //((392 - (24 * 2)) / 24) * 2
        //start={{ x: 0, y: ((hph - (ins.top * 2)) / ins.top) * 2 }} // x = from left // y = from top
        //start={{ x: 0, y: (hph / (ins.top / 2)) - ins.top }} // VERTICAL
        //start={{ x: 0, y: 39.25 }} // x = from left // y = from top
        //start={{ x: 0, y: 1 }} // x = from left // y = from top
        //end={{ x: 1, y: 0 }} // x = from left // y = from bottom
        //start={{ x: 0, y: 1 }} // x = from left // y = from top
        //start={{ x: 0, y: 40 }} // x = from left // y = from top
        //start={{ x: 0, y: 30 }} // x = from left // y = from top
        //start={{ x: 0, y: 60 }} // x = from left // y = from top
        //start={{ x: 0, y: 40 }} // x = from left // y = from top
        //locations={[0, 0.1]}
        start={{ x: 0, y: 1 }} // x = from left // y = from top
        end={{ x: 1, y: 0 }} // x = from left // y = from bottom
        //offset="100%"
      />

      <ScrollView ref={scrollRef} onScroll={handleScroll}>
        <View style={s.background}>

          <View style={s.buttonContainer}>
            <Ionicons.Button
              name='chevron-back-circle-sharp'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigate('About')}
            >
              <Text style={s.textInButton}>BACK</Text>
            </Ionicons.Button>
            <View style={s.space} />
            <Ionicons.Button
              name='home'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigate('Home')}
            >
              <Text style={s.textInButton}>HOME</Text>
            </Ionicons.Button>
          </View>

          <Text style={s.centerText}>
            Welcome to my very first{"\n"}
            Android App: A Classic Calculator !
          </Text>

          <Text style={s.leftText}>
            Below I will give you some tips if you have any doubt:
          </Text>

          { loaded ? lazyLoad.map(e => e) : <ActivityIndicator size="large" color="#2196F3"/> }

        </View>
      </ScrollView>

      {
        showButton &&
        <Pressable
          style={[s.floatButton,{ bottom: aB + 10 }]}
          onPress={() => onFabPress()}
        >
          <Text style={s.floatButtonText}> UP </Text>
        </Pressable>
      }
    </View>
  );
}

export default KnowMore;