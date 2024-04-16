import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { s } from './src/styles';
import { OwnButton } from './src/components/OwnButton';
/* import Icon from 'react-native-vector-icons/FontAwesome'; */
import Ionicons from '@expo/vector-icons/Ionicons';
//import { demo } from './src/components/OwnButton';

function App(): React.JSX.Element {

  const [ demo, setDemo ] = useState([]);

  //let setDemo:any = []

  console.log("Adder:", demo)

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        {/* <View style={[s.upper]}>{ demo }</View> */}
        {/* <Text style={[s.upper]}>{ demo }</Text> */}
        <Text style={[s.upper]}></Text>
        <OwnButton setDemo={setDemo} value="( )"></OwnButton>
        <OwnButton setDemo={setDemo} value="C"></OwnButton>
        <OwnButton setDemo={setDemo} value="/"></OwnButton>
        <OwnButton setDemo={setDemo} value="DEL"></OwnButton>
        <OwnButton setDemo={setDemo} value="7"></OwnButton>
        <OwnButton setDemo={setDemo} value="8"></OwnButton>
        <OwnButton setDemo={setDemo} value="9"></OwnButton>
        <OwnButton setDemo={setDemo} value="X"></OwnButton>
        <OwnButton setDemo={setDemo} value="4"></OwnButton>
        <OwnButton setDemo={setDemo} value="5"></OwnButton>
        <OwnButton setDemo={setDemo} value="6"></OwnButton>
        <OwnButton setDemo={setDemo} value="-"></OwnButton>
        <OwnButton setDemo={setDemo} value="1"></OwnButton>
        <OwnButton setDemo={setDemo} value="2"></OwnButton>
        <OwnButton setDemo={setDemo} value="3"></OwnButton>
        <OwnButton setDemo={setDemo} value="+"></OwnButton>
        <OwnButton setDemo={setDemo} value="+/-"></OwnButton>
        <OwnButton setDemo={setDemo} value="0"></OwnButton>
        <OwnButton setDemo={setDemo} value="."></OwnButton>
        <OwnButton setDemo={setDemo} value="="></OwnButton>
      </View>
    </View>
  );
}

export default App;
