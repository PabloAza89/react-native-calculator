import { ReactElement, useEffect, useRef } from 'react';
import { View, Linking, StatusBar, Animated, useAnimatedValue, Pressable, ScrollView, AppState, findNodeHandle, StyleSheet, UIManager, Button, requireNativeComponent } from 'react-native';
import { Text } from '../../utils/Text';
import { s } from './AboutCSS';
import { Ionicons, AntDesign, MaterialCommunityIcons, createIconSetFromFontello } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import FastImage from 'react-native-fast-image';
import { AboutI } from '../../interfaces/interfaces';
import CustomScrollView from '../CustomScrollView/CustomScrollView';

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

  const parsedInsTop = ins.top === 0 ? 1 : ins.top // PREVENT NaN WHEN RENDER (on native side)
  const maxInsetLeftOrRight = ins.left > ins.right ? ins.left * 2 : ins.right * 2
  const parsedWidth =
    state === 'book' && calcLeft ? width - hingeBounds.right - ins.right - maxInsetLeftOrRight :
    state === 'book' && !calcLeft ? hingeBounds.left - ins.left - maxInsetLeftOrRight :
    width - maxInsetLeftOrRight

  const parsedHeight = height === 0 ? 1 : height // PREVENT NaN WHEN RENDER (on native side)
  const topByHeight = ins.top / parsedHeight

  useEffect(() => { // ON LEAVE COMPONENT
    return () => updateShowModal(false)
  }, [])

  // API: Home:      Overview:                        StatusBar:
  // 36   background active                           active
  // 34   background active                           active
  // 31   background active                           active
  // 30   background background                       active
  // 29   background background                       active
  // 28   background background                       active
  // 26   background background                       active
  // 23   active     background (1st) / active (next) active
  useEffect(() => { // ON APP BLUR
    const blur = AppState.addEventListener('blur', () => updateShowModal(false))
    return () => blur.remove()
  }, []);

    return (
        <View style={{
          /* flex: 1, */
          backgroundColor: '#f0f0f0',
        }}>
            <CustomScrollView
              persistentScrollbar={true}
              scrollbarPadding={{
                    top: 5,
                    right: 5,
                    bottom: 5,
              }}
                style={{}}
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    paddingVertical: 10,
                }}
            >
              
                <View
                  style={{
                      width: '80%',
                      padding: 20,
                      borderRadius: 8,
                      alignItems: 'center',
                      marginTop: 'auto',
                      marginBottom: 'auto',
                  }}
                >
                  <Text style={styles.text}>--- Top of Content ---</Text>
                  {Array.from({ length: 25 }).map((_, i) => (
                      <Text key={i} style={styles.longText}>Item #{i + 1}</Text>
                  ))}
                  <Text style={styles.text}>--- End of Content ---</Text>
                </View>
            </CustomScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    longText: {
        fontSize: 14,
    }
});

export default About;