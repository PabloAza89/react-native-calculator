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
import android.util.Log;

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature
import androidx.window.layout.WindowMetricsCalculator
//import androidx.window.layout.DisplayFeature

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent



import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

import kotlin.reflect.full.declaredMemberProperties

import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext


//import androidx.window.layout.DisplayFeature

lateinit var windowInfoTracker: WindowInfoTracker
//lateinit var qqq: Flow<WindowLayoutInfo>
//lateinit var qqq: WindowInfoTracker

//val reactContext: ReactContext


class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens

    // val qq = WindowInfoTracker.getOrCreate(this@MainActivity).windowLayoutInfo(this@MainActivity)
    //       updateUI(qq)

    lifecycleScope.launch(Dispatchers.Main) {
      lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
        WindowInfoTracker.getOrCreate(this@MainActivity)
          .windowLayoutInfo(this@MainActivity)
          .collect { value -> updateUI(value) }
      }
    }

  }

  // override fun onStart() {
  //   super.onStart();

  //   reactInstanceManager.currentReactContext
  //     ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
  //     ?.emit("onStartMainActivity", "TEST")
  // }

  fun updateUI(newLayoutInfo: WindowLayoutInfo) {
    //variable_name = newLayoutInfo.displayFeatures
    //variable_name = newLayoutInfo.displayFeatures.toString()
    //variable_name = newLayoutInfo.displayFeatures.flattenToString()

    //Log.d("Notification", "Log from the app");
    //Log.d("LOG", "${newLayoutInfo}");

    val mainMap = Arguments.createMap()
    val currMap = Arguments.createMap()
    val maxMap = Arguments.createMap()
    val foldMap = Arguments.createMap()

    val windowMetricsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity)
    val windowMetricsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity)
    val displayMetrics = this@MainActivity.resources.displayMetrics
    // val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).bounds.flattenToString()
    // val maximumWM = wmc.computeMaximumWindowMetrics(this@MainActivity).bounds.flattenToString()
    //val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).toString()
    //val currentWM = wmc.computeMaximumWindowMetrics(this@MainActivity).toString()
    //val currentWM = wmc.computeCurrentWindowMetrics(this@MainActivity).widthDp.toString()
    val boundsCurr = windowMetricsCurr.bounds
    val boundsMax = windowMetricsMax.bounds

    var boundsArr = arrayOf("left", "top", "right", "bottom")

    //all["left"].toFloat().toString(),

    val dotsPerInch = displayMetrics.density.toDouble() // Float --> Double

    for (item in boundsArr) {

      val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble() // Int --> Double
      val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble() // Int --> Double
      val densityIndPixCurr = pixelsCurr / dotsPerInch // dp = px / (dpi / 160) === px / density
      val densityIndPixMax = pixelsMax / dotsPerInch // dp = px / (dpi / 160) === px / density

      //WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds.left.toFloat()
      // val newItem = Dimensions("${x}", "${test}")
      // childArray.add(newItem)
      //childArray.add(newItem)
      //paramsInner.putString("${x}", "${test.toString()}")
      //paramsInner.putString("${item}", "${dotsPerInch!!::class.simpleName}")
      //paramsInner.putString("${item}", "${densityIndPix}")

      // currMap.putDouble("${item}", densityIndPixCurr) // dotsPerInch!!::class.simpleName} --> RETRIEVE TYPE
      // maxMap.putDouble("${item}", densityIndPixMax) // dotsPerInch!!::class.simpleName} --> RETRIEVE TYPE

    }

    val foldingFeature = newLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

    //foldMap.putString("fold", "${newLayoutInfo}") // dotsPerInch!!::class.simpleName} --> RETRIEVE TYPE

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

    mainMap.putMap("curr", currMap)
    mainMap.putMap("max", maxMap)

    //mainMap.putString("fold", "${foldingFeature?.state}")
    //mainMap.putString("fold", "${foldingFeature?.orientation}")
    //mainMap.putString("fold", "${foldingFeature?.occlusionType}")
    //mainMap.putString("fold", "${foldingFeature?.isSeparating}")
    //mainMap.putString("fold", "${foldingFeature?.isSeparating}")
    //mainMap.putString("fold", "${newLayoutInfo.displayFeatures.orientation}")
    mainMap.putString("fold", "${newLayoutInfo}")
    //mainMap.putMap("fold", "${newLayoutInfo}")

    //params.putMap("curr", riversArray)

    //binding.layoutChange.text = newLayoutInfo.toString()
    // if (newLayoutInfo.displayFeatures.isNotEmpty()) {
    //     variable_name = "Spanned across displays"
    //     params.putString("eventProperty", "Spanned across displays")
    // } else {
    //     variable_name = "One logic/physical display - unspanned"
    //     params.putString("eventProperty", "One logic/physical display - unspanned")
    // }

    //Log.d("LOG", "AVER ${reactInstanceManager.currentReactContext}");

    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("EventReminder", mainMap)
      //?.emit("EventReminder", null)
      
  }

  // override fun onReactContextInitialized() {
  //     //Log.d(TAG, "Here's your valid ReactContext")
  //     Log.d("LOG", "AVER contexto valido");
  // }

  // override fun onResume() {
  //   super.onResume();
  //    Log.d("LOG", "onResume ${reactInstanceManager.currentReactContext}");
  //   //if (mHingeAngleSensor != null) { mSensorManager?.registerListener(mSensorListener, mHingeAngleSensor, SensorManager.SENSOR_DELAY_NORMAL) }
  // }

  override fun onResume() {
    super.onResume()
    reactInstanceManager.addReactInstanceEventListener(this)
  }

  override fun onPause() {
      super.onPause()
      reactInstanceManager.removeReactInstanceEventListener(this)
  }

  override fun onReactContextInitialized(context: ReactContext) {
    //Log.d("LOG", "onReactContextInitialized ${reactInstanceManager.currentReactContext}");
    Log.d("LOG", "onReactContextInitialized ${context}");
    //Log.d(TAG, "Here's your valid ReactContext")
    context
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("EventReminder", "WORKING")
      //?.emit("EventReminder", null)
  }


  // override fun onPause() {
  //   super.onPause()
  //   if (mHingeAngleSensor != null) { mSensorManager?.unregisterListener(mSensorListener, mHingeAngleSensor) }
  // }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
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

