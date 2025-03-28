import { requireNativeComponent } from 'react-native';

const CustomScrollViewComponent = (props: any) => <CustomScrollView {...props} style={props.style} />

const CustomScrollView = requireNativeComponent('CustomScrollView')

export default CustomScrollViewComponent;