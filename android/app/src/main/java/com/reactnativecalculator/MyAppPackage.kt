// replace with your package
//package com.mypackage
package com.reactnativecalculator

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import android.view.View
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.bridge.NativeModule

import androidx.annotation.NonNull

import com.reactnativecalculator.StackViewManager

class MyAppPackage : ReactPackage {
  // override fun createViewManagers(
  //     reactContext: ReactApplicationContext
  // ) = listOf(MyViewManager(reactContext))

//   override fun createViewManagers(
//       reactContext: ReactApplicationContext
//   ): MutableList<ViewManager<View, ReactShadowNode<*>>> = mutableListOf()

//   override fun createNativeModules(
//     reactContext: ReactApplicationContext
// ): MutableList<NativeModule> = listOf(MyViewManager(reactContext)).toMutableList()

  override fun createNativeModules(reactApplicationContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(StackViewManager())
        //return listOf(MyViewManager(reactContext))
    }

}