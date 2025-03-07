import { ReactElement, useState, useEffect, useRef,
  
} from 'react';
import {
  View, StatusBar, ScrollView, Pressable, InteractionManager, ActivityIndicator,
  NativeSyntheticEvent, NativeScrollEvent, Animated, useAnimatedValue,
  PixelRatio,
  UIManager,
  findNodeHandle,
  requireNativeComponent
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../utils/Text';
import { scrollBarSize, iconColor } from '../../utils/constants';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';

//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds, ins }: any): ReactElement => {

  const MyViewManager = requireNativeComponent('MyViewManager');

  const createFragment = (viewId: any) =>
    UIManager.dispatchViewManagerCommand(
      viewId,
      // we are calling the 'create' command
      //UIManager.MyViewManager.Commands.create.toString(),
      UIManager.getViewManagerConfig('MyViewManager').Commands.create.toString(),
      [viewId],
    );

  const ref = useRef(null);

  useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);


  return (
    <MyViewManager
      ref={ref}
      style={{
        // converts dpi to px, provide desired height
        //height: PixelRatio.getPixelSizeForLayoutSize(200),
        height: 500,
        // converts dpi to px, provide desired width
        //width: PixelRatio.getPixelSizeForLayoutSize(200),
        width: 800,
        display: 'flex',
        flex: 1,
        zIndex: 2000000,
        //backgroundColor: 'red'
      }}
    />
  );
}

export default KnowMore;