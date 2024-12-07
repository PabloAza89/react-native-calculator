import { ReactElement, useState, useRef, useEffect } from 'react';
import { ScrollView, StatusBar, Text, View, TouchableHighlight } from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeI } from '../../interfaces/interfaces';
import { portButtons, landButtons } from './Buttons';
import KnowMore from '../KnowMore/KnowMore';

function Home({ navigation, vmin, port, input, secInput, setInput, setSecInput, state, width, height, opw, oph, hingeBounds }: any): ReactElement {
//function Home({ navigation: { navigate }, vmin, port, input, secInput, setInput, setSecInput, state }: HomeI): ReactElement {

  const { navigate } = navigation

  let ins = useSafeAreaInsets(); // insets

  const [ parErr, setParErr ] = useState(false);

  useEffect(() => scrollEnd(), [input])

  const scrollRefUpper = useRef<ScrollView>(null);
  const scrollRefCenter = useRef<ScrollView>(null);

  const scrollEnd = () => {
    scrollRefUpper.current?.scrollToEnd({ animated: false })
    scrollRefCenter.current?.scrollToEnd({ animated: false })
  }

  // const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%' }
  // const lastButtonLand = { value: "=", parErr: parErr, size: '12%' }

  const lastButtonPort = { value: "=", parErr: parErr, size: '22.5%', margin: '2%' }
  const lastButtonLand = { value: "=", parErr: parErr, size: `${92/7}%`, margin: '1%' }

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

  //console.log("PARR ERR", parErr)
  console.log("HEIGHT HEIGHT", height)
  console.log("WIDTH WIDTH", width)

  return (
    <View style={[ s.background, { /* paddingBottom: ins.bottom, paddingTop: ins.top, */ width: '100%', height: '100%', backgroundColor: 'lightblue' } ]}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      {
        state === 'cleanFullscreen' ?
        //false ?
        //true ?
        <View style={{ backgroundColor: 'darkblue'}} /* OUTLINE PORTRAIT */>
          <View style={[ s.contour, { margin: 3, aspectRatio: 2/3, width: parsedWidth , maxHeight: parsedHeight - 100 } ]}>
            <View
              style={[
                s.displayContainer,
                { width: '96%', marginLeft: '2%', height: `${(28.4/3)*2}%`, marginTop: '2%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
              ]}
            >
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '30%' }}
                children={ <Text style={[ s.secondaryResult, { fontSize: oph * 2.7 } ]} children={ secInput.replaceAll(/N/g,"-") } /> }
              />
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '40%' }}
                children={ <Text style={[ s.mainResult, { fontSize: oph * 4.5, lineHeight: oph * 4.5 } ]} children={ input.replaceAll(/N/g,"-") } /> }
              />
              <View
                style={{ height: '30%', /* backgroundColor: 'red', */ justifyContent: 'center' }}
                children={
                  //parErr &&
                  true &&
                  <Text style={[ s.parErr, { fontSize: oph * 2.1 } ]} children={`CHECK PARENTHESIS`} />
                }
              />
            </View>

            {
              portButtons.concat(lastButtonPort).map(e =>
                <OwnButton
                  key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                  setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                  vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} small={e.small} fontSize={oph}
                />
              )
            }

          </View>
        
          {/* 

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

        state === 'tabletop' ?
        //false ?

        <View style={{ /* backgroundColor: 'lightgreen', */ display: 'flex', flexDirection: 'column', width: '100%', height: '100%'  }} /* TABLETOP */>

          <View style={{ flexDirection: 'row', backgroundColor: '#004747', height: hingeBounds.top - ins.top, justifyContent: 'center', alignItems: 'center' }} /* UPPER SIDE */ >

            <View style={[ s.contour, { margin: 3, aspectRatio: 7/1, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
              <View
                style={[ // `${(11.14/4)*7}%`
                  s.displayContainer,
                  { width: '98%', marginLeft: '1%', height: `${((100 / 7) - 2) * 7}%`, marginTop: '1%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
                ]}
              >
                <ScrollView
                  overScrollMode="never"
                  ref={scrollRefUpper}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ height: '30%' }}
                  children={ <Text style={[ s.secondaryResult, { fontSize: opw * 2.6 } ]} children={secInput.replaceAll(/N/g,"-")} /> }
                />
                <ScrollView
                  overScrollMode="never"
                  ref={scrollRefCenter}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ height: '40%' }}
                  children={ <Text style={[ s.mainResult, { fontSize: opw * 4.7, lineHeight: opw * 4.7 } ]} children={ input.replaceAll(/N/g,"-") } /> }
                />
                <View
                  style={{ height: '30%', /* backgroundColor: 'red' */ }}
                  children={
                    //parErr &&
                    true &&
                    <Text style={[ s.parErr, { fontSize: opw * 2.1 } ]} children={`CHECK PARENTHESIS`} />
                  }
                />
              </View>
            </View>

          </View>
          <View style={{ backgroundColor: '#581199', top: hingeBounds.top - hingeBounds.bottom, height: height - hingeBounds.bottom - ins.bottom, justifyContent: 'center', alignItems: 'center' }} /* LOWER SIDE */ >

            <View style={[ s.contour, { margin: 3, aspectRatio: 7/3, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
              <View style={[ { flexWrap: 'wrap', flexDirection: 'row', /* backgroundColor: 'yellow', */ marginTop: '1%', marginBottom: '1%', width: '99%', justifyContent:'space-around', alignContent: 'space-between' }]} >
                {
                  landButtons.concat(lastButtonLand).map(e =>
                    <OwnButton
                      key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                      setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                      vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} fontSize={opw} type={state}
                    />
                  )
                }
              </View>
            </View>


          </View>


          
        </View>

        :

        state === 'book' ?

        <View style={{ backgroundColor: 'lightgreen', display: 'flex', flexDirection: 'row', width: '100%', height: '100%'  }} /* BOOK */>

          <View style={{ paddingBottom: ins.bottom, paddingTop: ins.top,flexDirection: 'row', backgroundColor: '#004747', width: hingeBounds.left - ins.left, justifyContent: 'center', alignItems: 'center' }} /* LEFT SIDE */ >


            <View style={{ backgroundColor: 'darkblue'}} /* OUTLINE PORTRAIT */>
              <View style={[ s.contour, { margin: 3, aspectRatio: 2/3, width: parsedWidth , maxHeight: parsedHeight - 100 } ]}>
                <View
                  style={[
                    s.displayContainer,
                    { width: '96%', marginLeft: '2%', height: `${(28.4/3)*2}%`, marginTop: '2%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
                  ]}
                >
                  <ScrollView
                    overScrollMode="never"
                    ref={scrollRefUpper}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ height: '30%' }}
                    children={ <Text style={[ s.secondaryResult, { fontSize: oph * 2.7 } ]} children={ secInput.replaceAll(/N/g,"-") } /> }
                  />
                  <ScrollView
                    overScrollMode="never"
                    ref={scrollRefCenter}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ height: '40%' }}
                    children={ <Text style={[ s.mainResult, { fontSize: oph * 4.5, lineHeight: oph * 4.5 } ]} children={ input.replaceAll(/N/g,"-") } /> }
                  />
                  <View
                    style={{ height: '30%', /* backgroundColor: 'red', */ justifyContent: 'center' }}
                    children={
                      //parErr &&
                      true &&
                      <Text style={[ s.parErr, { fontSize: oph * 2.1 } ]} children={`CHECK PARENTHESIS`} />
                    }
                  />
                </View>

                {
                  portButtons.concat(lastButtonPort).map(e =>
                    <OwnButton
                      key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                      setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                      vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} small={e.small} fontSize={oph}
                    />
                  )
                }

              </View>
            
              {/* 

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
            </View>


          </View>
          <View style={{ backgroundColor: '#581199', width: width - hingeBounds.right - ins.left, justifyContent: 'center', alignItems: 'center' }} /* RIGHT SIDE */ >


            {/* <KnowMore /> */}
            <KnowMore navigation={navigation}/* {...props} */ opw={opw} port={port} />

          </View>
        </View>

        :

        <View style={{ backgroundColor: 'darkblue' }} /* OUTLINE LANDSCAPE */>
          <View style={[ s.contour, { margin: 3, aspectRatio: 7/4, width: parsedWidth - 100, maxHeight: parsedHeight - 40 } ]}>
            <View
              style={[ // `${(11.14/4)*7}%`
                s.displayContainer,
                { width: '98%', marginLeft: '1%', height: `${(((400 / 7) - (((92/7)*3)+5)) / 4) * 7}%`, marginTop: '1%', paddingLeft: vmin * 1, paddingRight: vmin * 1 }
              ]}
            >
              <ScrollView
                overScrollMode="never"
                ref={scrollRefUpper}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '30%' }}
                children={ <Text style={[ s.secondaryResult, { fontSize: opw * 2.6 } ]} children={secInput.replaceAll(/N/g,"-")} /> }
              />
              <ScrollView
                overScrollMode="never"
                ref={scrollRefCenter}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ height: '40%' }}
                children={ <Text style={[ s.mainResult, { fontSize: opw * 4.7, lineHeight: opw * 4.7 } ]} children={ input.replaceAll(/N/g,"-") } /> }
              />
              <View
                style={{ height: '30%', /* backgroundColor: 'red' */ }}
                children={
                  //parErr &&
                  true &&
                  <Text style={[ s.parErr, { fontSize: opw * 2.1 } ]} children={`CHECK PARENTHESIS`} />
                }
              />
            </View>

            {
              landButtons.concat(lastButtonLand).map(e =>
                <OwnButton
                  key={e.value} scrollEnd={scrollEnd} parErr={e.parErr} value={e.value} input={input}
                  setInput={setInput} smaller={e.smaller} setParErr={setParErr} setSecInput={setSecInput}
                  vmin={vmin} size={e.size} opw={opw} oph={oph} margin={e.margin} fontSize={opw}
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
