package com.reactnativecalculator

import com.facebook.react.views.scroll.ReactScrollViewManager
import com.facebook.react.views.scroll.ReactScrollView
import com.facebook.react.uimanager.ThemedReactContext
import android.graphics.Color;
import android.view.View
import android.graphics.Canvas;
import android.view.ViewGroup

import android.util.Log
import com.facebook.react.uimanager.annotations.ReactPropGroup

import com.facebook.react.uimanager.ViewProps

import com.facebook.react.bridge.Dynamic;

import android.util.TypedValue
import android.content.res.Resources

import kotlin.properties.Delegates

import com.facebook.react.bridge.DynamicFromObject
import com.facebook.react.uimanager.Spacing;

import androidx.core.view.updatePadding
import androidx.annotation.Px
import com.facebook.react.bridge.ReadableArray

class CustomScrollViewManager : ReactScrollViewManager() {

  override fun getName() = "CustomScrollView"

  override fun getCommandsMap() = mapOf("create" to COMMAND_CREATE)

  override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
    val view = ReactScrollView(reactContext)
    //view.setBackgroundColor(Color.parseColor("#ff00d9"))
    view.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY)
    view.setClipToPadding(false)
    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.scrollTo(0, 0)

  fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
  fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
    if (index == 0) view.updatePadding(left = dpToPx(value))
    if (index == 1) view.updatePadding(top = dpToPx(value))
    if (index == 2) view.updatePadding(right = dpToPx(value))
    if (index == 3) view.updatePadding(bottom = dpToPx(value))
  }

  companion object {
    private const val COMMAND_CREATE = 1
  }
}