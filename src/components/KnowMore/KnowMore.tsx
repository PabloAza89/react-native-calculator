import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StatusBar
} from 'react-native';
import { s } from './KnowMoreCSS';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

function KnowMore({ navigation }: any): React.JSX.Element {

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

  return (
    <View style={s.background}>
      <LinearGradient
        colors={[
          `rgba(${counterA["0"]}, ${counterA["1"]}, ${counterA["2"]}, 0.7)`,
          `rgba(255, 255, 255, 1)`
        ]}
        style={s.linearGradient}
        start={{ x: 0, y: 1}} // x = from left // y = from top
        end={{x: 1, y: 0}} // x = from left // y = from top
      >
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
      </LinearGradient>
      <Text style={s.text}>
        currIdxA: { currIdxA }{"\n"}
        counter 0: { counterA["0"] }{"\n"}
        goUp 0: { (goUpA.current["0"]).toString() }{"\n"}
        counter 1: { counterA["1"] }{"\n"}
        goUp 1: { (goUpA.current["1"]).toString() }{"\n"}
        counter 2: { counterA["2"] }{"\n"}
        goUp 2: { (goUpA.current["2"]).toString() }{"\n"}
      </Text>
      <Text style={s.text}>
        This App work because..{"\n"}
        Juan Pablo Azambuyo
      </Text>
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
  );
}

export default KnowMore;

