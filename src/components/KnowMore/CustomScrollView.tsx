import { requireNativeComponent } from 'react-native';

const CustomScrollViewComponent = (props: any) => <CustomScrollView {...props} style={props.style} ref={props.scrollRef} />

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;