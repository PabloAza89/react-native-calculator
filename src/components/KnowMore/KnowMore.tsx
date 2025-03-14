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
//import { MyViewManager } from './MyViewManager'; // COMP
//import { MyCustomView } from './MyViewManager'; // CLASS
import MyCustomView from './MyViewManager'; // CLASS


//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
//const MyViewManager = requireNativeComponent('MyViewManager');

const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds, ins }: any): ReactElement => {

  //let MyViewManager: any
  //const [ MyViewManager, setMyViewManager ] = useState(<View />)

  // const MyViewManager = requireNativeComponent('MyViewManager');

  // useEffect(() => {
  //   //MyViewManager = requireNativeComponent('MyViewManager');
  //   setMyViewManager(requireNativeComponent('MyViewManager'))
  // }, [])

  // const createFragment = (viewId: any) => {
  //   console.log("AAA 111", viewId)
  //   UIManager.dispatchViewManagerCommand(
  //     viewId,
  //     // we are calling the 'create' command
  //     //UIManager.MyViewManager.Commands.create.toString(),
  //     UIManager.getViewManagerConfig('MyViewManager').Commands.create.toString(),
  //     [viewId],
  //   )
  // }

  // const ref = useRef(null);

  // useEffect(() => {
  //   const viewId = findNodeHandle(ref.current);
  //   createFragment(viewId);
  // }, []);


  return (
    <View
      style={{
        backgroundColor: 'gray',
        width: '100%',
        height: '100%'
      }}
    >
      <MyCustomView
        //style={{ height: 500, width: 500 }}
        //ref={ref}
      >
        <Text>
          REACTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </Text>
      </MyCustomView>
    </View>


  
  );
}

export default KnowMore;