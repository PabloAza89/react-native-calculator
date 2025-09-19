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

import android.os.Build

import com.reactnativecalculator.R

import androidx.core.content.ContextCompat;
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

import android.graphics.drawable.GradientDrawable

import android.view.ViewGroup
import android.graphics.Rect

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
    val view = ReactScrollView(reactContext) // **
    //val view = super.createViewInstance(reactContext)
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

    //view.setTop(dpToPx(48.0))
    //view.setBottom(dpToPx(48.0))
    //view.setFillViewport(false) //

    val layoutParams = ViewGroup.MarginLayoutParams(
        ViewGroup.MarginLayoutParams.MATCH_PARENT,
        ViewGroup.MarginLayoutParams.WRAP_CONTENT
    )

    val bottomMarginPx = 50

    //view.setOverflowInset(int left, int top, int right, int bottom)
    //view.setOverflowInset(dpToPx(48.0), dpToPx(48.0), dpToPx(48.0), dpToPx(48.0))

    view.setClipToPadding(false)


    //view.setVerticalScrollbarThumbDrawable(createScrollbarThumbDrawable())

    return view
  }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

  //fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
  fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
    // if (index == 0) view.updatePadding(left = dpToPx(value.toDouble()))
    // else if (index == 1) view.updatePadding(top = dpToPx(value.toDouble()))
    // else if (index == 2) view.updatePadding(right = dpToPx(value.toDouble()))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(value.toDouble()))
    //if (index == 3) view.updatePadding(bottom = dpToPx(value.toDouble()))
    //if (index == 3) view.updatePadding(bottom = dpToPx(-120.0))  // x5
    if (index == 3) view.updatePadding(bottom = dpToPx(-108.0))  // x??
    //if (index == 3) view.updatePadding(bottom = dpToPx(-96.0)) // x4
    //if (index == 3) view.updatePadding(bottom = dpToPx(-72.0)) // x3 at square
    //if (index == 3) view.updatePadding(bottom = dpToPx(-48.0)) // x2 at line
    //if (index == 3) view.updatePadding(bottom = dpToPx(-24.0)) // x1 too high
    //view.updatePadding(bottom = dpToPx(96.0))
    //Log.d("LOG", "TEST 1 ${index} ${value}");
  }

  //@ReactPropGroup(names = [ "scrollbarPaddingTop", "scrollbarPaddingBottom" ])
  //@ReactPropGroup(names = [ "scrollbarPaddingTop" ])
  @ReactProp(name = "scrollbarPadding")
  fun setASD(view: ReactScrollView, arr: ReadableArray) {
  //fun setASD(view: ReactScrollView, index: Int, value: Float) {
    //if (index == 0) view.updatePadding(left = dpToPx(value))
    // else if (index == 1) view.updatePadding(top = dpToPx(value))
    //else if (index == 2) view.updatePadding(right = dpToPx(value))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(24.0f))



    //Log.d("LOG", "TEST 1 ${index} ${value}");

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      val thumbDrawable = ShapeDrawable(RectShape())
      thumbDrawable.paint.color = Color.parseColor("#a8378e")
      //thumbDrawable.paint.color = Color.parseColor("#0bd415")

      val drawables = arrayOf(thumbDrawable)
      val layerDrawable = LayerDrawable(drawables)

      layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
      view.setVerticalScrollbarThumbDrawable(layerDrawable) // working
      Log.d("LOG", "EQUAL OR MAJOR THAN android 12");
    } else {
      Log.d("LOG", "LESS THAN android 12");

      // view.updatePadding(left = dpToPx(arr.getDouble(0)))
      // view.updatePadding(top = dpToPx(arr.getDouble(1)))
      // view.updatePadding(right = dpToPx(arr.getDouble(2)))
      // view.updatePadding(bottom = dpToPx(arr.getDouble(3)))

      //view.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))
      //val ww = view.layoutParams
      // val newLayoutParams = ViewGroup.MarginLayoutParams(
      //     ViewGroup.LayoutParams.MATCH_PARENT, // Use constants for width
      //     ViewGroup.LayoutParams.WRAP_CONTENT  // Use constants for height
      //     //ViewGroup.LayoutParams.MATCH_PARENT  // Use constants for height
      // )

      // //newLayoutParams.setMargins(left, top, right, bottom)
      // //newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))
      // newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))

      // //scrollView.layoutParams = newLayoutParams
      // view.layoutParams = newLayoutParams

      // Log.d("LOG", "WW ${newLayoutParams}");
      //view.updatePadding(top = dpToPx(arr.getDouble(1)))
      // view.updatePadding(right = dpToPx(arr.getDouble(2)))
      //view.updatePadding(bottom = dpToPx(arr.getDouble(3)))

      //val qq = findViewById<View>(android.R.id.content).rootView
      //val qq = currentActivity.findViewById<View>(android.R.id.content).rootView
      //val activity = currentActivity
      //val qq = view?.findViewById<View>(android.R.id.content)?.rootView
      //val qq = view?.findViewById(R.style.Start)
      //val qq = R.style.Start
      //val qq = view?.findViewById<Any>(R.id.my_dynamic_item)
      //val qq = view?.scrollbarThumbVertical as? LayerDrawable // **
      //val qq = view?.verticalScrollbarThumbDrawable as? LayerDrawable
      //val qq = view?.verticalScrollbarThumbDrawable as? LayerDrawable

      //val activity = currentActivity

      //val qqq = view.context

      //val qq = ContextCompat.getDrawable(view.context, R.drawable.your_shape) as? LayerDrawable
      //val qq = ContextCompat.getDrawable(view.context, R.drawable.your_shape) as? LayerDrawable
      //val qqq = qq?.mutate() as? LayerDrawable
      //val qqq = qq as? LayerDrawable
      //Log.d("LOG", "QQ ${qqq}");

      // qq.let {
      //   it?.setLayerInset(0, 0, dpToPx(arr.getDouble(1)), 0, dpToPx(arr.getDouble(3)))

      // }

      //qq?.setLayerInset(0, 0, dpToPx(arr.getDouble(1)), 0, dpToPx(arr.getDouble(3)))
      //qq?.setLayerInset(0, 0, dpToPx(48.0), 0, dpToPx(48.0))

      //qqq?.let {
        //val customShape = it.findDrawableByLayerId(R.id.inner_shape) as? GradientDrawable
        //Log.d("LOG", "ESTE ${customShape}");
        //Log.d("LOG", "ESTE 2 ${customShape?.getIntrinsicHeight()}");
        //Log.d("LOG", "ESTE 3 ${customShape?.getColor()}");
        //Log.d("LOG", "ESTE 4 ${customShape?.getBounds()}");
        //Log.d("LOG", "ESTE 5 ${customShape?.setBounds(100, 100, 100, 100)}");

        //val innerLayerIndex = it.findIndexByLayerId(R.id.inner_shape)
        //Log.d("LOG", "ESTE ${innerLayerIndex}");

        //it.setLayerInset(innerLayerIndex, 0, dpToPx(48.0), 0, dpToPx(48.0))


        //innerLayerIndex?.setPadding(0, dpToPx(48.0), 0, dpToPx(48.0))
        //innerLayerIndex.setLayerInset(0, 0, dpToPx(48.0), 0, dpToPx(48.0))
        //it.setLayerInset(0, 0, dpToPx(48.0), 0, dpToPx(48.0))
        //view.background = it
        //view.setPadding(0, dpToPx(48.0), 0, dpToPx(48.0))
        //view.setTop(dpToPx(-48.0))
        //view.setBottom(dpToPx(-48.0))
      //}


      //Log.d("LOG", "QQ ${qqq}");

      //val currentActivity = currentActivity
      //Log.d("LOG", "QQ ${currentActivity}");

      // val parentView = root.findViewById<ViewGroup>(reactNativeViewId)
      // setupLayout(parentView)

      //var rootView: View = this@MainActivity.window.decorView.findViewById<View>(android.R.id.content).rootView

      //val layerDrawable = view.background as? LayerDrawable
      //layerDrawable?.setLayerInset(0, 0, dpToPx(arr.getDouble(1)), 0, dpToPx(arr.getDouble(3))) // working
      //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working

    }

    
    
    //layerDrawable.setLayerInsetTop(0, dpToPx(24.0f))
    //layerDrawable.setLayerInsetBottom(0, dpToPx(48.0f))

    //Log.d("LOG", "TEST 1 ${index} ${arr}");
    Log.d("LOG", "TEST all ${arr}");
    Log.d("LOG", "TEST l ${arr.getDouble(0)}");
    Log.d("LOG", "TEST t ${arr.getDouble(1)}");
    Log.d("LOG", "TEST r ${arr.getDouble(2)}");
    Log.d("LOG", "TEST b ${arr.getDouble(3)}");
    // Log.d("LOG", "TEST all ${arr[1]}");
    // Log.d("LOG", "TEST all ${arr[2]}");
    // Log.d("LOG", "TEST all ${arr[3]}");

    //layerDrawable.setLayerInsetTop(0, dpToPx(value))
    //layerDrawable.setLayerInsetBottom(0, dpToPx(value))

    //layerDrawable.setLayerInset(0, arr.getDouble(0), arr.getDouble(1), arr.getDouble(2), arr.getDouble(3))
    
    //dpToPx

    // if (index == 0) layerDrawable.setLayerInsetTop(0, dpToPx(value))
    // else if (index == 1) layerDrawable.setLayerInsetBottom(0, dpToPx(value))

    //view.setPadding(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)));

    // view.updatePadding(left = dpToPx(arr.getDouble(0)))
    // view.updatePadding(top = dpToPx(arr.getDouble(1)))
    // view.updatePadding(right = dpToPx(arr.getDouble(2)))
    // view.updatePadding(bottom = dpToPx(arr.getDouble(3)))

  }

  @ReactProp(name = "scrollbarAAA")
  fun setMargin(view: ReactScrollView, arr: ReadableArray) {

    Log.d("LOG", "view.layoutParams ${view.layoutParams}");

    val newLayoutParams = ViewGroup.MarginLayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT, // Use constants for width
          ViewGroup.LayoutParams.WRAP_CONTENT  // Use constants for height
          //ViewGroup.LayoutParams.MATCH_PARENT  // Use constants for height
          
      )

      //newLayoutParams.setMargins(left, top, right, bottom)
      //newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))
      newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))

      //scrollView.layoutParams = newLayoutParams
      //view.layoutParams = newLayoutParams

      Log.d("LOG", "WW ${newLayoutParams}");

  }

  @ReactProp(name = "overflowInset")
    fun setOverflowInset(view: ReactScrollView, insetArray: ReadableArray) {
        if (insetArray != null && insetArray.size() == 4) {
            val left = insetArray.getInt(0)
            val top = insetArray.getInt(1)
            val right = insetArray.getInt(2)
            val bottom = insetArray.getInt(3)
            view.setOverflowInset(left, top, right, bottom)
        }
    }


}