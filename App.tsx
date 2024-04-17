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

function App(): React.JSX.Element {

  const [ demo, setDemo ] = useState([]);

  console.log("Adder:", demo)

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        <Text style={[s.result]}>{ demo }</Text>
        <OwnButton demo={demo} setDemo={setDemo} value="( )"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="C"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="/"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="B"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="7"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="8"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="9"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="X"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="4"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="5"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="6"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="-"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="1"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="2"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="3"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="+"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="M"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="0"></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="."></OwnButton>
        <OwnButton demo={demo} setDemo={setDemo} value="="></OwnButton>
      </View>
    </View>
  );
}

export default App;
