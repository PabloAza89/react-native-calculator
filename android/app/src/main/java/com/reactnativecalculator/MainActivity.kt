package com.reactnativecalculator
import expo.modules.ReactActivityDelegateWrapper

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

//import android.window.SplashScreen
//import androidx.core.splashscreen.SplashScreen
import com.zoontek.rnbootsplash.RNBootSplash;
import android.os.Bundle;
//import com.zoontek.rnbootsplash.RNBootSplash;
// import androidx.core.splashscreen.SplashScreen
// import com.reactnativecalculator.R
// import android.os.Bundle

import android.app.Activity;
import android.app.Dialog;
import android.content.DialogInterface;
//import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;


import android.util.Log

// import androidx.core.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  // Create a new event for the activity.
  // override fun onCreate(savedInstanceState: Bundle?) {
  //     super.onCreate(savedInstanceState)
  //     // Set the layout for the content view.
  //     setContentView(R.style.AppTheme)

  //     // Set up an OnPreDrawListener to the root view.
      
  // }
override fun onCreate(savedInstanceState: Bundle?) {
    // RNBootSplash.init(this, R.style.BootTheme) // ⬅️ initialize the splash screen
    // super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens

    // val splashScreen = installSplashScreen() // ⬅️ initialize the splash screen
    // super.onCreate(savedInstanceState)
    // setContentView(R.style.Start)
    RNBootSplash.init(this, R.style.Start); // ⬅️ initialize the splash screen
    // savedInstanceState = App crash when size changes
    // null = App dont crash when size changes
    //super.onCreate(savedInstanceState)
    //console.log("SAVED INSTANCE", savedInstanceState)
    //Log.d("SAVED INSTANCE", savedInstanceState)
    super.onCreate(null); // super.onCreate(null) with react-native-screens
    //super.onCreate(); // super.onCreate(null) with react-native-screens
  }


  // fun onCreate() {
  //   // Set the theme to AppTheme BEFORE onCreate to support 
  //   // coloring the background, status bar, and navigation bar.
  //   // This is required for expo-splash-screen.
  //   setTheme(R.style.AppTheme);
  //   super.onCreate(null);
  // }

  //  override fun onCreate(savedInstanceState: Bundle?) {
  //   //installSplashScreen(this, R.style.Intro) // ⬅️ initialize the splash screen
  //   //SplashScreen.show(this, R.style.Intro) // ⬅️ initialize the splash screen
  //   super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
  // }

  // override fun onCreate(savedInstanceState: Bundle?) {

  //   //SplashScreen.installSplashScreen(this, R.style.Intro) // ⬅️ initialize the splash screen
  //   SplashScreen.installSplashScreen(this)
  //   //SplashScreen.show(this, R.style.Intro) // ⬅️ initialize the splash screen
  //   //super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
  

  //   super.onCreate(savedInstanceState)

  // }

  // fun onCreate() {
  //   //SplashScreen.installSplashScreen(this);
  //   androidx.core.splashscreen.SplashScreen.installSplashScreen(this)
  //   super.onCreate(null);
  // }

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
}
