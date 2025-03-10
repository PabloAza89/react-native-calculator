// replace with your package
//package com.mypackage
package com.reactnativecalculator

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup

import com.facebook.react.bridge.Dynamic
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.ViewProps

import android.graphics.Color
import kotlin.properties.Delegates

import android.util.Log

import android.view.LayoutInflater
import android.widget.LinearLayout

//import android.view.ViewGroup

class MyViewManager(private val reactContext: ReactApplicationContext): ViewGroupManager<FrameLayout>() {
  private var propBackgroundColor: String? = null
  var reactNativeViewId: Int by Delegates.notNull<Int>()

  override fun getName() = REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
    val root = LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as FrameLayout // as LinearLayout
    return root
  }

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    reactNativeViewId = requireNotNull(args).getInt(0)

    when (commandId.toInt()) {
      COMMAND_CREATE -> {


        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
          override fun doFrame(frameTimeNanos: Long) {


            Choreographer.getInstance().postFrameCallback(this)
          }
        })

        val myFragment = MyFragment()
        val activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
          .beginTransaction()
          .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
          .commit()
      }
    }
  }



  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}