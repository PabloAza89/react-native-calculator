import { StyleSheet } from 'react-native';
import { opw } from '../constants';

export const s = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%'
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  profile: {
    width: opw * 30,
    height: opw * 30,
    borderRadius: (opw * 30) / 2 // 50%
  },
  centerText: {
    marginTop: 20,
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    //backgroundColor: 'blue', // DEV
    width: '95%'
  },
  leftText: {
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'left',
    //backgroundColor: 'blue', // DEV
    width: '95%'
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
    fontWeight: '700',
    position: 'absolute',
    color: 'rgba(0, 0, 0, .7)',
    paddingLeft: 0,
    left: 0,
    top: 0,
    fontSize: 20,
    textAlign: 'center',
    verticalAlign: 'middle',
    //backgroundColor: 'red', // DEV
    width: 40,
    height: 28
  },
  rightItem: {
    fontSize: 20,
    textAlign: 'left',
    //backgroundColor: 'lightblue', // DEV
    fontWeight: "bold"
  },
  sn: {
    fontSize: 13,
  },
  dot: {
    lineHeight: 13
  },
  last: {
    marginBottom: 20,
  },
  imageWrapper: {
    marginTop: 20,
    marginBottom: 25
  },
  iconStyle: {
    position: 'absolute',
    right: (opw * -30) / 2,
    top: (opw * 30) / 3
  },
  textInButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2
  },
  space: {
    width: 25,
    height: 25
  },
  buttonAndIconLower: {
    transform: [{ rotate: '180deg' }]
  },
  buttonContainer: {
    marginTop: 35,
    flexDirection: 'row'
  },
  eachItemInner: {
    //backgroundColor: 'lightgreen', // DEV
    width: (opw * 95) - 40, // 95% - 40
    paddingLeft: 25,
  },
  leftItemInner: {
    //fontWeight: '700',
    position: 'absolute',
    color: 'rgba(0, 0, 0, .7)',
    paddingLeft: 0,
    left: 0,
    top: 0,
    fontSize: 20,
    textAlign: 'center',
    //backgroundColor: 'red', // DEV
    width: 25,
  },
  rightItemInner: {
    fontSize: 20,
    textAlign: 'left',
    //backgroundColor: 'lightyellow', // DEV
    fontWeight: "bold"
  },
  floatButton: {
    //backgroundColor: 'red',
    backgroundColor: 'rgba(66, 72, 245, 0.5)',
    position: 'absolute',
    width: 60,
    height: 40,
    // zIndex: 600000,
    bottom: 10,
    right: 10,
    color: 'white',

    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    // paddingHorizontal: 32,
    borderRadius: 4,
    //elevation: 11,
    //shadowColor: 'red',
    //backgroundColor: 'black',
  },
  floatButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
