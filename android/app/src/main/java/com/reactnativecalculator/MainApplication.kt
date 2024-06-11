package com.reactnativecalculator
import android.content.res.Configuration

//import androidx.core:core-splashscreen
//import androidx.core.splashscreen.SplashScreen
//import androidx.core.splashscreen.SplashScreen
//import androidx.core.splashscreen.SplashScreen
//import android.R.AppTheme
//import your.app.package.R;
//import com.reactnativecalculator.R.AppTheme
//import com.reactnativecalculator.R;
//import android.app.Application.R;



//import com.reactnativecalculator.android.R

//import com.example.android.R;
//import android.R
//import android.window.SplashScreen;
// import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
// import androidx.activity.viewModels
//import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
//import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
// import android.window.SplashScreen;
// import com.reactnativecalculator.R
// import android.os.Bundle
//import androidx.core.splashscreen.SplashScreen
//import androidx.core.splashscreen.SplashScreen
//import com.reactnativecalculator.R
//import android.os.Bundle

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      ReactNativeHostWrapper(this, object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      })

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    //installSplashScreen()

    //SplashScreen.installSplashScreen(this)
    //SplashScreen.installSplashScreen()
    //Activity.installSplashScreen()

    //val splash = installSplashScreen().apply { setKeepOnScreenCondition { true } }

    //val splash = installSplashScreen(this).apply
    // setTheme(R.style.MyApplication)
    //     installSplashScreen()

    //val splashScreen = installSplashScreen();
    //    setTheme(R.style.DarkTheme)

     
    //installSplashScreen(this, R.style.Intro) // ⬅️ initialize the splash screen
    //SplashScreen.show(this, R.style.Intro) // ⬅️ initialize the splash screen
    //super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
  
    //SplashScreen.installSplashScreen(this)

    //androidx.core.splashscreen.SplashScreen.installSplashScreen(this)

    super.onCreate()

    //SplashScreen.installSplashScreen()
    //installSplashScreen()

    //setTheme(R.style.AppTheme)

    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
