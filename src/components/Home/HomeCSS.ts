import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
  background: {
    backgroundColor: 'lightblue',
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    backgroundColor: 'darkblue'
  },
  contour: {
    backgroundColor: 'silver',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'stretch',
    margin: 3
  },
  displayContainer: {
    backgroundColor: 'antiquewhite',
    borderColor: '#4d4db0',
    alignItems: 'flex-end',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  displayContainerPort: {
    width: '96%',
    marginLeft: '2%',
    marginTop: '2%'
  },
  displayContainerLand: {
    width: '98%',
    marginLeft: '1%',
    marginTop: '1%'
  },
  secondaryResult: {
    //backgroundColor: 'lightgreen', // DEV
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  mainResult: {
    //backgroundColor: 'burlywood', // DEV
    borderColor: 'darkblue',
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    textAlignVertical: 'center',
    includeFontPadding: false
  },
  parErr: {
    //backgroundColor: 'green', // DEV
    color: 'red',
    textAlign: 'center',
    includeFontPadding: false
  },
  question: {
    //backgroundColor: 'green', // DEV
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 42,
    height: 42
  },
  tabletopContainer: { // TABLETOP // TABLETOP // TABLETOP //
    //backgroundColor: 'lightgreen', // DEV
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  upperScreenTabletop: {
    //backgroundColor: '#004747', // DEV
    justifyContent: 'center',
    alignItems: 'center'
  },
  lowerScreenTabletop: {
    //backgroundColor: '#581199', // DEV
    justifyContent: 'center',
    alignItems: 'center'
  },
  landButtonsContainer: {
    //backgroundColor: 'yellow', // DEV
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '1%',
    width: '99%',
    justifyContent:'space-around',
    alignContent: 'space-between'
  },
  bookContainer: { // BOOK // BOOK // BOOK // BOOK // BOOK //
    //backgroundColor: 'lightgreen', // DEV
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  leftScreenBook: {
    //backgroundColor: '#004747', // DEV
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightScreenBook: {
    //backgroundColor: '#581199', // DEV
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBackgroundOtherScreen: { // MODAL // MODAL // MODAL //
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
    zIndex: 1000000,
    width: '100%',
    height: '100%'
  },
  modalBackgroundOtherScreenPressable: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
