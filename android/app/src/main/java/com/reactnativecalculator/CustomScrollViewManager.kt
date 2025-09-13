package com.reactnativecalculator

import android.content.res.Resources
import android.util.Log
import android.util.TypedValue
import android.view.View

import androidx.core.view.updatePadding

import com.facebook.react.bridge.ReadableArray
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

class CustomScrollViewManager : ReactScrollViewManager() {

  override fun getName() = "CustomScrollView"

  fun dpToPx(dp: Double): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp.toFloat(), Resources.getSystem().displayMetrics).toInt()

  // fun createScrollbarThumbDrawable(): Drawable {
  //   val thumbDrawable = ShapeDrawable(RectShape())
  //   thumbDrawable.paint.color = Color.parseColor("#a8378e")
  //   thumbDrawable.paint.color = Color.parseColor("#0bd415")

  //   val drawables = arrayOf(thumbDrawable)
  //   val layerDrawable = LayerDrawable(drawables)
    
  //   layerDrawable.setLayerInsetTop(0, dpToPx(24.0f))
  //   layerDrawable.setLayerInsetBottom(0, dpToPx(24.0f))
    
  //   return layerDrawable
  // }

  override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
    val view = ReactScrollView(reactContext)
    //val view = CCustomScrollView(reactContext)
    view.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY) // **
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)

    // left, top, right, bottom
    //view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));
    //view.setPadding(dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f), dpToPx(24.0f));
    //view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));
    //view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));

    view.setClipToPadding(false)


    //view.setVerticalScrollbarThumbDrawable(createScrollbarThumbDrawable())

    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

  //fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
  fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
    //if (index == 0) view.updatePadding(left = dpToPx(value))
    // else if (index == 1) view.updatePadding(top = dpToPx(value))
    //else if (index == 2) view.updatePadding(right = dpToPx(value))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(24.0f))
    //Log.d("LOG", "TEST 1 ${index} ${value}");
  }

  //@ReactPropGroup(names = [ "scrollbarPaddingTop", "scrollbarPaddingBottom" ])
  //@ReactPropGroup(names = [ "scrollbarPaddingTop" ])
  @ReactProp(name = "scrollbarPaddingTop")
  fun setASD(view: ReactScrollView, arr: ReadableArray) {
  //fun setASD(view: ReactScrollView, index: Int, value: Float) {
    //if (index == 0) view.updatePadding(left = dpToPx(value))
    // else if (index == 1) view.updatePadding(top = dpToPx(value))
    //else if (index == 2) view.updatePadding(right = dpToPx(value))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(24.0f))

    //Log.d("LOG", "TEST 1 ${index} ${value}");

    val thumbDrawable = ShapeDrawable(RectShape())
    thumbDrawable.paint.color = Color.parseColor("#a8378e")
    thumbDrawable.paint.color = Color.parseColor("#0bd415")

    val drawables = arrayOf(thumbDrawable)
    val layerDrawable = LayerDrawable(drawables)
    
    //layerDrawable.setLayerInsetTop(0, dpToPx(24.0f))
    //layerDrawable.setLayerInsetBottom(0, dpToPx(48.0f))

    //Log.d("LOG", "TEST 1 ${index} ${arr}");
    Log.d("LOG", "TEST all ${arr}");
    Log.d("LOG", "TEST all ${arr.getDouble(0)}");
    Log.d("LOG", "TEST all ${arr.getDouble(1)}");
    Log.d("LOG", "TEST all ${arr.getDouble(2)}");
    // Log.d("LOG", "TEST all ${arr[1]}");
    // Log.d("LOG", "TEST all ${arr[2]}");
    // Log.d("LOG", "TEST all ${arr[3]}");

    //layerDrawable.setLayerInsetTop(0, dpToPx(value))
    //layerDrawable.setLayerInsetBottom(0, dpToPx(value))

    //layerDrawable.setLayerInset(0, arr.getDouble(0), arr.getDouble(1), arr.getDouble(2), arr.getDouble(3))
    layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))
    //dpToPx

    // if (index == 0) layerDrawable.setLayerInsetTop(0, dpToPx(value))
    // else if (index == 1) layerDrawable.setLayerInsetBottom(0, dpToPx(value))

    view.setVerticalScrollbarThumbDrawable(layerDrawable)

  }



}