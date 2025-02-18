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

// TEST //

@Suppress("DEPRECATION")
class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener {

  var orientation: String = "portrait" // DEFAULT
  var canUpdate: Boolean = true

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
    Log.d("LOG", "EXECUTED CREATE");

    val firstOrientation = this@MainActivity.resources.configuration.orientation
    if (firstOrientation == Configuration.ORIENTATION_PORTRAIT) { orientation = "portrait" }
    else { orientation = "landscape" }


    

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

    //val wm = this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    //val resp = wm.currentWindowMetrics?.bounds
    // val test = (this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager).currentWindowMetrics.bounds

    // Log.d("LOG", "CURR WIN ${test}");


    // lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");
    //   lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
    //     WindowInfoTracker.getOrCreate(this@MainActivity)
    //       .windowLayoutInfo(this@MainActivity)
    //       .collect { data -> updateUI("CB", data) }
    //   }
    // }

    class ListenerCallback : Consumer<WindowLayoutInfo> {
      override fun accept(newLayoutInfo: WindowLayoutInfo) {
        Log.d("LOG", "[]CALLBACK");
        //updateUI("CB", newLayoutInfo)
        if (canUpdate) updateUI("CB", newLayoutInfo)
      }
    }

    val listenerCallback = ListenerCallback()

    val windowInfoTracker = WindowInfoTrackerCallbackAdapter(WindowInfoTracker.getOrCreate(this@MainActivity))
      
    val rootView: View = this@MainActivity.window.decorView.findViewById<View>(android.R.id.content).rootView

