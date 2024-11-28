package com.reactnativecalculator

import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.zoontek.rnbootsplash.RNBootSplash

import android.os.Bundle
import android.util.Log

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature
import androidx.window.layout.WindowMetricsCalculator
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

import kotlin.reflect.full.declaredMemberProperties

//import androidx.window.extensions.layout.FoldingFeature as OEMFoldingFeature
//import androidx.window.extensions.layout.FoldingFeature as OEMFoldingFeature
//import androidx.window.extensions.core.util.function
//import androidx.window.layout.FoldingFeature
//import android.view.Display.DEFAULT_DISPLAY;
//import androidx.window.common.CommonFoldingFeature;
//import androidx.window.layout.HardwareFoldingFeature
//import com.android.internal.R.string.config_display_features as ALV
//import android.content.res.Resources
//import android.R
//import com.android.internal.R
//import androidx.window.common.CommonFoldingFeature
//import android.hardware.devicestate.DeviceStateManager
//import android.hardware.devicestate.DeviceState
//import android.hardware.devicestate.IDeviceStateManagerCallback

import android.provider.Settings
import android.content.res.Configuration
import android.view.Display
import android.view.WindowManager
import android.content.Context

import com.reactnativecalculator.hnoListParsedClass

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent
import com.facebook.react.bridge.LifecycleEventListener

