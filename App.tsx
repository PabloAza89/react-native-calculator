import React from 'react';
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

function App(): React.JSX.Element {

  return (
    <View style={[s.background]}>
      <View style={[s.contour]}>
        {/* <View style={[s.upper]} /> */}
        {/* <OwnButton value="M"></OwnButton> */}
        <Ionicons name='md-checkmark-circle' size={32} color='green' />
    
        <OwnButton value="/"></OwnButton>
        <OwnButton value="X"></OwnButton>
        <OwnButton value=""></OwnButton>
        <OwnButton value="7"></OwnButton>
        <OwnButton value="8"></OwnButton>
        <OwnButton value="9"></OwnButton>
        <OwnButton value="/"></OwnButton>
        <OwnButton value="4"></OwnButton>
        <OwnButton value="5"></OwnButton>
        <OwnButton value="6"></OwnButton>
        <OwnButton value="-"></OwnButton>
        <OwnButton value="1"></OwnButton>
        <OwnButton value="2"></OwnButton>
        <OwnButton value="3"></OwnButton>
        <OwnButton value="+"></OwnButton>
        <OwnButton value="M"></OwnButton>
        <OwnButton value="0"></OwnButton>
        <OwnButton value="."></OwnButton>
        <OwnButton value="="></OwnButton>
      </View>
    </View>
  );
}

export default App;
