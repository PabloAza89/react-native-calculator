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

class CalendarModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext)/* , LifecycleEventListener */ {

        override fun getName(): String = "CalendarModule"

        // init {
        //     //reactContext.addActivityEventListener(activityEventListener)
        //     reactContext.addLifecycleEventListener(this)
        // }

        // override fun onHostResume() {
        //     // Activity `onResume`
        // }

        val params = Arguments.createMap().apply {
            putString("eventProperty", "someValue")
        }


        // override fun onHostCreate() {
        //     // Activity `onCreate`
        //     //test()
        //     //sendEvent("EventReminder", params)
        // }

        //override fun onHostResume(sendEvent: (reactContext: ReactContext, eventName: String, params: WritableMap?) -> Unit) {

        // override fun onHostStart() {
        //     // Activity `onCreate`
        //     //test()
        //     //sendEvent(reactContext, "EventReminder", params)
        //     //sendEvent()
        // }

        // override fun onHostResume() {
        //     // Activity `onCreate`
        //     //test()
        //     //sendEvent(reactContext, "EventReminder", params)
        //     //sendEvent()
        // }

        // override fun onHostPause() {
        //     // Activity `onCreate`
        //     //test()
        //     //sendEvent("EventReminder", params)
        // }

        // override fun onHostDestroy() {
        //     // Activity `onCreate`
        //     //test()
        //     //sendEvent("EventReminder", params)
        // }

        // fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        //     reactContext
        //     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
        //     .emit(eventName, params)
        // }

        

        
        //sendEvent("EventReminder", params)

        @ReactMethod
        fun test(promise: Promise) {
            try {
                promise.resolve("123 TEST")

            } catch (e: Exception) {
                promise.reject(e)
  
            }
        }

        // @ReactMethod()
        // fun getString(promise: Promise) {
        //     try {
        //         var variable_name : String = "abc"
        //         promise.resolve(variable_name)
        //     } catch (e: Exception) {
        //         promise.reject(e)
        //     }
        // }


}