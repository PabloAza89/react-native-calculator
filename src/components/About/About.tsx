import { ReactElement, useEffect } from 'react';
import { View, Linking, StatusBar, Animated, useAnimatedValue, Pressable, ScrollView, AppState } from 'react-native';
import { Text } from '../../utils/Text';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons, createIconSetFromFontello } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { AboutI } from '../../interfaces/interfaces';
import CustomScrollView from '../CustomScrollView/CustomScrollView';
import CustomButton from '../CustomButton/CustomButton';

//function About({ navigation: { navigate }, vmin }: AboutI): ReactElement {
const About = ({ navigation, vmin, width, showModal, updateShowModal, state, twoScreens, switchSide, nextScreen, aboutUp, ins, height, hingeBounds, calcLeft, maxVerticalInset, maxHorizontalInset, fadeAnim, fadeIn, fadeOut }: any): ReactElement => {

  const { navigate } = navigation

  useEffect(() => {
    (navigation.getState().routes.at(-1).name === 'About' && (state === 'tabletop' || state === 'book')) && navigate('Home', { lastRoute: 'About' })
  }, [state])

  // const fadeAnim = useAnimatedValue(0);
  // const fadeIn = () => Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();
  // const fadeOut = () => Animated.timing(fadeAnim, { toValue: 0, duration: 1000, useNativeDriver: true }).start();

  // const fadeIn = () => {}
  // const fadeOut = () => {}

  useEffect(() => showModal ? fadeIn() : fadeOut(), [showModal])

  const parsedInsTop = ins.top === 0 ? 1 : ins.top // PREVENT NaN WHEN RENDER (on native side)
  const parsedMaxHorizontalInset = maxHorizontalInset * 2
  const parsedMaxVerticalInset = maxVerticalInset > 24 ? maxVerticalInset : 24
  const parsedWidth =
    state === 'book' && calcLeft ? width - hingeBounds.right - ins.right - parsedMaxHorizontalInset :
    state === 'book' && !calcLeft ? hingeBounds.left - ins.left - parsedMaxHorizontalInset :
    width - parsedMaxHorizontalInset

  const parsedHeight = height === 0 ? 1 : height // PREVENT NaN WHEN RENDER (on native side)
  const topByHeight = ins.top / parsedHeight

  useEffect(() => { return () => updateShowModal(false) }, []); // ON LEAVE COMPONENT

  // ****** ↓↓↓ BACKGROUND SCHEME ↓↓↓ ******
  // zIndex
  //   3                 —— GRADIENT + OPACITY (StatusBar)
  //   2     —————————————— SCROLLVIEW
  //   1     ————————————   GRADIENT + OPACITY

  return (
    <View style={s.background}>
      <Animated.View
        style={[ s.modalForegroundAbout/* s.backgroundModal */, { backgroundColor: twoScreens ? 'transparent' : 'rgba(0, 0, 0, 0.4)', opacity: fadeAnim, pointerEvents: showModal ? 'auto' : 'none', paddingTop: ins.top, paddingBottom: ins.bottom } ]}
        children={
          <Pressable
            style={[ s.modalForegroundAboutPressable/* s.backgroundModalButton */,  { /* backgroundColor: 'yellow', */ /* marginTop: ins.top,  */ /* marginBottom: ins.bottom */ } ]}
            onPress={() => { console.log('CLICKED About'); updateShowModal(false) }}
            //onPress={() => { if (!twoScreens) {console.log('CLICKED About'); updateShowModal(false)} }}
            children={
              <View style={s.modal}>
                <Text
                  numberOfLines={3}
                  style={s.upperModal}
                  children={'You are about to leave this App\nand access an external link\nDo you want to continue ?'}
                />
                <View style={s.lowerModal}>
                  <CustomButton
                    type={Ionicons.Button}
                    name={'close-circle'}
                    size={25}
                    color={'rgba(0, 0, 0, .7)'}
                    onPress={() => updateShowModal(false)}
                    children={ <Text style={s.buttonModal} children={'CANCEL'} /> }
                  />
                  <CustomButton
                    type={Ionicons.Button}
                    name={'checkmark-circle'}
                    size={25}
                    color={'rgba(0, 0, 0, .7)'}
                    onPress={() => { Linking.openURL('https://www.linkedin.com/in/juan-pablo-azambuyo'); updateShowModal(false) }}
                    margin={{ left: 12 }}
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
        style={[ { height: ins.top, zIndex: 3, position: 'absolute', width: '100%', top: ins.top *0 , opacity: 0.7 } ]}
        start={[ 0, state === 'tabletop' ?  hingeBounds.top / parsedInsTop : height / parsedInsTop ]}
        end={[ 1, 0 ]}
      />

      <LinearGradient  // BACKGROUND
        colors={[ 'rgba(18, 56, 117, 1)', 'yellow' ]}
        style={[ {  zIndex: 1, height: '100%', position: 'absolute', width: '100%', top: ins.top *1 , opacity: 0.7 } ]}
        start={[ 0, 1 - topByHeight ]}
        end={[ 1, topByHeight * -1 ]}
      />

      <CustomScrollView
        persistentScrollbar={true}
        scrollbarPadding={{
          top: (state === 'tabletop' && !aboutUp) ? 0 : ins.top,
          right: ins.right,
          bottom: (state === 'tabletop' && aboutUp) ? 0 : ins.bottom,
        }}
        style={[s.cswStyle, { zIndex: 2 }]}
        contentContainerStyle={s.cswContentContainerStyle}
      >
        <View
          style={{
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
              paddingTop: parsedMaxVerticalInset,
              paddingBottom: parsedMaxVerticalInset,
          }}
        >
          <Text
            style={[s.title, { /* backgroundColor: 'green' */ }]}
            children={'This App is developed by\nJuan Pablo Azambuyo'}
          />
          <View style={s.imageWrapper}>
            <FastImage
              style={{ width: vmin * 30, height: vmin * 30, borderRadius: (vmin * 30) / 2 /* 50% */ }}
              source={ require('../../images/profile.png') }
              resizeMode={FastImage.resizeMode.contain}
            />
            <CustomButton
              type={AntDesign}
              name={'linkedin-square'}
              size={40}
              color={'rgba(0, 0, 0, .7)'}
              onPress={() => updateShowModal(true)}
              style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: (((parsedWidth / 2) - ((vmin * 30) / 2)) / -2) - 20 }}
              //style={{ position: 'absolute', top: ((vmin * 30) / 2) - 20, right: 0 }}
            />
          </View>

          {
            twoScreens ?
            <CustomButton
              type={MaterialCommunityIcons.Button}
              name={ state === 'tabletop' ? 'swap-vertical-bold' : 'swap-horizontal-bold' }
              size={30}
              color={'rgba(0, 0, 0, .7)'}
              onPress={() => switchSide()}
              margin={{ bottom: 24 }}
              children={ <Text style={[ s.textInButton, s.twoLines ]} children={'SWITCH\nSCREENS'} /> }
            /> :
            <CustomButton
              type={Ionicons.Button}
              name={'chevron-back-circle-sharp'}
              size={30}
              color={'rgba(0, 0, 0, .7)'}
              onPress={() => navigate('Home')}
              margin={{ bottom: 24 }}
              children={ <Text style={[ s.textInButton, s.oneLine ]} children={'BACK'} /> }
            />
          }
          {
            twoScreens ?
            <CustomButton
              type={Ionicons.Button}
              name={ state === 'tabletop' ? 'calculator-sharp' : 'alert-circle' }
              size={30}
              color={'rgba(0, 0, 0, .7)'}
              onPress={() => nextScreen()}
              //iconStyle={s.buttonAndIconLower}
              children={ <Text style={[ s.textInButton, s.oneLine ]} children={ state === 'tabletop' ? 'HOME' : 'HOW DOES IT WORK ?' } /> }
            /> :
            <CustomButton
              type={Ionicons.Button}
              name={'chevron-back-circle-sharp'}
              size={30}
              color={'rgba(0, 0, 0, .7)'}
              onPress={() => navigate('KnowMore')}
              iconStyle={s.buttonAndIconLower}
              children={ <Text style={[ s.textInButton, s.oneLine, { transform: [{ rotate: '180deg' }] } ]} children={'HOW DOES IT WORK ?'} /> }
            />
          }
        </View>
      </CustomScrollView>
    </View>
  );
}

export default About;