import React, { ReactElement, useState, useEffect, useRef,
  
} from 'react';
import { requireNativeComponent, findNodeHandle } from 'react-native';

const CustomScrollViewComponent = (props: any) => {

  //const ref = useRef(null);

  

  // props.testFunc = () => {
  //   console.log("CALLED")
  // }


  //props.testProp()

  //console.log("CALLED CHILDREN", props.testProp())

  return (<CustomScrollView
    {...props}
    style={props.style}
    ref={props.reff}
    //onMomentumScrollEnd={console.log("FINISHED")}
    //onScroll={console.log("FINISHED")}
  />
  )
}

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;