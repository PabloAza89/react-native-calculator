import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    /* paddingRight: 50,
    paddingLeft: 50, */
    /* marginRight: 50,
    marginLeft: 50, */
    /* zIndex: 2000000, */
  },
  linearGradient: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  customScrollView: {
    //backgroundColor: 'red', // DEV
    width: '100%', // THIS
    height: '100%', // THIS
    //flexGrow: 1,
    //height: '100%',
    //flex: 1,
    //height: '100%', // NEW
    backgroundColor: 'red',
    
  },
  scrollViewInner: {
    //flex: 1,
    //display: 'flex',
    //flexDirection: 'column',
    //backgroundColor: 'red', // DEV
    //flexGrow: 1, //THIS
    //height: '100%',
    //width: '100%', //THIS
    //justifyContent: 'center', //THIS
    //alignContent: 'center', //no
    // alignContent: 'space-around', //no
    //alignContent: 'space-between', //no
    //alignSelf: 'center', //no
    //justifyContent: 'center',
    //alignItems: 'center', //THIS
    //alignSelf: 'center', // ???
    //width: 400
  },
  title: {
    //backgroundColor: 'green', // DEV
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    //color: 'red'
    color: 'rgba(0, 0, 0, .54)'
  },
  imageWrapper: {
    display: 'flex',
    position: 'relative',
    //backgroundColor: 'lightcoral', // DEV
    //marginTop: 20, // THIS
    //paddingTop: 20,
    //marginBottom: 25, // THIS
  },
  iconStyle: {
    position: 'absolute'
  },
  backgroundModal: {
    //backgroundColor: 'yellow', // DEV
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    position: 'absolute',
    zIndex: 1000000,
    width: '100%',
    height: '100%',
  },
  backgroundModalButton: {
    //backgroundColor: 'red', // DEV
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
    fontWeight: "500",
    color: 'rgba(0, 0, 0, .54)'
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
    transform: [{ rotate: '180deg' }]
  },
  space10: {
    width: 10,
    height: 10,
  },
  space25: {
    width: 25,
    height: 25,
  },
  buttonAndIconLower: {
    transform: [{ rotate: '180deg' }]
  }
});
