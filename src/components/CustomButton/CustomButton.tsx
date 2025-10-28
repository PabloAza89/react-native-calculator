import { forwardRef } from 'react';
import { ScrollView, View } from 'react-native';

const CustomButton = (props: any) => {
  return (
    <View
      style={{
        marginLeft: props.margin[0] | 0,
        marginTop: props.margin[1] | 0,
        marginRight: props.margin[2] | 0,
        marginBottom: props.margin[3] | 0,
      }}
    >
      <props.type
        name={props.name}
        size={props.size}
        color={props.color}
        onPress={props.onPress}
        style={props.style}
        children={props.children}
      >
      </props.type>
    </View>
  )
};

export default CustomButton;

// <Ionicons.Button
//   
//   
// />


// twoScreens ?
// <Ionicons.Button
//   name={ state === 'tabletop' ? 'calculator-sharp' : 'alert-circle' }
//   size={30}
//   color='rgba(0, 0, 0, .7)'
//   onPress={() => nextScreen()}
//   children={ <Text style={s.textInButtonUpper} children={ state === 'tabletop' ? 'HOME' : 'HOW DOES IT WORK ?' } /> }
// /> :
// <Ionicons.Button
//   name='chevron-back-circle-sharp'
//   size={30}
//   color='rgba(0, 0, 0, .7)'
//   onPress={() => navigate('KnowMore')}
//   style={s.buttonAndIconLower}
//   children={ <Text style={s.textInButtonLower} children={'HOW DOES IT WORK ?'} /> }
// />