//import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import About from './components/About/About';
import KnowMore from './components/KnowMore/KnowMore';
import { setStatusBarTranslucent } from 'expo-status-bar';
import { registerRootComponent } from 'expo';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
//import { Stack } from 'expo-router';


const Stack: any = createNativeStackNavigator();

//registerRootComponent(Home);

function App(): React.JSX.Element {
  return (
    <Stack.Navigator
    //style={backgroundColor={'yellow'}}
    // "backgroundColor": "yellow",
      //component={Home}
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true, // BOTTOM
        
        // cardOverlayEnabled: true,
        // cardOverlay: true,
        //presentation: 'card'
        //presentation: 'model'
       /*  cardStyle: {
          //backgroundColor: 'transparent'
          backgroundColor: 'red',
          flex: 1
       }, */
       //presentation: 'transparentModal'
        //headerShown: true,
        //title: 'something else',
        //header: { style: { backgroundColor: 'orange', marginTop: 24 } }
        //,statusBarTranslucent:true
        //statusBarHidden:true,
        //statusBarHidden: false,
        // navigationBarHidden:true
        //statusBarTranslucent:true ,statusBarHidden:false,navigationBarHidden:true
      }}
    >
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="+not-found" /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ animation: 'slide_from_right' }}
          //options={{ headerShown: false,statusBarTranslucent:true ,statusBarHidden:false,navigationBarHidden:true, }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="KnowMore"
          component={KnowMore}
          options={{ animation: 'slide_from_right' }}
        />
    </Stack.Navigator>
  );
}

//export default registerRootComponent(App);
export default App;
