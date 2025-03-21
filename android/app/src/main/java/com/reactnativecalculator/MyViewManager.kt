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

import android.util.Log

import android.view.LayoutInflater

import android.graphics.Color

class MyViewManager: ViewGroupManager<FrameLayout>() {
  // private var propWidth: Int? = null
  // private var propHeight: Int? = null

  override fun getName() = REACT_CLASS

  //override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)
  override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {

    return object : FrameLayout(reactContext) {
      private val measureAndLayout = Runnable {
          measure(
              MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
              MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
          )
          layout(left, top, right, bottom)
      }

      override fun requestLayout() {
          super.requestLayout()
          post(measureAndLayout)
      }
    }

  }
     
  // override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
  //   return LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as FrameLayout // as LinearLayout
  // }

  override fun addView(parent: FrameLayout, child: View, index: Int) {
        // val params = FrameLayout.LayoutParams(250, 250)
        // params.topMargin = 50 * index
        // params.leftMargin = 50 * index
        // child.layoutParams = params
        //parent.setBackgroundColor(Color.parseColor("#D186A3"))
        //parent.setBackgroundColor(Color.parseColor("#a6f263"))
        parent.setBackgroundColor(Color.parseColor("#cf8b1f"))
        parent.addView(child, index)
    }

    override fun getChildAt(parent: FrameLayout, index: Int): View {
        return parent.getChildAt(index)
    }

    override fun removeViewAt(parent: FrameLayout, index: Int) {
        parent.removeViewAt(index)
    }

    override fun getChildCount(parent: FrameLayout): Int {
        return parent.childCount
    }

    override fun needsCustomLayoutForChildren(): Boolean {
        return true
    }

 

  //override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  // override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
  //   super.receiveCommand(root, commandId, args)
  //   val reactNativeViewId = requireNotNull(args).getInt(0)

  //   Log.d("LOG", "AAA 111 ${root}");
  //   Log.d("LOG", "AAA 222 ${requireNotNull(args).getInt(0)}");

  //   when (commandId.toInt()) {
  //     COMMAND_CREATE -> createFragment(root, reactNativeViewId)
  //   }
  // }

  // @ReactPropGroup(names = ["width", "height"], customType = "Style")
  // fun setStyle(view: FrameLayout, index: Int, value: Int) {
  //   if (index == 0) propWidth = value
  //   if (index == 1) propHeight = value
  // }

  // fun createFragment(root: FrameLayout, reactNativeViewId: Int) {
  //   val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
  //   setupLayout(parentView)

  //   val myFragment = MyFragment()
  //   val activity = reactContext.currentActivity as FragmentActivity
  //   activity.supportFragmentManager
  //       .beginTransaction()
  //       .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
  //       .commit()
  // }

  // fun setupLayout(view: View) {
  //   Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
  //     override fun doFrame(frameTimeNanos: Long) {


  //         val width = requireNotNull(propWidth)
  //         val height = requireNotNull(propHeight)

  //         view.measure(
  //           View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
  //           View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
  //         )

  //         view.layout(0, 0, width, height)


  //       //manuallyLayoutChildren(view)
  //       //view.viewTreeObserver.dispatchOnGlobalLayout()
  //       Choreographer.getInstance().postFrameCallback(this)
  //     }
  //   })
  // }

  // private fun manuallyLayoutChildren(view: View) {
  //   val width = requireNotNull(propWidth)
  //   val height = requireNotNull(propHeight)

  //   view.measure(
  //     View.MeasureSpec.makeMeasureSpec(width.toString().toInt(), View.MeasureSpec.EXACTLY),
  //     View.MeasureSpec.makeMeasureSpec(height.toString().toInt(), View.MeasureSpec.EXACTLY)
  //   )

  //   view.layout(0, 0, width.toString().toInt(), height.toString().toInt())
  // }

  companion object {
    private const val REACT_CLASS = "MyViewManager"
    private const val COMMAND_CREATE = 1
  }
}