import { ReactElement, useEffect } from 'react';
import { View, Linking, StatusBar, Animated, useAnimatedValue, Pressable, ScrollView, AppState } from 'react-native';
import { Text } from '../../utils/Text';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { AboutI } from '../../interfaces/interfaces';

//function About({ navigation: { navigate }, vmin }: AboutI): ReactElement {
const About = ({ navigation, vmin, width, showModal, updateShowModal, state, twoScreens, switchSide, nextScreen, aboutUp, ins, height, hingeBounds, calcLeft }: any): ReactElement => {

  const { navigate } = navigation

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'About' && (state === 'tabletop' || state === 'book')) && navigate('Home', { lastRoute: 'About' })
  }, [state])

  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  console.log("TEST ABOUT")

  const parsedInsTop = ins.top === 0 ? 1 : ins.top // PREVENT NaN WHEN RENDER (on native side)
  const maxInsetLeftOrRight = ins.left > ins.right ? ins.left * 2 : ins.right * 2
  const parsedWidth =
    state === 'book' && calcLeft ? width - hingeBounds.right - ins.right - maxInsetLeftOrRight :
    state === 'book' && !calcLeft ? hingeBounds.left - ins.left - maxInsetLeftOrRight :
    width - maxInsetLeftOrRight


  const parsedHeight = height === 0 ? 1 : height // PREVENT NaN WHEN RENDER (on native side)
  const topByHeight = ins.top / parsedHeight

  useEffect(() => {
    return () => {console.log("OUTTTTTTTTTTTTTTTTTTTTT");updateShowModal(false)}
  }, [])

  useEffect(() => { // ON APP BLUR
      
      //AppState.addEventListener('blur', () => {
      const blur = AppState.addEventListener('change', () => {
        //if (AppState.currentState === '')
        console.log("AppState.currentState", AppState.currentState)
        if (RegExp(/background|inactive/).test(AppState.currentState)) {
          console.log("OUTT BLURRRR OUTTTTT")
          updateShowModal(false)
          
        }
          
        
      })

      // ANDROID 36 OK Home (background) // Overview (active) // statusBar (active)
      // ANDROID 34 OK Home (background) // Overview (active) // statusBar (active)
      // ANDROID 31 OK Home (background) // Overview (active) // statusBar (active)
      // ANDROID 30 OK Home (background) // Overview (background) // statusBar (active)
      // ANDROID 29 OK Home (background) // Overview (background) // statusBar (active)
      // ANDROID 28 OK Home (background) // Overview (background) // statusBar (active)
      // ANDROID 26 OK Home (background) // Overview (background) // statusBar (active)
      // ANDROID 23 OK Home (active)     // Overview (active)     // statusBar (active)
      const blurTEST = AppState.addEventListener('blur', () => { 
        //if (AppState.currentState === '')
        console.log("AppState.currentState 12", AppState.currentState)
        if (RegExp(/background|active/).test(AppState.currentState)) {
          console.log("12 OUTT BLURRRR OUTTTTT 12")
          updateShowModal(false)
          
        }
          
        
      })
      //return () => blur.remove();



      return () => {
        blur.remove();
        blurTEST.remove();
      }

      

    }, []);

  return (
    <View style={s.background}>
      <Animated.View
        style={[ s.backgroundModal, { opacity: fadeAnim, pointerEvents: showModal ? 'auto' : 'none', paddingTop: ins.top, paddingBottom: ins.bottom } ]}
        children={
          <Pressable
            style={[ s.backgroundModalButton,  { /* marginTop: ins.top,  */ /* marginBottom: ins.bottom */ } ]}
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

      <LinearGradient // STATUS BAR
        colors={[ 'rgba(18, 56, 117, 1)', 'yellow' ]}
        style={[ { height: ins.top, /* zIndex: (state === 'tabletop' && aboutUp) ? 4 : 0, */ position: 'absolute', width: '100%', top: ins.top *0 , opacity: 0.7 } ]}
        start={[ 0, state === 'tabletop' ?  hingeBounds.top / parsedInsTop : height / parsedInsTop ]}
        end={[ 1, 0 ]}
      />

      <LinearGradient  // BACKGROUND
        colors={[ 'rgba(18, 56, 117, 1)', 'yellow' ]}
        style={[ {  height: '100%', position: 'absolute', width: '100%', top: ins.top *1 , opacity: 0.7 } ]}
        start={[ 0, 1 - topByHeight ]}
        end={[ 1, topByHeight * -1 ]}
      />

      <ScrollView
        horizontal={false}
        scrollEnabled={true}
        style={[ s.scrollView, {
          
          //overflow: 'visible',
          marginTop: ins.top * 1,
          //marginBottom: ins.bottom * 1,
          marginBottom: (state === 'tabletop' && aboutUp) ? 0 : ins.bottom, // DONE
        } ]}
        //contentContainerStyle={s.scrollViewInner}
        contentContainerStyle={[ s.scrollViewInner, { width: parsedWidth /* marginRight: 100, marginLeft: 100 */ } ]}
        persistentScrollbar={true}
        //indicatorStyle={'black'}
      >
        <View /* SPACE */ style={{ /* marginBottom: state === 'tabletop' ? ins.top : ins.top * 2 */ }} />
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
            style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: (((parsedWidth / 2) - ((vmin * 30) / 2)) / -2) - 20 }}
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
        <View /* SPACE */ style={{ /* marginBottom: (state === 'tabletop' && aboutUp) ? ins.top : ins.bottom + ins.top */ }} />
        <View /* SPACE */ style={{ marginBottom: ins.top }} />
      </ScrollView>
    </View>
  );
}

export default About;