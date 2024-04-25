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
  contour: {
    backgroundColor: 'silver',
    width: opw * 90,
    borderColor: 'darkblue',
    /* height: opw * 134, */
    height: opw * 129.6,
    borderWidth: 2,
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
    justifyContent: 'center'
  },
  mainResult: {
    backgroundColor: 'burlywood',
    /* width: opw * 82, */
    height: opw * 8,
    lineHeight: opw * 8,
    borderColor: 'darkblue',
    fontSize: 30,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  secondaryResult: {
    backgroundColor: 'lightgreen',
    /* width: opw * 82, */
    height: opw * 6,
    lineHeight: opw * 6,
    borderColor: 'darkblue',
    fontSize: 17,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  mid: {
    backgroundColor: 'aqua',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
  },
  ownButton: {
    backgroundColor: 'red',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    /* fontWeight: '600', */
    /* transform: 'scaleX(1.5)' */
  },
  ownButtonSmaller: {
    backgroundColor: 'red',
    width: opw * 15.6,
    height: opw * 15.6,
    borderColor: 'darkblue',
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    /* fontWeight: '600', */
    /* transform: 'scaleX(1.5)' */
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
});
