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

        @ReactMethod
        fun callFromReact(promise: Promise) {
            // val activity = currentActivity
            val activity = currentActivity
            //val activiti = MainActivity

            // if (activity == null) {
            //     promise.reject("Activity doesn't exist")
            //     return
            // }
            // else {
            //     promise.resolve("dadada")
            // }

            //pickerPromise = promise


            try {
                // val galleryIntent = Intent(Intent.ACTION_PICK).apply { type = "image\/*" }

                // val chooserIntent = Intent.createChooser(galleryIntent, "Pick an image")

                // activity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST)
                //val rrr = activity
                //promise.resolve(activity.toString()) // com.reactnativecalculator.MainActivity@27c7da3 GOOD !!!
                //promise.resolve(activity.toString()) // com.reactnativecalculator.MainActivity@79b6807 GOOD !!!
                //promise.resolve(activity.getStringa())
                //activity?.finish() // WORKS !!
                //activity?.finish() // WORKS !!
                //promise.resolve(activity?.getCallingActivity().toString())
                //promise.resolve(activity?.getCallingActivity().toString())
                //promise.resolve(activity?.getComponentName().toString()) // ComponentInfo{com.reactnativecalculator/com.reactnativecalculator.MainActivity}
                //promise.resolve(activity?.getIntent().toString()) // Intent { act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] flg=0x10000000 cmp=com.reactnativecalculator/.MainActivity }
                //promise.resolve(activity?.getMainComponentName()) // ComponentInfo{com.reactnativecalculator/com.reactnativecalculator.MainActivity}
                //activity?.getStringa() // WORKS !!
                //promise.resolve(activiti.getStringa())
                //promise.resolve((activity as MainActivity).getMainComponentName()) // OJO TIRA PROTECTED !
                //promise.resolve(activity.getMainComponentName()) // Unresolved reference: getMainComponentName
                //promise.resolve(WindowInfoTracker.getOrCreate(activity as MainActivity).toString()) // androidx.window.layout.WindowInfoTrackerImpl@f659f67
                //promise.resolve(WindowInfoTracker.getOrCreate(activity as MainActivity).toString()) // androidx.window.layout.WindowInfoTrackerImpl@f659f67

                // RETURN SPANNED OR UNSPANNED
                promise.resolve((activity as MainActivity).getString()) // OK

                // // OK CURRENT WINDOW METRICS
                // val wmc = WindowMetricsCalculator.getOrCreate()
                // val currentWM = wmc.computeCurrentWindowMetrics(activity as MainActivity).bounds.flattenToString()
                // val maximumWM = wmc.computeMaximumWindowMetrics(activity as MainActivity).bounds.flattenToString()
                // promise.resolve("${currentWM} ${maximumWM}") // 0 0 2208 1840
                // //promise.resolve(maximumWM) // 0 0 2208 1840



            } catch (e: Exception) {
                promise.reject(e)
                // pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER, t)
                // pickerPromise = null
            }
        }
}