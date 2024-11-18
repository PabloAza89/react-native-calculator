package com.reactnativecalculator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.app.Activity;
import com.facebook.react.ReactActivity

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowMetricsCalculator

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

import androidx.window.layout.WindowLayoutInfo

import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext
//import androidx.window.layout.WindowMetricsCalculator

//import android.MainActivity

import android.content.Context.SENSOR_SERVICE
import android.hardware.SensorManager
import android.hardware.Sensor
import android.hardware.SensorEventListener
import android.hardware.SensorEvent

//import androidx.compose.runtime.setValue


class CalendarModule(reactContext: ReactApplicationContext):
    ReactContextBaseJavaModule(reactContext) {

        override fun getName(): String = "CalendarModule"

        // val HINGE_ANGLE_SENSOR_NAME = "Hinge Angle"
        // var sensorManager: SensorManager? = null
        // var hingeAngleSensor: Sensor? = null
        // var mSensorListener: SensorEventListener? = null
        // var mCurrentHingeAngle: Int = 0

        var sensorManager: SensorManager? = reactApplicationContext.getSystemService(SENSOR_SERVICE) as SensorManager
        var hingeAngleSensor: Sensor? = sensorManager?.getDefaultSensor(Sensor.TYPE_HINGE_ANGLE)

        var mCurrentHingeAngle: Int = 0

        // sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        // val sensorList: List<Sensor> = sensorManager!!.getSensorList(Sensor.TYPE_ALL)


        val sensorEventListener = object : SensorEventListener {
          override fun onSensorChanged(event: SensorEvent) {
            
            val angle = event.values[0].toInt()
            //TODO something with angle
            //mainTest.putString("angle", "${angle}")
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                ?.emit("Angle", angle)
            
            
          }

          override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) { }
        }

        private val lifecycleEventListener = object: LifecycleEventListener {
            override fun onHostResume() {
                // hingeAngleSensor?.let{
                //     sensorManager.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_UI)
                // }
                //if (hingeAngleSensor != null) { sensorManager?.registerListener(sensorEventListener, hingeAngleSensor, SensorManager.SENSOR_DELAY_NORMAL) }
                hingeAngleSensor?.let{
                    sensorManager?.registerListener(sensorEventListener, it, SensorManager.SENSOR_DELAY_UI)
                }
            }

            override fun onHostPause() {
                // hingeAngleSensor?.let{
                //     sensorManager.unregisterListener(sensorEventListener, it)
                // }
                //if (hingeAngleSensor != null) { sensorManager?.unregisterListener(sensorEventListener, hingeAngleSensor) }
                hingeAngleSensor?.let{
                    sensorManager?.unregisterListener(sensorEventListener, it)
                }
                // reactContext
                //     ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                //     ?.emit("Angle", null)
            }

            override fun onHostDestroy() { }

        }

        init {
            //reactContext.addActivityEventListener(activityEventListener)
            //reactContext.addLifecycleEventListener(this)
            reactContext.addLifecycleEventListener(lifecycleEventListener)
        }



}