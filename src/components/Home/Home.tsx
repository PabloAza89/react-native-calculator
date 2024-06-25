import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableHighlight,
  Dimensions, AppState
} from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import {useWindowDimensions} from 'react-native';



import { opw, ins, /* dH, wH, */ aB/* , nB */ } from '../constants';


function Home({ navigation }: any): React.JSX.Element {

  const {height, width} = useWindowDimensions();

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

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [ nB, setNb ] = useState(false)

  let dH:any //= Dimensions.get('screen').height; // deviceHeight
  let wH:any //= Dimensions.get('window').height; // windowHeight

  //const [ opw, setOpw ] = useState(Dimensions.get('window').width / 100)

  const [ opw, setOpw ] = useState(width / 100)

  // useEffect(() => {
  //   setOpw(width / 100)
  // }, [height, width])

  //let opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw

  // useEffect(() => {

  // },[])

  useEffect(() => {

    

    

    const focusCheck = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');

        //if ((dH - ins.top) === wH) setNb(false) // navBar NOT PRESENT
        //else setNb(true) // navBar PRESENT

        //dH = Dimensions.get('screen').height; // deviceHeight
        //wH = Dimensions.get('window').height; // windowHeight
        //opw = Dimensions.get('window').width / 100; // onePercentWidth = 1%vw
        //setOpw(Dimensions.get('window').width / 100)

        setOpw(width / 100)

        console.log("dH", dH)
        console.log("wH", wH)

      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      //console.log('AppState', appState.current);
    });

    return () => focusCheck.remove()
  }, [width]);

  return (

        <View style={[s.background]}>
          <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>
          {/* <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/> */}
          <View style={[s.contour, { width: opw * 90, height: opw * 129.6 }] }>
            { parErr && <Text style={s.parErr}>CHECK PARENTHESIS</Text> }
            {/* <View style={[s.displayContainer]}>
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
            </View> */}
            {/* <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="(" setParErr={setParErr} setSecInput={setSecInput} smaller={true} />
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
            <OwnButton scrollEnd={scrollEnd} input={input} setInput={setInput} value="=" setParErr={setParErr} setSecInput={setSecInput} parErr={parErr} /> */}

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
