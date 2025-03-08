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

class MyViewManager(private val reactContext: ReactApplicationContext): ViewGroupManager<FrameLayout>() {
  private var propWidth: Int? = null
  private var propHeight: Int? = null
  private var propBackgroundColor: String? = null

  override fun getName() = REACT_CLASS

  override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    val reactNativeViewId = requireNotNull(args).getInt(0)

    when (commandId.toInt()) {
      COMMAND_CREATE -> createFragment(root, reactNativeViewId)
    }
  }

  @ReactPropGroup(names = ["width", "height"], customType = "Style")
  fun setStyle(view: FrameLayout, index: Int, value: Int) {
    if (index == 0) propWidth = value//.toString().toInt()
    if (index == 1) propHeight = value//.toString().toInt()
  }

  // @ReactProp(name = ViewProps.OPACITY)
  // override fun setOpacity(view: FrameLayout, opacity: Float) {
  //   view.setOpacityIfPossible(opacity)
  // }

  @ReactProp(name = "color")
  fun setColor(view: View, color: String) {
    //view.setBackgroundColor(Color.parseColor(color))
    propBackgroundColor = color
    //view.setBackgroundColor(Color.parseColor("#0D00FF"))
  }

  fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
    val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
    setupLayout(parentView)

    val myFragment = MyFragment()
    val activity = reactContext.currentActivity as FragmentActivity
    activity.supportFragmentManager
        .beginTransaction()
        .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
        .commit()
  }

  fun setupLayout(view: View) {
    Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
      override fun doFrame(frameTimeNanos: Long) {
        //manuallyLayoutChildren(view)

        val width = requireNotNull(propWidth)
        val height = requireNotNull(propHeight)
        //val backgroundColor = requireNotNull(propBackgroundColor)
        

        view.measure(
          View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
          View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
        )

        view.layout(0, 0, width, height)

        
        //view.setBackgroundColor(Color.parseColor("#0D00FF"))
        //view.setBackgroundColor(Color.parseColor("#0D00FF"))
        //view.setBackgroundColor(Color.parseColor(backgroundColor))
        if (propBackgroundColor != null) view.setBackgroundColor(Color.parseColor(propBackgroundColor))

        //view.viewTreeObserver.dispatchOnGlobalLayout()
        Choreographer.getInstance().postFrameCallback(this)
      }
    })
  }

  // private fun manuallyLayoutChildren(view: View) {
  //   val width = requireNotNull(propWidth)
  //   val height = requireNotNull(propHeight)

  //   view.measure(
  //     View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
  //     View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
  //   )

  //   view.layout(0, 0, width, height)
  //   //view.setBackgroundColor(Color.parseColor("#0D00FF"))
  // }

  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}