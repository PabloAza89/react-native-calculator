// replace with your package
//package com.mypackage
package com.reactnativecalculator

import android.view.Choreographer
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.RelativeLayout
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactPropGroup

import android.util.Log

import android.view.LayoutInflater

import android.graphics.Color
import kotlin.properties.Delegates

import com.facebook.react.uimanager.LayoutShadowNode
import android.widget.LinearLayout
import android.widget.StackView
import androidx.coordinatorlayout.widget.CoordinatorLayout
//import kotlinx.android.synthetic.main.layout_container.view.*
import com.reactnativecalculator.databinding.LayoutContainerBinding

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.views.view.ReactViewGroup

class MyViewManager(private val reactContext: ReactApplicationContext): ViewGroupManager<ReactViewGroup>() {
  // private var propWidth: Int? = null
  // private var propHeight: Int? = null

  //var reactNativeViewId: Int by Delegates.notNull<Int>()
  //var parentView: ViewGroup by Delegates.notNull<ViewGroup>()
  //private lateinit var container: CoordinatorLayout

  //private lateinit var binding//: LayoutContainerBinding
  //private lateinit var binding: LayoutContainerBinding
  //private lateinit var binding: View
  
  //lateinit var binding: LayoutContainerBinding

  // private var _binding: CoordinatorLayout? = null
  // private val binding get() = _binding!!

  override fun getName() = REACT_CLASS

  //override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)

  // override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
  //   val view = LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as FrameLayout // as LinearLayout
  //   binding = view.findViewById(R.id.containerr) as LayoutContainerBinding

  //   //_binding = LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as CoordinatorLayout // as LinearLayout
  //   //val view = binding.root



  //   return view
  // }

  override fun createViewInstance(context: ThemedReactContext) : ReactViewGroup {

    //val videoView: View = LayoutInflater.from(context).inflate(R.layout.layout_container, null);

    var viewGroup = ReactViewGroup(context)

    viewGroup.setBackgroundColor(Color.parseColor("#4e1fcf"))
    viewGroup.setPadding(50, 50, 50, 50)

    //viewGroup.addView(videoView)

    //setupLayout(viewGroup, videoView)

    return viewGroup
  }

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  // fun setupLayout(viewGroup: View, videoView: View) {
  //   Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
  //     override fun doFrame(frameTimeNanos: Long) {
  //       manuallyLayoutChildren(viewGroup, videoView)
  //       viewGroup.viewTreeObserver.dispatchOnGlobalLayout()
  //       Choreographer.getInstance().postFrameCallback(this)
  //     }
  //   })
  // }

  private fun manuallyLayoutChildren(viewGroup: View, videoView: View) {

    val width = viewGroup.width
    val height = viewGroup.height

    videoView.measure(
        View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
        View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY))

