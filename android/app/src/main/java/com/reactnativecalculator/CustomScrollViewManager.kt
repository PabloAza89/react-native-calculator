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

class CustomScrollViewManager : ReactScrollViewManager() {

  override fun getName() = "CustomScrollView"

  fun dpToPx(dp: Double): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), Resources.getSystem().displayMetrics).toInt()

  override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
    val view = ReactScrollView(reactContext)
    view.setClipToPadding(false)
    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

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
  fun setDrawableScrollbar(view: ReactScrollView, arr: ReadableMap) {
    val thumbDrawable = ShapeDrawable(RectShape()).apply { paint.color = Color.parseColor("#a8378e") }
    val layerDrawable = LayerDrawable(arrayOf(thumbDrawable))
    layerDrawable.setLayerInset(0, dpToPx(arr.getDouble("left")), dpToPx(arr.getDouble("top")), dpToPx(arr.getDouble("right")), dpToPx(arr.getDouble("bottom")))
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) { view.setVerticalScrollbarThumbDrawable(layerDrawable) } // 10 = setVerticalScrollbarThumbDrawable OK
    else { setReflectionScrollbarThumbDrawable(view, layerDrawable) } // reflection
    view.scrollBy(0, 1) // RE-RENDER HELPER
    view.scrollBy(0, -1) // RE-RENDER HELPER
  }
}