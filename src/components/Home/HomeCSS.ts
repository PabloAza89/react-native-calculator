import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  scroll: {
    //position: 'relative',
    //width: '100%',
    //height: '100%',
    /* backgroundColor: 'lightblue', */
    /* justifyContent: 'center',
    alignItems: 'center' */
    //justifyContent: 'center'
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    position: 'relative',
    //backgroundColor: 'lightblue',
    width: '100%',
    /* paddingTop:10, */
    /* height: 830, */
    //height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //verticalAlign: 'middle'
  },
  contour: {
    backgroundColor: 'silver',
    borderColor: 'darkblue',
    //borderWidth: 2,
    maxWidth: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
  },
  displayContainer: {
    backgroundColor: 'antiquewhite',
    borderColor: 'darkblue',
    fontSize: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderWidth: .5
  },
  mainResult: {
    //backgroundColor: 'burlywood', /* DEV */
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  secondaryResult: {
    /* backgroundColor: 'lightgreen', */ /* DEV */
    borderColor: 'darkblue',
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  parErr: {
    position: 'absolute',
    height: 40,
    top: -40,
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
    //bottom: -54,
    width: 42,
    height: 42,
  },
});
