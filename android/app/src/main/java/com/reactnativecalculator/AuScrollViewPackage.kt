//package com.ebenum.AuScrollView;
//package com.reactnativecalculator//.AuScrollView;

package com.reactnativecalculator

import android.app.Activity
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.JavaScriptModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AuScrollViewPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }

    // override fun createJSModules(): List<Class<out JavaScriptModule>> {
    //     return emptyList()
    // }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            AuScrollViewManager()
        )
    }
}