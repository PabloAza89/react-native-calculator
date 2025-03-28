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
import CustomView from './CustomView'; // CLASS

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
      //overScrollMode='always'
      //ove
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
      //removeClippedSubviews={true}
      //removeClippedSubviews={true}
      
    >
      
      <CustomView
        // FlatList
        // CustomView
        // ScrollView
        //scrollEnabled={true}
        //overScrollMode={'never'}
        //bounces={true}
        //overScrollMode='never' // 'never' 'always' 'auto'
        //padding={"50, 50, 50, 50"}
        //reff={ref}
        //removeClippedSubviews={false}
        //removeClippedSubviews={true}
        //refreshing={true}
        //refreshControl
       /*  refreshControl={
          <RefreshControl
            enabled={false}
            refreshing={false}
            //onRefresh={onRefresh}
          />
        } */
        style={{
          /* zIndex: 1, */
          //zIndex: 2000000,
          //mixBlendMode: 'overlay',
          display: 'flex',
          position: 'relative',
          //pointerEvents: 'box-none',
          //flex: 1,
          //...padding(50, 50, 50, 50),
          //display: 'flex', position: 'relative',
          // width: '50%',
          // height: '70%',
          width: 200,
          height: 300,
          top: 100,
          left: 60,
          //padding: 40, 
          paddingLeft: 12,
          paddingTop: 32,
          paddingRight: 60,
          paddingBottom: 10,
       
          //paddingVertical: 20,
          //overflow: 'visible',
          //flexGrow: 1,
          //flex: 1,
          //flexGrow: 1,
          //flexGrow: 1,
          //paddingBottom: 30,
          //overflow: 'visible', // 'visible', 'hidden', 'scroll'
          //flexShrink: -8000,
          //overflow: ''
          //padding: 20,
          //backgroundColor: 'yellow',
          //backgroundColor: '#5bdec8', // lightgreen
          // 
          //flexDirection: "row",
          //flexDirection: "column",
          //paddingInline: 50,
          //paddingVertical: 50,
          // justifyContent: 'center',
          // alignItems: 'center',
          //position: 'absolute',
          //position: 'relative',
          //marginTop: 20,
          //margin: 10,
          //topMargin: 10,
          //leftMargin: 10,
          //paddingLeft: 10,
          //padding: 10,
          //padding: '50px',
          /* padding: 20, */
          //padding: 0,
          //padding: 50,
          //paddingLeft: 50,
          //padding: { 10, 10, 10, 10 },
          //padding: { 10, 10, 10, 10 },
          //padding: '20 20 20 20',
          //padding: '20dp,20dp,20dp,20dp',
          //padding: '20,20,20,20',
          //padding: '20,20,20,20',
          
          //padding: 50,
          // ...{ paddingLeft: 50,
          //   paddingTop: 50,
          //   paddingRight: 50,
          //   paddingBottom: 50 },
          // ...{ paddingLeft: 50,
          //   paddingTop: 50,
          //   paddingRight: 50,
          //   paddingBottom: 50 },
          // paddingTop: 10,
          // paddingLeft: "10dp",
          // paddingRight: "10dp",
          // paddingBottom: "10dp",
          // paddingTop: 10,
          // paddingLeft: 10,
          // paddingRight: 10,
          // paddingBottom: 10,
          //borderColor: 'red',
          //borderColor: 'red',
          //borderTopRightRadius: 30,
          //borderWidth: 30,
          //mixBlendMode: "saturation",
          //outlineColor: 'red',
          //opacity: 0.5,
          //color: 'red',
          //textSize: 100,
          //top: 10,
          //left: 10,
          //fontWeight: 800,
          //bottom: 50,
          //padding: [30, 30, 30, 30],
          //height: 500,
          //padding: 200,
          //backgroundColor: 'red'
          //flexWrap: 'wrap',
        }}
        contentContainerStyle={[ {
          /* height: '50%', */
          //flexGrow: 1,
          //overflow: 'visible',
          // flexGrow: 1,
          // flex: 1,
          //paddingTop: 25,
          /* paddingVertical: 10 */ /* top: ins.top *1, *//* top: ins.top*-1 */
          // marginTop: 24,
          // paddingBottom: 24,
          //padding: 24 * 1,
        }]}
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
          {/* <View style={{ display: 'flex', position: 'relative', backgroundColor: 'yellow', width: 100, height: '10%',  }}>
          
        </View> */}

      </CustomView>
     
    </View>
  );
}

export default KnowMore;