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

// TEST //

@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
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
          //.collect { updateUI(context) }
      }
    }

    var sensorManager: SensorManager? = context.getSystemService(SENSOR_SERVICE) as SensorManager
    var hingeAngleSensor: Sensor? = sensorManager?.getDefaultSensor(Sensor.TYPE_HINGE_ANGLE)

    val sensorEventListener = object: SensorEventListener {
      override fun onSensorChanged(event: SensorEvent) { angle = event.values[0] }
      override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) { }
    }

    val lifecycleEventListener = object: LifecycleEventListener {
      override fun onHostResume() { hingeAngleSensor?.let { sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_NORMAL) } }
      override fun onHostPause() { hingeAngleSensor?.let { sensorManager?.unregisterListener(sensorEventListener, it) } }
      override fun onHostDestroy() { }
    }
    context.addLifecycleEventListener(lifecycleEventListener)
  }

  fun updateUI(windowLayoutInfo: WindowLayoutInfo, context: ReactContext) {
    val mainMap = Arguments.createMap()
    val screenMap = Arguments.createMap()
    val windowMap = Arguments.createMap()
    val hingeBoundsMap = Arguments.createMap()

    val windowMetricsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity)
    val windowMetricsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity)
    val displayMetrics = this@MainActivity.resources.displayMetrics
    val boundsCurr = windowMetricsCurr.bounds
    val boundsMax = windowMetricsMax.bounds

    Log.d("LOG", "333 ${displayMetrics}"); // displayMetrics
    Log.d("LOG", "444 ${windowLayoutInfo}"); // displayMetrics

    //val qq = (context.getSystemService(Context.DISPLAY_SERVICE) as DisplayManager)
    //Log.d("LOG", "555 ${qq.displays}"); // displayMetrics

    // fun getDisplayMetrics(
    //     context: Context = this@MainActivity,
    //     displayId: Int = Display.DEFAULT_DISPLAY
    // ): DisplayMetrics {
    //     val dm = context.getSystemService(Context.DISPLAY_SERVICE) as DisplayManager
    //     val display = dm.getDisplay(displayId)
    //     val metrics = DisplayMetrics()
    //     display.getMetrics(metrics)
    //     return metrics
    // }
    // Log.d("LOG", "555 ${getDisplayMetrics()}");

    // val displayFeatures: List<DisplayFeature>
    // Log.d("LOG", "555 ${displayFeatures}");
    val displayFeatures: List<DisplayFeature> = windowLayoutInfo.displayFeatures

    Log.d("LOG", "555 ${displayFeatures}"); // THIS // ArrayList <- !!::class.simpleName
    Log.d("LOG", "555 A ${displayFeatures.isEmpty()}"); // THIS
    Log.d("LOG", "555 B ${displayFeatures.get(0)!!::class.simpleName}"); // THIS WORK IF 5 A IS FALSE
    Log.d("LOG", "555 C ${displayFeatures.get(0).bounds}"); // THIS WORK IF 5 A IS FALSE
    //Log.d("LOG", "555 C ${displayFeatures.get(1)}"); // THIS
    //Log.d("LOG", "555 D ${displayFeatures.get(2)}"); // THIS

    var boundsArr = arrayOf("left", "top", "right", "bottom")

    val dotsPerInch: Double = displayMetrics.density.toDouble() // Float --> Double

    for (item in boundsArr) {
      val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble(); // Int --> Double
      val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble(); // Int --> Double
      val densityIndPixCurr = pixelsCurr / dotsPerInch; // dp = px / (dpi / 160) === px / density
      val densityIndPixMax = pixelsMax / dotsPerInch; // dp = px / (dpi / 160) === px / density

      screenMap.putDouble("${item}", densityIndPixMax);
      windowMap.putDouble("${item}", densityIndPixCurr); // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
    }

    // hnoFirstPlace --> api TPS target 14 google play // api UDCPS target 15 google play --> e.g.: hinge-[1080,0,1080,1840] // api 30 surface duo --> e.g.: hinge-[1391,0,1392,1800]
    val hnoFirstPlace = Settings.Global.getString(context.contentResolver, "display_features"); // return null if not found
    val IDHnoSecondPlace = context.resources.getIdentifier("config_display_features", "string", "android"); // return 0 if not found
    // hnoSecondPlace --> api 34 target 14 google apis --> e.g.: fold-[1104,0,1104,1848]
    val hnoSecondPlace = if (IDHnoSecondPlace !== 0) context.resources.getString(IDHnoSecondPlace) else null;

    Log.d("LOG", "111 ${hnoFirstPlace}"); // ok // android.content.res.Resources@749fb15
    Log.d("LOG", "222 ${hnoSecondPlace}"); // ok // android.content.res.Resources@749fb15

    val hnoFound = // HINGE NATURAL ORIENTATION // SAME AS RawFoldingFeatureProducer
      if (!hnoFirstPlace.isNullOrEmpty()) hnoFirstPlace
      else if (!hnoSecondPlace.isNullOrEmpty()) hnoSecondPlace
      else null;

    val state: String;

    if (!hnoFound.isNullOrEmpty()) {
      // start hno //
      val hnoList = hnoFound.split(",").map { item -> item.replace(Regex("[^0-9]"), "").toDouble() }; // { "hinge-[1080", "0", "1080" , "1840]" }

      val hnoListParsed = hnoListParsedClass()
      hnoListParsed.left = hnoList[0] / dotsPerInch
      hnoListParsed.top = hnoList[1] / dotsPerInch
      hnoListParsed.right = hnoList[2] / dotsPerInch
      hnoListParsed.bottom = hnoList[3] / dotsPerInch

      @Suppress("DEPRECATION")
      val rotation = (context.getSystemService(Context.WINDOW_SERVICE) as WindowManager).defaultDisplay.rotation // retrieve 0 1 2 3
      if (rotation == 1) { // rotation 90º (rotated to left)
        hingeBoundsMap.putDouble("left", 0.0) // ALWAYS IS ZERO
        hingeBoundsMap.putDouble("top", screenMap.getDouble("bottom") - hnoListParsed.left) // maxHeight - Left
        hingeBoundsMap.putDouble("right", hnoListParsed.bottom) // Bottom
        hingeBoundsMap.putDouble("bottom", screenMap.getDouble("bottom") - hnoListParsed.right) // maxHeight - Right
      } else if (rotation == 2) { // rotation 180º
        hingeBoundsMap.putDouble("left", screenMap.getDouble("right") - hnoListParsed.right) // maxWidth - Right
        hingeBoundsMap.putDouble("top", 0.0) // ALWAYS IS ZERO
        hingeBoundsMap.putDouble("right", screenMap.getDouble("right") - hnoListParsed.left) // maxWidth - Left
        hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom) // Bottom
      } else if (rotation == 3) { // rotation 270º
        hingeBoundsMap.putDouble("left", 0.0) // ALWAYS IS ZERO
        hingeBoundsMap.putDouble("top", hnoListParsed.left) // Left
        hingeBoundsMap.putDouble("right", hnoListParsed.bottom) // Bottom
        hingeBoundsMap.putDouble("bottom", hnoListParsed.right) // Right
      } else { // rotation == 0 --> natural orientation
        hingeBoundsMap.putDouble("left", hnoListParsed.left)
        hingeBoundsMap.putDouble("top", hnoListParsed.top)
        hingeBoundsMap.putDouble("right", hnoListParsed.right)
        hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom)
      }

      val occlusionBoolean = !(hnoListParsed.left == hnoListParsed.right) // BOOLEAN
      val verticalHinge = hingeBoundsMap.getDouble("top") == 0.0 // BOOLEAN

      val fullscreen =
        screenMap.getDouble("left") == windowMap.getDouble("left") &&
        screenMap.getDouble("top") == windowMap.getDouble("top") &&
        screenMap.getDouble("right") == windowMap.getDouble("right") &&
        screenMap.getDouble("bottom") == windowMap.getDouble("bottom")

      state =
        if (angle > 150.0 && fullscreen && !occlusionBoolean) "fullscreen" // fullscreen fold..
        else if (angle > 30.0 && fullscreen && !verticalHinge) "tabletop"
        else if (angle > 30.0 && fullscreen && verticalHinge) "book"
        else if (boundsCurr.height() >= boundsCurr.width()) "portrait"
        else "landscape"

      mainMap.putMap("hingeBounds", hingeBoundsMap)
      // end hno //
    } else {
      state =
        if (boundsCurr.height() >= boundsCurr.width()) "portrait"
        else "landscape";
    }

    mainMap.putString("state", state) // fullscreen, tabletop..
    mainMap.putMap("screen", screenMap);
    mainMap.putMap("window", windowMap);

    context
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("LayoutInfo", mainMap)
  }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}