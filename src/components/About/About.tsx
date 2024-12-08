import { ReactElement } from 'react';
import { Text, View, Linking, StatusBar } from 'react-native';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AboutI } from '../../interfaces/interfaces';

//function About({ navigation: { navigate }, vmin }: AboutI): ReactElement {
function About({ navigation: { navigate }, vmin, switchSide, twoScreens, nextScreen, currWidth }: any): ReactElement {

  let ins = useSafeAreaInsets(); // insets

  return (
    <View style={[s.background, { height: '100%', width: '100%' } ]}>
      <LinearGradient
        colors={[ 'rgba(18, 56, 117, 0.7)', 'yellow' ]}
        style={s.linearGradient}
        start={[ 0, 1 ]} // left, top
        end={[ 1, 0 ]}   // left, bottom
        children={ <StatusBar translucent={true} backgroundColor={'transparent'} /> }
      />
      <Text
        style={[ s.text, { marginTop: -ins.bottom } ]}
        children={'This App is developed by\nJuan Pablo Azambuyo'}
      />
      <View style={s.imageWrapper}>
        <FastImage
          style={{ width: vmin * 30, height: vmin * 30, borderRadius: (vmin * 30) / 2 /* 50% */ }}
          source={ require('../../images/profile.png') }
          resizeMode={FastImage.resizeMode.contain}
        />
        <AntDesign
          // style={[ s.iconStyle, { right: (vmin * -30) / 2, top: (vmin * 30) / 3 } ]}
          // style={[ s.iconStyle, { right: 100 } ]}
          //style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: -40 }}
          style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: (((currWidth / 2) - ((vmin * 30) / 2)) / -2) - 20 }}
          name='linkedin-square'
          size={40}
          color='rgba(0, 0, 0, .7)'
          onPress={() => Linking.openURL('https://www.linkedin.com/in/juan-pablo-azambuyo')}
        />
      </View>

      {
        twoScreens ?
        <MaterialCommunityIcons.Button
          name='swap-horizontal-bold'
          size={30}
          color='rgba(0, 0, 0, .7)'
          onPress={() => switchSide()}
          children={ <Text style={s.textInButtonUpper}>SWITCH{"\n"}SCREENS</Text> }
        /> :
        <Ionicons.Button
          name='chevron-back-circle-sharp'
          size={30}
          color='rgba(0, 0, 0, .7)'
          onPress={() => navigate('Home')}
          children={ <Text style={s.textInButtonUpper} children={'BACK'} /> }
        />
      }
      <View style={s.space} />
      {
        twoScreens ?
        <Ionicons.Button
          name='alert-circle'
          size={30}
          color='rgba(0, 0, 0, .7)'
          onPress={() => nextScreen()}
          children={ <Text style={s.textInButtonUpper} children={'HOW DOES IT WORK ?'} /> }
        /> :
        <Ionicons.Button
          name='chevron-back-circle-sharp'
          size={30}
          color='rgba(0, 0, 0, .7)'
          onPress={() => navigate('KnowMore')}
          style={s.buttonAndIconLower}
          children={ <Text style={s.textInButtonLower} children={'HOW DOES IT WORK ?'} /> }
        />
      }


    </View>
  );
}

export default About;
