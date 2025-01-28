import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    //width: '100%'
  },
  scrollView: {
    //backgroundColor: 'red', // DEV
    width: '100%'
  },
  scrollViewInner: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    //backgroundColor: 'green', // DEV
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
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
  backgroundModal: {
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    zIndex: 1000000,
    width: '100%',
    height: '100%',
  },
  backgroundModalButton: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    display: 'flex',
    position: 'relative',
    opacity: 1,
    zIndex: 1000001,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  upperModal: {
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    includeFontPadding: false,
    fontWeight: "500"
  },
  lowerModal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
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
    transform: [{ rotate: '180deg' }],
    //marginBottom: 35, // MORE THAN 24dp OF STATUS BAR
  },
  space10: {
    width: 10,
    height: 10,
  },
  space25: {
    width: 25,
    height: 25,
  },
  space35: { // MORE THAN 24dp OF STATUS BAR
    width: 35,
    height: 35,
  },
  buttonAndIconLower: {
    transform: [{ rotate: '180deg' }],
    //height: 15,
    //marginBottom: 35, // MORE THAN 24dp OF STATUS BAR
    //paddingTop: 35, // MORE THAN 24dp OF STATUS BAR
  }
});
