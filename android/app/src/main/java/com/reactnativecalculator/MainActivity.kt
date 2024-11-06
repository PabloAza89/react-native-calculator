package com.reactnativecalculator
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash;
import android.os.Bundle;
import android.app.Activity;
import android.app.Dialog;
import android.content.DialogInterface;
import android.view.Window;
import android.view.WindowManager;
import android.util.Log

import androidx.window.layout.WindowInfoTracker
import androidx.window.layout.WindowLayoutInfo
//import java.util.concurrent.Flow
//import kotlinx.coroutines.flow.Flow
//import androidx.window.layout.WindowMetricsCalculator

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

//import androidx.window.layout.DisplayFeature

lateinit var windowInfoTracker: WindowInfoTracker
//lateinit var qqq: Flow<WindowLayoutInfo>
//lateinit var qqq: WindowInfoTracker

class MainActivity : ReactActivity() {

  //private lateinit var windowInfoTracker: WindowInfoTracker

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.Start); // initialize the splash screen
    super.onCreate(null); // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens

    //windowInfoTracker = WindowInfoTracker.getOrCreate(this@MainActivity)
    //windowInfoTracker = WindowInfoTracker.windowLayoutInfo(this@MainActivity)

    // val rrr = WindowInfoTracker.getOrCreate(this@MainActivity)
    // qqq = rrr.windowLayoutInfo(this)
    windowInfoTracker = WindowInfoTracker.getOrCreate(this@MainActivity)
    onWindowLayoutInfoChange()
  }

  fun onWindowLayoutInfoChange() {
    lifecycleScope.launch(Dispatchers.Main) {
        lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) {
            windowInfoTracker.windowLayoutInfo(this@MainActivity)
                .collect { value ->
                    updateUI(value)
                }
        }
    }
  }

  var variable_name: String = "abc"
  //lateinit var variable_name: List<DisplayFeature>

  fun updateUI(newLayoutInfo: WindowLayoutInfo) {
    //variable_name = newLayoutInfo.displayFeatures
    //variable_name = newLayoutInfo.displayFeatures.toString()
    //variable_name = newLayoutInfo.displayFeatures.flattenToString()
    
    //binding.layoutChange.text = newLayoutInfo.toString()
    if (newLayoutInfo.displayFeatures.isNotEmpty()) {
        variable_name = "Spanned across displays"
        //binding.configurationChanged.text = "Spanned across displays"
        //alignViewToFoldingFeatureBounds(newLayoutInfo)
    } else {
        variable_name = "One logic/physical display - unspanned"
        //binding.configurationChanged.text = "One logic/physical display - unspanned"
    }
}

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "reactNativeCalculator"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled))

  // var variable_name: String = "abc"
  // //@ReactMethod()
  //fun getStringa(): List<DisplayFeature> {
  fun getStringa(): String {
  //fun getStringa(): WindowInfoTracker {
    
    // var variable_name : String = "abc"
    return variable_name
    //return windowInfoTracker.toString()
    //return qqq.toString()
    //return variable_name
      // try {
      //     var variable_name : String = "abc"
      //     promise.resolve(variable_name)
      // } catch (e: Exception) {
      //     promise.reject(e)
      // }
  }

}

