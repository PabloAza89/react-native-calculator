import { StyleSheet, Dimensions } from 'react-native';

const opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw

export const s = StyleSheet.create({
  background: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
