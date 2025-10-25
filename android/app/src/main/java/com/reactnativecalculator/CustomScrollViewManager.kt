package com.reactnativecalculator

import android.content.res.Resources
import android.util.Log
import android.util.TypedValue
import android.view.View

import androidx.core.view.updatePadding

import com.facebook.react.bridge.ReadableArray
//import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactPropGroup

import com.facebook.react.views.scroll.ReactScrollViewManager
import com.facebook.react.views.scroll.ReactScrollView



//import android.view.ViewGroup


import android.graphics.Color
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.LayerDrawable
import android.graphics.drawable.shapes.RectShape
import android.graphics.drawable.Drawable
import com.facebook.react.uimanager.annotations.ReactProp

import android.os.Build

import com.reactnativecalculator.R

import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

import android.graphics.drawable.GradientDrawable

import android.view.ViewGroup
import android.graphics.Rect

import android.content.Context
import android.view.ContextThemeWrapper
//import android.widget.ScrollBarDrawable
//import android.graphics.drawable.ScrollBarDrawable

//import java.lang.reflect.Constructor;
import java.lang.reflect.Method
import java.lang.reflect.Field
import com.facebook.react.bridge.ReadableMap

//import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.UiThreadUtil

import android.graphics.drawable.InsetDrawable

//import com.reactnativecalculator.MyCustomScrollView

import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.SimpleViewManager
import android.widget.LinearLayout 
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ViewGroupManager

import com.facebook.react.uimanager.ReactStylesDiffMap
import com.facebook.react.uimanager.StateWrapper
//import com.facebook.react.internal.featureflags.ReactNativeFeatureFlags

class CustomScrollViewManager : ReactScrollViewManager() {
//class CustomScrollViewManager : SimpleViewManager<MyCustomScrollView>() {
//@ReactModule(name = CustomScrollViewManager.REACT_CLASS)
//class CustomScrollViewManager : SimpleViewManager<MyCustomScrollView>() {
//class CustomScrollViewManager : ViewGroupManager<MyCustomScrollView>() {
//class CustomScrollViewManager : ReactScrollViewManager() {

  override fun getName() = "CustomScrollView"

  // override fun prepareToRecycleView(
  //     reactContext: ThemedReactContext,
  //     view: ReactScrollView,
  // ): ReactScrollView? {
  //   // BaseViewManager
  //   val preparedView = super.prepareToRecycleView(reactContext, view)
  //   if (preparedView != null) {
  //     //preparedView.recycleView()
  //   }
  //   return preparedView
  // }

  // companion object {
  //       // Must match the name used in JavaScript's requireNativeComponent
  //       const val REACT_CLASS = "CustomScrollView"
  //   }

  //   override fun getName(): String = REACT_CLASS

  fun dpToPx(dp: Double): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), Resources.getSystem().displayMetrics).toInt()

  // override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
  //   val view = ReactScrollView(reactContext)
  //override fun createViewInstance(reactContext: ThemedReactContext): MyCustomScrollView {
  override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
    //val view = MyCustomScrollView(reactContext)
    val view = ReactScrollView(reactContext)
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY) // **
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)
    view.setClipToPadding(false)
    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)
  //override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

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

  // override fun getContentView(): View? {
  //     return mContent // mContent is the internal View field
  // }
  // override fun updateState(
  //     view: ReactScrollView,
  //     props: ReactStylesDiffMap,
  //     stateWrapper: StateWrapper,
  // ): Any? {
  //   view.setStateWrapper(stateWrapper)
  //   // if (
  //   //     ReactNativeFeatureFlags.enableViewCulling() ||
  //   //         ReactNativeFeatureFlags.useTraitHiddenOnAndroid()
  //   // ) {
  //   //   ReactScrollViewHelper.loadFabricScrollState(view, stateWrapper)
  //   // }
  //   return null
  // }

}