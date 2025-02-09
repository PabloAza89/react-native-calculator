import { ReactElement, useEffect } from 'react';
import {
  Text, View, Linking, StatusBar, Animated, useAnimatedValue, Pressable, ScrollView
} from 'react-native';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AboutI } from '../../interfaces/interfaces';

//function About({ navigation: { navigate }, vmin }: AboutI): ReactElement {
const About = ({ navigation, vmin, currWidth, showModal, updateShowModal, state, twoScreens, switchSide, nextScreen, aboutUp }: any): ReactElement => {

  const { navigate } = navigation

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'About' && (state === 'tabletop' || state === 'book')) && navigate('Home', { lastRoute: 'About' })
  }, [state])

  let ins = useSafeAreaInsets();

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  return (
    <View style={s.background}>
      <Animated.View
        style={[ s.backgroundModal, { opacity: fadeAnim, pointerEvents: showModal ? 'auto' : 'none' } ]}
        children={
          <Pressable
            style={[ s.backgroundModalButton,  { paddingTop: ins.top, paddingBottom: ins.bottom } ]}
            onPress={() => updateShowModal(false)}
            children={
              <View style={s.modal}>
                <Text
                  numberOfLines={3}
                  //adjustsFontSizeToFit={true}
                  style={s.upperModal}
                  children={'You are about to leave this App\nand access an external link\nDo you want to continue ?'}
                />
                <View style={s.lowerModal}>
                  <Ionicons.Button
                    name='close-circle'
                    size={25}
                    color='rgba(0, 0, 0, .7)'
                    onPress={() => updateShowModal(false)}
                    children={ <Text style={s.buttonModal} children={'CANCEL'} /> }
                  />
                  <View style={s.space10} />
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
        end={[ 1, 0 ]}   // left, top
        children={ <StatusBar translucent={true} backgroundColor={'transparent'} /> }
      />

      <ScrollView
        horizontal={false}
        scrollEnabled={true}
        style={s.scrollView}
        contentContainerStyle={s.scrollViewInner}
        persistentScrollbar={true}
      >
        <View /* SPACE */ style={{ marginBottom: state === 'tabletop' ? ins.top : ins.top * 2 }} />
        <Text
          style={s.title}
          children={'This App is developed by\nJuan Pablo Azambuyo'}
        />
        <View style={s.imageWrapper}>
          <FastImage
            style={{ width: vmin * 30, height: vmin * 30, borderRadius: (vmin * 30) / 2 /* 50% */ }}
            source={ require('../../images/profile.png') }
            resizeMode={FastImage.resizeMode.contain}
          />
          <AntDesign
            style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: (((currWidth / 2) - ((vmin * 30) / 2)) / -2) - 20 }}
            name='linkedin-square'
            size={40}
            color='rgba(0, 0, 0, .7)'
            onPress={() => updateShowModal(true)}
          />
        </View>

        {
          twoScreens ?
          <MaterialCommunityIcons.Button
            name={ state === 'tabletop' ? 'swap-vertical-bold' : 'swap-horizontal-bold' }
            size={30}
            color='rgba(0, 0, 0, .7)'
            onPress={() => switchSide()}
            children={ <Text style={s.textInButtonUpper} children={'SWITCH\nSCREENS'} /> }
          /> :
          <Ionicons.Button
            name='chevron-back-circle-sharp'
            size={30}
            color='rgba(0, 0, 0, .7)'
            onPress={() => navigate('Home')}
            children={ <Text style={s.textInButtonUpper} children={'BACK'} /> }
          />
        }
        <View style={s.space25} />
        {
          twoScreens ?
          <Ionicons.Button
            name={ state === 'tabletop' ? 'calculator-sharp' : 'alert-circle' }
            size={30}
            color='rgba(0, 0, 0, .7)'
            onPress={() => nextScreen()}
            children={ <Text style={s.textInButtonUpper} children={ state === 'tabletop' ? 'HOME' : 'HOW DOES IT WORK ?' } /> }
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
        <View /* SPACE */ style={{ marginBottom: (state === 'tabletop' && aboutUp) ? ins.top : ins.bottom + ins.top }} />
      </ScrollView>
    </View>
  );
}

export default About;