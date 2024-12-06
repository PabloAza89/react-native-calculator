import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  text: {
    textAlign: 'center',
    //textAlignVertical: 'bottom'
    includeFontPadding: false
  },
  ownButton: {
    backgroundColor: '#ababab',
    borderColor: '#4d4db0',
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
    aspectRatio: 1,
    height: 0
  },
  ownButtonTabletop: {
    backgroundColor: '#ababab',
    borderColor: '#4d4db0',
    borderWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
    width: `${92/7}%`,
    height: `${(100 - (((3 / 7) + 1) * 4)) / 3}%`
  }
});
