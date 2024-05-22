import { StyleSheet, Dimensions } from 'react-native';

const opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw

export const ss = StyleSheet.create({
  question: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue', // DEV
    bottom: -54,
    width: 42,
    height: 42,
    left: ((opw * 90) / 2) - 23,
    borderRadius: 50
  
  },
});
