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

// TEST //

import androidx.window.area.WindowAreaController
import java.util.concurrent.Executor
//import androidx.window.area.WindowAreaSessionPresenter
import androidx.window.area.WindowAreaSession
import androidx.window.area.WindowAreaInfo
import androidx.window.area.WindowAreaCapability
import androidx.core.content.ContextCompat
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.flow.distinctUntilChanged
//import androidx.window.area.WindowAreaPresentationSessionCallback
import androidx.window.area.WindowAreaSessionCallback
import android.widget.TextView
import androidx.window.core.ExperimentalWindowApi

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactMethod

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

import com.facebook.react.ReactPackage
import android.view.View
import com.facebook.react.bridge.NativeModule
//import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager
import com.facebook.react.PackageList

//import com.reactnativecalculator.databinding.ActivityDualScreenBinding
import androidx.databinding.DataBindingUtil
//import androidx.appcompat.app.AppCompatActivity // ReactActivity() is instanceOf

// TEST //

@OptIn(ExperimentalWindowApi::class)
class MainActivity : ReactActivity(), ReactInstanceManager.ReactInstanceEventListener, WindowAreaSessionCallback {

  // TEST //

  //private lateinit var binding: ActivityDualScreenBinding
  //private val infoLogAdapter = InfoLogAdapter()

  private lateinit var windowAreaController: WindowAreaController
  private lateinit var displayExecutor: Executor
  //private var windowAreaSession: WindowAreaSessionPresenter? = null
  private var rearDisplaySession: WindowAreaSession? = null
  private var rearDisplayWindowAreaInfo: WindowAreaInfo? = null
  private var rearDisplayStatus: WindowAreaCapability.Status =
    WindowAreaCapability.Status.WINDOW_AREA_STATUS_UNSUPPORTED

  private val dualScreenOperation = WindowAreaCapability.Operation.OPERATION_PRESENT_ON_AREA
  private val rearDisplayOperation = WindowAreaCapability.Operation.OPERATION_TRANSFER_ACTIVITY_TO_AREA

  // TEST //

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens


    // binding = ActivityDualScreenBinding.inflate(layoutInflater)
    // setContentView(binding.root)

    //binding = DataBindingUtil.setContentView(this, R.layout.activity_main)

    // binding = ActivityDualScreenBinding.inflate(layoutInflater)
    // //val view = binding.root
    // setContentView(binding.root)

    displayExecutor = ContextCompat.getMainExecutor(this@MainActivity)
    windowAreaController = WindowAreaController.getOrCreate()

    updateCapabilities()

