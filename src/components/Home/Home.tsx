import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';
import { portButtons, landButtons } from './Buttons';

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

  const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%' }
  const lastButtonLand = { value: "=", parErr: parErr, size: '12%' }

    // let buttonsMapper = () => {

  //   return portButtons.map(e =>
  //     <OwnButton
  //       key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
  //       setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
  //       vmin={vmin}
  //     />
  //   )
  // }

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
        // state === 'cleanFullscreen' /* && parsedPort */ ?
        false  ?
        <View style={{ backgroundColor: 'darkblue'}} /* OUTLINE */>
          <View
            style={[ s.contour, { margin: 3, aspectRatio: 2/3, width: parsedWidth , maxHeight: parsedHeight - 100 } ]}
          >
            <View
              style={[
                s.displayContainer,
                { width: '96%', height: `${(28.4/3)*2}%`, marginTop: '2%', paddingLeft: vmin * 1, paddingRight: vmin * 1 },
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

            {
              portButtons.concat(lastButtonPort).map(e =>
                <OwnButton
                  key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                  setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                  vmin={vmin} size={e.size}
                />
              )
            }

          </View>
        
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

        <View style={{ backgroundColor: 'red'}} /* OUTLINE */>
          <View
            //style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth , maxHeight: parsedHeight - 100 } ]}
            style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}
          >
            <View
              style={[
                s.displayContainer,
                { width: '96%', height: `${(28.4/3)*2}%`, marginTop: '2%', paddingLeft: vmin * 1, paddingRight: vmin * 1 },
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

            {
              landButtons.concat(lastButtonLand).map(e =>
                <OwnButton
                  key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                  setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                  vmin={vmin} size={e.size}
                />
              )
            }

          </View>
        </View>

        
      }
        
    </View>
  );
}

export default Home;
