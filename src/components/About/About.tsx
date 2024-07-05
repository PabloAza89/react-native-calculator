import React, { useEffect, useState, useRef,  } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  StatusBar,
  InteractionManager
} from 'react-native';
import profile from '../../images/profile.png';
//import profile = require('../../images/profile.png');
import { s } from './AboutCSS';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import FastImage from 'react-native-fast-image'

function About({ navigation: { navigate, getState }, /* imageLink */ }: any): React.JSX.Element {

  //console.log("CCCCCCC ABOUT", getState())

  // let data = 
  //   {
  //     id: "1",
  //     text: "blablabla1",
  //     imageLink: require('../../images/profile.png')
  //   }

  // const YourImage = () => (
  //   <FastImage
  //     style={{ width: 200, height: 200 }}
  //     source={{
  //         uri: '../../images/profile.png',
  //         //headers: { Authorization: 'someAuthToken' },
  //         priority: FastImage.priority.normal,
  //     }}
  //     resizeMode={FastImage.resizeMode.contain}
  //   />
  // )

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
        This App is developed by{"\n"}
        Juan Pablo Azambuyo
      </Text>
      <View style={s.imageWrapper}>
        {/* <Image
          style={s.profile}
           //source={{uri: `${response}`}}
          //source={data.imageLink}
          //source={imageLink[0]}
          //source={{uri: imageLink[0]}}
          //source={{ uri: `${profile}` }}
          //source={require('../../images/profile.png')}
          //source={Image.prefetch(require('../../images/profile.png'))}
          
          //source={{uri: DEFAULT_IMAGE}}
          //source={test}
          //onLoadEnd={() => setLoaded(true)}
          //onShown={() => console.log("DONEEEEEEEEEEEEEEEEEEEE")}
         
         /> */}
       
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
  );
}

export default About;
