// import {
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import {
//   requireNativeComponent,
//   UIManager,
//   findNodeHandle,
//   Text,
//   ViewProps,
//   View
// } from 'react-native';

//import { PropTypes } from 'react';
import { NativeModules, requireNativeComponent, ScrollView, Platform, HostComponent } from 'react-native';


// interface Props {
//   style?: object
//   children?: object
//  }


// const CustomView = (props: any) => {

//   //const [ aver, setAver ] = useState(null)

//   //console.log("PROPS", props)
//   //console.log("PROPS", typeof props.children)
//   //console.log("PROPS", Array.isArray(props.children))
//   //console.log("PROPS", props.children.map(e => e))
//   //if (props.children !== aver) setAver(props.children)
  

//   // useEffect(() => {
//   //   setAver(props.children)

//   // },[props.children])

//   //return props.children

 
  
//   return <NativeView ref={props.reff} {...props}  style={props.style} />
//     //   { props.children }
//     //   {/* { props.children.map((e: any) => {return e}) } */}
//     // </NativeView>
  
// }

// class AuScrollView extends ScrollView {
//   constructor(props: any) {
//     super(props);
//   }
//   //render ()
// }

// class AuScrollView extends ScrollView {
//   constructor(props: any) {
//     super(props);
//   }
// }

// const AuScrollView: ScrollView = () => {
//   return 

// }

// let nativeOnlyProps,
//   AndroidScrollView,
//   AndroidHorizontalScrollView,
//   RCTScrollView,
//   RCTScrollContentView;
  
// nativeOnlyProps = {
//   nativeOnly: {
//     sendMomentumEvents: true,
//   }
// };

//const NativeView = requireNativeComponent('MyViewManager') as any
//const NativeView = requireNativeComponent('AuScrollView') as any
// const NativeView = requireNativeComponent(
//   'RCTScrollView',
//   (AuScrollView: ReactClass<any>)
// )

const CustomView = (props: any) => {
  return <ASD /* ref={props.reff} */ {...props}  style={props.style} /> // {props.children}</ASD>
}

//const ASD = requireNativeComponent('AuScrollView', 'asdasd')

// eslint-disable-next-line
// @ts-ignore
//const ASD = requireNativeComponent('AuScrollView')//, AuScrollView, nativeOnlyProps);

const ASD = requireNativeComponent('AuScrollView')//, null) as any

export default CustomView;
//module.exports = AuScrollView;
//export default AuScrollView
//export default NativeView;


// export default (requireNativeComponent(
//   'RNTMyLegacyNativeView',
// ): HostComponent<NativeProps>);

//export default ASD
//export default CustomView;