import { requireNativeComponent, View } from 'react-native';

const CustomScrollViewComponent = (props: any) => {
  return (<CustomScrollView {...props} style={props.style} ref={props.scrollRef}>
    <View collapsable={false} style={{
      paddingLeft: props.contentContainerStyle.paddingLeft | 0,
      paddingTop: props.contentContainerStyle.paddingTop | 0,
      paddingRight: props.contentContainerStyle.paddingRight | 0,
      paddingBottom: props.contentContainerStyle.paddingBottom | 0,
    }}>
      {props.children}
    </View>
  </CustomScrollView>)
}

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;