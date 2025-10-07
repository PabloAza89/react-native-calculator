import { ReactElement, useState, useEffect, useRef } from 'react';
import {
  View, StatusBar, ScrollView, Pressable, InteractionManager, ActivityIndicator,
  NativeSyntheticEvent, NativeScrollEvent, Animated, useAnimatedValue,
  UIManager, findNodeHandle, Platform,
  //ReactScrollView
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../utils/Text';
import { scrollBarSize, iconColor } from '../../utils/constants';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';

import CustomScrollView from './CustomScrollView';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds, ins }: any): ReactElement => {

  const { navigate } = navigation;

  //console.log("SBZ", sbz)

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'KnowMore' && (state === 'tabletop' || state === 'book')) && navigate('Home', { lastRoute: 'KnowMore' })
  }, [state])

  //let ins = useSafeAreaInsets(); // insets

  //const scrollRef = useRef<ScrollView>(null);

  //const goUp = () => scrollRef.current?.scrollTo({ y: 0, animated: true });

  const goUp = () => UIManager.dispatchViewManagerCommand(viewId, 0)

  // console.log("ins.left", ins.left)
  // console.log("ins.top", ins.top)
  // console.log("ins.right", ins.right)
  // console.log("ins.bottom", ins.bottom)
  

  let lazyLoad = [
    <View key={0} style={[ s.eachItem, { backgroundColor: 'red', /* top: -40 */ } ]}>
      <Text style={s.leftItem} children={'-X'} />
      <Text style={s.rightItem} children={'TEXT ONE. Press it before your number.'} />
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
    <View key={8} style={[ s.eachItem, { backgroundColor: 'green', /* paddingBottom: 24 * -4 */ } ]}>
      <Text style={s.leftItem} children={'='} />
      <Text style={s.rightItem} children={`LAST TEXT ('x', '/', '+' or '-') '=' will not work.\nIf calc is valid, result will be shown and, in a smaller upper place, the current calc will be shown.\nIf result or current calc is larger than screen, you can scroll to see entire result/calc.`} />
    </View>
  ]

  const [ loaded, setLoaded ] = useState(false)

  useEffect(() => {
    const interactionPromise = InteractionManager.runAfterInteractions(() =>  setLoaded(true));
    return () => interactionPromise.cancel();
  }, []);

  const [ showButton, setShowButton ] = useState(false)

  /// BEGIN BACKGROUND ANIMATION ///

  const parsedInsTop = ins.top === 0 ? 1 : ins.top // PREVENT NaN WHEN RENDER (on native side)
  const parsedHeight = height === 0 ? 1 : height // PREVENT NaN WHEN RENDER (on native side)
  const topByHeight = ins.top / parsedHeight

  let currIndex = useAnimatedValue(0);

  const [ c, sC ] = useState([[0, 0, 255], [255, 0, 255]]) // color, setColor

  let currentColor = currIndex.interpolate({
    inputRange: [0, 1],
    outputRange: [`rgb(${c[0][0]}, ${c[0][1]}, ${c[0][2]})`, `rgb(${c[1][0]}, ${c[1][1]}, ${c[1][2]})`]
  });

  const linearGradientColors = [ 'rgba(0, 0, 0, 0)', 'rgb(255, 255, 255)' ]

  console.log(`Android:${Platform.Version} INS BOTTOM`, ins.bottom)

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

  /// END BACKGROUND ANIMATION ///

  /// BEGIN CUSTOMSCROLLVIEW ///

  const scrollRef = useRef<ScrollView>(null);

  const [ viewId, setViewId ] = useState<number | null>(0)

  useEffect(() => setViewId(findNodeHandle(scrollRef.current)), [])

  const scrollHandler = (val: number) => {
    val > 100 ? setShowButton(true) : setShowButton(false);
    val < 0 && UIManager.dispatchViewManagerCommand(viewId, 0);
  }

  // const setDimensions = (nativeRef, width, height) => {
  //   const reactTag = findNodeHandle(nativeRef);
  //   UIManager.dispatchViewManagerCommand(
  //     reactTag,
  //     'setDimensions',
  //     [width, height]
  //   );
  // };


  return (      // testing paddingBottom: ins.bottom
    <CustomScrollView
      scrollRef={scrollRef}
      onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => scrollHandler(e.nativeEvent.contentOffset.y)}
      persistentScrollbar={true}
      scrollbarPadding={{
        left: ins.left * 1,
        top: ins.top * 1,
        right: ins.right * 1,
        bottom: ins.bottom * 1,
      }}
      contentContainerStyle={{
        paddingLeft: ins.left * 1,
        paddingTop: ins.top * 1,
        paddingRight: ins.right * 1,
        paddingBottom: ins.bottom * 1,
      }}
      style={{
        backgroundColor: 'lightblue',
        width: '100%', // ***
        height: '100%', // ***
        //overflow: 'visible',
      }}
    >
      <View style={[ s.background, {
          backgroundColor: 'yellow',
          //overflow: 'visible',
        }]}
      >
        {  lazyLoad.map(e => e) }
      </View>
    </CustomScrollView>
  );
}

export default KnowMore;