import React from 'react';
import {
  Text,
  View,
  Linking,
  StatusBar,
  ScrollView
} from 'react-native';
import { s } from './AboutCSS';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function About({ navigation: { navigate }, oph, vmax }: any): React.JSX.Element {

  let ins = useSafeAreaInsets(); // insets

  return (
    <ScrollView style={{  } }>
    {/* <View style={[s.background, { height: vmax * 100 + ins.bottom } ]}> */}
    <View style={[s.background, { height: oph * 100 } ]}>
      <LinearGradient
        colors={['rgba(18, 56, 117, 0.7)', 'yellow']} // #123875
        style={s.linearGradient}
        start={{ x: 0, y: 1}} // x = from left // y = from top
        end={{x: 1, y: 0}} // x = from left // y = from top
      >
        <StatusBar translucent={true} backgroundColor={'transparent'}/>
      </LinearGradient>
      <Text style={s.text}>
        This App is developed by{"\n"}
        Juan Pablo Azambuyo
      </Text>
      <View style={s.imageWrapper}>
        <FastImage
          style={s.profile}
          source={ require('../../images/profile.png') }
          resizeMode={FastImage.resizeMode.contain}
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
        onPress={() => navigate('Home')}
      >
        <Text style={s.textInButtonUpper}>BACK</Text>
      </Ionicons.Button>
      <View style={s.space} />
      <Ionicons.Button
        name='chevron-back-circle-sharp'
        size={30}
        color='rgba(0, 0, 0, .7)'
        onPress={() => navigate('KnowMore')}
        style={s.buttonAndIconLower}
      >
        <Text style={s.textInButtonLower}>HOW DOES IT WORK ?</Text>
      </Ionicons.Button>
    </View>
    </ScrollView>
  );
}

export default About;