    videoView.layout(0, 0, width, height)
  }

  // override fun receiveCommand(root: FrameLayout, commandId: String, args: ReadableArray?) {
  //   super.receiveCommand(root, commandId, args)
  //   val reactNativeViewId = requireNotNull(args).getInt(0)
  //   val widthTest = args.getInt(1)
  //   val heightTest = args.getInt(2)

  //   when (commandId.toInt()) {
  //     COMMAND_CREATE -> {
  //       //val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
  //       val parentView = root.findViewById<ViewGroup>(reactNativeViewId)

  //       //Log.d("LOG", "0000 ${parentView.width}");
  //       //Log.d("LOG", "0001 ${parentView.height}");

  //       Choreographer.getInstance().postFrameCallback(object: Choreographer.FrameCallback {
  //         override fun doFrame(frameTimeNanos: Long) {

  //           //     private val measureAndLayout = Runnable {
  //           //         measure(
  //           //             MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
  //           //             MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
  //           //         )
  //           //         layout(left, top, right, bottom)
  //           //     }

  //           //     override fun requestLayout() {
  //           //         super.requestLayout()
  //           //         post(measureAndLayout)
  //           //     }

  //           // val measureAndLayout = Runnable {
  //           //     measure(
  //           //         View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
  //           //         View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY)
  //           //     )
  //           //     layout(left, top, right, bottom)
  //           // }

  //           // parentView.measure(
  //           //   View.MeasureSpec.makeMeasureSpec(200, View.MeasureSpec.EXACTLY),
  //           //   View.MeasureSpec.makeMeasureSpec(200, View.MeasureSpec.EXACTLY)
  //           // )
  //           // parentView.layout(0, 0, 200,200)

  //           // val widthTest
  //           // val heightTest

            
  //           // parentView.measure(
  //           //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY),
  //           //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.WRAP_CONTENT, View.MeasureSpec.EXACTLY)
  //           // )
  //           // parentView.layout(0, 0, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)

  //           // parentView.measure(
  //           //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY),
  //           //   View.MeasureSpec.makeMeasureSpec(ViewGroup.LayoutParams.MATCH_PARENT, View.MeasureSpec.EXACTLY)
  //           // )
  //           // parentView.layout(0, 0, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT)

  //           //parentView

  //           Choreographer.getInstance().postFrameCallback(this)
  //         }
  //       })

  //       // val myFragment = MyFragment()
  //       // val activity = reactContext.currentActivity as FragmentActivity
  //       // activity.supportFragmentManager
  //       //   .beginTransaction()
  //       //   .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
  //       //   .commit()
  //         // .replace(reactNativeViewId, R.id.reactNativeFragment, reactNativeViewId.toString())
  //         // .commit()
  //         // .add(R.id.reactNativeFragment, myFragment)
  //         // .commit()
  //         // .replace(reactNativeViewId, myFragment, reactNativeViewId.toString())
  //         // .commit()
  //     }
  //   }
  // }

  //override fun createViewInstance(reactContext: ThemedReactContext) = StackView(reactContext)
  //override fun createViewInstance(reactContext: ThemedReactContext) = FrameLayout(reactContext)
  //override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
  // override fun createViewInstance(reactContext: ThemedReactContext): StackView {
    

  //   return object : StackView(reactContext) {
  //     // override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {}

  //     // }
  //     // init {
  //     //   // set padding and background color
  //     //   setPadding(50,50,50,50);
  //     // }
  //     private val measureAndLayout = Runnable {
  //         measure(
  //             MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
  //             MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
  //         )
  //         layout(left, top, right, bottom)
  //     }

  //     override fun requestLayout() {
  //         super.requestLayout()
  //         post(measureAndLayout)
  //     }
  //   }

  // }
     
  // override fun createViewInstance(reactContext: ThemedReactContext): FrameLayout {
  //   return LayoutInflater.from(reactContext).inflate(R.layout.layout_container, null) as FrameLayout // as LinearLayout
  // }

    // override fun addView(parent: FrameLayout, child: View, index: Int) {
    // //fun addView(parent: RelativeLayout, views: List<View>) {
    //     //Log.d("LOG", "NEW LOW PARENT ${parent}");
    //    // Log.d("LOG", "NEW LOW CHILD ${child.getLayoutParams()}");
    //    //Log.d("LOG", "NEW LOW INDEX ${index}");
    //     // val params = FrameLayout.LayoutParams(250, 250)
    //     // params.topMargin = 50 * index
    //     // params.leftMargin = 50 * index
    //     // child.layoutParams = params
    //     //parent.setBackgroundColor(Color.parseColor("#D186A3"))
    //     //parent.setBackgroundColor(Color.parseColor("#a6f263"))
    //     //parent.setBackgroundColor(Color.parseColor("#cf8b1f")) // orange
    //     //parent.setBackgroundColor(Color.parseColor("#5bdec8")) // lightgreen
    //     //parent.setAlpha(0.50f)
    //     //parent.setPadding(50, 50, 50, 50)
    //     //parent.setPadding(50, 50, 50, 50)

    //     parent.addView(child, index)
    //     //binding?.addView(child, index)
    //     //container.addView(child, index)
    //     //binding?.addView(child, index)


    //     // for (i in views.indices) {
    //     //     addView(parent, views[i], i)
    //     // }
    // }

    // override fun addViews(parent: StackView, views: List<View>) {
    //   for (i in views.indices) {
    //       addView(parent, views[i], i)
    //   }
    // }

    // override fun getChildAt(parent: StackView, index: Int): View {
    //     return parent.getChildAt(index)
    // }

    // override fun removeViewAt(parent: StackView, index: Int) {
    //     parent.removeViewAt(index)
    // }

    // override fun getChildCount(parent: StackView): Int {
    //     return parent.childCount
    // }

    // //override fun createShadowNodeInstance(context: ReactApplicationContext): LayoutShadowNode = ScreensShadowNode(context)

    // //override fun needsCustomLayoutForChildren(): Boolean = true
    // override fun needsCustomLayoutForChildren(): Boolean = false

 

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