package com.reactnativecalculator

import android.content.res.Configuration
import android.graphics.Rect
import android.os.Bundle
import android.os.Build
import android.util.Log
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowInsets

import androidx.annotation.RequiresApi
import androidx.core.util.Consumer
import androidx.core.view.WindowCompat
import androidx.lifecycle.lifecycleScope
import androidx.window.java.layout.WindowInfoTrackerCallbackAdapter
import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowMetricsCalculator
import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactContext
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactInstanceManager.ReactInstanceEventListener

import com.reactnativecalculator.R

import com.zoontek.rnbootsplash.RNBootSplash

import expo.modules.ReactActivityDelegateWrapper

import java.util.concurrent.Executors

import kotlin.math.min
import kotlin.properties.Delegates

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import kotlinx.coroutines.Job

@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceEventListener {
  lateinit var currentOrientation: String
  var canUpdate: Boolean = true
  var sendUpdate: Boolean = false
  var dotsPerInch: Double by Delegates.notNull<Double>()
  var currentWindow: MutableMap<String, Int> = mutableMapOf()
  var currentHingeBounds: MutableMap<String, Int> = mutableMapOf()
  lateinit var currentState: String;
  lateinit var currentInsets: Rect
  var currentMaxHorizontalInset: Int by Delegates.notNull<Int>()
  var currentMaxVerticalInset: Int by Delegates.notNull<Int>()
  lateinit var rootView: View
  lateinit var globalLayoutListener: ViewTreeObserver.OnGlobalLayoutListener

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // Initialize SplashScreen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
    WindowCompat.setDecorFitsSystemWindows(window, false)
    dotsPerInch = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
    rootView = findViewById<View>(android.R.id.content).rootView

    globalLayoutListener = object: ViewTreeObserver.OnGlobalLayoutListener {
      override fun onGlobalLayout() {
        if (canUpdate) updateUI(null)
      }
    }
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
        if (canUpdate) updateUI(newLayoutInfo)
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
        rootView.viewTreeObserver.addOnGlobalLayoutListener(globalLayoutListener)
      }

      override fun onHostPause() {
        windowInfoTracker.removeWindowLayoutInfoListener(listenerCallback)
        rootView.viewTreeObserver.removeOnGlobalLayoutListener(globalLayoutListener)
      }
      override fun onHostDestroy() { }
    }
    context.addLifecycleEventListener(lifecycleEventListener)
  }

  fun updateUI(incomingWindowLayoutInfo: WindowLayoutInfo?) { //manual: Boolean
    Log.d("LOG", "incomingWindowLayoutInfo: " + incomingWindowLayoutInfo)
    canUpdate = false // FLAG FOR updateUI()

    val mainActivity = this@MainActivity

    // MULTI-WINDOW // 24
    val multiWindow = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) mainActivity.isInMultiWindowMode else false

    // BEGIN ORIENTATION //
    val newOrientation = mainActivity.resources.configuration.orientation
    if (newOrientation == Configuration.ORIENTATION_PORTRAIT) { currentOrientation = "portrait" }
    else { currentOrientation = "landscape" }
    // END ORIENTATION //

    lateinit var job: Job

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo, doJob: Boolean) {
      if (doJob) job.cancel();

      val mainMap = Arguments.createMap()

      // BEGIN WINDOW //
      val windowBounds = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(mainActivity).bounds
      val newWindow = mutableMapOf("width" to windowBounds.width(), "height" to windowBounds.height())
      if (currentWindow.isEmpty() || !currentWindow.equals(newWindow)) { currentWindow = newWindow; sendUpdate = true }
      // END WINDOW //

      // BEGIN INSETS //
      @RequiresApi(Build.VERSION_CODES.R)
      fun getInsetsCompatR(rootView: View): Unit {
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

      // BEGIN VERTICAL & HORIZONTAL INSET //
      if (currentInsets.left > currentInsets.right) currentMaxHorizontalInset = currentInsets.left
      else currentMaxHorizontalInset = currentInsets.right
      if (currentInsets.top > currentInsets.bottom) currentMaxVerticalInset = currentInsets.top
      else currentMaxVerticalInset = currentInsets.bottom
      // END VERTICAL & HORIZONTAL INSET //

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
          if ((foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.occlusionType == FoldingFeature.OcclusionType.NONE) || multiWindow) "flat"
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
        mainMap.putDouble("maxHorizontalInset", currentMaxHorizontalInset / dotsPerInch)
        mainMap.putDouble("maxVerticalInset", currentMaxVerticalInset / dotsPerInch)
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
        WindowInfoTracker.getOrCreate(mainActivity)
          .windowLayoutInfo(mainActivity)
          .collect { collectAndCancel(it, true) }
      };
    }
  }

  override fun getMainComponentName(): String = "reactNativeCalculator"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}