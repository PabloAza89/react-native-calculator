import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    //backgroundColor: 'red',
    left: 0,
    right: 0,
    //transform: [{ backgroundColor: 'red' }]
  },
  mainContainer: {
    height: '100%',
    width: '100%'
  },
  background: {
    //backgroundColor: 'red', // DEV
    alignItems: 'center',
    //transform: [{ rot }]
  },
  centerText: {
    //backgroundColor: 'blue', // DEV
    marginTop: 20,
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    width: '95%',
    color: 'rgba(0, 0, 0, .54)'
  },
  leftText: {
    //backgroundColor: 'blue', // DEV
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'left',
    width: '95%',
    color: 'rgba(0, 0, 0, .54)'
  },
  eachItem: {
    //backgroundColor: 'green', // DEV
    width: '95%',
    paddingLeft: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.3)',
    marginBottom: 6,
    paddingBottom: 6
  },
  leftItem: {
    //backgroundColor: 'red', // DEV
    fontWeight: '700',
    position: 'absolute',
    color: 'rgba(0, 0, 0, .7)',
    paddingLeft: 0,
    left: 0,
    top: 0,
    fontSize: 20,
    textAlign: 'center',
    verticalAlign: 'middle',
    width: 40,
    height: 28
  },
  rightItem: {
    //backgroundColor: 'lightblue', // DEV
    fontSize: 20,
    textAlign: 'left',
    fontWeight: "bold",
    color: 'rgba(0, 0, 0, .54)'
  },
  sn: {
    fontSize: 13
  },
  dot: {
    lineHeight: 13
  },
  textInButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2,
    textAlign: 'center',
    justifyContent: 'center'
  },
  space: {
    width: 25,
    height: 25
  },
  buttonContainer: {
    //backgroundColor: 'green', // DEV
    flexDirection: 'row'
  },
  eachItemInner: {
    //backgroundColor: 'lightgreen', // DEV
    paddingLeft: 25
  },
  leftItemInner: {
    //backgroundColor: 'red', // DEV
    position: 'absolute',
    color: 'rgba(0, 0, 0, .7)',
    paddingLeft: 0,
    left: 0,
    top: 0,
    fontSize: 20,
    textAlign: 'center',
    width: 25
  },
  rightItemInner: {
    //backgroundColor: 'lightyellow', // DEV
    fontSize: 20,
    textAlign: 'left',
    fontWeight: "bold",
    color: 'rgba(0, 0, 0, .54)'
  },
  floatButton: {
    //backgroundColor: 'red', // DEV
    backgroundColor: 'rgba(66, 72, 245, 0.5)',
    position: 'absolute',
    width: 60,
    height: 40,
    right: 10,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  floatButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
});
