import {
  useEffect,
  useRef,
} from 'react';
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  Text,
  ViewProps,
} from 'react-native';


//const StackView = requireNativeComponent<ViewProps>('StackView')// as any
const StackView = requireNativeComponent('MyViewManager')// as any

interface IWrapperProps {
  children?: React.ReactNode | null;
  onPress?: () => void;
  testId?: string;
};

//const StackViewComponent = ({ children, props }: IWrapperProps) => {
const StackViewComponent = (props: any) => {

  console.log("PROPS", props.children)

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
    <StackView
      //style={{ flex: 1, backgroundColor: 'pink' /* height: 500, width: 500 */ }} /* ref={ref}  */
      {...props}
    >
      { props.children }
      {/* <Text>
        REACTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
      </Text> */}
    </StackView>
  )
}

export default StackViewComponent



// const MyCustomView = requireNativeComponent('MyViewManager') as any

// export default MyCustomView


// const StackView = requireNativeComponent('MyViewManager') as any

// export default StackViewComponent