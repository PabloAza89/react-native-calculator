package com.reactnativecalculator

import android.content.Context
import android.content.Context.SENSOR_SERVICE
import android.content.res.Configuration
import android.graphics.Insets
import android.graphics.Rect
import android.hardware.display.DisplayManager
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent
import android.os.Bundle
import android.os.Build
import android.provider.Settings
import android.util.DisplayMetrics
import android.util.Log
import android.view.WindowManager
import android.view.Display
import android.view.OrientationEventListener
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowInsets

import androidx.annotation.RequiresApi
import androidx.core.util.Consumer
import androidx.core.view.WindowCompat
import androidx.window.java.layout.WindowInfoTrackerCallbackAdapter
import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowMetricsCalculator
import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature
import androidx.window.layout.DisplayFeature
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager.ReactInstanceEventListener
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.reactnativecalculator.hingeBoundsClass
import com.reactnativecalculator.R

import com.zoontek.rnbootsplash.RNBootSplash

import expo.modules.ReactActivityDelegateWrapper

import java.util.concurrent.Executors

import kotlin.math.min
import kotlin.properties.Delegates
import kotlin.reflect.full.declaredMemberProperties

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import kotlinx.coroutines.Job




//import android.view.ViewGroup





@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceEventListener {  
  lateinit var currentOrientation: String// = "portrait" // DEFAULT
  var canUpdate: Boolean = true
  var sendUpdate: Boolean = false
  var dotsPerInch: Double by Delegates.notNull<Double>()
  var currentWindow: MutableMap<String, Int> = mutableMapOf()
  var currentHingeBounds: MutableMap<String, Int> = mutableMapOf()
  lateinit var currentState: String;
  lateinit var currentInsets: Rect
  lateinit var rootView: View

  lateinit var testVar: String

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
    WindowCompat.setDecorFitsSystemWindows(window, false)
    dotsPerInch = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
    rootView = findViewById<View>(android.R.id.content).rootView
    rootView.viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
      override fun onGlobalLayout() {
        if (canUpdate) updateUI(null, true)
      }
    })

    //val rootViewww = activity.window.decorView.findViewById<ViewGroup>(android.R.id.content)
    // val rootViewww = findViewById<ViewGroup>(android.R.id.content)
    // rootViewww.setClipChildren(false)
    // rootViewww.setClipToPadding(false)
    //rootView.setClipChildren(false)
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
        if (canUpdate) updateUI(newLayoutInfo, false)
      }
    }

    val listenerCallback = ListenerCallback()

    val windowInfoTracker = WindowInfoTrackerCallbackAdapter(WindowInfoTracker.getOrCreate(this@MainActivity))

    val lifecycleEventListener = object: LifecycleEventListener {
      override fun onHostResume() {
        windowInfoTracker.addWindowLayoutInfoListener(
          this@MainActivity,
          Executors.newSingleThreadExecutor(),
          listenerCallback
        )
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

  fun updateUI(incomingWindowLayoutInfo: WindowLayoutInfo?, manual: Boolean) {
    canUpdate = false // FLAG FOR updateUI()

    // BEGIN ORIENTATION //
    val newOrientation = this@MainActivity.resources.configuration.orientation
    if (newOrientation == Configuration.ORIENTATION_PORTRAIT) { currentOrientation = "portrait" }
    else { currentOrientation = "landscape" }
    // END ORIENTATION //

    lateinit var job: Job

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo, doJob: Boolean) {
      Log.d("LOG", "RESPONSE ${windowLayoutInfo}"); // windowLayoutInfo

      if (doJob) job.cancel();

      val mainMap = Arguments.createMap()

      // BEGIN WINDOW //
      val windowBounds = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds
      val newWindow = mutableMapOf("width" to windowBounds.width(), "height" to windowBounds.height())
      if (currentWindow.isEmpty() || !currentWindow.equals(newWindow)) { currentWindow = newWindow; sendUpdate = true }
      // END WINDOW //

      // BEGIN INSETS //
      @RequiresApi(Build.VERSION_CODES.R)
      fun getInsetsCompatR(rootView: View): Unit {
        //rootView.setClipChildren(false)
        val newInsets =
          rootView.rootWindowInsets?.getInsets(
            WindowInsets.Type.statusBars() or
            WindowInsets.Type.displayCutout() or
            WindowInsets.Type.navigationBars() or
            WindowInsets.Type.captionBar()
          )

        if (newInsets !== null) {
          currentInsets = Rect(newInsets.left, newInsets.top, newInsets.right, newInsets.bottom)
          sendUpdate = true
        }
      }

      @RequiresApi(Build.VERSION_CODES.M)
      fun getInsetsCompatM(rootView: View): Unit {
        val preInsets = rootView.rootWindowInsets
        if (preInsets !== null) {
          currentInsets = Rect(preInsets.systemWindowInsetLeft, preInsets.systemWindowInsetTop, preInsets.systemWindowInsetRight, min(preInsets.systemWindowInsetBottom, preInsets.stableInsetBottom))
          sendUpdate = true
        }
      }

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) getInsetsCompatR(rootView) // 11 to newest..
      else getInsetsCompatM(rootView) // 6 to 10
      // 5 or older NOT SUPPORTED

      // END INSETS //

      val foldingFeature = windowLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

      var newHingeBounds: MutableMap<String, Int> = mutableMapOf()

      lateinit var newState: String;

      if (foldingFeature != null) {
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


      if (sendUpdate) {
        mainMap.putMap("hingeBounds", Arguments.createMap().apply {
          putDouble("left", currentHingeBounds["left"]!! / dotsPerInch)
          putDouble("top", currentHingeBounds["top"]!! / dotsPerInch)
          putDouble("right", currentHingeBounds["right"]!! / dotsPerInch)
          putDouble("bottom", currentHingeBounds["bottom"]!! / dotsPerInch)
        });
        mainMap.putString("state", currentState); // flat, tabletop..
        mainMap.putMap("window", Arguments.createMap().apply {
          putDouble("width", currentWindow["width"]!! / dotsPerInch)
          putDouble("height", currentWindow["height"]!! / dotsPerInch)
        });
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

        if (reactInstanceManager.currentReactContext == null) {
          reactInstanceManager.addReactInstanceEventListener(object: ReactInstanceEventListener {
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
        sendUpdate = false // RESET UPDATE FLAG
      }
      canUpdate = true // FLAG FOR updateUI()
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