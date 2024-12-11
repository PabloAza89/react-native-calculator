import { ReactElement, useState, useEffect } from 'react';
import { Text, View, Linking, StatusBar, Modal, Button, Animated, useAnimatedValue, Pressable } from 'react-native';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AboutI } from '../../interfaces/interfaces';
//import { useIsFocused } from "@react-navigation/native";

//function About({ navigation: { navigate }, vmin }: AboutI): ReactElement {
const About = ({ navigation /* { navigate } */, vmin, switchSide, twoScreens, nextScreen, currWidth, showModal, updateShowModal, state }: any): ReactElement => {

  const { navigate } = navigation

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'About' && state === 'book') && navigate('Home', { lastRoute: 'About' })
    //(navigation.getState().routes.at(-1).name === 'KnowMore' && state === 'book') && navigate('Home', { lastRoute: 'KnowMore' })
  }, [state])

  let ins = useSafeAreaInsets(); // insets

  //const [ showModal, setShowModal ] = useState(false);

  const fadeAnim = useAnimatedValue(0);

  // duration: 200
  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  // <Animated.View

  return (
    <View style={[s.background, { height: '100%', width: '100%' } ]}>

      <Animated.View
        style={{
          display: 'flex',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 1000000,
          width: '100%', height: '100%',
          opacity: fadeAnim,
          //opacity: 0,
          pointerEvents: showModal ? 'auto' : 'none'
        }}
        children={
          <Pressable
            style={{
              display: 'flex',
              width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
              paddingTop: ins.top, paddingBottom: ins.bottom
            }}
            //onPress={() => setShowModal(false)}
            onPress={() => updateShowModal(false)}
            children={
              <View
                style={{
                  display: 'flex',
                  position: 'relative',
                  opacity: 1,
                  zIndex: 1000001,
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 10,
                }}
                // onStartShouldSetResponder={ () => true } // BLOCK CLICK ON CURRENT VIEW
                // onTouchEnd={ e => e.stopPropagation() } // BLOCK CLICK ON CURRENT VIEW
              >
                <Text
                  style={{ paddingBottom: 5, justifyContent: 'center', alignItems: 'center', fontSize: vmin * 3, textAlign: 'center', includeFontPadding: false, fontWeight: "500" }}
                  children={'You are about to leave this App\nand access an external link\nDo you want to continue ?'}
                />
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Ionicons.Button
                    name='close-circle'
                    size={25}
                    color='rgba(0, 0, 0, .7)'
                    //onPress={() => setShowModal(false)}
                    onPress={() => updateShowModal(false)}
                    children={ <Text style={s.buttonModal} children={'CANCEL'} /> }
                  />
                  <Ionicons.Button
                    name='checkmark-circle'
                    size={25}
                    color='rgba(0, 0, 0, .7)'
                    onPress={() => { Linking.openURL('https://www.linkedin.com/in/juan-pablo-azambuyo'); updateShowModal(false) }}
                    children={ <Text style={s.buttonModal} children={'CONTINUE'} /> }
                  />
                </View>
              </View>
            }
          />
        }
      />

      <LinearGradient
        colors={[ 'rgba(18, 56, 117, 0.7)', 'yellow' ]}
        style={s.linearGradient}
        start={[ 0, 1 ]} // left, top
        end={[ 1, 0 ]}   // left, bottom
        children={ <StatusBar translucent={true} backgroundColor={'transparent'} /> }
      />
      <Text
        style={[ s.text, { marginTop: ins.bottom * -1 } ]}
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
          //onPress={() => Linking.openURL('https://www.linkedin.com/in/juan-pablo-azambuyo')}
          //onPress={() => setShowModal(true)}
          //onPress={() => fadeIn()}
          //onPress={showModal}
          //onPress={fadeIn}
          //onPress={() => setShowModal(true)}
          onPress={() => updateShowModal(true)}
          
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
