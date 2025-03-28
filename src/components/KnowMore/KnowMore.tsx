import { ReactElement, useState, useEffect, useRef,
  
} from 'react';
import {
  View, StatusBar, ScrollView, Pressable, InteractionManager, ActivityIndicator,
  NativeSyntheticEvent, NativeScrollEvent, Animated, useAnimatedValue,
  PixelRatio,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
  ViewProps,
  FlatList,
  RefreshControl
} from 'react-native';
import { s } from './KnowMoreCSS';
import { Entypo, FontAwesome5, Ionicons, MaterialIcons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../utils/Text';
import { scrollBarSize, iconColor } from '../../utils/constants';
import { counterI, KnowMoreI, goUpI } from '../../interfaces/interfaces';
//import { MyViewManager } from './MyViewManager'; // COMP
//import { MyCustomView } from './MyViewManager'; // CLASS
import CustomScrollView from './CustomScrollView'; // CLASS

//const CustomView = requireNativeComponent<ViewProps>("MyViewManager")
//const CustomView = requireNativeComponent("MyViewManager") as any


//function KnowMore({ navigation: { navigate }, opw, port }: KnowMoreI): ReactElement {
//const MyViewManager = requireNativeComponent('MyViewManager');

const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds, ins, density }: any): ReactElement => {

  //const [ www, setWww ] = useState(false)

  // const createFragment = (viewId: any) => {
  //   console.log("AAA 111", viewId)
  //   //console.log("EEEEEE", UIManager.getViewManagerConfig('MyViewManager'))
    
  //   UIManager.dispatchViewManagerCommand(
  //     viewId,
  //     // we are calling the 'create' command
  //     //UIManager.MyViewManager.Commands.create.toString(),
  //     UIManager.getViewManagerConfig('MyViewManager').Commands.create.toString(),
  //     [viewId, 500, 500],
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
        width: '100%',
        height: '90%',
        backgroundColor: 'orange',
        //backgroundColor: 'transparent',
        display: 'flex',
        position: 'relative',
        //flex: 0,
        //flexGrow: 1,
        //overflow: 'visible',
        //zIndex: 2000000,
        //overflow: 'visible',
        
      }}
      
    >
      
      <CustomScrollView
        style={{
          display: 'flex',
          position: 'relative',
          width: 200,
          height: 300,
          top: 100,
          left: 60,
          //padding: 40, 
          paddingLeft: 12,
          paddingTop: 32,
          paddingRight: 40,
          paddingBottom: 10,
        }}
      >

        <View style={{ /* height: '50%', */ /* overflow: 'visible', */ /* zIndex: 2, */ display: 'flex', position: 'relative', /* marginLeft: 20, */ backgroundColor: 'red', /* width: '50%' */ /* height: '200%' */ }}>

          <Text style={{ /* zIndex: 3, */ fontWeight: '800' }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ fontSize: 22 }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ /* zIndex: 3, */ }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />

        </View>
      </CustomScrollView>
     
    </View>
  );
}

export default KnowMore;