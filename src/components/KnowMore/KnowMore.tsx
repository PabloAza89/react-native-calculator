import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  Button,
  Pressable
} from 'react-native';
import { s } from './KnowMoreCSS';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
//import ReactLinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
//import { opw } from '../constants';
import { Dimensions } from 'react-native';

const oph = Dimensions.get('window').height

function KnowMore({ navigation }: any): React.JSX.Element {

  const scrollRef = useRef<any>();

  const onFabPress = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  /* const handleScroll = (e: any) => {
    console.log(e.nativeEvent.contentOffset.y)
  } */

  /* const onViewableItemsChanged = (e: any) => {
    console.log(e)
  } */

  interface counterI {
    [index: string]: number
  }

  const [ counterA, setCounterA ] = useState<counterI>({ "0": 0, "1": 250, "2": 0 });
  const [ currIdxA, setCurrIdxA ] = useState(Math.floor(Math.random() * 3)); // CURRENT INDEX A // BETWEEN 0 AND 2
  const goUpA: any = useRef({ "0": true, "1": false, "2": true });

  useEffect(() => {
    const interval = setInterval(() => {
      let newANum = () => setCurrIdxA(Math.floor(Math.random() * 3)) // BETWEEN 0 AND 2

      if (counterA[currIdxA] > 250) { goUpA.current[currIdxA] = false; newANum() }
      else if (counterA[currIdxA] < 5) { goUpA.current[currIdxA] = true; newANum() }
      if (goUpA.current[currIdxA]) setCounterA({ ...counterA, [currIdxA]: counterA[currIdxA] + 5 })
      else setCounterA({ ...counterA, [currIdxA]: counterA[currIdxA] - 5 })
    }, 100);

    return () => clearInterval(interval);
  }, [counterA, currIdxA, goUpA])

  let insets = useSafeAreaInsets();

  return (
    <View>
      <LinearGradient
        colors={[
          `rgba(${counterA["0"]}, ${counterA["1"]}, ${counterA["2"]}, 0.7)`,
          `rgba(255, 255, 255, 1)`
        ]}
        style={s.linearGradient}
          start={{ x: 0, y: 1}} // x = from left // y = from top
          end={{x: 1, y: 0}} // x = from left // y = from bottom
      > 
      
        
        <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
        
        
      </LinearGradient>

      <LinearGradient
        colors={[
          `rgba(${counterA["0"]}, ${counterA["1"]}, ${counterA["2"]}, 0.9)`,
          `rgba(255, 255, 255, 0.9)`
          //  `red`,
          //  `rgba(255, 255, 255, 1)`
        ]}
        style={[ s.linearGradientStatus, { height: 24 } ]}
          //start={{ x: 0, y: ((oph / insets.top) / 2) + insets.top }} // x = from left // y = from top
          start={{ x: 0, y: (oph / (insets.top / 2)) - insets.top }} // x = from left // y = from top
          end={{x: 1, y: 0}} // x = from left // y = from bottom
      >
      </LinearGradient>


      <ScrollView
        ref={scrollRef}
        //onScroll={(e) => handleScroll(e)}
        overScrollMode="never"
      >
        <View style={s.background}>

          <View style={s.buttonContainer}>
            <Ionicons.Button
              name='chevron-back-circle-sharp'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigation.navigate('About')}
            >
              <Text style={s.textInButton}>BACK</Text>
            </Ionicons.Button>
            <View style={s.space} />
            <Ionicons.Button
              name='home'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigation.navigate('Home')}
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

          <View style={s.eachItem}>
            <Text style={s.leftItem}>
              -X
            </Text>
            <Text style={s.rightItem}>
              Negative number. Press it before your number.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Text style={s.leftItem}>
              ( )
            </Text>
            <Text style={s.rightItem}>
              Chain any amount of parenthesis and
              calculator will parse the result,
              following the next rules:{"\n"}
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
            </Text>
            <Text style={s.rightItem}>
              Then will quit that parenthesis, if exists,
              and do the same as above.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Text style={[s.leftItem, s.sn]}>
              1e+12
            </Text>
            <Text style={s.rightItem}>
              If the integer side, in the result,
              is more than 12 digits (e.g.: 1000000000001.23 + 1.23),
              it will be converted to scientific notation.{"\n"}
              Results in scientific notation are parsed as follows:
              <View style={s.eachItemInner}>
                <Text style={s.leftItemInner}>
                  •
                </Text>
                <Text style={s.rightItemInner}>
                  If exponent have 1 digits, decimal part are 8 places.
                </Text>
              </View>
              <View style={s.eachItemInner}>
                <Text style={s.leftItemInner}>
                  •
                </Text>
                <Text style={s.rightItemInner}>
                  If exponent have 2 digits, decimal part are 7 places. And so..
                </Text>
              </View>
              <View style={s.eachItemInner}>
                <Text style={s.leftItemInner}>
                  •
                </Text>
                <Text style={s.rightItemInner}>
                  If decimal part have trailing zeros, they will be removed.
                </Text>
              </View>
            </Text>
          </View>

          <View style={s.eachItem}>
            <FontAwesome5
              name='infinity'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigation.navigate('KnowMore')}
              //style={s.buttonAndIconLower}
              style={s.leftItem}
            />
            <Text style={s.rightItem}>
              Numbers largers than 1.797693e+307 (positive or negative)
              are treated as Infinity. After that,
              every calc will output Infinity, or -Infinity, as applicable.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Entypo
              name='new'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigation.navigate('KnowMore')}
              style={s.leftItem}
            />
            <Text style={s.rightItem}>
              All new input characters are placed to the right.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Ionicons
              name='backspace'
              size={40}
              color='rgba(0, 0, 0, .7)'
              style={s.leftItem}
            />
            <Text style={s.rightItem}>
              Erase the last character.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Text style={s.leftItem}>
              C
            </Text>
            <Text style={s.rightItem}>
              Delete the entire input.
            </Text>
          </View>

          <View style={s.eachItem}>
            <Text style={[s.leftItem, s.dot]}>
              .
            </Text>
            <Text style={s.rightItem}>
              Decimal numbers can have up to two digits maximum.
              But decimal results can be more than 2 digits long !
            </Text>
          </View>

          <View style={s.eachItem}>
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
          </View>

          <View style={[s.eachItem, s.last]}>
            <MaterialIcons
              name='phonelink-erase'
              size={30}
              color='rgba(0, 0, 0, .7)'
              onPress={() => navigation.navigate('KnowMore')}
              style={s.leftItem}
            />
            <Text style={s.rightItem}>
              This App does not have access to your device.
            </Text>
          </View>

        </View>
        
      </ScrollView>
      <Pressable
        style={s.floatButton}
        onPress={() => onFabPress()}
      >
        <Text style={s.floatButtonText}> UP </Text>
      </Pressable>
    </View>
  );
}

export default KnowMore;