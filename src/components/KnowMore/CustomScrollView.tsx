import { requireNativeComponent, View } from 'react-native';

const CustomScrollViewComponent = (props: any) => {
  //console.log("TESTTTTTTTTTT", props.style.paddingTop)
  console.log("TESTTTTTTTTTT", props.contentContainerStyle)
  //console.log("TESTTTTTTTTTT 2", props.contentContainerStyle.paddingLeft | 0)
  return (<CustomScrollView {...props} style={props.style} ref={props.scrollRef}>
    <View collapsable={false} style={{ 
      //paddingTop: 24,
      //paddingBottom: 48,
      // paddingLeft: 0,
      // paddingTop: props.contentContainerStyle.paddingTop | 0,
      // paddingRight: 0,
      // paddingBottom: 0,
      //flex: 1,
      // display: 'flex',
      // position: 'relative',
      // height: '100%',
      // width: '100%',
      //marginTop: 48,
      //marginBottom: 48,
      paddingLeft: props.contentContainerStyle.paddingLeft | 0,
      //paddingTop: 24,
      paddingTop: props.contentContainerStyle.paddingTop | 0,
      paddingRight: props.contentContainerStyle.paddingRight | 0,
      //paddingBottom: 48,
      paddingBottom: props.contentContainerStyle.paddingBottom | 0,
    }}>
      {props.children}</View>
    
  </CustomScrollView>)
  //return (<CustomScrollView {...props} style={props.style} ref={props.scrollRef}/>)
}

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;

// import { requireNativeComponent } from 'react-native';

// const CustomScrollViewComponent = (props: any) => <CustomScrollView {...props} style={props.style} ref={props.scrollRef} />

// const CustomScrollView = requireNativeComponent('CustomScrollView')

// export default CustomScrollViewComponent;