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
  // var propWidth: Int by Delegates.notNull<Int>()
  // var propHeight: Int by Delegates.notNull<Int>()
  var propWidth: Int = 500
  var propHeight: Int = 500
  private var propBackgroundColor: String? = null
  var reactNativeViewId: Int by Delegates.notNull<Int>()
  var parentView: ViewGroup by Delegates.notNull<ViewGroup>()

  override fun getName() = REACT_CLASS

  //override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)

  // override fun createViewInstance(reactContext: ThemedReactContext): View {
  //   //mContext = reactContext
  //   val root = LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null)// as FrameLayout
  //   return root
  // }

  override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
    val root = LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as FrameLayout // as LinearLayout
    return root
  }

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
    super.receiveCommand(root, commandId, args)
    reactNativeViewId = requireNotNull(args).getInt(0)
    val widthTest = args.getInt(1)
    val heightTest = args.getInt(2)

    when (commandId.toInt()) {
      COMMAND_CREATE -> {
        //val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
        parentView = root.findViewById<ViewGroup>(reactNativeViewId)

        Log.d("LOG", "0000 ${parentView.width}");
        Log.d("LOG", "0001 ${parentView.height}");

        Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
          override fun doFrame(frameTimeNanos: Long) {

            // parentView.measure(
            //   View.MeasureSpec.makeMeasureSpec(propWidth, View.MeasureSpec.EXACTLY),
            //   View.MeasureSpec.makeMeasureSpec(propHeight, View.MeasureSpec.EXACTLY)
            // )
            // parentView.layout(0, 0, propWidth, propHeight)

            // val widthTest
            // val heightTest

            
            // parentView.measure(
            //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY),
            //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.WRAP_CONTENT, View.MeasureSpec.EXACTLY)
            // )
            // parentView.layout(0, 0, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)

            // parentView.measure(
            //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY),
            //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY)
            // )
            // parentView.layout(0, 0, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)

            //parentView

            Choreographer.getInstance().postFrameCallback(this)
          }
        })

        val myFragment = MyFragment()
        val activity = reactContext.currentActivity as FragmentActivity
        activity.supportFragmentManager
          .beginTransaction()
          .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
          .commit()
          // .replace(reactNativeViewId, R.id.reactNativeFragment, reactNativeViewId.toString())
          // .commit()
          // .add(R.id.reactNativeFragment, myFragment)
          // .commit()
          // .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
          // .commit()
      }
    }
  }

  
  //@ReactPropGroup(names = {"width"; "height"}) ViewProps.HEIGHT ViewProps.WIDTH
  //@ReactPropGroup(names = [ ViewProps.WIDTH, ViewProps.HEIGHT ])
  @ReactPropGroup(names = ["width", "height"])
  fun setLayout(view: FrameLayout, index: Int, value: Int) {
  // fun setLayout(view: FrameLayout, width: Int, height: Dynamic) {
  // fun setLayout(view: FrameLayout, index: Int, value: Int) {
    if (index == 0) propWidth = value
    if (index == 1) propHeight = value
    // Log.d("LOG", "111 ${width}");
    // Log.d("LOG", "222 ${height.type}");

  }

  @ReactProp(name = "color")
  fun setColor(view: FrameLayout, color: String) {
    parentView.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}