    val lifecycleEventListener = object: LifecycleEventListener {
      override fun onHostResume() {
        Log.d("LOG", "ADD CALLBACK");
        windowInfoTracker.addWindowLayoutInfoListener(
          this@MainActivity,
          Executors.newSingleThreadExecutor(),
          listenerCallback
        )

        
        Log.d("LOG", "ADDED LAYOUT LISTENER");
        rootView.viewTreeObserver.addOnGlobalLayoutListener(object: ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
              

              @RequiresApi(Build.VERSION_CODES.R)
              fun getRootWindowInsetsCompatR(rootView: View): Unit? {
                val insets =
                    rootView.rootWindowInsets?.getInsets(
                        WindowInsets.Type.statusBars() or
                            WindowInsets.Type.displayCutout() or
                            WindowInsets.Type.navigationBars() or
                            WindowInsets.Type.captionBar())
                        ?: return null

                Log.d("LOG", "NEW QQQ ${insets}");

                return null
                // return EdgeInsets(
                //     top = insets.top.toFloat(),
                //     right = insets.right.toFloat(),
                //     bottom = insets.bottom.toFloat(),
                //     left = insets.left.toFloat())
              }

              if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) getRootWindowInsetsCompatR(rootView) // rootView

              //Log.d("LOG", "TEST TEST TEST ${rootView}");
              //Log.d("LOG", "TEST TEST TEST ${this}");
            }
        })

      }
      override fun onHostPause() {
        Log.d("LOG", "REMOVE CALLBACK");
        windowInfoTracker.removeWindowLayoutInfoListener(listenerCallback)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
          rootView.viewTreeObserver.removeOnGlobalLayoutListener(rootView: ViewTreeObserver.OnGlobalLayoutListener!)
          Log.d("LOG", "REMOVE LAYOUT LISTENER");
        } else {
          rootView.viewTreeObserver.removeGlobalOnLayoutListener(rootView: ViewTreeObserver.OnGlobalLayoutListener!)
          Log.d("LOG", "REMOVE LAYOUT LISTENER");
        }
      }
      override fun onHostDestroy() { }
    }
    context.addLifecycleEventListener(lifecycleEventListener)




  }

  //fun updateUI(windowLayoutInfo: WindowLayoutInfo, context: ReactContext) {
  //fun updateUI(context: ReactContext) {

  

  fun updateUI(who: String, incomingWindowLayoutInfo: WindowLayoutInfo?) {

    canUpdate = false
    //Log.d("LOG", "EXECUTED updateUI");

    //lateinit var windowLayoutInfo: WindowLayoutInfo

    //val testVal = incomingWindowLayoutInfo
    //Log.d("LOG", "PREupdateUI ${who} ${incomingWindowLayoutInfo}");

    lateinit var job: Job

    // val wm = (this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager).currentWindowMetrics.bounds
    // Log.d("LOG", "CURR WIDTH ${wm.width()}");
    // Log.d("LOG", "CURR HEIGHT ${wm.height()}");

    //var preFoldingFeature: FoldingFeature? = null
    //val foldingFeature = preFoldingFeature

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo, doJob: Boolean) {
      Log.d("LOG", "${who} ${windowLayoutInfo}");
      if (doJob) job.cancel()

      val mainMap = Arguments.createMap()
      val screenMap = Arguments.createMap()
      val windowMap = Arguments.createMap()
      val hingeBoundsMap = Arguments.createMap()

      val dotsPerInch: Double = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
      val boundsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds
      val boundsMax = WindowMetricsCalculator.getOrCreate().computeMaximumWindowMetrics(this@MainActivity).bounds

      val wm = (this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager).currentWindowMetrics.bounds
      //Log.d("LOG", "CURR WIDTH ${wm.width()}");
      //Log.d("LOG", "CURR HEIGHT ${wm.height()}");

      val wmWidth = wm.width() / dotsPerInch;
      val wmHeight = wm.height() / dotsPerInch;

      windowMap.putDouble("width", wmWidth);
      windowMap.putDouble("height", wmHeight);

      // TEST //

      // val qqq = this@MainActivity.window.decorView.findViewById<View>(android.R.id.content).rootView

      // @RequiresApi(Build.VERSION_CODES.R)
      // fun getRootWindowInsetsCompatR(rootView: View): Unit? {
      //   val insets =
      //       rootView.rootWindowInsets?.getInsets(
      //           WindowInsets.Type.statusBars() or
      //               WindowInsets.Type.displayCutout() or
      //               WindowInsets.Type.navigationBars() or
      //               WindowInsets.Type.captionBar())
      //           ?: return null

      //   Log.d("LOG", "NEW QQQ ${insets}");

      //   return null
      //   // return EdgeInsets(
      //   //     top = insets.top.toFloat(),
      //   //     right = insets.right.toFloat(),
      //   //     bottom = insets.bottom.toFloat(),
      //   //     left = insets.left.toFloat())
      // }

      // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) getRootWindowInsetsCompatR(qqq) // rootView
      // else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) getRootWindowInsetsCompatM(rootView)
      // else -> getRootWindowInsetsCompatBase(rootView)

      //val qqq = this@MainActivity.window.decorView.findViewById<View>(android.R.id.content).rootView
      //Log.d("LOG", "NEW QQQ ${qqq}");

      // TEST //

      val foldingFeature = windowLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

      //Log.d("LOG", "${who} ${foldingFeature}");

      //var boundsArr = arrayOf("left", "top", "right", "bottom")

      // for (item in boundsArr) {
      //   val pixelsCurr = boundsCurr::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsCurr).toString().toDouble(); // Int --> Double
      //   val pixelsMax = boundsMax::class.declaredMemberProperties.find { it.name == "${item}" }?.getter?.call(boundsMax).toString().toDouble(); // Int --> Double
      //   val densityIndPixCurr = pixelsCurr / dotsPerInch; // dp = px / (dpi / 160) === px / density
      //   val densityIndPixMax = pixelsMax / dotsPerInch; // dp = px / (dpi / 160) === px / density

      //   screenMap.putDouble("${item}", densityIndPixMax);
      //   windowMap.putDouble("${item}", densityIndPixCurr); // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
      // }

      var state: String = "portrait";

      val hnoListParsed = hnoListParsedClass()

      if (foldingFeature != null) {
        hnoListParsed.left = foldingFeature.bounds.left / dotsPerInch
        hnoListParsed.top = foldingFeature.bounds.top / dotsPerInch
        hnoListParsed.right = foldingFeature.bounds.right / dotsPerInch
        hnoListParsed.bottom = foldingFeature.bounds.bottom / dotsPerInch

        state = //"landscape"
          if (foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.occlusionType == FoldingFeature.OcclusionType.NONE) "fullscreen"
          else if (foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) "tabletop"
          else "book"
      } else { state = orientation }

      hingeBoundsMap.putDouble("left", hnoListParsed.left)
      hingeBoundsMap.putDouble("top", hnoListParsed.top)
      hingeBoundsMap.putDouble("right", hnoListParsed.right)
      hingeBoundsMap.putDouble("bottom", hnoListParsed.bottom)

      //Log.d("LOG", "windowMap ${windowMap}");
      //Log.d("LOG", "screenMap ${screenMap}");

      //val wm = reactInstanceManager.currentReactContext?.getSystemService(WindowManager::class.java)
      // val wm = reactInstanceManager.currentReactContext?.getSystemService(Context.WINDOW_SERVICE) as WindowManager
      // val resp = wm?.currentWindowMetrics?.bounds

      // Log.d("LOG", "CURR WIN ${resp}");

      mainMap.putMap("hingeBounds", hingeBoundsMap);
      mainMap.putString("state", state); // fullscreen, tabletop..
      // mainMap.putMap("screen", screenMap);
      // mainMap.putMap("window", windowMap);

      mainMap.putMap("window", windowMap);

      reactInstanceManager.currentReactContext // context.getJSModule()?.emit()
        ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        ?.emit("LayoutInfo", mainMap)

      canUpdate = true
    }

    if (incomingWindowLayoutInfo != null) collectAndCancel(incomingWindowLayoutInfo, false)
    else {
      job = lifecycleScope.launch(Dispatchers.Main) { // Log.d("LOG", "valid context");
        WindowInfoTracker.getOrCreate(this@MainActivity)
          .windowLayoutInfo(this@MainActivity)
          .collect { collectAndCancel(it, true) }
      };
    }

  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    when (newConfig.orientation) {
      Configuration.ORIENTATION_LANDSCAPE -> { orientation = "landscape"; Log.d("LOG", "NEW ORIENTATION LANDSCAPE"); }
      Configuration.ORIENTATION_PORTRAIT -> { orientation = "portrait"; Log.d("LOG", "NEW ORIENTATION PORTRAIT"); }
    }
    when (newConfig.screenLayout) {
      newConfig.screenLayout -> {
        Log.d("LOG", "[]POSITION");
        if (canUpdate) updateUI("POS", null)

      }
    }
  }

  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}