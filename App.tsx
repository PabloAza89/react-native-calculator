import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import RNBootSplash from "react-native-bootsplash";

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const Stack: any = createNativeStackNavigator();

function App(): React.JSX.Element {

  // useEffect(() => {
  //   const init = async () => {
  //     // …do multiple sync or async tasks
  //   };

  //   init().finally(async () => {
  //     await RNBootSplash.hide({ fade: true });
  //     console.log("Bootsplash has been hidden successfully");
  //   });
  // }, []);

  // useEffect(() => {
  //   RNBootSplash.hide({ fade: true })
  //   //RNBootSplash.hide()
  // }, [])

  // <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>

  return (

    
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          navigationBarColor: 'transparent', // BOTTOM
          //navigationBarHidden: true, // BOTTOM
        }}
      >
        {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{ animation: 'slide_from_right' }}
        /> */}
        <Stack.Screen
          name="About"
          component={About}
          options={{ animation: 'slide_from_right' }}
        />
        {/* <Stack.Screen
          name="KnowMore"
          component={KnowMore}
          options={{ animation: 'slide_from_right' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
