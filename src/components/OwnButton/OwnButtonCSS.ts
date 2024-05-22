import { StyleSheet } from 'react-native';
import { opw } from '../constants'

export const s = StyleSheet.create({
  ownButtonT: {
    fontSize: 40,
    textAlign: 'center'
  },
  ownButtonSmallerT: {
    fontSize: 32,
    textAlign: 'center'
  },
  lineHeight: {
    lineHeight: 34 // ALIGN PARENTHESIS
  },
  ownButton: {
    backgroundColor: '#ababab',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
    borderWidth: .5,
    justifyContent: 'center'
  },
  ownButtonSmaller: {
    backgroundColor: '#ababab',
    width: opw * 15.6,
    height: opw * 15.6,
    borderColor: 'darkblue',
    borderWidth: .5,
    justifyContent: 'center'
  }
});
