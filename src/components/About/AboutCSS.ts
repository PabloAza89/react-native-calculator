import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%'
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center'
  },
  imageWrapper: {
    //backgroundColor: 'lightcoral', // DEV
    marginTop: 20,
    marginBottom: 25,
    //justifyContent: 'flex-start'
  },
  iconStyle: {
    position: 'absolute'
  },
  buttonModal: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2,
    height: 25,
    width: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  textInButtonUpper: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  textInButtonLower: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginRight: 4,
    marginLeft: -4,
    transform: [{ rotate: '180deg' }]
  },
  space: {
    width: 25,
    height: 25,
  },
  buttonAndIconLower: {
    transform: [{ rotate: '180deg' }]
  }
});
