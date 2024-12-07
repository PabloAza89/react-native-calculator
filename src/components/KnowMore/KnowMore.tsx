import { ReactElement, useState, useEffect, useRef, MutableRefObject } from 'react';
import {
  Text, View, StatusBar, ScrollView,
  Pressable, InteractionManager, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';

//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
const KnowMore = ({ navigation: { navigate }, opw, port, height, buttonOne, buttonTwo }: any): ReactElement => {

  //const  { navigate } navigation

  let ins = useSafeAreaInsets(); // insets

  const scrollRef = useRef<ScrollView>(null);

  const onFabPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true
    });
  }

  const [ counter, setCounter ] = useState<counterI>({ "0": 0, "1": 250, "2": 0 });
  const [ currIdx, setCurrIdx ] = useState(Math.floor(Math.random() * 3)); // CURRENT INDEX A // BETWEEN 0 AND 2
  const goUp: MutableRefObject<goUpI> = useRef({ "0": true, "1": false, "2": true });

  useEffect(() => {
    const interval = setInterval(() => {
      let newANum = () => setCurrIdx(Math.floor(Math.random() * 3)) // BETWEEN 0 AND 2

      if (counter[currIdx] > 250) { goUp.current[currIdx.toString() as keyof goUpI] = false; newANum() }
      else if (counter[currIdx] < 5) { goUp.current[currIdx.toString() as keyof goUpI] = true; newANum() }
      if (goUp.current[currIdx.toString() as keyof goUpI]) setCounter({ ...counter, [currIdx]: counter[currIdx] + 5 })
      else setCounter({ ...counter, [currIdx]: counter[currIdx] - 5 })
    }, 100);

    return () => clearInterval(interval);
  }, [counter, currIdx, goUp])

  let targetWidth = (opw * 95) - 40

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
      <View>
        <Text style={s.rightItem}>
          Chain any amount of parenthesis and
          calculator will parse the result,
          following the next rules:
        </Text>
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            Innermost parentheses calc will be done.
          </Text>
        </View>
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            Inside that parentheses, or if not present, will do the next,
            from left to right, in this order:
            All 'x', then all '/', then all '+' and finally all '-'.
          </Text>
        </View>
      </View>
      <Text style={s.rightItem}>
        Then will quit that parenthesis, if exists,
        and do the same as above.
      </Text>
    </View>,
    <View key={2} style={s.eachItem}>
      <Text style={[ s.leftItem, s.sn ]}>
        1e+12
      </Text>
      <View>
        <Text style={s.rightItem}>
          If the integer side, in the result,
          is more than 12 digits (e.g.: 1000000000001.23 + 1.23),
          it will be converted to scientific notation.{"\n"}
          Results in scientific notation are parsed as follows:
        </Text>
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If exponent have 1 digits, decimal part are 8 places.
          </Text>
        </View>
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If exponent have 2 digits, decimal part are 7 places. And so..
          </Text>
        </View>
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner}>
            •
          </Text>
          <Text style={s.rightItemInner}>
            If decimal part have trailing zeros, they will be removed.
          </Text>
        </View>
      </View>
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
      <Text style={[ s.leftItem, s.dot ]}>
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
    <View key={9} style={[ s.eachItem, { marginBottom: ins.bottom + 20 } ]}>
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

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    event.nativeEvent.contentOffset.y > 100 ? setShowButton(true) : setShowButton(false)
  }

  const [ showButton, setShowButton ] = useState(false)

  let colorVariables = `${counter["0"]}, ${counter["1"]}, ${counter["2"]}`

  //console.log("INS TOP", ins.top)

  return (
    <View style={{ height: '100%', width: '100%' }}>

      <LinearGradient
        colors={[ `rgba(${colorVariables}, 1)`, `rgba(255, 255, 255, 1)` ]}
        style={[ s.linearGradient, { height: '100%', width: '100%' } ]}
        start={[ 0, 1 ]} // left, top
        end={[ 1, 0 ]}   // left, bottom
        children={ <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} /> }
      />
      <LinearGradient
        colors={[ `rgba(${colorVariables}, 1)`, `rgba(255, 255, 255, 1)` ]}
        style={[ s.linearGradient, { height: ins.top, width: '100%', zIndex: 4, opacity: 0.85 }]}
        start={[ 0, height / ins.top ]} // left, top
        end={[ 1, 0 ]}      // left, bottom
      />

      <ScrollView ref={scrollRef} onScroll={handleScroll}>
        <View style={[ s.background, { /* width: opw * 100, */width: '100%', marginLeft: ins.left } ]}>

          <View style={s.buttonContainer}>

            {

              buttonOne !== undefined ?

              <MaterialCommunityIcons.Button
                name='swap-horizontal-bold'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('About')}
                style={{ flex: 1 }}
                children={ <Text style={s.textInButton}>SWITCH{"\n"}SCREENS</Text> }
              /> :

              <Ionicons.Button
                name='chevron-back-circle-sharp'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('About')}
                style={{ flex: 1 }}
                children={ <Text style={s.textInButton}>BACK</Text> }
              />

            }

            

            <View style={s.space} />

            {
              buttonTwo !== undefined ?
              <SimpleLineIcons.Button
                name='question'
                size={25}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('Home')}
                style={{ flex: 1 }}
                children={ <Text style={s.textInButton}>ABOUT</Text> }
              /> :
              <Ionicons.Button
                name='home'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('Home')}
                style={{ flex: 1 }}
                children={ <Text style={s.textInButton}>HOME</Text> }
              />
            }

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
          style={[ s.floatButton, { bottom: ins.bottom + 10, right: ins.right + 10 } ]}
          onPress={() => onFabPress()}
          children={ <Text style={s.floatButtonText} children={'UP'} /> }
        />
      }
    </View>
  );
}

export default KnowMore;