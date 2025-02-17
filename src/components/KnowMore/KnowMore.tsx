import { ReactElement, useState, useEffect, useRef } from 'react';
import {
  View, StatusBar, ScrollView, Pressable, InteractionManager, ActivityIndicator,
  NativeSyntheticEvent, NativeScrollEvent, Animated, useAnimatedValue
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../utils/Text';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';

//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds }: any): ReactElement => {

  const { navigate } = navigation;

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'KnowMore' && (state === 'tabletop' || state === 'book')) && navigate('Home', { lastRoute: 'KnowMore' })
  }, [state])

  let ins = useSafeAreaInsets(); // insets

  const scrollRef = useRef<ScrollView>(null);

  const onFabPress = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

  const iconColor = 'rgba(0, 0, 0, .7)'

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
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If exponent have 1 digits, decimal part are 8 places.'} />
        </View>
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If exponent have 2 digits, decimal part are 7 places. And so..'} />
        </View>
        <View style={s.eachItemInner}>
          <Text style={s.leftItemInner} children={'•'} />
          <Text style={s.rightItemInner} children={'If decimal part have trailing zeros, they will be removed.'} />
        </View>
      </View>
    </View>,
    <View key={3} style={s.eachItem}>
      <FontAwesome5
        name='infinity'
        size={30}
        color={iconColor}
        style={s.leftItem}
      />
      <Text style={s.rightItem} children={'Numbers largers than 1.797693e+307 (positive or negative) are treated as Infinity. After that, every calc will output Infinity, or -Infinity, as applicable.'} />
    </View>,
    <View key={4} style={s.eachItem}>
      <Entypo
        name='new'
        size={30}
        color={iconColor}
        style={s.leftItem}
      />
      <Text style={s.rightItem} children={'All new input characters are placed to the right.'} />
    </View>,
    <View key={5} style={s.eachItem}>
      <Ionicons
        name='backspace'
        size={40}
        color={iconColor}
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
    <View
      key={9}
      style={[ s.eachItem, {
        marginBottom: (state === 'tabletop' && !aboutUp) ? 20 : ins.bottom + 20
      } ]}
    >
      <MaterialIcons
        name='phonelink-erase'
        size={30}
        color={iconColor}
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

  const parsedInsTop = ins.top === 0 ? 1 : ins.top // PREVENT NaN WHEN RENDER (on native side)

  let currIndex = useAnimatedValue(0);

  const [ c, sC ] = useState([[0, 0, 255], [255, 0, 255]]) // color, setColor

  let currentColor = currIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [`rgb(${c[0][0]}, ${c[0][1]}, ${c[0][2]})`, `rgb(${c[1][0]}, ${c[1][1]}, ${c[1][2]})`]
  });

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
    nextColor(1)
    return () => currIndex.stopAnimation()
  }, [])

  console.log("HEIGHT", height)
  console.log("INS.TOP", ins.top)
  console.log("INS.BOTTOM", ins.bottom)

  const topByHeight = ins.top / height
  const linearGradientColors = [ 'rgba(0, 0, 0, 0)', 'rgba(255, 255, 255, 1)' ]

  return (
    <View style={s.mainContainer}>

      {
        !(state === 'tabletop' && aboutUp) &&
        <Animated.View
          style={[ s.linearGradientWrapper, { backgroundColor: currentColor, height: ins.top, zIndex: 4 } ]}
          children={
            <LinearGradient
              colors={linearGradientColors}
              style={s.linearGradient}
              start={[ 0, state === 'tabletop' ?  hingeBounds.top / parsedInsTop : height / parsedInsTop ]} // left, top
              end={[ 1, 0 ]}                  // left, top
            />
          }
        />
      }

      <Animated.View
        style={[ s.linearGradientWrapper, { backgroundColor: currentColor, height: '100%', top: (state === 'tabletop' && aboutUp) ? 0 : ins.top } ]}
        children={
          <LinearGradient
            colors={linearGradientColors}
            style={s.linearGradient}
            start={[ 0, 1 - topByHeight ]} // left, top
            end={[ 1, topByHeight * -1 ]}  // left, top
            children={ <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} /> }
          />
        }
      />

      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        persistentScrollbar={true}
        children={
          <View style={[ s.background, { width: '100%', marginLeft: ins.left, paddingRight: ins.right } ]}>

            <View style={[ s.buttonContainer, { marginTop: ins.top + 7 } ]}>

              {
                twoScreens ?
                <MaterialCommunityIcons.Button
                  name={ state === 'tabletop' ? 'swap-vertical-bold' : 'swap-horizontal-bold' }
                  size={30}
                  color={iconColor}
                  onPress={() => switchSide()}
                  children={ <Text style={s.textInButton} children={'SWITCH\nSCREENS'} /> }
                /> :
                <Ionicons.Button
                  name='chevron-back-circle-sharp'
                  size={30}
                  color={iconColor}
                  onPress={() => navigate('About')}
                  children={ <Text style={s.textInButton} children={'BACK'} /> }
                />
              }

              <View style={s.space} />

              {
                twoScreens && state === 'tabletop' ?
                <Ionicons.Button
                  name='calculator-sharp'
                  size={30}
                  color={iconColor}
                  onPress={() => nextScreen()}
                  children={ <Text style={s.textInButton} children={'HOME'} /> }
                /> :
                twoScreens ?
                <SimpleLineIcons.Button
                  name='question'
                  size={25}
                  color={iconColor}
                  onPress={() => nextScreen()}
                  style={{ flex: 1 }}
                  children={ <Text style={s.textInButton} children={'ABOUT'} /> }
                /> :
                <Ionicons.Button
                  name='home'
                  size={30}
                  color={iconColor}
                  onPress={() => navigate('Home')}
                  children={ <Text style={s.textInButton} children={'HOME'} /> }
                />
              }

            </View>

            <Text style={s.centerText} children={'Welcome to my very first\nAndroid App: A Classic Calculator !'} />
            <Text style={s.leftText} children={'Below I will give you some tips if you have any doubt:'} />

            { loaded ? lazyLoad.map(e => e) : <ActivityIndicator size="large" color="#2196F3" /> }

          </View>
        }
      />

      {
        showButton &&
        <Pressable
          style={[ s.floatButton, {
            bottom: (state === 'tabletop' && !aboutUp) ? 10 : ins.bottom + 10,
            right: 10 + ins.right
          } ]}
          onPress={() => onFabPress()}
          children={ <Text style={s.floatButtonText} children={'UP'} /> }
        />
      }
    </View>
  );
}

export default KnowMore;