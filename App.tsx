import React, { useState, useEffect, useRef } from 'react';
//import type { MutableRefObject } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  const [ input, setInput ] = useState("");
  const [ secInput, setSecInput ] = useState("");
  const [ parErr, setParErr ] = useState(false);
  const [ resPressed, setResPressed ] = useState(false);

  useEffect(() => {
    scrollEnd()
  }, [input])

  const scrollRefUpper = React.createRef<ScrollView>();
  const scrollRefCenter = React.createRef<ScrollView>();

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="About"
          component={About}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
