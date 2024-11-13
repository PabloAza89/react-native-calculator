package com.reactnativecalculator
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash;
import android.os.Bundle;
import android.app.Activity;
import android.app.Dialog;
import android.content.DialogInterface;
import android.view.Window;
import android.view.WindowManager;
import android.util.Log

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
//import java.util.concurrent.Flow
//import kotlinx.coroutines.flow.Flow
import androidx.window.layout.WindowMetricsCalculator

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch


import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

import android.util.TypedValue

import kotlin.reflect.KClass
import kotlin.reflect.KProperty1
import kotlin.reflect.full.allSuperclasses
import kotlin.reflect.full.declaredMemberProperties
import kotlin.reflect.full.isSuperclassOf
import kotlin.reflect.jvm.isAccessible
import kotlin.reflect.full.findParameterByName
//import androidx.window.layout.DisplayFeature

lateinit var windowInfoTracker: WindowInfoTracker
//lateinit var qqq: Flow<WindowLayoutInfo>
//lateinit var qqq: WindowInfoTracker

//val reactContext: ReactContext

class MainActivity : ReactActivity() {

  //private lateinit var windowInfoTracker: WindowInfoTracker

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens

    //windowInfoTracker = WindowInfoTracker.getOrCreate(this@MainActivity)
    //windowInfoTracker = WindowInfoTracker.windowLayoutInfo(this@MainActivity)

    // val rrr = WindowInfoTracker.getOrCreate(this@MainActivity)
    // qqq = rrr.windowLayoutInfo(this)
    //windowInfoTracker = WindowInfoTracker.getOrCreate(this@MainActivity)
    //onWindowLayoutInfoChange()

