import { StyleSheet, Dimensions } from 'react-native';

const opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw

export const s = StyleSheet.create({
  background: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background2: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contour: {
    backgroundColor: 'silver',
    //backgroundColor: '#ababab',
    
    width: opw * 90,
    borderColor: 'darkblue',
    borderWidth: 2,
    /* height: opw * 134, */
    height: opw * 129.6,
    maxWidth: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    /* alignContent: 'stretch', */
    alignContent: 'space-between',
    /* alignContent: 'space-around', */
    paddingTop: opw * 1.5,
    paddingBottom: opw * 1.5,
    /* paddingTop: opw * 0.75,
    paddingBottom: opw * 0.75, */
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
    //borderColor: 'darkblue',
    borderWidth: .5,
  },
  mainResult: {
    //backgroundColor: 'burlywood', /* DEV */
    /* width: opw * 82, */
    height: opw * 8,
    lineHeight: opw * 8,
    borderColor: 'darkblue',
    /* color: 'red', */
    /* color: 'black', */
    /* color: '#141823', */
    color: 'rgba(0, 0, 0, .5)',
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'right',
    textAlignVertical: 'center',
    /* marginRight: opw * 1, */
    //paddingRight: opw * 2,
  },
  secondaryResult: {
    /* backgroundColor: 'lightgreen', */ /* DEV */
    /* width: opw * 82, */
    height: opw * 6,
    lineHeight: opw * 6,
    borderColor: 'darkblue',
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'right',
    textAlignVertical: 'center',
    //paddingRight: opw * 2,
  },
  mid: {
    backgroundColor: 'aqua',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
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
    /* backgroundColor: 'green', */
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
    left: ((opw * 90) / 2) - 23,
    borderRadius: 50
  
  },
});
