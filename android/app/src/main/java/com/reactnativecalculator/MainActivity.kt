package com.reactnativecalculator

import android.content.Context
import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.view.WindowManager

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowMetricsCalculator
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.reactnativecalculator.hnoListParsedClass

import com.zoontek.rnbootsplash.RNBootSplash

import expo.modules.ReactActivityDelegateWrapper

import kotlin.reflect.full.declaredMemberProperties

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

// TEST //

import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature
import android.hardware.display.DisplayManager
import android.view.Display
import android.util.DisplayMetrics
import androidx.window.layout.DisplayFeature
//import androidx.window.layout.WindowLayoutComponent
//import androidx.window.extensions.WindowExtensions
//import androidx.window.extensions.layout.WindowLayoutComponent
//import androidx.window.extensions.layout.WindowLayoutComponent

//import android.util.DisplayMetrics

//import android.content.Context
//import android.hardware.SensorManager
import android.view.OrientationEventListener

import android.content.res.Configuration

import kotlinx.coroutines.*

//import androidx.window.common.CommonFoldingFeature

// TEST //

@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  var orientation = "portrait" // DEFAULT

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
    Log.d("LOG", "EXECUTED CREATE");

    val firstOrientation = this@MainActivity.resources.configuration.orientation
    if (firstOrientation == Configuration.ORIENTATION_PORTRAIT) {
      Log.d("LOG", "FIRST PORTRAIT");
      orientation = "portrait"
    } else {
      Log.d("LOG", "FIRST LANDSCAPE");
      orientation = "landscape"
    }

    //updateUI()
  }

  override fun onResume() {
    super.onResume()
    reactInstanceManager.addReactInstanceEventListener(this)
  }

  override fun onPause() {
    super.onPause()
    reactInstanceManager.removeReactInstanceEventListener(this)
  }

  override fun onReactContextInitialized(context: ReactContext) {

    Log.d("LOG", "REACT CONTEXT ONCE ?");
    updateUI()
  }

  //fun updateUI(windowLayoutInfo: WindowLayoutInfo, context: ReactContext) {
  //fun updateUI(context: ReactContext) {
  fun updateUI() {

    //Log.d("LOG", "EXECUTED updateUI");

    //lateinit var windowLayoutInfo: WindowLayoutInfo


    

    lateinit var job: Job

    //var preFoldingFeature: FoldingFeature? = null
    //val foldingFeature = preFoldingFeature

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo) {
      Log.d("LOG", "333 ${windowLayoutInfo}");
      job.cancel()

      val mainMap = Arguments.createMap()
      val screenMap = Arguments.createMap()
      val windowMap = Arguments.createMap()
      val hingeBoundsMap = Arguments.createMap()

      val dotsPerInch: Double = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
      val boundsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds
      val boundsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity).bounds


      val foldingFeature = windowLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()
      //this@MainActivity.jobbb.cancel()
      //funcTwo()
      Log.d("LOG", "FF ${foldingFeature}");

      var boundsArr = arrayOf("left", "top", "right", "bottom")

      for (item in boundsArr) {
        val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble(); // Int --> Double
        val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble(); // Int --> Double
        val densityIndPixCurr = pixelsCurr / dotsPerInch; // dp = px / (dpi / 160) === px / density
        val densityIndPixMax = pixelsMax / dotsPerInch; // dp = px / (dpi / 160) === px / density

        screenMap.putDouble("${item}", densityIndPixMax);
        windowMap.putDouble("${item}", densityIndPixCurr); // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
      }

      var state: String = "portrait";

      val hnoListParsed = hnoListParsedClass()

      if (foldingFeature !== null) {
        ///// start hno //
        /////val hnoList = hnoFound.split(",").map { item -> item.replace(Regex("[^0-9]"), "").toDouble() }; // { "hinge-[1080", "0", "1080" , "1840]" }
        
        //Log.d("LOG", "555 F A ${foldingFeature}"); // THIS WORK IF 5 A IS FALSE
        //Log.d("LOG", "555 F B ${foldingFeature.state}"); // FLAT or HALF_OPENED
        //Log.d("LOG", "555 F C ${foldingFeature.orientation}"); // HORIZONTAL or VERTICAL
        //Log.d("LOG", "555 F C C ${foldingFeature.orientation == FoldingFeature.Orientation.VERTICAL}"); // HORIZONTAL or VERTICAL
        //Log.d("LOG", "555 F D ${foldingFeature.occlusionType}"); // NONE or FULL (fold or hinge conceals part of the display)
        //Log.d("LOG", "555 F E ${foldingFeature.isSeparating}"); // true or false (two logical display areas)
        //Log.d("LOG", "555 F G ${foldingFeature.bounds}"); // bounds
        //Log.d("LOG", "555 F H ${foldingFeature.bounds.left}"); // bounds

        // val hnoListParsed = hnoListParsedClass()
        // hnoListParsed.left = hnoList[0] / dotsPerInch
        // hnoListParsed.top = hnoList[1] / dotsPerInch
        // hnoListParsed.right = hnoList[2] / dotsPerInch
        // hnoListParsed.bottom = hnoList[3] / dotsPerInch

        //val hnoListParsed = hnoListParsedClass()
        hnoListParsed.left = foldingFeature.bounds.left / dotsPerInch
        hnoListParsed.top = foldingFeature.bounds.top / dotsPerInch
        hnoListParsed.right = foldingFeature.bounds.right / dotsPerInch
        hnoListParsed.bottom = foldingFeature.bounds.bottom / dotsPerInch

        // hingeBoundsMap.putDouble("left", hnoListParsed.left)
        // hingeBoundsMap.putDouble("top", hnoListParsed.top)
        // hingeBoundsMap.putDouble("right", hnoListParsed.right)
        // hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom)

        // val occlusionBoolean = !(hnoListParsed.left == hnoListParsed.right) // BOOLEAN
        // val verticalHinge = hingeBoundsMap.getDouble("top") == 0.0 // BOOLEAN
        val occlusionBoolean = false // BOOLEAN
        val verticalHinge = true // BOOLEAN

        val fullscreen = true
          // screenMap.getDouble("left") == windowMap.getDouble("left") &&
          // screenMap.getDouble("top") == windowMap.getDouble("top") &&
          // screenMap.getDouble("right") == windowMap.getDouble("right") &&
          // screenMap.getDouble("bottom") == windowMap.getDouble("bottom")

        state = //"landscape"
          if (foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.occlusionType == FoldingFeature.OcclusionType.NONE) "fullscreen"
          else if (foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) "tabletop"
          else "book"

          Log.d("LOG", "STATE ${state}");
          // else if (
          //   (foldingFeature.state == FoldingFeature.State.HALF_OPENED && foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) ||
          //   (foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL)
          // ) "tabletop"
          // else if (foldingFeature.state == FoldingFeature.State.HALF_OPENED && foldingFeature.orientation == FoldingFeature.Orientation.VERTICAL) "book"
          // else "book"
          // if (angle > 150.0 && fullscreen && !occlusionBoolean) "fullscreen" // fullscreen fold..
          // else if (angle > 30.0 && fullscreen && !verticalHinge) "tabletop"
          // else if (angle > 30.0 && fullscreen && verticalHinge) "book"
          // else if (boundsCurr.height() >= boundsCurr.width()) "portrait"
          // else "landscape"

        //mainMap.putMap("hingeBounds", hingeBoundsMap)
        // end hno //
      } else {
        state = orientation
      }

    hingeBoundsMap.putDouble("left", hnoListParsed.left)
    hingeBoundsMap.putDouble("top", hnoListParsed.top)
    hingeBoundsMap.putDouble("right", hnoListParsed.right)
    hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom)

    mainMap.putMap("hingeBounds", hingeBoundsMap);
    mainMap.putString("state", state); // fullscreen, tabletop..
    mainMap.putMap("screen", screenMap);
    mainMap.putMap("window", windowMap);

    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("LayoutInfo", mainMap)
      
    }

    job = lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");

          //Log.d("LOG", "A VER ${context.resources.displayMetrics}");

          //Log.d("TEST 2", "A VER ${WindowInfoTracker.getOrCreate(this@MainActivity).windowLayoutInfo(this@MainActivity)}");

          WindowInfoTracker.getOrCreate(this@MainActivity)
            .windowLayoutInfo(this@MainActivity)
            .collect {
              collectAndCancel(it)
              //funcTwo()
              //jobbb.cancel()
            }
            //.collect { value -> testFAA(value) }
            //.collect { updateUI(context) }
    };

    

    // context
    //   .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
    //   ?.emit("LayoutInfo", mainMap)
  }

  override fun onConfigurationChanged(newConfig: Configuration) { // 1st EXECUTED
      super.onConfigurationChanged(newConfig)
      Log.d("LOG", "CONFIGURATION CHANGED");
      when (newConfig.screenLayout) {
        newConfig.screenLayout -> {
          Log.d("LOG", "AAA ${newConfig.screenLayout}");
          updateUI()
        }
      }
      when (newConfig.orientation) {
          Configuration.ORIENTATION_LANDSCAPE -> {
              Log.d("LOG", "$$$ LANDSCAPE");
              orientation = "landscape"
            }

          Configuration.ORIENTATION_PORTRAIT -> {
              Log.d("LOG", "$$$ PORTRAIT");
              orientation = "portrait"
          }
      }
  }


  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}