import { Dimensions } from 'react-native';
//import {useWindowDimensions} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//export let ins = useSafeAreaInsets(); // insets

//const {height, width, scale, fontScale} = useWindowDimensions();

export const opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw
export const hph = Dimensions.get('window').height; // hundredPercentHeight = 100%vh
export const dH = Dimensions.get('window').height; // deviceHeight
export const wH = Dimensions.get('window').height; // windowHeight

export let aB: number // additionalBottom
export let nB: boolean // navBar present ?

//if ((dH - ins.top) === wH) { nB = false, aB = 0 } // navBar NOT PRESENT
//else { nB = true, aB = ins.bottom } // navBar PRESENT