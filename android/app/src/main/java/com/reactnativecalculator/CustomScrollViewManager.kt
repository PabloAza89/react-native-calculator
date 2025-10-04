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
    view.setClipToPadding(false)
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY) // **
    //view.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
    //view.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)

    return view
  }

  // override fun createViewInstance(reactContext: ThemedReactContext): CustomScrollView {
  //   //val view = ReactScrollView(reactContext) // **
  //   val view = CustomScrollView(reactContext) // **
  //   view.setClipToPadding(false)

  //   return view
  // }

  override fun receiveCommand(view: ReactScrollView, commandId: Int, args: ReadableArray?) = view.smoothScrollTo(0, 0)

  // val thumbDrawable = ShapeDrawable(RectShape())
  // thumbDrawable.paint.color = Color.parseColor("#a8378e") // "#0bd415"
  // val drawables = arrayOf(thumbDrawable)
  // val layerDrawable = LayerDrawable(drawables)

  // val thumbDrawable = ShapeDrawable(RectShape()).apply {
  //   paint.color = Color.parseColor("#a8378e") // "#0bd415"
  // }

  // "#0bd415"
  // val thumbDrawable = ShapeDrawable(RectShape()).apply { paint.color = Color.parseColor("#a8378e") }
  // val drawables = arrayOf(thumbDrawable)
  // val layerDrawable = LayerDrawable(drawables)

 

  // layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
  // setScrollbarThumbProgrammatically(view, layerDrawable)

  //fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

  //@ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
  //fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
  //@ReactProp(name = "padding")
  //fun setPadding(view: ReactScrollView, padding: ReadableMap?) {
  @ReactPropGroup(names = [ "ApaddingLeft", "ApaddingTop", "ApaddingRight", "ApaddingBottom" ])
  fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
    // if (index == 0) view.updatePadding(left = dpToPx(value.toDouble()))
    // else if (index == 1) view.updatePadding(top = dpToPx(value.toDouble()))
    // else if (index == 2) view.updatePadding(right = dpToPx(value.toDouble()))
    // else view.updatePadding(bottom = dpToPx(value.toDouble()))

    // if (index == 0) view.updatePadding(left = dpToPx(value.toDouble()))
    // else if (index == 1) view.updatePadding(top = dpToPx(value.toDouble()))
    // else if (index == 2) view.updatePadding(right = dpToPx(value.toDouble()))
    // else view.updatePadding(bottom = dpToPx(value.toDouble()))

    //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
    // layerDrawable.setLayerInset(0, dpToPx(0.0), dpToPx(24.0), dpToPx(0.0), dpToPx(48.0)) // working
    // setScrollbarThumbProgrammatically(view, layerDrawable)

    Log.d("LOG", "index " + index + " value " + value);

    //  val thumbDrawable = ShapeDrawable(RectShape())
    //   thumbDrawable.paint.color = Color.parseColor("#a8378e")
    //   //thumbDrawable.paint.color = Color.parseColor("#0bd415")

    //   val drawables = arrayOf(thumbDrawable)
    //   val layerDrawable = LayerDrawable(drawables)

    //   layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
    //   setScrollbarThumbProgrammatically(view, layerDrawable)

    // padding?.let { map ->
    //     // val paddingLeft = if (map.hasKey("left")) map.getDouble("left").toFloat() else 0f
    //     // val paddingTop = if (map.hasKey("top")) map.getDouble("top").toFloat() else 0f
    //     // val paddingRight = if (map.hasKey("right")) map.getDouble("right").toFloat() else 0f
    //     // val paddingBottom = if (map.hasKey("bottom")) map.getDouble("bottom").toFloat() else 0f
    //   Log.d("LOG", "map " + map);
    // }

    //Log.d("LOG", "padding " + padding);
    //Log.d("LOG", "pad " + pad);

    //if (index == 3) view.updatePadding(bottom = dpToPx(value.toDouble()))
    //if (index == 3) view.updatePadding(bottom = dpToPx(-120.0))  // x5
    //if (index == 3) view.updatePadding(bottom = dpToPx(-108.0))  // x??
    //if (index == 3) view.updatePadding(bottom = dpToPx(-96.0)) // x4
    //if (index == 3) view.updatePadding(bottom = dpToPx(-72.0)) // x3 at square
    //if (index == 3) view.updatePadding(bottom = dpToPx(-48.0)) // x2 at line
    //if (index == 3) view.updatePadding(bottom = dpToPx(-24.0)) // x1 too high
    //view.updatePadding(bottom = dpToPx(96.0))
    //Log.d("LOG", "TEST 1 ${index} ${value}");
  }

  //fun setScrollbarThumbProgrammatically(view: View, drawable: Drawable) {
  fun setScrollbarThumbProgrammatically(view: View, drawable: Drawable) {
    //UiThreadUtil.runOnUiThread {
      try {
        val mScrollCacheField: Field = View::class.java.getDeclaredField("mScrollCache")
        mScrollCacheField.isAccessible = true
        val mScrollCache: Any? = mScrollCacheField.get(view)

        Log.d("LOG", "mScrollCacheField " + mScrollCacheField);

        val scrollBarField: Field = mScrollCache!!::class.java.getDeclaredField("scrollBar")
        scrollBarField.isAccessible = true
        val scrollBar: Any? = scrollBarField.get(mScrollCache)

        Log.d("LOG", "scrollBarField " + scrollBarField);

        val method: Method = scrollBar!!::class.java.getDeclaredMethod("setVerticalThumbDrawable", Drawable::class.java)
        method.isAccessible = true
        method.invoke(scrollBar, drawable)
        //drawable.invalidateSelf() 
        //invalidate()
        //view.awakenScrollBars()

        // val awakenMethod: Method = View::class.java.getDeclaredMethod("awakenScrollBars")
        // awakenMethod.isAccessible = true
        // // The method takes no arguments, so we invoke it on the 'view' instance with null for arguments.
        // awakenMethod.invoke(view)
        // val awakenMethod: Method = View::class.java.getDeclaredMethod("awakenScrollBars")
        // drawable.invalidateSelf() 
        // awakenMethod.invoke(view)
        //view.invalidate()
        //view.requestLayout()
        //view.awakenScrollBars()
        //view.invalidate() 
        //view.setVerticalThumbAndRedraw(drawable)
        //view.scrollBy(0, 100)
        //view.scrollBy(0, -100)
        //view.scrollTo(0, 100)
        //view.scrollBy(0, -100)
        //view.scrollBy(0, -1)
        //val originalScrollY = view.scrollY
        // Log.d("LOG", "originalScrollY " + originalScrollY)
        //view.scrollBy(0, originalScrollY + 100)
        //val originalScrollYY = view.scrollY
        //Log.d("LOG", "originalScrollY 1 " + originalScrollYY)
        //view.scrollBy(0, originalScrollYY - 100)
        //view.scrollBy(0, -100)

        // val originalScrollY = view.scrollY
        // Log.d("LOG", "originalScrollY 1 " + originalScrollY)
        // view.scrollBy(0, 1)
        // val originalScrollYY = view.scrollY
        // Log.d("LOG", "originalScrollY 2 " + originalScrollYY)
        // view.scrollBy(0, -1)
        // val originalScrollYYY = view.scrollY
        // Log.d("LOG", "originalScrollY 3 " + originalScrollYYY)

        //view.scrollTo(0, 0)

      } catch (e: Exception) {
        Log.d("LOG", "ERROR " + e);
        e.printStackTrace()
      } 
    //}
    
  }

  //@ReactPropGroup(names = [ "scrollbarPaddingTop", "scrollbarPaddingBottom" ])
  //@ReactPropGroup(names = [ "scrollbarPaddingTop" ])
  //fun setASD(view: ReactScrollView, arr: ReadableArray) {
  //fun setASD(view: CustomScrollView, arr: ReadableArray) {
  //fun setASD(view: CustomScrollView, arr: ReadableMap) {
  @ReactProp(name = "scrollbarPadding")
  fun setASD(view: ReactScrollView, arr: ReadableMap) {
  //fun setASD(view: ReactScrollView, index: Int, value: Float) {
    //if (index == 0) view.updatePadding(left = dpToPx(value))
    // else if (index == 1) view.updatePadding(top = dpToPx(value))
    //else if (index == 2) view.updatePadding(right = dpToPx(value))
    // else if (index == 3) view.updatePadding(bottom = dpToPx(24.0f))
    //  val thumbDrawable = ShapeDrawable(RectShape()).apply { paint.color = Color.parseColor("#a8378e") }
    // val drawables = arrayOf(thumbDrawable)
    // val layerDrawable = LayerDrawable(drawables)

    // val thumbDrawable = ShapeDrawable(RectShape()).apply { 
    //     paint.color = Color.parseColor("#a8378e") 
    // }
    // //thumbDrawable.paint.color = Color.parseColor("#a8378e")
    // val layerDrawable = LayerDrawable(arrayOf(thumbDrawable))


    //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
    //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
    //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble("left")), dpToPx(arr.getDouble("top")), dpToPx(arr.getDouble("right")), dpToPx(arr.getDouble("bottom"))) // working
    //Log.d("LOG", "TEST 1 ${index} ${value}");

    val thumbDrawable = ShapeDrawable(RectShape()).apply { 
        paint.color = Color.parseColor("#a8378e") 
    }
    //thumbDrawable.paint.color = Color.parseColor("#a8378e")
    val layerDrawable = LayerDrawable(arrayOf(thumbDrawable))
    layerDrawable.setLayerInset(0, dpToPx(arr.getDouble("left")), dpToPx(arr.getDouble("top")), dpToPx(arr.getDouble("right")), dpToPx(arr.getDouble("bottom"))) // working

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) { // Q 10
      // val thumbDrawable = ShapeDrawable(RectShape())
      // thumbDrawable.paint.color = Color.parseColor("#a8378e")
      // //thumbDrawable.paint.color = Color.parseColor("#0bd415")

      // val drawables = arrayOf(thumbDrawable)
      // val layerDrawable = LayerDrawable(drawables)
      
    
      //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
      //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
      view.setVerticalScrollbarThumbDrawable(layerDrawable) // working

      // val originalScrollY = view.scrollY
      // Log.d("LOG", "originalScrollY 1 " + originalScrollY)
      // view.scrollBy(0, 1)
      // val originalScrollYY = view.scrollY
      // Log.d("LOG", "originalScrollY 2 " + originalScrollYY)
      // view.scrollBy(0, -1)
      // val originalScrollYYY = view.scrollY
      // Log.d("LOG", "originalScrollY 3 " + originalScrollYYY)


      Log.d("LOG", "EQUAL OR MAJOR THAN android 10");
    } else {
      Log.d("LOG", "LESS THAN android 10");

      
    
      // val thumbDrawable = ShapeDrawable(RectShape())
      // thumbDrawable.paint.color = Color.parseColor("#a8378e")
      // //thumbDrawable.paint.color = Color.parseColor("#0bd415")

      // val drawables = arrayOf(thumbDrawable)
      // val layerDrawable = LayerDrawable(drawables)

      //layerDrawable.setLayerInset(0, dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3))) // working
      //view.scrollBy(0, 100)
      //view.scrollTo(0, 0) // work
      //view.scrollBy(0, 100)
      //view.scrollTo(0, -100000)
      //val originalScrollY = view.scrollY
      //Log.d("LOG", "originalScroll 0 " + originalScrollY)
      //view.scrollBy(0, originalScrollY + 100)
      //view.scrollTo(0, 100)
      // UiThreadUtil.runOnUiThread {
      //   val originalScrollY = view.scrollY
      //   Log.d("LOG", "originalScroll 0 " + originalScrollY)
      //   //view.scrollBy(0, originalScrollY + 100)
      //   //view.scrollBy(0, 100)
      //   //view.scrollBy(0, 1)
      // }
      setScrollbarThumbProgrammatically(view, layerDrawable)
      
      //view.scrollBy(0, -100)
      //view.scrollBy(0, 100)
      //view.scrollTo(0, 100) // work
      //view.scrollTo(0, 0) // work
      //view.invalidate()
      //view.requestLayout()
      //view.setVerticalThumbAndRedraw(layerDrawable)
      
      //view.scrollBy(0, -1)
      //view.scrollBy(0, -1)
      //view.scrollTo(0, 100)
      //view.scrollTo(0, 0)
      //view.scrollTo(0, -100)
      //val originalScrollY = view.scrollY
      //Log.d("LOG", "originalScrollY " + originalScrollY);
      // view.setVerticalScrollBarEnabled(false)
      // view.setVerticalScrollBarEnabled(true)
      // invalidate()
      //view.forceRedraw()
      //invalidate()
      //view.awakenScrollBars()
      // layerDrawable.invalidateSelf() 
      // invalidate()
      //setScrollbarThumbProgrammatically(myScrollView, thumbDrawable)
      //view.setVerticalScrollbarThumbDrawable(layerDrawable) // working

      //view.setScrollBarThumbDrawable(scrollbarDrawable)
      //myScrollView.setScrollBarThumbDrawable(scrollbarDrawable)

      // if (scrollbarDrawable is LayerDrawable) {

      //   Log.d("LOG", "scrollbarDrawable is LayerDrawable");

      //     // Get the background layer by its ID
      //     //val backgroundLayer = scrollbarDrawable.findDrawableByLayerId(R.id.scrollbar_background_shape) as? ShapeDrawable

      //     // Get the foreground layer by its ID
      //     val foregroundLayer = scrollbarDrawable.findDrawableByLayerId(R.id.scrollbar_foreground_shape) as? ShapeDrawable
          
      //     // Change the colors dynamically
      //     //backgroundLayer?.paint?.color = Color.parseColor("#FF0000") // Red background
      //     foregroundLayer?.paint?.color = Color.parseColor("#0BD415") // Blue foreground

      //     // Note: The system will automatically use the modified drawable for the scrollbar.
      // }

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

    view.scrollBy(0, 1)
    view.scrollBy(0, -1)
    
    
    //layerDrawable.setLayerInsetTop(0, dpToPx(24.0f))
    //layerDrawable.setLayerInsetBottom(0, dpToPx(48.0f))

    //Log.d("LOG", "TEST 1 ${index} ${arr}");
    Log.d("LOG", "TEST all ${arr}");
    // Log.d("LOG", "TEST l ${arr.getDouble(0)}");
    // Log.d("LOG", "TEST t ${arr.getDouble(1)}");
    // Log.d("LOG", "TEST r ${arr.getDouble(2)}");
    // Log.d("LOG", "TEST b ${arr.getDouble(3)}");
    Log.d("LOG", "TEST l ${arr.getDouble("left")}");
    Log.d("LOG", "TEST t ${arr.getDouble("top")}");
    Log.d("LOG", "TEST r ${arr.getDouble("right")}");
    Log.d("LOG", "TEST b ${arr.getDouble("bottom")}");
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

  // @ReactProp(name = "scrollbarAAA")
  // fun setMargin(view: ReactScrollView, arr: ReadableArray) {

  //   Log.d("LOG", "view.layoutParams ${view.layoutParams}");

  //   val newLayoutParams = ViewGroup.MarginLayoutParams(
  //         ViewGroup.LayoutParams.MATCH_PARENT, // Use constants for width
  //         ViewGroup.LayoutParams.WRAP_CONTENT  // Use constants for height
  //         //ViewGroup.LayoutParams.MATCH_PARENT  // Use constants for height
          
  //     )

  //     //newLayoutParams.setMargins(left, top, right, bottom)
  //     //newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))
  //     newLayoutParams.setMargins(dpToPx(arr.getDouble(0)), dpToPx(arr.getDouble(1)), dpToPx(arr.getDouble(2)), dpToPx(arr.getDouble(3)))

  //     //scrollView.layoutParams = newLayoutParams
  //     //view.layoutParams = newLayoutParams

  //     Log.d("LOG", "WW ${newLayoutParams}");

  // }

  // @ReactProp(name = "overflowInset")
  //   fun setOverflowInset(view: ReactScrollView, insetArray: ReadableArray) {
  //       // if (insetArray != null && insetArray.size() == 4) {
  //       //     val left = insetArray.getInt(0)
  //       //     val top = insetArray.getInt(1)
  //       //     val right = insetArray.getInt(2)
  //       //     val bottom = insetArray.getInt(3)
  //       //     view.setOverflowInset(left, top, right, bottom)
  //       // }
  //   }

    // @ReactProp(name = "shouldRedraw")
    // fun setShouldRedraw(view: CustomScrollView, shouldRedraw: Boolean) {
    //     if (shouldRedraw) {
    //         view.forceRedraw()
    //     }
    // }


}