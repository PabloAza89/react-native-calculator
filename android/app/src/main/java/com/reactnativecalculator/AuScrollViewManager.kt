
//package com.ebenum.AuScrollView;
//package com.reactnativecalculator//.AuScrollView;
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

class AuScrollViewManager : ReactScrollViewManager() {

   //private var mFpsListener: FpsListener? = null

    // constructor(context: ReactContext) : this(context, null)

    // constructor(context: ReactContext, @Nullable fpsListener: FpsListener?) : super(context) {
    //     // The original Java code does not assign fpsListener to mFpsListener, so we leave it as is.
      
    // }

    // override fun getName(): String {
    //     return REACT_CLASS
    // }

    override fun getName() = REACT_CLASS

    //override fun createViewInstance(reactContext: ThemedReactContext) = ReactScrollView(reactContext)
    override fun createViewInstance(reactContext: ThemedReactContext): ReactScrollView {
        //return ReactScrollView(reactContext)
        val asd = ReactScrollView(reactContext)
        asd.setBackgroundColor(Color.parseColor("#ff00d9"))

        //asd.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY)
        asd.setScrollBarStyle(View.SCROLLBARS_INSIDE_INSET)
        /* asd.setClipChildren(false) */
        asd.setClipToPadding(false)
        //asd.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
        //asd.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)
        //asd.setPadding(50, 50, 50, 50)
        //asd.setPadding(0, 0, 0, 0)
        //asd.setPadding(1, 1, 1, 1)
        asd.setPadding(40, 40, 40, 40)
        //asd.setPaddingRelative(40, 40, 40, 40)
        

        // Log.d("LOG", "RESP 1 ${View.SCROLLBARS_INSIDE_OVERLAY}")
        // Log.d("LOG", "RESP 2 ${View.SCROLLBARS_INSIDE_INSET}")
        // Log.d("LOG", "RESP 3 ${View.SCROLLBARS_OUTSIDE_OVERLAY}")
        // Log.d("LOG", "RESP 4 ${View.SCROLLBARS_OUTSIDE_INSET}")

        return asd
    }

    @ReactPropGroup(names = ["width", "height"], customType = "Style")
    fun setStyle(view: ReactScrollView, index: Int, value: Int) {
        // if (index == 0) propWidth = value
        // if (index == 1) propHeight = value
        Log.d("LOG", "RECEIVED ${index} ${value}");
    }

    // @ReactPropGroup(names = ["width", "height"], customType = "Style")
    // fun setStyle(view: ReactScrollView, index: Int, value: String) {
    //     // if (index == 0) propWidth = value
    //     // if (index == 1) propHeight = value
    //     Log.d("LOG", "RECEIVED ${index} ${value}");
    // }

    // fun disableClipOnParents(v: View?) {
    //     if (v == null) {
    //         return
    //     }
    //     if (v is ViewGroup) {
    //         v.setClipChildren(false)
    //         v.setClipToPadding(false)
    //     }
    //     disableClipOnParents(v.parent as? View)
    // }

    // override fun onDrawVerticalScrollBar(
    //     canvas: Canvas,
    //     scrollBar: Drawable,
    //     l: Int,
    //     t: Int,
    //     r: Int,
    //     b: Int
    // ) {
    //     scrollBar.setBounds(l, t + mVerticalScrollInset, r, b)
    //     scrollBar.draw(canvas)
    // }

    // companion object {
    //     const val REACT_CLASS: String = "AuScrollView"
    // }

    companion object {
    private const val REACT_CLASS = "AuScrollView"
    private const val COMMAND_CREATE = 1
  }
    
    
}