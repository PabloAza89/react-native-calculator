package com.reactnativecalculator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
//import com.facebook.react.bridge.ReactMethod
//import com.facebook.react.bridge.Promise

//import com.facebook.react.bridge.WritableMap
//import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.LifecycleEventListener;

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
//import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

import androidx.lifecycle.LifecycleOwner

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
import androidx.window.layout.FoldingFeature
import androidx.window.layout.WindowMetricsCalculator
import com.facebook.react.bridge.Arguments
import kotlin.reflect.full.declaredMemberProperties

class CalendarModule(reactContext: ReactApplicationContext):
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "CalendarModule"

  var sensorManager: SensorManager? = reactApplicationContext.getSystemService(SENSOR_SERVICE) as SensorManager
  var hingeAngleSensor: Sensor? = sensorManager?.getDefaultSensor(Sensor.TYPE_HINGE_ANGLE)

  val sensorEventListener = object : SensorEventListener {
    override fun onSensorChanged(event: SensorEvent) {
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        ?.emit("angle", event.values[0].toInt())
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) { }
  }

  // suspend fun test() {

  //   val activity = currentActivity
     
  //   // lifecycleScope.launch(Dispatchers.Main) {
  //   //   lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
  //   //     WindowInfoTracker.getOrCreate(activity as MainActivity)
  //   //       .windowLayoutInfo(activity as MainActivity)
  //   //       .collect { value -> updateUI(value) }
  //   //   }
  //   // }
  // }

  

  // fun updateUI(newLayoutInfo: WindowLayoutInfo) {
  //   reactInstanceManager.currentReactContext
  //     ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
  //     ?.emit("testFromCalendar", null)
  // }

  // override fun onStart() {
  //   super.onStart();
  //   reactContext
  //     ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
  //     ?.emit("testFromCalendar", null)
  // }

  private val lifecycleEventListener = object: LifecycleEventListener {
    override fun onHostResume() {

    val activity = currentActivity

      hingeAngleSensor?.let { sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_NORMAL) }

      var qq = WindowInfoTracker.getOrCreate(activity as MainActivity).windowLayoutInfo(activity as MainActivity)

      // reactContext
      //   ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      //   ?.emit("testFromCalendar", null)


    }

    override fun onHostPause() { hingeAngleSensor?.let { sensorManager?.unregisterListener(sensorEventListener, it) } }

    override fun onHostDestroy() { }
  }

  init { reactContext.addLifecycleEventListener(lifecycleEventListener) }
}