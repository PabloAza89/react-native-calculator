import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';

function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state, width, height }: any): ReactElement {
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {

  let ins = useSafeAreaInsets(); // insets

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => scrollEnd(), [input])

  const scrollRefUpper = useRef<ScrollView>(null);
  const scrollRefCenter = useRef<ScrollView>(null);

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  let buttonsMapper = () => {
    let values = [
      { value: "(", port: 0, land: 0, smaller: port ? true : false }, { value: ")", port: 1, land: 1, smaller: port ? true : false }, { value: "C", port: 2, land: 2, smaller: port ? true : false },
      { value: "N", port: 3, land: 3, smaller: port ? true : false }, { value: "B", port: 4, land: 4, smaller: port ? true : false }, { value: "7", port: 5, land: 9 },
      { value: "8", port: 6, land: 10 }, { value: "9", port: 7, land: 11 }, { value: "X", port: 8, land: 6 },
      { value: "4", port: 9, land: 18 }, { value: "5", port: 10, land: 7 }, { value: "6", port: 11, land: 8 },
      { value: "-", port: 12, land: 5 }, { value: "1", port: 13, land: 15 }, { value: "2", port: 14, land: 16 },
      { value: "3", port: 15, land: 17 }, { value: "+", port: 16, land: 13 }, { value: "/", port: 17, land: 12 },
      { value: "0", port: 18, land: 14 }, { value: ".", port: 19, land: 19 }, { value: "=", port: 20, land: 20, parErr: parErr }
    ].sort((a, b) => port ? a.port - b.port : a.land - b.land)
    return values.map(e =>
      <OwnButton
        key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
        setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
        vmin={vmin}
      />
    )
  }

  console.log("ins", ins)

  let parsedWidth = width - ins.left - ins.right
  let parsedHeight = height - ins.top - ins.bottom

  let parsedPort = parsedWidth > parsedHeight ? false : true

  const testRef = useRef(null);

  //if (testRef.current !== null) console.log("A VER", testRef.current)
  //console.log("A VER", x, y, width, height)

  const [ test, setTest ] = useState(0)

  return (
    <View style={[ s.background, { paddingBottom: ins.bottom, paddingTop: ins.top, width: '100%', height: '100%', backgroundColor: 'lightblue' } ]}>
      {/* <View
        style={[{ position: 'absolute', left: 411.42, top: 10, height: 50, width: 50, backgroundColor: 'red' }]}
      /> */}
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      {
        //state === 'cleanFullscreen' /* && parsedPort */ ?
        true ?
        <View
          //ref={testRef}
          
          style={[
            /* s.contour, */
            { /* aspectRatio: 2/3, */ /* width: test + 50, */ /* maxHeight: parsedHeight - 100, */ backgroundColor: 'darkblue'/*  borderWidth: vmin * 0.4 */ }
          ]}
        >
          <View
            onLayout={(event) => {
              //const {x, y, width, height} = event.nativeEvent.layout;
              setTest(event.nativeEvent.layout.width)
            }}
            style={{ margin: 3, aspectRatio: 2/3, width: parsedWidth , maxHeight: parsedHeight - 0, backgroundColor: 'orange' }}
          />
          {/* <View
            style={{ backgroundColor: 'red', width: '100%', aspectRatio: 1, height: 0 }}
          /> */}


          

          {/* <View style={{ backgroundColor: 'darkred', width: '17.6%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '17.6%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '17.6%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '17.6%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '17.6%', aspectRatio: 1, height: 0 }} />

          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />

          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />

          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />

          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} />
          <View style={{ backgroundColor: 'darkred', width: '22.5%', aspectRatio: 1, height: 0 }} /> */}


          {/* {
            parErr &&
            <Text
              style={[
                s.parErr,
                port ?
                { width: vmin * 86, height: 40, top: -40 } :
                { width: vmin * 152, height: 30, top: -30 }
              ]}
            >CHECK PARENTHESIS</Text>
          }
          
          { buttonsMapper() }
          <TouchableHighlight
            underlayColor="#8aaeba"
            activeOpacity={1}
            style={[
              s.question,
              { borderRadius: (vmin * 50) / 2 },
              port ?
              { left: ((vmin * 90) / 2) - 23, bottom: -54 } :
              { top: ((vmin * 90) / 2) - 23, right: -54 },
            ]}
            onPress={() => navigate('About')}
          >
            <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
          </TouchableHighlight> */}
        </View> :
        <View />
      }
        
    </View>
  );
}

export default Home;
