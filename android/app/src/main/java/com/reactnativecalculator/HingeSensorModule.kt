package com.reactnativecalculator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.modules.core.DeviceEventManagerModule

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent

class HingeSensorModule(reactContext: ReactApplicationContext):
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "HingeSensor"

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

  private val lifecycleEventListener = object: LifecycleEventListener {
    override fun onHostResume() { hingeAngleSensor?.let { sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_NORMAL) } }

    override fun onHostPause() { hingeAngleSensor?.let { sensorManager?.unregisterListener(sensorEventListener, it) } }

    override fun onHostDestroy() { }
  }

  init { reactContext.addLifecycleEventListener(lifecycleEventListener) }
}