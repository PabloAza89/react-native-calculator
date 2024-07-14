import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableHighlight,
  Dimensions,
  AppState
} from 'react-native';
import { s } from './HomeCSS';
import OwnButton from '../OwnButton/OwnButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Home({ navigation: { navigate, getState }, input, setInput, secInput, setSecInput }: any): React.JSX.Element {


  let ins = useSafeAreaInsets(); // insets

  const dH = Dimensions.get('screen').height; // deviceHeight
  const wH = Dimensions.get('window').height; // windowHeight

  const [ parErr, setParErr ] = useState(false);
  // const [ secInput, setSecInput ] = useState("");
  // const [ input, setInput ] = useState("");

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

  useEffect(() => { // ON APP FOCUS
    const focus = AppState.addEventListener('focus', async () => {
      //console.log("FOCUS")

      let resInput = await readData("savedInput") // RESPONSE INPUT
      let resSecInput = await readData("savedSecInput") // RESPONSE INPUT
      //saveData("savedDate", Date.now())
      let resDate = await readData("savedDate") // RESPONSE DATE
      let resHeight = await readData("savedHeight") // RESPONSE HEIGHT

      let resRoute = await readData("savedRoute") // RESPONSE ROUTE

      if (resInput !== undefined && resInput !== null) setInput(resInput)
      if (resSecInput !== undefined && resSecInput !== null) setSecInput(resSecInput)

      if (resDate !== undefined && resDate !== null) console.log("HOME DIFFERENCE", Date.now() - parseInt(resDate))
      if (resHeight !== undefined && resHeight !== null) console.log("HOME RETRIEVE SAVED HEIGHT", resHeight)

      if (resRoute !== undefined && resRoute !== null) console.log("HOME SAVED ROUTE", resRoute)


      if (resDate !== undefined && resDate !== null && resHeight !== undefined && resHeight !== null) {
      //   console.log("QQ DIFFERENCE", Date.now() - parseInt(resDate))
          if (Date.now() - parseInt(resDate) < 60000 && resHeight !== wH.toString()) {
      //     //console.log("typeof parseInt(resHeight)", typeof resHeight)
      //     //console.log("typeof wH", wH)
            console.log("WINDOWS HAS CHANGED !")

            //navigation.navigate('About')
            //navigation.navigate(resRoute)
            
              //await BootSplash.hide()
            

          } else {
            console.log("WINDOWS NOT HAS CHANGED.")
            
              //await BootSplash.hide()
            
            

            // let array = navigation.getState().routes
            // //saveData("savedRoute", array[array.length - 1].name)
            // console.log("FUNC CURR ROUTE", array[array.length - 1].name)
            // console.log("FUNC SAVED ROUTE", resRoute)
            

            //console.log("A VERRR", navigation.getState())
            //console.log("A VERRR", navigation.getState().routes[0].name)
            //console.log("A VERRR", navigation.getState())

            //onPress={() => navigation.navigate('About')}


            // let array = navigation.getState().routes
            // console.log("A VERRR", array[array.length - 1].name)


          }
        
        }


    }
  
  )

    
    
    return () => focus.remove();
  }, []);

  // useEffect(() => { // ON APP BLUR
  //   const blur = AppState.addEventListener('blur', () => {
  //     saveData("savedInput", input)
  //     saveData("savedSecInput", secInput)
  //     saveData("savedDate", Date.now().toString())
  //     saveData("savedHeight", wH.toString())
  //     console.log("HOME CURRENT HEIGHT", wH.toString())

  //     let array = getState().routes
  //     console.log("BLUR SAVE ROUTE", array[array.length - 1].name)
  //     saveData("savedRoute", array[array.length - 1].name) // SAVE LAST ROUTE ON APP BLUR
  //   })
  //   return () => blur.remove();
  // }, []);

  const saveData = async (key: any, value:any) => {
    try { await AsyncStorage.setItem(`${key}`, value) }
    catch(e) { }
  };

  const readData = async (key: string) => {
    try { return await AsyncStorage.getItem(key) }
    catch(e) { }
  };

  const getAllKeys = async () => {
    let keys = []
    try { console.log(await AsyncStorage.getAllKeys()) }
    catch(e) { }
  }

  const removeData = async (key: any) => {
    try { await AsyncStorage.removeItem(key) }
    catch(e) { }
  }

  // navigation.reset({
  //   index: 1,
  //   routes: [{ name: 'Home'}, { name: 'About'}],
  // });

  // navigation.reset({
  //   index: 0,
  //   routes: [{ name: 'About'}]
  // });

  // navigation.navigate('About')

  // navigation.dispatch(
  //   CommonActions.reset({
  //     index: 0,
  //     routes: [
  //       { name: 'Home' }
  //     ],
  //   })
  // );

  // const testReturn = () => {
  //   return <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
  // }

  // useEffect(() => {
    
  //   const qq = async () => {
      
  //     // let response = await readData("savedRoute") // RESPONSE ROUTE

  //     // if (response !== undefined && response !== null) {
  //     //   //setRouteGo(response)
  //     //   //setRouteGo(response)
  //     //   //setRouteGo({ name : 'About'})
  //     //   console.log("ENTRO ACA", response)
  //     //   console.log("ENTRO ACA typeof", typeof response)
  //     //   //routeGo.current = response.toString()
  //     // }
 
  //     await Font.loadAsync({
  //       ...SimpleLineIcons.font
  //       //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
  //     }).then(() => {
  //       //navigation.navigate("About")
  //       //setLoadingComplete(true);
  //       //BootSplash.hide()
  //       setTimeout(() => setLoadingComplete(true), 0)
  //       //setLoadingComplete(true)
  //     })
  //   }

  //   qq()


  // }, []);


  return (
        <View style={[s.background]}>
          <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>
          {/* <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/> */}
          <View style={[s.contour/* , { width: opw * 90, height: opw * 129.6 } */] }>
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
              onPress={() => navigate('About')}
            >
              <SimpleLineIcons name='question' size={40} color='rgba(0, 0, 0, .7)' />
              {/* { testReturn() } */}
              {/* { testReturn('question') } */}
            </TouchableHighlight>


            <TouchableHighlight
              //underlayColor="#8aaeba"
              //activeOpacity={1}
              //style={s.question}
              style={{ position: 'absolute', left: 10, bottom: -30 }}
              
              onPress={() => saveData("savedInput", "111")}
              //onPress={() => navigation.navigate('About')}
            >
              <Text>SAVE</Text>
            </TouchableHighlight>

            <TouchableHighlight
              //underlayColor="#8aaeba"
              //activeOpacity={1}
              //style={s.question}
              style={{ position: 'absolute', left: 150, bottom: -30 }}
              //onPress={ () => { console.log(readData()) } }
              onPress={ () => {  getAllKeys() } }
              
              //onPress={() => console.log("PRESSED")}
              //onPress={() => navigation.navigate('About')}
            >
              <Text>ALL KEYS</Text>
            </TouchableHighlight>
            
            <TouchableHighlight
              //underlayColor="#8aaeba"
              //activeOpacity={1}
              //style={s.question}
              style={{ position: 'absolute', right: 10, bottom: -30 }}
              //onPress={ () => { console.log(readData()) } }
              //onPress={ () => { readData("savedInput") } }
              onPress={ async () => {
                console.log("SAVED INPUT", await readData("savedInput"))
                console.log("SAVED SEC INPUT",await readData("savedSecInput"))
                console.log("SAVED DATE",await readData("savedDate"))
              } }
              
              //onPress={() => console.log("PRESSED")}
              //onPress={() => navigation.navigate('About')}
            >
              <Text>READ</Text>
            </TouchableHighlight>

            <TouchableHighlight
              //underlayColor="#8aaeba"
              //activeOpacity={1}
              //style={s.question}
              style={{ position: 'absolute', left: 10, bottom: -60 }}
              
              onPress={() => removeData("savedInput")}
              //onPress={() => navigation.navigate('About')}
            >
              <Text>REMOVE</Text>
            </TouchableHighlight>

          </View>
        </View>

  );
}

export default Home;
