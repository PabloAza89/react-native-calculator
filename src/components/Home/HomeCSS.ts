import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  background: {
    //backgroundColor: 'lightblue',
    position: 'relative',
    //width: '100%',
    /* width: 839, */
    //width: 835, // dp full
    //width: 417, // dp half
    //width: 208, // dp quarter
    justifyContent: 'center',
    alignItems: 'center',
    /* height: 641 */
  },
  contour: {
    backgroundColor: 'silver',
    borderColor: 'darkblue',
    /* maxWidth: '100%', */
    /* maxWidth: 400, */
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    /* alignContent: 'space-between' */
    /* alignContent: 'space-around' */
    /* alignContent: 'center' */
    alignContent: 'stretch',
    
    

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
    //backgroundColor: 'green', // DEV
    position: 'absolute',
    color: 'red',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  question: {
    //backgroundColor: 'green', // DEV
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 42,
    height: 42
  },
});
