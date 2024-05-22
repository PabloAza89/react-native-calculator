import React from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  StatusBar
} from 'react-native';
import profile from '../../images/profile.png';
import { s } from './AboutCSS';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';

function About({ navigation }: any): React.JSX.Element {
  return (
    <View style={s.background}>
      <LinearGradient
        colors={['rgba(18, 56, 117, 0.7)', 'yellow']} // #123875
        style={s.linearGradient}
        start={{ x: 0, y: 1}} // x = from left // y = from top
        end={{x: 1, y: 0}} // x = from left // y = from top
      >
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
      </LinearGradient>
      <Text style={s.text}>
        This App is created by{"\n"}
        Juan Pablo Azambuyo
      </Text>
      <View style={s.imageWrapper}>
        <Image
          style={s.profile}
          source={profile}
        />
        <AntDesign
          style={s.iconStyle}
          name='linkedin-square'
          size={40}
          color='rgba(0, 0, 0, .7)'
          onPress={() => Linking.openURL('https://www.linkedin.com/in/juan-pablo-azambuyo')}
        />
      </View>
      <Ionicons.Button
        name='chevron-back-circle-sharp'
        size={30}
        color='rgba(0, 0, 0, .7)'
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={s.buttonTextUpper}>BACK</Text>
      </Ionicons.Button>
      <View style={s.space} />
      <Ionicons.Button
        name='chevron-back-circle-sharp'
        size={30}
        color='rgba(0, 0, 0, .7)'
        onPress={() => navigation.navigate('Home')}
        style={s.buttonLower}
      >
        <Text style={s.buttonTextLower}>HOW IT WORKS ?</Text>
      </Ionicons.Button>
    </View>
  );
}

export default About;
