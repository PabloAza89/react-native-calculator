import { StyleSheet, Dimensions } from 'react-native';

const opw = Dimensions.get('window').width / 100; // onePercentWidth

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
    height: opw * 112,
    borderWidth: 2,
    maxWidth: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
    paddingTop: opw * 0.75,
    paddingBottom: opw * 0.75,
  },
  upper: {
    backgroundColor: 'antiquewhite',
    width: opw * 86,
    height: opw * 20,
    borderColor: 'darkblue',
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
  },
  text: {
    backgroundColor: 'red',
    width: opw * 20,
    height: opw * 20,
    borderColor: 'darkblue',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
