import { requireNativeComponent, View } from 'react-native';

const CustomScrollViewComponent = (props: any) => {
  console.log("props", props)
  return (
    <CustomScrollView {...props} style={props.style} ref={props.scrollRef}
    //scrollbarPadding={}
      scrollbarPadding={{
          left: props?.scrollbarPadding?.left | 0,
          top: props?.scrollbarPadding?.top | 0,
          right: props?.scrollbarPadding?.right | 0,
          bottom: props?.scrollbarPadding?.bottom | 0,
        }}
    >
      <View collapsable={false} 
        // style={{
        //   paddingLeft: props?.contentContainerStyle?.paddingLeft | 0,
        //   paddingTop: props?.contentContainerStyle?.paddingTop | 0,
        //   paddingRight: props?.contentContainerStyle?.paddingRight | 0,
        //   paddingBottom: props?.contentContainerStyle?.paddingBottom | 0,
        // }}
        style={props?.contentContainerStyle}
      >
        {props.children}
      </View>
    </CustomScrollView>
  )
}

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;