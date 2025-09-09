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



import android.view.ViewGroup



class CustomScrollViewManager : ReactScrollViewManager() {

  override fun getName() = "CustomScrollView"

  fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
    val view = ReactScrollView(reactContext)
    //val view = CCustomScrollView(reactContext)
    view.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY)
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)

    // left, top, right, bottom
    //view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));
    //view.setPadding(dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f), dpToPx(24.0f));
    view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));
    //view.setPadding(dpToPx(0.0f), dpToPx(24.0f), dpToPx(0.0f), dpToPx(24.0f));

    view.setClipToPadding(false)
    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

  //fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
  fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
    // if (index == 0) view.updatePadding(left = dpToPx(value))
    // else if (index == 1) view.updatePadding(top = dpToPx(value))
    // else if (index == 2) view.updatePadding(right = dpToPx(value))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(24.0f))
  }
}