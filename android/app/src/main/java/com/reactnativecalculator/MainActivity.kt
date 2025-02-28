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
//import com.facebook.react.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.reactnativecalculator.hingeBoundsClass
//import com.reactnativecalculator.currentInsetsClass

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

import androidx.window.java.layout.WindowInfoTrackerCallbackAdapter
import java.util.concurrent.Executors
import androidx.core.util.Consumer

//import androidx.window.common.CommonFoldingFeature

import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import android.view.WindowInsets

//import android.os.Build
import android.view.ViewTreeObserver
import android.widget.LinearLayout
import com.reactnativecalculator.R

//import java.awt.Insets
import android.graphics.Insets
import kotlin.properties.Delegates

import androidx.core.view.WindowCompat

import com.facebook.react.bridge.ReactApplicationContext

//import android.R

// TEST //

@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  lateinit var currentOrientation: String// = "portrait" // DEFAULT
  var canUpdate: Boolean = true
  var sendUpdate: Boolean = false
  //val dotsPerInch: Double = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
  //lateinit var dotsPerInch: Double
  var dotsPerInch: Double by Delegates.notNull<Double>()
  //var count: Int by Delegates.notNull<Int>()

  //val mainMap = Arguments.createMap()
  //lateinit var windowMutableMap: MutableMap<String, Double>
  //lateinit var windowMutableMap: MutableMap<String, Int>
  //lateinit var windowMutableMap = mutableMapOf<String, Int>()
  //val currentWindow = mutableMapOf<String, Int>()
  var currentWindow: MutableMap<String, Int> = mutableMapOf()
  var currentHingeBounds: MutableMap<String, Int> = mutableMapOf()
  //val windowMap = Arguments.createMap()
  lateinit var currentState: String;
  lateinit var currentInsets: Insets
  //val currentInsets = currentInsetsClass()

  lateinit var rootView: View

  lateinit var testVar: String

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
    WindowCompat.setDecorFitsSystemWindows(window, false)
    //window.setNavigationBarContrastEnforced(false)
    Log.d("LOG", "EXECUTED CREATE");

    dotsPerInch = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double

    rootView = findViewById<View>(android.R.id.content).rootView

    rootView.viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
        override fun onGlobalLayout() {
          testVar = "NEW VALUE"
          Log.d("LOG", "NEW GLOBAL LAYOUT");
          //Log.d("LOG", "NEW GLOBAL VIEW ${rooView}");          

          if (canUpdate) updateUI("LAY", null)

        }
    })


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


    class ListenerCallback : Consumer<WindowLayoutInfo> {
      override fun accept(newLayoutInfo: WindowLayoutInfo) {
        Log.d("LOG", "[]CALLBACK");
        //updateUI("CB", newLayoutInfo)
        if (canUpdate) updateUI("CB", newLayoutInfo)
      }
    }

    val listenerCallback = ListenerCallback()

    val windowInfoTracker = WindowInfoTrackerCallbackAdapter(WindowInfoTracker.getOrCreate(this@MainActivity))

    val lifecycleEventListener = object: LifecycleEventListener {

      override fun onHostResume() {
        Log.d("LOG", "ADD CALLBACK");
        //Log.d("LOG", "TEST VALUE ${}");
        windowInfoTracker.addWindowLayoutInfoListener(
          this@MainActivity,
          Executors.newSingleThreadExecutor(),
          listenerCallback
        )

        //Log.d("LOG", "TEST VAR: ${testVar}");

        
      

        //Log.d("LOG", "ADDED LAYOUT LISTENER");
        // Log.d("LOG", "A VER ROOTVIEW ${rootView}");
        //Log.d("LOG", "A VER LAYOUT LISTENER ${layoutListener}");


      }

      override fun onHostPause() {
        Log.d("LOG", "REMOVE CALLBACK");
        windowInfoTracker.removeWindowLayoutInfoListener(listenerCallback)

        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
        //   rootView.viewTreeObserver.removeOnGlobalLayoutListener(layoutListener)
        //   Log.d("LOG", "REMOVE LAYOUT LISTENER >= JELLY BEAN");
        // } else {
        //   rootView.viewTreeObserver.removeGlobalOnLayoutListener(layoutListener)
        //   Log.d("LOG", "REMOVE LAYOUT LISTENER OTHER");
        // }
        
      }
      override fun onHostDestroy() { }
    }
    context.addLifecycleEventListener(lifecycleEventListener)




  }


  fun updateUI(who: String, incomingWindowLayoutInfo: WindowLayoutInfo?) {

    canUpdate = false // BEGIN updateUI ~ FLAG

    // BEGIN ORIENTATION //
    val newOrientation = this@MainActivity.resources.configuration.orientation
    if (newOrientation == Configuration.ORIENTATION_PORTRAIT) { currentOrientation = "portrait" }
    else { currentOrientation = "landscape" }
    // END ORIENTATION //

    
    lateinit var job: Job

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo, doJob: Boolean) {
      Log.d("LOG", "${who} ${windowLayoutInfo}");
      if (doJob) job.cancel();

      val mainMap = Arguments.createMap()
      //val hingeBoundsMap = Arguments.createMap()
      //val insetsMap = Arguments.createMap()

      // BEGIN WINDOW //
      val windowBounds = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds
      val newWindow = mutableMapOf("width" to windowBounds.width(), "height" to windowBounds.height())
      if (currentWindow.isEmpty() || !currentWindow.equals(newWindow)) { currentWindow = newWindow; sendUpdate = true }
      // END WINDOW //

      // BEGIN INSETS //
      @RequiresApi(Build.VERSION_CODES.R)
      fun getRootWindowInsetsCompatR(rootView: View): Unit {

        Log.d("LOG", "EXEC INSIDE");

        //val insetsMap = Arguments.createMap()

        val newInsets =
          rootView.rootWindowInsets?.getInsets(
            WindowInsets.Type.statusBars() or
            WindowInsets.Type.displayCutout() or
            WindowInsets.Type.navigationBars() or
            WindowInsets.Type.captionBar()
          )

        if (newInsets !== null) {
          if (!::currentInsets.isInitialized || !currentInsets.equals(newInsets)) { currentInsets = newInsets; sendUpdate = true }
        }

        Log.d("LOG", "CURRENT ${currentInsets}");

      }


      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) getRootWindowInsetsCompatR(rootView)
      // END INSETS //


      val foldingFeature = windowLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

      //var state: String = "portrait";
      //lateinit var state: String;

      //val hingeBounds = hingeBoundsClass()

      var newHingeBounds: MutableMap<String, Int> = mutableMapOf()

      lateinit var newState: String;

      if (foldingFeature != null) {
        // hingeBounds.left = foldingFeature.bounds.left // / dotsPerInch
        // hingeBounds.top = foldingFeature.bounds.top // / dotsPerInch
        // hingeBounds.right = foldingFeature.bounds.right // / dotsPerInch
        // hingeBounds.bottom = foldingFeature.bounds.bottom // / dotsPerInch

        newHingeBounds = mutableMapOf(
          "left" to foldingFeature.bounds.left,
          "top" to foldingFeature.bounds.top,
          "right" to foldingFeature.bounds.right,
          "bottom" to foldingFeature.bounds.bottom
        )

        newState =
          if (foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.occlusionType == FoldingFeature.OcclusionType.NONE) "flat"
          else if (foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) "tabletop"
          else "book"
      } else {
        newState = currentOrientation
        newHingeBounds = mutableMapOf("left" to 0, "top" to 0, "right" to 0, "bottom" to 0)
      }

      if (!::currentState.isInitialized || !currentState.equals(newState)) { currentState = newState; sendUpdate = true }

      if (currentHingeBounds.isEmpty() || !currentHingeBounds.equals(newHingeBounds)) { currentHingeBounds = newHingeBounds; sendUpdate = true }

      // hingeBoundsMap.putDouble("left", hingeBounds.left)
      // hingeBoundsMap.putDouble("top", hingeBounds.top)
      // hingeBoundsMap.putDouble("right", hingeBounds.right)
      // hingeBoundsMap.putDouble("bottom", hingeBounds.bottom)

      //Log.d("LOG", "EQUAL WINDOW ${windowMap.equals(windowMap)}");
      //Log.d("LOG", "EQUAL WINDOW ${windowMap.equals(windowMap)}");
      //Log.d("LOG", "EQUAL HINGE ${hingeBoundsMap.equals(insetsMap)}");
      Log.d("LOG", "CURRENT CONTEXT PRE ${reactInstanceManager.currentReactContext}");
      //if (!windowMutableMap.equals(windowMutableMap)) {
      if (sendUpdate) {
        //mainMap.putMap("hingeBounds", hingeBoundsMap);
        mainMap.putMap("hingeBounds", Arguments.createMap().apply {
          putDouble("left", currentHingeBounds["left"]!! / dotsPerInch)
          putDouble("top", currentHingeBounds["top"]!! / dotsPerInch)
          putDouble("right", currentHingeBounds["right"]!! / dotsPerInch)
          putDouble("bottom", currentHingeBounds["bottom"]!! / dotsPerInch)
        });
        mainMap.putString("state", currentState); // flat, tabletop..
        //mainMap.putMap("window", windowMap);
        mainMap.putMap("window", Arguments.createMap().apply {
          putDouble("width", currentWindow["width"]!! / dotsPerInch)
          putDouble("height", currentWindow["height"]!! / dotsPerInch)
        });
        //mainMap.putMap("insets", insetsMap)
        mainMap.putMap("insets", Arguments.createMap().apply {
          putDouble("left", currentInsets.left / dotsPerInch)
          putDouble("top", currentInsets.top / dotsPerInch)
          putDouble("right", currentInsets.right / dotsPerInch)
          putDouble("bottom", currentInsets.bottom / dotsPerInch)
        });
        mainMap.putDouble("vmin",
          if (currentWindow["width"]!! > currentWindow["height"]!!) (currentWindow["height"]!! / dotsPerInch) / 100
          else (currentWindow["width"]!! / dotsPerInch) / 100
        );
        mainMap.putBoolean("tallBar", if (currentInsets.left / dotsPerInch > 47 || currentInsets.right / dotsPerInch > 47 || currentInsets.bottom / dotsPerInch > 47) true else false);

        Log.d("LOG", "CURRENT CONTEXT ${reactInstanceManager.currentReactContext}");

        if (reactInstanceManager.currentReactContext == null) {
          reactInstanceManager.addReactInstanceEventListener(object: ReactInstanceManager.ReactInstanceEventListener {
            override fun onReactContextInitialized(context: ReactContext) {
              context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("LayoutInfo", mainMap)
            }
          })
        } else {
          reactInstanceManager.currentReactContext
            ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("LayoutInfo", mainMap)
        }


        sendUpdate = false
      }

      canUpdate = true // END updateUI ~ FLAG
    }

    if (incomingWindowLayoutInfo != null) collectAndCancel(incomingWindowLayoutInfo, false) // AUTO FOLDING FEATURE INFO
    else { // MANUAL FOLDING FEATURE INFO
      job = lifecycleScope.launch(Dispatchers.Main) {
        WindowInfoTracker.getOrCreate(this@MainActivity)
          .windowLayoutInfo(this@MainActivity)
          .collect { collectAndCancel(it, true) }
      };
    }

  }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}