     lifecycleScope.launch(Dispatchers.Main) {
        lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
            WindowInfoTracker.getOrCreate(this@MainActivity)
                .windowLayoutInfo(this@MainActivity)
                .collect { value ->
                    updateUI(value)
                }
        }
    }

    
  }

  // fun onWindowLayoutInfoChange() {
  //   lifecycleScope.launch(Dispatchers.Main) {
  //       lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
  //           windowInfoTracker.windowLayoutInfo(this@MainActivity)
  //               .collect { value ->
  //                   updateUI(value)
  //               }
  //       }
  //   }
  // }

  //var variable_name: String = "abc"
  //lateinit var variable_name: List<DisplayFeature>

  //val reactContext = this@MainActivity
  //ReactContext reactContext = getReactNativeHost().getReactInstanceManager().getCurrentReactContext()

  //fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
  // fun sendEvent(eventName: String, params: WritableMap?) {
  //   reactContext
  //     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
  //     .emit(eventName, params)
  // }
  // val params = Arguments.createMap().apply {
  //     putString("eventProperty", "someValue")
  // }

  fun updateUI(newLayoutInfo: WindowLayoutInfo) {
    //variable_name = newLayoutInfo.displayFeatures
    //variable_name = newLayoutInfo.displayFeatures.toString()
    //variable_name = newLayoutInfo.displayFeatures.flattenToString()
    val params = Arguments.createMap()
    val paramsInner = Arguments.createMap()
    //params.putString("eventProperty", "someValue")
    // reactInstanceManager.currentReactContext
    //   ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    //   ?.emit("EventReminder", params)

    val windowMetrics = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity)
    val displayMetrics = this@MainActivity.resources.displayMetrics
    // val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).bounds.flattenToString()
    // val maximumWM = wmc.computeMaximumWindowMetrics(this@MainActivity).bounds.flattenToString()
    //val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).toString()
    //val currentWM = wmc.computeMaximumWindowMetrics(this@MainActivity).toString()
    //val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).widthDp.toString()
    val all = windowMetrics.bounds
    // val currentWM1 = all.left
    // val currentWM2 = all.top
    // val currentWM3 = all.right
    // val currentWM4 = all.bottom

    // val params = object {
    //   var left = 1
    //   var top = 2
    //   var right = 3
    //   var bottom = 4
    //   // Object expressions extend the Any class, which already has a toString() function,
    //   // so it must be overridden
    //   //override fun toString() = "$hello $world"
    // }

    // fun asd() {

    // }

    //data class Dimensions(val position: String, val value: String)
    //var childArray = emptyArray<Dim>()
    // val childArray = mutableListOf(
    //   Dimensions("test1", "test2")
    // )

    // val c1 = Dim("leftPos", "leftVal")
    // val c2 = Dim("rightPos", "rightVal")

    //var riversArray = arrayOf(all.left, all.top, all.right, all.bottom)
    //var riversArray = arrayOf("left", "top", "right", "bottom")
    var riversArray = arrayOf("left", "top", "right", "bottom")

    //all["left"].toFloat().toString(),

    for (x in riversArray) {
      // var test = TypedValue.deriveDimension(
      //   TypedValue.COMPLEX_UNIT_DIP,
      //   WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds.left.toFloat(),
      //   displayMetrics
      // )

      // dp = px / (dpi / 160) === px / density



      // var test = TypedValue.applyDimension(
      //   TypedValue.COMPLEX_UNIT_MM,
      //   210.toFloat(),
      //   displayMetrics
      // )

      //var test = all["left"]
      //var test = all::class.declaredMemberProperties.find { it.name == "left" }!!.get(house)
      //var testZero = all::class.declaredMemberProperties.find { it.name == "left" }
      //var test = all["${testZero}"]
      // var testZero = all::class.declaredMemberProperties.find { it.name == "${x}" }
      // val test = testZero?.getter?.call(all)

      val test = all::class.declaredMemberProperties.find { it.name == "${x}" }?.getter?.call(all)

      // var test = all.javaClass
      //         .getMethod("left") // to get property called `name`
      //         .invoke(all)

      //val example = Example()
      // var field = all.javaClass.getDeclaredField("left")
      // field.isAccessible = true
      // var test = field.get(all) as String


      //WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds.left.toFloat()
      // val newItem = Dimensions("${x}", "${test}")
      // childArray.add(newItem)
      //childArray.add(newItem)
      //paramsInner.putString("${x}", "${test.toString()}")
      paramsInner.putString("${x}", "${test}")
      //paramsInner.putString("${x}", "someValue1")
    }

    //val maximumWM = wmc.computeCurrentWindowMetrics(this@MainActivity).heightDp

    //params.putString("curr", currentWM)
    //params.putString("curr", currentWM)
    //params.putString("curr", "${currentWM1} ${currentWM2} ${currentWM3} ${currentWM4}")
    //params.putMap("curr", testASD)
    //params.putString("max", maximumWM)
    // paramsInner.putString("left", "someValue1")
    // paramsInner.putString("top", "someValue2")
    // paramsInner.putString("right", "someValue3")
    // paramsInner.putString("bottom", "someValue4")
    //paramsInner.putString("A VER", displayMetrics.toString())
    params.putMap("curr", paramsInner)
    //params.putMap("curr", riversArray)

    //binding.layoutChange.text = newLayoutInfo.toString()
    // if (newLayoutInfo.displayFeatures.isNotEmpty()) {
    //     variable_name = "Spanned across displays"
    //     params.putString("eventProperty", "Spanned across displays")
    // } else {
    //     variable_name = "One logic/physical display - unspanned"
    //     params.putString("eventProperty", "One logic/physical display - unspanned")
    // }

    // reactInstanceManager.currentReactContext
    //   ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    //   ?.emit("EventReminder", params)

    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("EventReminder", params)
      //?.emit("EventReminder", params)
      //?.emit("EventReminder", "${currentWM} ${maximumWM}")
  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "reactNativeCalculator"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))

  // var variable_name: String = "abc"
  // //@ReactMethod()
  //fun getStringa(): List<DisplayFeature> {
  // fun getString(): String {
  // //fun getStringa(): WindowInfoTracker {
    
  //   // var variable_name : String = "abc"
  //   //return variable_name
  //   //return windowInfoTracker.toString()
  //   //return qqq.toString()
  //   //return variable_name
  //     // try {
  //     //     var variable_name : String = "abc"
  //     //     promise.resolve(variable_name)
  //     // } catch (e: Exception) {
  //     //     promise.reject(e)
  //     // }
  // }

}

