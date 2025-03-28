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
import CustomScrollView from './CustomScrollView';


const KnowMore = ({ navigation, /* opw, */ height, state, switchSide, twoScreens, nextScreen, aboutUp, hingeBounds, ins }: any): ReactElement => {

  return (
    <View
      style={{
        width: '100%',
        height: '90%',
        backgroundColor: 'orange',
        //backgroundColor: 'transparent',
        display: 'flex',
        position: 'relative',
        //flex: 1,
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
          backgroundColor: 'yellow',
          //flex: 1,
          //flexGrow: 1,
        }}
      >

        <View style={{ /* height: '50%', */ /* overflow: 'visible', */ /* zIndex: 2, */ display: 'flex', position: 'relative', /* marginLeft: 20, */ backgroundColor: 'red', /* width: '50%' */ /* height: '200%' */ }}>

          <Text style={{ fontWeight: '800' }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text style={{ fontSize: 22 }} children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />
          <Text children={'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'} />

        </View>
      </CustomScrollView>
     
    </View>
  );
}

export default KnowMore;