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

     
        <View style={{
          overflow: 'visible',
          //height: '100%',
          //paddingTop: 24 * 4,
          //paddingBottom: 24 * 4,
          //bottom: 24 * -2,
          //marginTop: 24 * 1, // former
          //marginBottom: 24 * 3,
          //marginBottom: 84, // former
          //height: '109%',
          //width: 390,
          //height: 800,
          //width: '80%',
          //height: '100%',
          //flex: 1,
          }}
        //   onLayout={(event) => {
        //   const { width, height } = event.nativeEvent.layout;
        //   // Call the native command with the calculated dimensions
        //   //setDimensions(scrollRef, width, height);
        //   setDimensions(scrollRef, 400, 800);
        // }}
        >
          <CustomScrollView
            //CustomScrollView
            scrollRef={scrollRef}
            //scrollToOverflowEnabled={true}
            //onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => scrollHandler(e.nativeEvent.contentOffset.y)}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
              scrollHandler(e.nativeEvent.contentOffset.y)
              //console.log("nativeEvent", e.nativeEvent)
            }}
            persistentScrollbar={true}
            //showsVerticalScrollIndicator={false}
            //showsHorizontalScrollIndicator={false}
            //paddingTop={30}
            //paddingBottom={30}
            //padding={30}
            //AAA={22}
            //BBB={33}
            // scrollbarPaddingTop={ins.top}
            // scrollbarPaddingBottom={ins.bottom}
            //scrollbarPaddingBottom={24*1}
            //scrollbarPaddingTop={[24*1, 24*2]}
            //scrollbarPaddingTop="24*1, 24*2"
            //scrollbarPaddingTop={['apple', 'banana', 'orange']}
            //scrollbarPaddingTop={[0, 24, 0, 48]}
            //scrollbarPaddingTop={[ins.left, ins.top, ins.right, ins.bottom]}
            //scrollbarPadding={[ins.left * 0, ins.top * 1, ins.right * 0, ins.bottom * 1]}
            //nestedScrollEnabled={true}
            //onMomentumScrollBegin={() => console.log("AAAAAAAAAAAAAAAAAAAAAA")}
            //onMomentumScrollEnd={() => console.log("AAAAAAAAAAAAAAAAAAAAAA")}
            //onScroll={() => console.log("WWWWWWWWWWWWWWWWWWWWWWWWWWW")}
            //pagingEnabled={true}
            //removeClippedSubviews={true}
            //scrollEnabled={false}
            //snapToAlignment='center'
            //snapToEnd={true}
            //snapToOffsets={[50, 100]}
            //contentOffset={{x:0, y:500}}
            //endFillColor={'red'}
            //fadingEdgeLength={{start: -100, end: -500}}
            //invertStickyHeaders={true}
            // onContentSizeChange={(contentWidth, contentHeight) => {
            //  console.log("contentWidth", contentWidth, "contentHeight", contentHeight)
            // }}
            //
            //
            //scrollbarPadding={[ins.left * 1, ins.top * 1, ins.right * 1, ins.bottom * 1]}
            //scrollbarPadding={[0.0, 12.0, 0.0, 48.0]}
            scrollbarPadding={{
              left: ins.left * 1,
              top: ins.top * 1,
              right: ins.right * 1,
              bottom: ins.bottom * 1,
            }}
            //scrollbarPadding={[ins.left * 0, ins.top * 0, ins.right * 0, ins.bottom * 0]}
            //scrollbarPadding={[ins.left * 0, ins.top * 0, ins.right * 0, ins.bottom * 0]}
            //scrollbarAAA={[24 * 0, 24 * 0, 24 * 0, 24 * 0]}
            //shouldRedraw={true}
            contentContainerStyle={{
              paddingLeft: ins.left,
              paddingTop: ins.top*1,
              paddingRight: ins.right,
              paddingBottom: ins.bottom * 1,
              //paddingLeft: ins.left,
              //paddingTop: 24,
              //marginTop: 28,
              //marginBottom: 48,
              //paddingBottom: 48,
              //paddingVertical: 50,
              //overflow: 'visible',
              //position: 'absolute',
              //top: 24 * 10,
              //marginTop: 24 * 10,
              //marginTop: 24 * -1,
              //bottom: 24 * -3,
              //height: '180%',
              //top: 24 * -1,
              //paddingVertical: 50,
              //marginBottom: 50,
              //marginTop: 24 * -5,
              //paddingBottom: 50,
              //top: -50,
              // paddingTop: 50,
              // paddingBottom: 50,
              //overflow: 'visible',
              //top: 24 * -5, // test 33
              //paddingTop: 24 * 5, // test 33
            }}
            //overflowInset={[0, 100, 0, 100]}
            //customWidth={400} customHeight={800}
            // ApaddingLeft={ins.left}
            // ApaddingTop={ins.top}
            // ApaddingRight={ins.right}
            // ApaddingBottom={ins.bottom}
            style={{
              backgroundColor: 'lightblue',
              width: '100%', // ***
              height: '100%', // ***
              // paddingLeft: ins.left,
              // paddingTop: ins.top,
              // paddingRight: ins.right,
              // paddingBottom: ins.bottom,
              //width: 400,
              //height: 800,
              // paddingLeft: ins.left * 1,
              //paddingTop: ins.top * 1,
              //paddingTop: 48,
              //paddingBottom: 48,
              //marginBottom: -48,
              // paddingRight: ins.right * 1,
              //paddingBottom: ins.bottom * 2,
              //paddingBottom: -100, // former
              //paddingTop: 24,
              //marginTop: 24 * 3, //
              //marginBottom: 24 * 3, //
              //top: -50,
              //bottom: -50,
              //marginTop: -50,
              //marginBottom: 24 * 2,
              //top: 24 * -1,
              //marginBottom: -50,
              //display: 'flex',
              //flexDirection: 'column',
              //flex: 1,
              //flexDirection: 'row',
              //paddingTop: (state === 'tabletop' && aboutUp) ? 0 : ins.top,
              //padding: ins.top * 1,
              // paddingLeft: ins.left * 1,
              //marginTop: ins.top * 1, // test 11
              // paddingRight: ins.right * 1,
              //bottom: ins.bottom + ins.top,
              //marginBottom: 24 * -4,
              //bottom: 24 * -4,
              //bottom: 24 * 2,
              //top: ins.top * 0,
              // paddingLeft: ins.left * 1,
              // paddingTop: ins.top * 1,
              // paddingRight: ins.right * 1,
              // paddingBottom: ins.bottom * 1,
              //top: ins.bottom * -1,
              //bottom: ins.bottom * -1,
              //bottom: -48,
              //top: ins.top * -1,
              //bottom: ins.bottom * -4,
              //paddingLeft: ins.top * 1,
              //marginTop: ins.top * -1,
              //marginBottom: ins.bottom * -2,
              //marginBottom: 50,
              //zIndex: 3,
              // testing overflow: 'visible',
              //overflow: 'visible',
              //marginBottom: (state === 'tabletop' && !aboutUp) ? 0 : ins.bottom,
              //marginTop: (state === 'tabletop' && aboutUp) ? 0 : ins.top,
              //marginTop: (state === 'tabletop' && aboutUp) ? ins.top : ins.top,
              // paddingTop: (state === 'tabletop' && aboutUp) ? ins.top : 0,
              //height: '93%',
              // paddingTop: 24,
              //bottom: 24 * -2,
              //top: 24 * 2,
              // marginTop: 24,
              //marginTop: 24 * 1, // test 22
              //marginBottom: 24 * 1, // test 22
              //bottom: 24 * -1,
              //marginBottom: 24 * 5,
              //paddingBottom: 24 * 5,
              //paddingTop: 24 * 4,
              //bottom: 24 * 1,
              overflow: 'visible',
              //marginBottom: 24 * 6,
              //paddingBottom: 24 * 3,
              //top: 24 * -2,
            }}
            
          
          >
            
            <View  //collapsable={false} 
              style={[ s.background, {
                //width: '100%',
                backgroundColor: 'yellow',
                //paddingBottom: 24 * -2, // NO
                // paddingLeft: ins.left * 1,
                //paddingTop: ins.top * 1,
                //paddingBottom: ins.bottom * 1,
                // paddingRight: ins.right * 1,
                //height: '166%',
                //height: '190%',
                //paddingTop: ins.top, // this
                //paddingBottom: ins.bottom, // this
                //top: 24 * -2,
                //top: 24 * -1, // test 11
                //top: 24 * 0, // test 22
                //paddingTop: -100,
                //bottom: 24 * -4,
                //marginTop: 24 * -1,
                //marginTop: 24 * -1,
                //marginBottom: 24 * -4,
                //top: 24 * -3,
                //paddingBottom: 24 * -5,
                //paddingTop: -200,
                //top: 24 * 0,
                //paddingBottom: 48 * 2,
                //marginBottom: 24 * -4,
                //marginBottom: 24 * -4,
                //marginBottom: 24 * -4,
                overflow: 'visible',
                //paddingBottom: 24 * 8,
                //top: 24 * 2
              }]}
            >

            

              {  lazyLoad.map(e => e) }

            </View>
              
          </CustomScrollView>
        </View>

  );
}

export default KnowMore;