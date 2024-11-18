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
import androidx.window.layout.FoldingFeature
//import androidx.window.layout.DisplayFeature

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent



import androidx.window.layout.WindowMetricsCalculator

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

import kotlin.reflect.full.declaredMemberProperties
//import androidx.window.layout.DisplayFeature

lateinit var windowInfoTracker: WindowInfoTracker
//lateinit var qqq: Flow<WindowLayoutInfo>
//lateinit var qqq: WindowInfoTracker

//val reactContext: ReactContext

class MainActivity : ReactActivity() {

  val HINGE_ANGLE_SENSOR_NAME = "Hinge Angle"
  var mSensorManager: SensorManager? = null
  var mHingeAngleSensor: Sensor? = null
  var mSensorListener: SensorEventListener? = null
  var mCurrentHingeAngle: Int = 0

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
          .collect { value -> updateUI(value) }
      }
    }

  }

  //val mainTest = Arguments.createMap()

  // fun setupSensors() {
    // mSensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
    // val sensorList: List<Sensor> = mSensorManager!!.getSensorList(Sensor.TYPE_ALL)
    // for (sensor in sensorList) {
    //   if (sensor.getName().contains(HINGE_ANGLE_SENSOR_NAME)) { mHingeAngleSensor = sensor }
    // }
    // mSensorListener = object : SensorEventListener {
    //   override fun onSensorChanged(event: SensorEvent) {
    //     if (event.sensor == mHingeAngleSensor) {
    //       val angle = event.values[0].toInt()
    //       //TODO something with angle
    //       //mainTest.putString("angle", "${angle}")
          
    //     }
    //   }

    //   override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) { }
    // }
  //}

  fun updateUI(newLayoutInfo: WindowLayoutInfo) {
    //variable_name = newLayoutInfo.displayFeatures
    //variable_name = newLayoutInfo.displayFeatures.toString()
    //variable_name = newLayoutInfo.displayFeatures.flattenToString()
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
    mainMap.putString("fold", "${foldingFeature?.isSeparating}")
    //mainMap.putString("fold", "${newLayoutInfo.displayFeatures.orientation}")
    //mainMap.putMap("fold", newLayoutInfo)

    //params.putMap("curr", riversArray)

    //binding.layoutChange.text = newLayoutInfo.toString()
    // if (newLayoutInfo.displayFeatures.isNotEmpty()) {
    //     variable_name = "Spanned across displays"
    //     params.putString("eventProperty", "Spanned across displays")
    // } else {
    //     variable_name = "One logic/physical display - unspanned"
    //     params.putString("eventProperty", "One logic/physical display - unspanned")
    // }

    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("EventReminder", mainMap)
  }

  // override fun onResume() {
  //   super.onResume()
  //   if (mHingeAngleSensor != null) { mSensorManager?.registerListener(mSensorListener, mHingeAngleSensor, SensorManager.SENSOR_DELAY_NORMAL) }
  // }

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

