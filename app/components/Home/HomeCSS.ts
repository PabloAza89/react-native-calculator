import { StyleSheet } from 'react-native';
import { opw } from '../../../assets/constants';

export const s = StyleSheet.create({
  background: {
    backgroundColor: 'lightblue',
    //backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    //marginTop: -10,
    //top: 0,
    //justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //zIndex: 2000000
  },
  contour: {
    backgroundColor: 'silver',
    width: opw * 90,
    borderColor: 'darkblue',
    borderWidth: 2,
    height: opw * 129.6,
    maxWidth: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    paddingTop: opw * 1.5,
    paddingBottom: opw * 1.5
  },
  displayContainer: {
    backgroundColor: 'antiquewhite',
    width: opw * 86,
    height: opw * 20,
    borderColor: 'darkblue',
    fontSize: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: opw * 2,
    paddingRight: opw * 2,
    borderWidth: .5
  },
  mainResult: {
    //backgroundColor: 'burlywood', /* DEV */
    height: opw * 8,
    lineHeight: opw * 8,
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  secondaryResult: {
    /* backgroundColor: 'lightgreen', */ /* DEV */
    height: opw * 6,
    lineHeight: opw * 6,
    borderColor: 'darkblue',
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'rgba(0, 0, 0, .5)'
  },
  mid: {
    backgroundColor: 'aqua',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue'
  },
  text: {
    backgroundColor: 'red',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  parErr: {
    position: 'absolute',
    height: 40,
    top: -40,
    width: opw * 86,
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  question: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: 'green', // DEV
    bottom: -54,
    width: 42,
    height: 42,
    borderRadius: (opw * 50) / 2,
    left: ((opw * 90) / 2) - 23
  },
});
