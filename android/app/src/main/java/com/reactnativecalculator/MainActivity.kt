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

  var orientation: String = "portrait" // DEFAULT
  var canUpdate: Boolean = true
  //val dotsPerInch: Double = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
  //lateinit var dotsPerInch: Double
  var dotsPerInch: Double by Delegates.notNull<Double>()
  //var count: Int by Delegates.notNull<Int>()
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

    canUpdate = false // THIS FUNCTION EXECUTION FLAG

    // BEGIN ORIENTATION //
    val currOrientation = this@MainActivity.resources.configuration.orientation
    if (currOrientation == Configuration.ORIENTATION_PORTRAIT) { orientation = "portrait" }
    else { orientation = "landscape" }
    // END ORIENTATION //

    // BEGIN INSETS //
    @RequiresApi(Build.VERSION_CODES.R)
    fun getRootWindowInsetsCompatR(rootView: View): Unit {

      Log.d("LOG", "EXEC INSIDE");

      val insetsMap = Arguments.createMap()

      val newInsets =
        rootView.rootWindowInsets?.getInsets(
          WindowInsets.Type.statusBars() or
          WindowInsets.Type.displayCutout() or
          WindowInsets.Type.navigationBars() or
          WindowInsets.Type.captionBar()
        )

      if (newInsets !== null) {
        if (!::currentInsets.isInitialized || !currentInsets.equals(newInsets)) {
          currentInsets = newInsets
          Log.d("LOG", "LAUNCHED NEW VALUEASD ${dotsPerInch}");

          insetsMap.putDouble("left", newInsets.left.toDouble() / dotsPerInch)
          insetsMap.putDouble("top", newInsets.top.toDouble() / dotsPerInch)
          insetsMap.putDouble("right", newInsets.right.toDouble() / dotsPerInch)
          insetsMap.putDouble("bottom", newInsets.bottom.toDouble() / dotsPerInch)

          // context // context.getJSModule()?.emit()
          //   .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          //   ?.emit("insets", insetsMap)
        }
      }

      Log.d("LOG", "CURRENT ${currentInsets}");

    }


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) getRootWindowInsetsCompatR(rootView)
    // END INSETS //

    //Log.d("LOG", "EXECUTED updateUI");

    //lateinit var windowLayoutInfo: WindowLayoutInfo

    //val testVal = incomingWindowLayoutInfo
    //Log.d("LOG", "PREupdateUI ${who} ${incomingWindowLayoutInfo}");

    lateinit var job: Job

    // val wm = (this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager).currentWindowMetrics.bounds
    // Log.d("LOG", "CURR WIDTH ${wm.width()}");
    // Log.d("LOG", "CURR HEIGHT ${wm.height()}");

    // var preFoldingFeature: FoldingFeature? = null
    // val foldingFeature = preFoldingFeature

    fun collectAndCancel(windowLayoutInfo: WindowLayoutInfo, doJob: Boolean) {
      Log.d("LOG", "${who} ${windowLayoutInfo}");
      if (doJob) job.cancel()

      val mainMap = Arguments.createMap()
      val screenMap = Arguments.createMap()
      val windowMap = Arguments.createMap()
      val hingeBoundsMap = Arguments.createMap()

      //val dotsPerInch: Double = this@MainActivity.resources.displayMetrics.density.toDouble() // Float --> Double
      val boundsCurr = WindowMetricsCalculator.getOrCreate().computeCurrentWindowMetrics(this@MainActivity).bounds

      val wm = (this@MainActivity.getSystemService(Context.WINDOW_SERVICE) as WindowManager).currentWindowMetrics.bounds
      //Log.d("LOG", "CURR WIDTH ${wm.width()}");
      //Log.d("LOG", "CURR HEIGHT ${wm.height()}");

      val wmWidth = wm.width() / dotsPerInch;
      val wmHeight = wm.height() / dotsPerInch;

      windowMap.putDouble("width", wmWidth);
      windowMap.putDouble("height", wmHeight);


      val foldingFeature = windowLayoutInfo.displayFeatures.filterIsInstance<FoldingFeature>().firstOrNull()

      var state: String = "portrait";

      val hingeBounds = hingeBoundsClass()

      if (foldingFeature != null) {
        hingeBounds.left = foldingFeature.bounds.left / dotsPerInch
        hingeBounds.top = foldingFeature.bounds.top / dotsPerInch
        hingeBounds.right = foldingFeature.bounds.right / dotsPerInch
        hingeBounds.bottom = foldingFeature.bounds.bottom / dotsPerInch

        state = //"landscape"
          if (foldingFeature.state == FoldingFeature.State.FLAT && foldingFeature.occlusionType == FoldingFeature.OcclusionType.NONE) "fullscreen"
          else if (foldingFeature.orientation == FoldingFeature.Orientation.HORIZONTAL) "tabletop"
          else "book"
      } else { state = orientation }

      hingeBoundsMap.putDouble("left", hingeBounds.left)
      hingeBoundsMap.putDouble("top", hingeBounds.top)
      hingeBoundsMap.putDouble("right", hingeBounds.right)
      hingeBoundsMap.putDouble("bottom", hingeBounds.bottom)

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