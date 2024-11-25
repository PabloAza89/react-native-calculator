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

  override fun onReactContextInitialized(context: ReactContext) {
    lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");
      lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
        WindowInfoTracker.getOrCreate(this@MainActivity)
          .windowLayoutInfo(this@MainActivity)
          .collect { value -> updateUI(value, context) }
      }
    }
  }

  fun updateUI(newLayoutInfo: WindowLayoutInfo, context: ReactContext) {
    val mainMap = Arguments.createMap()
    val currMap = Arguments.createMap()
    val maxMap = Arguments.createMap()
    val hingeMap = Arguments.createMap()
    val testMap = Arguments.createMap()

    val windowMetricsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity)
    val windowMetricsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity)
    val displayMetrics = this@MainActivity.resources.displayMetrics
    val boundsCurr = windowMetricsCurr.bounds
    val boundsMax = windowMetricsMax.bounds

    var boundsArr = arrayOf("left", "top", "right", "bottom")

    val dotsPerInch = displayMetrics.density.toDouble() // Float --> Double

    for (item in boundsArr) {
      val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble() // Int --> Double
      val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble() // Int --> Double
      val densityIndPixCurr = pixelsCurr / dotsPerInch // dp = px / (dpi / 160) === px / density
      val densityIndPixMax = pixelsMax / dotsPerInch // dp = px / (dpi / 160) === px / density

      currMap.putDouble("${item}", densityIndPixCurr)
      maxMap.putDouble("${item}", densityIndPixMax) // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
    }

    val foldingFeature = newLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

    if (foldingFeature != null) {

      for (item in boundsArr) {
        val pixelsHinge = foldingFeature.bounds::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(foldingFeature.bounds).toString().toDouble() // Int --> Double
        val densityIndPixHinge = pixelsHinge / dotsPerInch // dp = px / (dpi / 160) === px / density
        hingeMap.putDouble("${item}", densityIndPixHinge) // densityIndPixHinge!!::class.simpleName --> RETRIEVE TYPE

        // val pixelsHinge = foldingFeature.bounds::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(foldingFeature.bounds).toString().toDouble() // Int --> Double
        // hingeMap.putDouble("${item}", pixelsHinge) // densityIndPixHinge!!::class.simpleName --> RETRIEVE TYPE

      }

      mainMap.putString("state", "${foldingFeature.state}") // FLAT or HALF_OPENED
      mainMap.putString("orientation", "${foldingFeature.orientation}") // HORIZONTAL or VERTICAL
      mainMap.putString("occlusionType", "${foldingFeature.occlusionType}") // NONE or FULL
      mainMap.putBoolean("isSeparating", foldingFeature.isSeparating) // TRUE or FALSE (boolean)
      mainMap.putMap("hinge", hingeMap) // Rect
    }


    //val qqa = context.resources.getString(context.resources.getIdentifier("config_display_features", "string", "android"))

    // val mResolver = context.getContentResolver();
    // val qqa = Settings.Global.getString(mResolver, "display_features");

    // e.g.: hinge-[1080,0,1080,1840]
    val hnoArr = Settings.Global.getString(context.contentResolver, "display_features").split(",") // HINGE NATURAL ORIENTATION


    // val test = this@MainActivity.getResources().getConfiguration().orientation // retrieve 1 or 2
    //val test = getWindowManager().getDefaultDisplay().getRotation(); // retrieve 0 1 2 3
    //val test = (getSystemService(WindowManager::class.java) as WindowManager).defaultDisplay.rotation

    // 0 --> natural orientation
    // 1 --> rotation 90º (rotated to left)
    // 2 --> rotation 180º
    // 3 --> rotation 270º

    val rotation = (context.getSystemService(Context.WINDOW_SERVICE) as WindowManager).defaultDisplay.rotation // retrieve 0 1 2 3
    if (rotation == 1) { // rotation 90º (rotated to left)
      testMap.putString("left", "0")
      testMap.putString("top", "${hnoArr[2].toDouble() / dotsPerInch}") // CONTINUE HERE
      testMap.putString("right", "${hnoArr[2].toDouble() / dotsPerInch}")
      testMap.putString("bottom", "${hnoArr[3].filter { it.isDigit() }.toDouble() / dotsPerInch}")
    } else { // rotation == 0 --> natural orientation
      testMap.putString("left", "${hnoArr[0].filter { it.isDigit() }.toDouble() / dotsPerInch}")
      testMap.putString("top", "${hnoArr[1].toDouble() / dotsPerInch}")
      testMap.putString("right", "${hnoArr[2].toDouble() / dotsPerInch}")
      testMap.putString("bottom", "${hnoArr[3].filter { it.isDigit() }.toDouble() / dotsPerInch}")
    }

    mainMap.putMap("curr", currMap)
    mainMap.putMap("max", maxMap)
    //mainMap.putString("test", "${hardware}")
    //mainMap.putString("test", "${qqa}")
    //mainMap.putString("hno", "${hno}")
    mainMap.putString("test", "${hnoArr}")
    mainMap.putMap("hno", testMap)
    mainMap.putString("rotation", "${rotation}")
    //mainMap.putString("test", "${foldingFeature}")
    //mainMap.putString("test", "${newLayoutInfo}")
    // 2 LANDSCAPE // 1 PORTRAIT
    //mainMap.putString("test", "${context.resources.configuration.orientation}")
    
    
    

    reactInstanceManager.currentReactContext
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("LayoutInfo", mainMap)
  }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}

