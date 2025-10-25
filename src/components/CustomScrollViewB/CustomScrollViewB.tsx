import { forwardRef } from 'react';
import { requireNativeComponent, View, ScrollView } from 'react-native';

//const CustomScrollView = requireNativeComponent('CustomScrollView')

// const CustomScrollViewComponent = (props: any) => {
//   //console.log("props", props)
//   //const { children, contentContainerStyle, style, scrollRef, scrollbarPadding, ...rest } = props;
//   return (
//     <CustomScrollView {...props} style={props.style} ref={props.scrollRef}
//     //scrollbarPadding={}
//       scrollbarPadding={{
//           left: props.scrollbarPadding?.left | 0,
//           top: props.scrollbarPadding?.top | 0,
//           right: props.scrollbarPadding?.right | 0,
//           bottom: props.scrollbarPadding?.bottom | 0,
//         }}
//     >
//       <View
//         collapsable={false}
//         //collapsableChildren={false}
//         style={[
//           { flexDirection: 'column', flexShrink: 0 }, // Ensure basic Flex behavior
//           //contentContainerStyle
//         ]}
//       >
//         {props.children}
//       </View>
      
//     </CustomScrollView>
//   )
// }

//<View /* collapsable={false} */
  //      style={{
    //      paddingLeft: props?.contentContainerStyle?.paddingLeft | 0,
     //     paddingTop: props?.contentContainerStyle?.paddingTop | 0,
      //    paddingRight: props?.contentContainerStyle?.paddingRight | 0,
       //   paddingBottom: props?.contentContainerStyle?.paddingBottom | 0,
    //    }}
    //    style={props?.contentContainerStyle}
    //  >
    //    {props.children}
    //  </View>

// const CustomScrollViewB = (props: any) => {
//   return <ScrollView {...props} /* persistentScrollbar={props.persistentScrollbar} */ /* style={props.style} */ ref={props.scrollRef} />
//   //   
//   //console.log("props", props)
//   //const { children, contentContainerStyle, style, scrollRef, scrollbarPadding, ...rest } = props;
//   // return (
//   //   <CustomScrollView {...props} 
//   //     //contentContainerStyle={props.contentContainerStyle}
//   //   >
//   //     {/* <View style={props.contentContainerStyle}> */}
//   //       {props.children}
//   //     {/* </View> */}
//   //   </CustomScrollView>
//   // )
// }

//const CustomScrollViewB = (props: any) => {
const CustomScrollViewB = forwardRef((props: any, ref: any) => {
  return <ScrollView ref={ref} {...props} />
  //return <ScrollView {...props} ref={props.scrollRef} />
})

//export default CustomScrollView;
export default CustomScrollViewB;