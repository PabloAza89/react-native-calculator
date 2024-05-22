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
  View,
  TouchableHighlight,
} from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

function Home({ navigation }: any): React.JSX.Element {

  const [ input, setInput ] = useState("");
  const [ secInput, setSecInput ] = useState("");
  const [ parErr, setParErr ] = useState(false);

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
          {/* <StatusBar barStyle="light-content" backgroundColor="lightblue" /> */}
          <StatusBar translucent={true} backgroundColor={'transparent'}/>
          <View style={[s.contour]}>
            { parErr && <Text style={s.parErr}>CHECK PARENTHESIS</Text> }
            <View style={[s.displayContainer]}>
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[s.secondaryResult]}>{ secInput.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                contentContainerStyle={{ alignItems: 'center' }}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={[s.mainResult]}>{ input.replaceAll(/N/g,"-") }</Text>
              </ScrollView>
              <Text style={[s.secondaryResult]} />
            </View>
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="(" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value=")" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="C" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="N" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="B" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="7" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="8" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="9" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="X" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="4" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="5" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="6" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="-" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="1" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="2" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="3" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="+" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="/" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="0" setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="." setParErr={setParErr} setSecInput={setSecInput} />
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="=" setParErr={setParErr} setSecInput={setSecInput} parErr={parErr} />

            <TouchableHighlight
              underlayColor="#8aaeba"
              activeOpacity={1}
              style={s.question}
              onPress={() => navigation.navigate('About')}
            >
              <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
            </TouchableHighlight>
            
          </View>
          

        </View>
  );
}

export default Home;
