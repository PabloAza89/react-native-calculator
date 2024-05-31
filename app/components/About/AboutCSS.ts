import { StyleSheet } from 'react-native';
import { opw } from '../../../assets/constants';

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
  text: { // TEXT
    fontWeight: '500',
    fontSize: 24,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, .6)'
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
  textInButtonUpper: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginLeft: -6,
    marginRight: 2
  },
  textInButtonLower: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 15,
    marginRight: 4,
    marginLeft: -4,
    transform: [{ rotate: '180deg' }],
  },
  space: {
    width: 25,
    height: 25,
  },
  buttonAndIconLower: {
    transform: [{ rotate: '180deg' }]
  }
});
