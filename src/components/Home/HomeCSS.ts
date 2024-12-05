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
    //justifyContent: 'space-evenly',
    //justifyContent: 'space-around',
    //justifyContent: 'space-between',
    /* alignContent: 'space-between' */
    /* alignContent: 'space-around' */
    /* alignContent: 'center' */
    alignContent: 'stretch',
    
    

  },
  displayContainer: {
    //display: 'flex',
    //flexDirection: 'column',
    backgroundColor: 'antiquewhite',
    borderColor: '#4d4db0',
    //fontSize: 30,
    //fontSize: 'auto',
    alignItems: 'flex-end',
    //justifyContent: 'flex-start',
    //justifyContent: 'center',
    //justifyContent: 'space-around',
    //justifyContent: 'space-evenly',
    //justifyContent: 'center',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  secondaryResult: {
    //backgroundColor: 'lightgreen', // DEV
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    //height: '25%'
    textAlignVertical: 'center',
    //textAlignVertical: "bottom",
    includeFontPadding: false
  },
  mainResult: {
    //backgroundColor: 'burlywood', // DEV
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    //height: '50%'
    //textAlignVertical: 'top',
    //textAlignVertical: 'center',
    //textAlignVertical: "bottom",
    //textAlignVertical: 'center',
    //textAlignVertical: 'center',
    includeFontPadding: false
  },

  parErr: {
    //backgroundColor: 'green', // DEV
    //position: 'absolute',
    color: 'red',
    //fontSize: 17,
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
