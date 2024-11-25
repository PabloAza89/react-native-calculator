import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableHighlight, NativeModules, NativeEventEmitter } from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';

function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput }: HomeI): ReactElement {

  let ins = useSafeAreaInsets(); // insets

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => {
    scrollEnd()
  }, [input])

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

  // const { HingeSensor, MainActivity } = NativeModules;

  // useEffect(() => {
  //   const nativeEvent = new NativeEventEmitter(HingeSensor);
  //   let eventListener = nativeEvent.addListener('angle', e => {
  //     console.log("angle", e)
  //   });
  //   return () => eventListener.remove();
  // }, []);

  // useEffect(() => {
  //   const eventEmitter = new NativeEventEmitter(MainActivity);
  //   let eventListener = eventEmitter.addListener('LayoutInfo', e => {
  //     console.log("curr", e.curr) // CURRENT WINDOW
  //     console.log("max", e.max) // CURRENT SCREEN
  //     console.log("state", e.state) // FLAT or HALF_OPENED // useless
  //     console.log("orientation", e.orientation) // HORIZONTAL or VERTICAL
  //     console.log("occlusionType", e.occlusionType) // NONE or FULL
  //     console.log("isSeparating", e.isSeparating) // TRUE or FALSE (boolean)
  //     console.log("hinge", e.hinge) // HINGE POSITION
  //   });
  //   return () => eventListener.remove();
  // }, []);

  //console.log("ins", ins)

  return (
    <View style={[s.background, { height: '100%', backgroundColor: 'lightblue' }]}>
      {/* <View
        style={[{ position: 'absolute', left: 411.42, top: 10, height: 50, width: 50, backgroundColor: 'red' }]}
      /> */}
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>
      <View
        style={[
          s.contour,
          { paddingTop: vmin * 1.5, paddingBottom: vmin * 1.5, borderWidth: vmin * 0.5, marginRight: ins.right, marginLeft: ins.left, marginBottom: port ? ins.bottom : 0 },
          port ?
          { width: vmin * 90, height: vmin * 129.6 } :
          { width: vmin * 156, height: vmin * 90, marginTop: vmin * 4 }
        ]}
      >
        {
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
        <View
          style={[
            s.displayContainer,
            { height: vmin * 20, paddingLeft: vmin * 2, paddingRight: vmin * 2 },
            port ?
            { width: vmin * 86 } :
            { width: vmin * 152 }
          ]}
        >
          <ScrollView
            overScrollMode="never"
            ref={scrollRefUpper}
            horizontal={true}
            contentContainerStyle={{ alignItems: 'center' }}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={[ s.secondaryResult, { height: vmin * 6, lineHeight: vmin * 6, } ]}>{ secInput.replaceAll(/N/g,"-") }</Text>
          </ScrollView>
          <ScrollView
            overScrollMode="never"
            ref={scrollRefCenter}
            horizontal={true}
            contentContainerStyle={{ alignItems: 'center' }}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={[ s.mainResult, { height: vmin * 8, lineHeight: vmin * 8 } ]}>{ input.replaceAll(/N/g,"-") }</Text>
          </ScrollView>
          <Text style={[s.secondaryResult]} />
        </View>
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
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Home;