class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens

    // lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");
    //   lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
    //     WindowInfoTracker.getOrCreate(this@MainActivity)
    //       .windowLayoutInfo(this@MainActivity)
    //       .collect { value -> updateUI(value) }
    //   }
    // }

  }


  override fun onResume() {
    super.onResume()
    reactInstanceManager.addReactInstanceEventListener(this)
  }

  override fun onPause() {
    super.onPause()
    reactInstanceManager.removeReactInstanceEventListener(this)
  }

  var angle: Float = 0.toFloat()

  override fun onReactContextInitialized(context: ReactContext) {
    lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");
      lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
        WindowInfoTracker.getOrCreate(this@MainActivity)
          .windowLayoutInfo(this@MainActivity)
          .collect { value -> updateUI(value, context) }
      }
    }

    var sensorManager: SensorManager? = context.getSystemService(SENSOR_SERVICE) as SensorManager
    var hingeAngleSensor: Sensor? = sensorManager?.getDefaultSensor(Sensor.TYPE_HINGE_ANGLE)

    val sensorEventListener = object: SensorEventListener {
      override fun onSensorChanged(event: SensorEvent) {
        angle = event.values[0]
        context
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          ?.emit("angle", angle) // Float
          //?.emit("angle", event.values[0].toInt())
      }

      override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) { }
    }

    val lifecycleEventListener = object: LifecycleEventListener {
      override fun onHostResume() { hingeAngleSensor?.let { sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_NORMAL) } }

      override fun onHostPause() { hingeAngleSensor?.let { sensorManager?.unregisterListener(sensorEventListener, it) } }

      override fun onHostDestroy() { }
    }

    context.addLifecycleEventListener(lifecycleEventListener)

  }

  fun updateUI(newLayoutInfo: WindowLayoutInfo, context: ReactContext) {
    val mainMap = Arguments.createMap()
    val currWindowMap = Arguments.createMap()
    val maxScreenMap = Arguments.createMap()
    val hingeBoundsMap = Arguments.createMap()
    ///val testMap = Arguments.createMap()

    val windowMetricsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity)
    val windowMetricsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity)
    val displayMetrics = this@MainActivity.resources.displayMetrics
    val boundsCurr = windowMetricsCurr.bounds
    val boundsMax = windowMetricsMax.bounds

    var boundsArr = arrayOf("left", "top", "right", "bottom")

    val dotsPerInch: Double = displayMetrics.density.toDouble() // Float --> Double

    for (item in boundsArr) {
      val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble() // Int --> Double
      val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble() // Int --> Double
      val densityIndPixCurr = pixelsCurr / dotsPerInch // dp = px / (dpi / 160) === px / density
      val densityIndPixMax = pixelsMax / dotsPerInch // dp = px / (dpi / 160) === px / density

      currWindowMap.putDouble("${item}", densityIndPixCurr)
      maxScreenMap.putDouble("${item}", densityIndPixMax) // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
    }

    val foldingFeature = newLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

    if (foldingFeature != null) {

      // for (item in boundsArr) {
      //   val pixelsHinge = foldingFeature.bounds::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(foldingFeature.bounds).toString().toDouble() // Int --> Double
      //   val densityIndPixHinge = pixelsHinge / dotsPerInch // dp = px / (dpi / 160) === px / density
      //   hingeMap.putDouble("${item}", densityIndPixHinge) // densityIndPixHinge!!::class.simpleName --> RETRIEVE TYPE

      //   // val pixelsHinge = foldingFeature.bounds::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(foldingFeature.bounds).toString().toDouble() // Int --> Double
      //   // hingeMap.putDouble("${item}", pixelsHinge) // densityIndPixHinge!!::class.simpleName --> RETRIEVE TYPE

      // }

      //mainMap.putString("state", "${foldingFeature.state}") // FLAT or HALF_OPENED
      //mainMap.putString("orientation", "${foldingFeature.orientation}") // HORIZONTAL or VERTICAL
      //mainMap.putString("occlusion", "${foldingFeature.occlusionType}") // NONE or FULL
      //mainMap.putBoolean("isSeparating", foldingFeature.isSeparating) // TRUE or FALSE (boolean)
      //mainMap.putMap("hinge", hingeMap) // Rect
    }


    //val qqa = context.resources.getString(context.resources.getIdentifier("config_display_features", "string", "android"))

    // val mResolver = context.getContentResolver();
    // val qqa = Settings.Global.getString(mResolver, "display_features");

    // e.g.: hinge-[1080,0,1080,1840]
    // { "hinge-[1080", "0", "1080" , "1840]" }
    val hnoList = Settings.Global.getString(context.contentResolver, "display_features").split(",").map { item -> item.replace(Regex("[^0-9]"), "").toDouble() } // HINGE NATURAL ORIENTATION

    val hnoListParsed = hnoListParsedClass()
    hnoListParsed.left = hnoList[0] / dotsPerInch
    hnoListParsed.top = hnoList[1] / dotsPerInch
    hnoListParsed.right = hnoList[2] / dotsPerInch
    hnoListParsed.bottom = hnoList[3] / dotsPerInch


    // val test = this@MainActivity.getResources().getConfiguration().orientation // retrieve 1 or 2
    //val test = getWindowManager().getDefaultDisplay().getRotation(); // retrieve 0 1 2 3
    //val test = (getSystemService(WindowManager::class.java) as WindowManager).defaultDisplay.rotation

    // 0 --> natural orientation
    // 1 --> rotation 90º (rotated to left)
    // 2 --> rotation 180º
    // 3 --> rotation 270º

    val rotation = (context.getSystemService(Context.WINDOW_SERVICE) as WindowManager).defaultDisplay.rotation // retrieve 0 1 2 3
    if (rotation == 1) { // rotation 90º (rotated to left)
      hingeBoundsMap.putDouble("left", 0.0) // ALWAYS IS ZERO
      hingeBoundsMap.putDouble("top", maxScreenMap.getDouble("bottom") - hnoListParsed.left) // maxHeight - Left
      hingeBoundsMap.putDouble("right", hnoListParsed.bottom) // Bottom
      hingeBoundsMap.putDouble("bottom", maxScreenMap.getDouble("bottom") - hnoListParsed.right) // maxHeight - Right
    }
    else if (rotation == 2) { // rotation 180º
      hingeBoundsMap.putDouble("left", maxScreenMap.getDouble("right") - hnoListParsed.right) // maxWidth - Right
      hingeBoundsMap.putDouble("top", 0.0) // ALWAYS IS ZERO
      hingeBoundsMap.putDouble("right", maxScreenMap.getDouble("right") - hnoListParsed.left) // maxWidth - Left
      hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom) // Bottom
    }
    else if (rotation == 3) { // rotation 270º
      hingeBoundsMap.putDouble("left", 0.0) // ALWAYS IS ZERO
      hingeBoundsMap.putDouble("top", hnoListParsed.left) // Left
      hingeBoundsMap.putDouble("right", hnoListParsed.bottom) // Bottom
      hingeBoundsMap.putDouble("bottom", hnoListParsed.right) // Right
    }
    else { // rotation == 0 --> natural orientation
      hingeBoundsMap.putDouble("left", hnoListParsed.left)
      hingeBoundsMap.putDouble("top", hnoListParsed.top)
      hingeBoundsMap.putDouble("right", hnoListParsed.right)
      hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom)
    }

    mainMap.putMap("hingeBounds", hingeBoundsMap)
    mainMap.putMap("currWindow", currWindowMap)
    mainMap.putMap("maxScreen", maxScreenMap)

    val occlusionBoolean = !(hnoListParsed.left == hnoListParsed.right)
    //val orientationPos = hingeMap.getDouble("top") == 0.0
    val orientationPos = mainMap.getMap("hingeBounds")?.getDouble("top") == 0.0
    //val orientationPos = hingeMap.getDouble("top")



    val state = if (angle > 150.0) "flat" else if (angle > 30.0) "half" else "closed"

    //mainMap.putString("verticalHinge", "${ hingeMap.getDouble("right") }") // TRUE or FALSE
    //mainMap.putString("verticalHinge", "${ mainMap.getMap("hinge")!!::class.simpleName }") // TRUE or FALSE
    //mainMap.putString("verticalHinge", "${ mainMap.getMap("hinge")?.isNull("asd") }") // TRUE or FALSE
    //mainMap.putString("verticalHinge", "${ mainMap.getMap("hinge")?.getDouble("left") }") // TRUE or FALSE
    mainMap.putBoolean("verticalHinge", orientationPos) // TRUE or FALSE
    mainMap.putBoolean("occlusion", occlusionBoolean) // TRUE or FALSE

    mainMap.putString("state", state) // FLAT or HALF_OPENED

    //mainMap.putString("test", "${hardware}")
    //mainMap.putString("test", "${qqa}")
    //mainMap.putString("hno", "${hno}")
    //mainMap.putString("test", "${hnoList}")
    //mainMap.putMap("hinge", hingeMap)
    //mainMap.putString("rotation", "${rotation}")
    //mainMap.putString("test", "${foldingFeature}")
    //mainMap.putString("test", "${newLayoutInfo}")
    // 2 LANDSCAPE // 1 PORTRAIT
    //mainMap.putString("test", "${context.resources.configuration.orientation}")

    context
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("LayoutInfo", mainMap)
  }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}

