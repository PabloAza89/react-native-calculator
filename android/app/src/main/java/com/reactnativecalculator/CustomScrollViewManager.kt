// Android/app/src/main/java/com/yourpackage/ScrollViewManagerModule.kt

package com.reactnativecalculator

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.views.scroll.ReactScrollView
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.ViewGroupManager

import android.util.Log
import android.view.View
import java.lang.reflect.Field
import java.lang.reflect.Method
import android.graphics.drawable.Drawable
import com.facebook.react.bridge.ReadableMap
//import com.facebook.react.views.scroll.ReactScrollView
import androidx.core.content.ContextCompat
import android.os.Build
import android.graphics.drawable.LayerDrawable
import android.util.TypedValue
import android.content.res.Resources
import com.facebook.react.bridge.ReadableArray

//@ReactModule(name = ScrollViewManagerModule.NAME)
//class ScrollViewManagerModule(reactContext: ReactApplicationContext) : 
class CustomScrollViewManager(reactContext: ReactApplicationContext) : 
    ViewGroupManager<ReactScrollView>() {
    //SimpleViewManager<ReactScrollView>() {
    

    // companion object {
    //     //const val NAME = "CustomScrollViewManager" 
    //     const val NAME = "RCTScrollView"
    //     const val COMMAND_SCROLL_TO_TOP = 1 // Unique ID for your command
    // }

    //override fun getName(): String = NAME
    override fun getName(): String = "RCTScrollView"

    fun dpToPx(dp: Double): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), Resources.getSystem().displayMetrics).toInt()

    override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
        // This is what the default React Native ScrollView uses
        return ReactScrollView(reactContext)
    }

    // // You can expose properties from JS to Kotlin if needed
    // @ReactProp(name = "someCustomProp")
    // fun setSomeCustomProp(view: ReactScrollView, value: Boolean) {
    //     // example of setting a custom prop
    // }

    // override fun getCommandsMap(): Map<String, Int> {
    //     return mapOf(
    //         "scrollToTop" to COMMAND_SCROLL_TO_TOP
    //     )
    // }

    override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

    // override fun receiveCommand(
    //     root: ReactScrollView,
    //     commandId: String?,
    //     args: com.facebook.react.bridge.ReadableArray?
    // ) {
    //     super.receiveCommand(root, commandId, args)
        
    //     // Convert the command ID string to Int for older RN versions
    //     Log.d("LOG", "commandId 1: " + commandId)
    //     //val commandIdInt = commandId?.toIntOrNull() ?: return 

    //     Log.d("LOG", "commandId 2: " + commandId)

    //     when (commandId?.toInt()) {
    //         COMMAND_SCROLL_TO_TOP -> {
    //             // The actual Kotlin method to control the ScrollView
    //             root.smoothScrollTo(0, 0) 
    //         }
    //         // Add other commands here (e.g., scroll to offset, scroll to end)
    //     }
    // }

  fun setReflectionScrollbarThumbDrawable(view: View, drawable: Drawable) {
    try {
      val mScrollCacheField: Field = View::class.java.getDeclaredField("mScrollCache")
      mScrollCacheField.isAccessible = true
      val mScrollCache: Any? = mScrollCacheField.get(view)
      val scrollBarField: Field = mScrollCache!!::class.java.getDeclaredField("scrollBar")
      scrollBarField.isAccessible = true
      val scrollBar: Any? = scrollBarField.get(mScrollCache)
      val method: Method = scrollBar!!::class.java.getDeclaredMethod("setVerticalThumbDrawable", Drawable::class.java)
      method.isAccessible = true
      method.invoke(scrollBar, drawable)
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  @ReactProp(name = "scrollbarPadding")
  fun setDrawableScrollbar(view: ReactScrollView, map: ReadableMap) {
    //val thumbDrawable = ShapeDrawable(RectShape()).apply { paint.color = Color.parseColor("#000000") }
    //val layerDrawable = LayerDrawable(arrayOf(thumbDrawable))
    // if (map.hasKey("left")) layerDrawable.setLayerInsetLeft(0, dpToPx(map.getDouble("left")))
    // if (map.hasKey("top")) layerDrawable.setLayerInsetTop(0, dpToPx(map.getDouble("top")))
    // if (map.hasKey("right")) layerDrawable.setLayerInsetRight(0, dpToPx(map.getDouble("right")))
    // if (map.hasKey("bottom")) layerDrawable.setLayerInsetBottom(0, dpToPx(map.getDouble("bottom")))
    //layerDrawable.setLayerInsetLeft(0, 0)
    // layerDrawable.setLayerInsetTop(0, 150)
    // layerDrawable.setLayerInsetRight(0, -150)
    // layerDrawable.setLayerInsetBottom(0, 150)
    // val insetDrawable = InsetDrawable(
    //     shapeDrawable,
    //     0.0f, // left
    //     0.0f, // top
    //     0.0f, // right
    //     0.0f // bottom
    // )
    //val layers = arrayOf<Drawable>(insetDrawable)
    //val qq = LayerDrawable(layers)
    //val layers = arrayOf<Drawable>(insetDrawable)
    //val layerDrawable = resources.getDrawable(R.drawable.your_shape, null) as LayerDrawable
    val layerDrawable = ContextCompat.getDrawable(view.context, R.drawable.thumb) as LayerDrawable
    //val layerDrawable = view.context.resources.getDrawable(R.drawable.your_shape) as LayerDrawable
    //val layerDrawable = ContextCompat.getDrawable(view.context, R.drawable.your_shape) as LayerDrawable
    //Log.d("LOG", "REACT CONTEXT: " + view.context) // test
    //layerDrawable.setLayerInset(0, 0, 100, 50, 0)
    // if (map.hasKey("left")) layerDrawable.setLayerInsetLeft(0, dpToPx(map.getDouble("left")))
    // if (map.hasKey("top")) layerDrawable.setLayerInsetTop(0, dpToPx(map.getDouble("top")))
    // if (map.hasKey("right")) layerDrawable.setLayerInsetRight(0, dpToPx(map.getDouble("right")))
    // if (map.hasKey("bottom")) layerDrawable.setLayerInsetBottom(0, dpToPx(map.getDouble("bottom")))
    layerDrawable.setLayerInset(0, dpToPx(map.getDouble("left")), dpToPx(map.getDouble("top")), dpToPx(map.getDouble("right")), dpToPx(map.getDouble("bottom")))
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) { view.setVerticalScrollbarThumbDrawable(layerDrawable) } // 10 = setVerticalScrollbarThumbDrawable OK
    else { setReflectionScrollbarThumbDrawable(view, layerDrawable) } // reflection
    view.scrollBy(0, 1) // RE-RENDER HELPER
    view.scrollBy(0, -1) // RE-RENDER HELPER
  }

  @ReactProp(name = "persistentScrollbar")
  fun setPersistentScrollbar(view: ReactScrollView, value: Boolean) {
    //view.isScrollbarFadingEnabled = !value
    Log.d("LOG", "CURRENT VALUE " + !value)
    view.setScrollbarFadingEnabled(!value)
    view.scrollBy(0, 1) // RE-RENDER HELPER
    view.scrollBy(0, -1) // RE-RENDER HELPER
  }


}