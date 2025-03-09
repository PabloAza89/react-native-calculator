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

class MyViewManager(private val reactContext: ReactApplicationContext): ViewGroupManager<FrameLayout>() {
  var propWidth: Int by Delegates.notNull<Int>()
  var propHeight: Int by Delegates.notNull<Int>()
  private var propBackgroundColor: String? = null
  var reactNativeViewId: Int by Delegates.notNull<Int>()
  var parentView: ViewGroup by Delegates.notNull<ViewGroup>()

  override fun getName() = REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    reactNativeViewId = requireNotNull(args).getInt(0)

    when (commandId.toInt()) {
      COMMAND_CREATE -> {
        //val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
        parentView = root.findViewById<ViewGroup>(reactNativeViewId)

        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
          override fun doFrame(frameTimeNanos: Long) {
            parentView.measure(
              View.MeasureSpec.makeMeasureSpec(propWidth, View.MeasureSpec.EXACTLY),
              View.MeasureSpec.makeMeasureSpec(propHeight, View.MeasureSpec.EXACTLY)
            )
            parentView.layout(0, 0, propWidth, propHeight)
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

  @ReactPropGroup(names = ["width", "height"], customType = "Style")
  fun setStyle(view: FrameLayout, index: Int, value: Int) {
    if (index == 0) propWidth = value
    if (index == 1) propHeight = value
  }

  @ReactProp(name = "color")
  fun setColor(view: FrameLayout, color: String) {
    //val parentView = view.findViewById<ViewGroup>(reactNativeViewId)
    parentView.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}