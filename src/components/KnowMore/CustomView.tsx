import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Text,
  ViewProps,
  View
} from 'react-native';



interface Props {
  style?: object
  children?: object
 }


const CustomView = (props: any) => {

  //const [ aver, setAver ] = useState(null)

  //console.log("PROPS", props)
  //console.log("PROPS", typeof props.children)
  //console.log("PROPS", Array.isArray(props.children))
  //console.log("PROPS", props.children.map(e => e))
  //if (props.children !== aver) setAver(props.children)
  

  // useEffect(() => {
  //   setAver(props.children)

  // },[props.children])

  //return props.children

 
  
  return <NativeView ref={props.reff} {...props}  style={props.style} />
    //   { props.children }
    //   {/* { props.children.map((e: any) => {return e}) } */}
    // </NativeView>
  
}

const NativeView = requireNativeComponent('MyViewManager') as any

export default CustomView;
//export default NativeView;