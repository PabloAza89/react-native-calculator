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
import { s } from './AboutCSS';
//import { OwnButton } from './OwnButton';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//const Stack = createNativeStackNavigator();

function About({ navigation }: any): React.JSX.Element {

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
    <View style={[s.background]}>
      <Button
        title="asd"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default About;
