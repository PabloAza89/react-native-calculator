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

  const [ counter, setCounter ] = useState(0);
  const up = useRef(true);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("up.current", up.current, "counter", counter)
      if (counter > 254) { // MAX <= 20
        up.current = false
        console.log("ENTRO ACA")
      }
      else if (counter < 1) { // MIN >= 0
        //up = true
        console.log("MENOR QUE 1")
        //setUp(true)
        up.current = true
      }

      if (up.current) {
        console.log("UP ES TRUE")
        setCounter(val => val + 5)
      }
      else {
        console.log("UP ES FALSE")
        setCounter(val => val - 5)
      }
    }, 100);

    return () => clearInterval(interval);
    //}, 100);
  }, [counter, up])

  return (
    <View style={s.background}>
      <LinearGradient
        //colors={['rgba(18, 56, 117, 0.7)', 'yellow']} // #123875
        //colors={['rgba(18, 56, 117, 0.7)', 'yellow']} // #123875
        //colors={[`rgba(18, 56, ${counter}, 0.7)`, 'yellow']} // #123875
        colors={[`rgba(18, 56, ${counter}, 0.7)`, `rgba(255, 255, ${counter}, 1)`]} // #123875
        //colors={[`rgba(18, 56, 117, ${counter})`, 'yellow']} // #123875
        //colors={[ value, 'yellow']} // #123875
        style={s.linearGradient}
        start={{ x: 0, y: 1}} // x = from left // y = from top
        end={{x: 1, y: 0}} // x = from left // y = from top
      >
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
      </LinearGradient>
      <Text style={s.text}>
        { counter }
        {/* { test } */}

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

