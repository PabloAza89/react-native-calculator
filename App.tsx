import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/components/Home/Home';
import About from './src/components/About/About';
import KnowMore from './src/components/KnowMore/KnowMore';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
//import * as Font from 'expo-font';

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

SplashScreen.preventAutoHideAsync();

function App(): React.JSX.Element {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      // Keep the splash screen visible
      await SplashScreen.preventAutoHideAsync();
      // Do what you need before the splash screen gets hidden
      console.log("I'm a task that gets executed before splash screen disappears");
      // Then tell the application to render
      setAppIsReady(true);
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen
      await SplashScreen.hideAsync();
    }

    

  }, [appIsReady]);

  if (appIsReady) {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>
        <Text>AAAAAAAAAAAAAA! 👋</Text>
        {/* <Entypo name="rocket" size={30} /> */}
      </View>
    );
  } else {
    return (
      <View
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onLayout={onLayoutRootView}>
        <Text>BBBBBBBBBBBBBBBBBB! 👋</Text>
        {/* <Entypo name="rocket" size={30} /> */}
      </View>
    );
  }
  
}

export default App;
