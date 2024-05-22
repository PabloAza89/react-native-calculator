import { StyleSheet, Dimensions } from 'react-native';
import { opw } from '../constants';

export const s = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: opw * 30,
    height: opw * 30,
    borderRadius: (opw * 30) / 2 // 50%
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
  },
  imageWrapper: {
    marginTop: 20,
    marginBottom: 25
  },
  iconStyle: {
    position: 'absolute',
    right: (opw * -30) / 2,
    top: (opw * 30) / 3,
  },
  buttonTextUpper: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2
  },
  buttonTextLower: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    // marginLeft: -6,
    // marginRight: 2
  },
  space: {
    width: 25,
    height: 25,
  },
  buttonLower: {
    //flex: 1,
    //flexDirection: 'row-r'
    width: 200,
    flexDirection: 'row-reverse',
    // marginRight: 0,
    // paddingRight: 0
  }
});
