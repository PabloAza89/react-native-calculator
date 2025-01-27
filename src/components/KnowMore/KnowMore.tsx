import { ReactElement, useState, useEffect, useRef, MutableRefObject } from 'react';
import {
  Text, View, StatusBar, ScrollView, Pressable,
  InteractionManager, ActivityIndicator, NativeSyntheticEvent, NativeScrollEvent
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';

//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
const KnowMore = ({ navigation, opw, height, state, switchSide, twoScreens, nextScreen }: any): ReactElement => {

  const { navigate } = navigation;

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'KnowMore' && state === 'book') && navigate('Home', { lastRoute: 'KnowMore' })
  }, [state])

  let ins = useSafeAreaInsets(); // insets

  const scrollRef = useRef<ScrollView>(null);

  const onFabPress = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

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
      <Text style={s.leftItem} children={'-X'} />
      <Text style={s.rightItem} children={'Negative number. Press it before your number.'} />
    </View>,
    <View key={1} style={s.eachItem}>
      <Text style={s.leftItem} children={'( )'}/>
      <View>
        <Text style={s.rightItem} children={'Chain any amount of parenthesis and calculator will parse the result, following the next rules:'} />
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'Innermost parentheses calc will be done.'} />
        </View>
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={`Inside that parentheses, or if not present, will do the next, from left to right, in this order: All 'x', then all '/', then all '+' and finally all '-'.`} />
        </View>
      </View>
      <Text style={s.rightItem} children={'Then will quit that parenthesis, if exists, and do the same as above.'} />
    </View>,
    <View key={2} style={s.eachItem}>
      <Text style={[ s.leftItem, s.sn ]} children={'1e+12'} />
      <View>
        <Text style={s.rightItem} children={'If the integer side, in the result, is more than 12 digits (e.g.: 1000000000001.23 + 1.23), it will be converted to scientific notation.\nResults in scientific notation are parsed as follows:'} />
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If exponent have 1 digits, decimal part are 8 places.'} />
        </View>
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If exponent have 2 digits, decimal part are 7 places. And so..'} />
        </View>
        <View style={[ s.eachItemInner, { width: targetWidth } ]}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If decimal part have trailing zeros, they will be removed.'} />
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
      <Text style={s.rightItem} children={'Numbers largers than 1.797693e+307 (positive or negative) are treated as Infinity. After that, every calc will output Infinity, or -Infinity, as applicable.'} />
    </View>,
    <View key={4} style={s.eachItem}>
      <Entypo
        name='new'
        size={30}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem} children={'All new input characters are placed to the right.'} />
    </View>,
    <View key={5} style={s.eachItem}>
      <Ionicons
        name='backspace'
        size={40}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem} children={'Erase the last character.'} />
    </View>,
    <View key={6} style={s.eachItem}>
      <Text style={s.leftItem} children={'C'} />
      <Text style={s.rightItem} children={'Delete the entire input.'} />
    </View>,
    <View key={7} style={s.eachItem}>
      <Text style={[ s.leftItem, s.dot ]} children={'.'} />
      <Text style={s.rightItem} children={'Decimal numbers can have up to two digits maximum. But decimal results can be more than 2 digits long !'} />
    </View>,
    <View key={8} style={s.eachItem}>
      <Text style={s.leftItem} children={'='} />
      <Text style={s.rightItem} children={`If there is no calc to do ('x', '/', '+' or '-') '=' will not work.\nIf calc is valid, result will be shown and, in a smaller upper place, the current calc will be shown.\nIf result or current calc is larger than screen, you can scroll to see entire result/calc.`} />
    </View>,
    <View key={9} style={[ s.eachItem, { marginBottom: ins.bottom + 20 } ]}>
      <MaterialIcons
        name='phonelink-erase'
        size={30}
        color='rgba(0, 0, 0, .7)'
        style={s.leftItem}
      />
      <Text style={s.rightItem} children={'This App does not have access to your device.'} />
    </View>
  ]

  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>  setLoaded(true));
    return () => interactionPromise.cancel();
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => e.nativeEvent.contentOffset.y > 100 ? setShowButton(true) : setShowButton(false)

  const [ showButton, setShowButton ] = useState(false)

  let colorVariables = `${counter["0"]}, ${counter["1"]}, ${counter["2"]}`

  return (
    <View style={{ height: '100%', width: '100%' }}>

      <LinearGradient
        colors={[ `rgba(${colorVariables}, 1)`, 'rgba(255, 255, 255, 1)' ]}
        style={[ s.linearGradient, { height: '100%', width: '100%' } ]}
        start={[ 0, 1 ]} // left, top
        end={[ 1, 0 ]}   // left, top
        children={ <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} /> }
      />
      <LinearGradient
        colors={[ `rgba(${colorVariables}, 1)`, 'rgba(255, 255, 255, 1)' ]}
        style={[ s.linearGradient, { height: ins.top, width: '100%', zIndex: 4, opacity: 0.85 }]}
        start={[ 0, height / ins.top ]} // left, top
        end={[ 1, 0 ]}                  // left, top
      />

      <ScrollView ref={scrollRef} onScroll={handleScroll} persistentScrollbar={true}>
        <View style={[ s.background, { width: '100%', marginLeft: ins.left } ]}>

          <View style={s.buttonContainer}>

            {
              twoScreens ?
              <MaterialCommunityIcons.Button
                name='swap-horizontal-bold'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => switchSide()}
                children={ <Text style={s.textInButton} children={'SWITCH\nSCREENS'} /> }
              /> :
              <Ionicons.Button
                name='chevron-back-circle-sharp'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('About')}
                children={ <Text style={s.textInButton} children={'BACK'} /> }
              />
            }

            <View style={s.space} />

            {
              twoScreens ?
              <SimpleLineIcons.Button
                name='question'
                size={25}
                color='rgba(0, 0, 0, .7)'
                onPress={() => nextScreen()}
                style={{ flex: 1 }}
                children={ <Text style={s.textInButton} children={'ABOUT'} /> }
              /> :
              <Ionicons.Button
                name='home'
                size={30}
                color='rgba(0, 0, 0, .7)'
                onPress={() => navigate('Home')}
                children={ <Text style={s.textInButton} children={'HOME'} /> }
              />
            }

          </View>

          <Text style={s.centerText} children={'Welcome to my very first\nAndroid App: A Classic Calculator !'} />
          <Text style={s.leftText} children={'Below I will give you some tips if you have any doubt:'} />

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