    //fun getPackages(): List<ReactPackage> = PackageList(application).packages.apply { add(TestPackage()) }

  }

  private fun updateCapabilities() {
      lifecycleScope.launch(Dispatchers.Main) {
          lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
              windowAreaController.windowAreaInfos
                  .map { info -> info.firstOrNull { it.type == WindowAreaInfo.Type.TYPE_REAR_FACING } }
                  .onEach { info -> rearDisplayWindowAreaInfo = info }
                  .map { it?.getCapability(rearDisplayOperation)?.status ?: WindowAreaCapability.Status.WINDOW_AREA_STATUS_UNSUPPORTED }
                  .distinctUntilChanged()
                  .collect {
                      rearDisplayStatus = it
                      updateUI()
                      Log.d("LOG", "A VER ESTE 1 ${rearDisplayStatus}")
                      //infoLogAdapter.notifyDataSetChanged()
                  }
          }
      }
  }

  private fun updateUI() {
        if(rearDisplaySession != null) {
            // binding.button.isEnabled = true
            // binding.status.text = "Disable Dual Screen Mode"
        } else {
            when(rearDisplayStatus) {
                WindowAreaCapability.Status.WINDOW_AREA_STATUS_UNSUPPORTED -> {
                    // binding.button.isEnabled = false
                    // binding.status.text = "Dual Screen is not supported on this device"
                }
                WindowAreaCapability.Status.WINDOW_AREA_STATUS_UNAVAILABLE -> {
                    // binding.button.isEnabled = false
                    // binding.status.text = "Dual Screen is not currently available"
                }
                WindowAreaCapability.Status.WINDOW_AREA_STATUS_AVAILABLE -> {
                    // binding.button.isEnabled = true
                    // binding.status.text = "Enable Dual Screen Mode"
                }
                else -> {
                    // binding.button.isEnabled = false
                    // binding.status.text = "Dual Screen status is unknown"
                }
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
      override fun onHostResume() {

        hingeAngleSensor?.let { sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_NORMAL) };

        

      }

      override fun onHostPause() { hingeAngleSensor?.let { sensorManager?.unregisterListener(sensorEventListener, it) } }

      override fun onHostDestroy() { } 
    }

    context.addLifecycleEventListener(lifecycleEventListener)    

  }

  fun updateUI(newLayoutInfo: WindowLayoutInfo, context: ReactContext) {
    val mainMap = Arguments.createMap()
    val screenMap = Arguments.createMap()
    val windowMap = Arguments.createMap()
    val hingeBoundsMap = Arguments.createMap()
    val testMap = Arguments.createMap()

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

      screenMap.putDouble("${item}", densityIndPixMax)
      windowMap.putDouble("${item}", densityIndPixCurr) // densityIndPixMax!!::class.simpleName --> RETRIEVE TYPE
    }

    // e.g.: hinge-[1080,0,1080,1840]
    // { "hinge-[1080", "0", "1080" , "1840]" }
    val hnoList = Settings.Global.getString(context.contentResolver, "display_features").split(",").map { item -> item.replace(Regex("[^0-9]"), "").toDouble() } // HINGE NATURAL ORIENTATION

    val hnoListParsed = hnoListParsedClass()
    hnoListParsed.left = hnoList[0] / dotsPerInch
    hnoListParsed.top = hnoList[1] / dotsPerInch
    hnoListParsed.right = hnoList[2] / dotsPerInch
    hnoListParsed.bottom = hnoList[3] / dotsPerInch

    val rotation = (context.getSystemService(Context.WINDOW_SERVICE) as WindowManager).defaultDisplay.rotation // retrieve 0 1 2 3
    if (rotation == 1) { // rotation 90º (rotated to left)
      hingeBoundsMap.putDouble("left", 0.0) // ALWAYS IS ZERO
      hingeBoundsMap.putDouble("top", screenMap.getDouble("bottom") - hnoListParsed.left) // maxHeight - Left
      hingeBoundsMap.putDouble("right", hnoListParsed.bottom) // Bottom
      hingeBoundsMap.putDouble("bottom", screenMap.getDouble("bottom") - hnoListParsed.right) // maxHeight - Right
    }
    else if (rotation == 2) { // rotation 180º
      hingeBoundsMap.putDouble("left", screenMap.getDouble("right") - hnoListParsed.right) // maxWidth - Right
      hingeBoundsMap.putDouble("top", 0.0) // ALWAYS IS ZERO
      hingeBoundsMap.putDouble("right", screenMap.getDouble("right") - hnoListParsed.left) // maxWidth - Left
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
    mainMap.putMap("screen", screenMap)
    mainMap.putMap("window", windowMap)

    val occlusionBoolean = !(hnoListParsed.left == hnoListParsed.right)
    val verticalHinge = mainMap.getMap("hingeBounds")?.getDouble("top") == 0.0

    //val fullscreen = screenMap.getDouble("left") == windowMap.getDouble("left")
    val fullscreen =
      mainMap.getMap("screen")?.getDouble("left") == mainMap.getMap("window")?.getDouble("left") &&
      mainMap.getMap("screen")?.getDouble("top") == mainMap.getMap("window")?.getDouble("top") &&
      mainMap.getMap("screen")?.getDouble("right") == mainMap.getMap("window")?.getDouble("right") &&
      mainMap.getMap("screen")?.getDouble("bottom") == mainMap.getMap("window")?.getDouble("bottom")

    //val state = if (angle > 150.0) "flat" else if (angle > 30.0) "half" else "closed"
    val state =
      if (angle > 150.0 && fullscreen && !occlusionBoolean) "cleanFullscreen"
      else if (angle > 30.0 && fullscreen && !verticalHinge) "tabletop"
      else if (angle > 30.0 && fullscreen && verticalHinge) "book"
      else "closed"

    mainMap.putBoolean("verticalHinge", verticalHinge) // TRUE or FALSE
    mainMap.putBoolean("occlusion", occlusionBoolean) // TRUE or FALSE

    //mainMap.putString("test", "${ mainMap.getMap("screen")?.getDouble("right") == mainMap.getMap("window")?.getDouble("right") }")
    //mainMap.putString("test1", "${ mainMap.getMap("screen")?.getDouble("bottom") }")
    //mainMap.putString("test2", "${ screenMap?.getDouble("bottom") }")
    //mainMap.putString("test2", "${ mainMap.getMap("hingeBounds")?.getDouble("top") }")

    mainMap.putString("state", state) // FLAT or HALF_OPENED

    context
      ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      ?.emit("LayoutInfo", mainMap)
  }


  fun toggleDualScreenMode() {
    Log.d("LOG", "BUTTON PRESSED")
      // if (windowAreaSession != null) {
      //     windowAreaSession?.close()
      // }
      // else {
      //     windowAreaInfo?.token?.let { token ->
      //         windowAreaController.presentContentOnWindowArea(
      //             token = token,
      //             activity = this@MainActivity,
      //             executor = displayExecutor,
      //             windowAreaPresentationSessionCallback = this@MainActivity
      //         )
      //     }
      // }

    // windowAreaInfo?.token?.let { token ->
    //     windowAreaController.presentContentOnWindowArea(
    //         token = token,
    //         activity = this@MainActivity,
    //         executor = displayExecutor,
    //         windowAreaPresentationSessionCallback = this@MainActivity
    //     )
    // }

    rearDisplayWindowAreaInfo?.token?.let { token ->
        windowAreaController.transferActivityToWindowArea(
            token = token,
            activity = this@MainActivity,
            executor = displayExecutor,
            windowAreaSessionCallback = this@MainActivity
        )
    }

  }

  fun toggleDualScreenMode2() {
    Log.d("LOG", "valid context")
  }

  class TestPackage : ReactPackage {
      override fun createViewManagers(
          reactContext: ReactApplicationContext
      ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

      override fun createNativeModules(
          reactContext: ReactApplicationContext
      ): MutableList<NativeModule> = listOf(TestModule(reactContext)).toMutableList()
  }

  class TestModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "TestModule"

    @ReactMethod
    fun testFunc(promise: Promise) {
    //fun testFunc(promise: Promise) {
      //Log.d("LOG", "valid context");
      val activity = currentActivity
      
      try {
        //promise.resolve((activity as MainActivity).getString()) // OK
        //promise.resolve("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") // OK
        //this.toggleDualScreenMode()
        //promise.resolve((activity as MainActivity).getString())
        //promise.resolve((activity as MainActivity).toggleDualScreenMode())
        (activity as MainActivity).toggleDualScreenMode()
        //(activity as MainActivity).toggleDualScreenMode2()
      } catch (e: Exception) {
          promise.reject(e)
          // pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
          // pickerPromise = null
      }


    }

  }

  

  override fun onSessionStarted(session: WindowAreaSession) {
      // windowAreaSession = session
      // val view = TextView(session.context)
      // //view.text = "Hello world!"
      // view.text = "Hello world, from the other screen!"
      // session.setContentView(view)
      // updateUI()
      startCamera()
      Log.d("LOG", "BB Session started")
  }

  override fun onSessionEnded(t: Throwable?) {
      if(t != null) {
          //Log.e(logTag, "Something was broken: ${t.message}")
          Log.d("LOG", "Something was broken: ${t.message}")
      }
      Log.d("LOG", "AA Something was broken: ")
      //windowAreaSession = null
  }

  // override fun onContainerVisibilityChanged(isVisible: Boolean) {
  //     //Log.d(logTag, "onContainerVisibilityChanged. isVisible = $isVisible")
  //     Log.d("LOG", "onContainerVisibilityChanged. isVisible = $isVisible")
  // }


  // Returns the name of the main component registered from JavaScript. This is used to schedule rendering of the component.
  override fun getMainComponentName(): String = "reactNativeCalculator"

  // Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate] which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))
}

