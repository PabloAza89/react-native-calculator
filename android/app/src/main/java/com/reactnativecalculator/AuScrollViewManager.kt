
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

// import com.facebook.react.uimanager.ViewProps.PADDING;
// import com.facebook.react.uimanager.ViewProps.PADDING_BOTTOM;
// import com.facebook.react.uimanager.ViewProps.PADDING_END;
// import com.facebook.react.uimanager.ViewProps.PADDING_HORIZONTAL;
// import com.facebook.react.uimanager.ViewProps.PADDING_LEFT;
// import com.facebook.react.uimanager.ViewProps.PADDING_RIGHT;
// import com.facebook.react.uimanager.ViewProps.PADDING_START;
// import com.facebook.react.uimanager.ViewProps.PADDING_TOP;
// import com.facebook.react.uimanager.ViewProps.PADDING_VERTICAL;

import com.facebook.react.uimanager.ViewProps

import com.facebook.react.bridge.Dynamic;

import android.util.TypedValue
import android.content.res.Resources

import kotlin.properties.Delegates

import com.facebook.react.bridge.DynamicFromObject
import com.facebook.react.uimanager.Spacing;

import androidx.core.view.updatePadding
import androidx.annotation.Px

class AuScrollViewManager : ReactScrollViewManager() {

    // var paddingLeft: Int by Delegates.notNull<Int>()
    // var paddingTop: Int by Delegates.notNull<Int>()
    // var paddingRight: Int by Delegates.notNull<Int>()
    // var paddingBottom: Int by Delegates.notNull<Int>()

    var paddingLeft: Int = 0
    var paddingTop: Int = 0
    var paddingRight: Int = 0
    var paddingBottom: Int = 0

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
        asd.setClipChildren(false)
        //asd.setClipToPadding(false)
        //asd.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY)
        //asd.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_INSET)
        //asd.setPadding(50, 50, 50, 50)
        //asd.setPadding(0, 0, 0, 0)
        //asd.setPadding(1, 1, 1, 1)
        //asd.setPadding(40, 40, 40, 40)
        //asd.setPadding(40, 40, 40, 40)
        //asd.setPadding(paddingLeft, paddingTop, paddingRight, paddingBottom)
        //asd.setPaddingRelative(40, 40, 40, 40)
        

        // Log.d("LOG", "RESP 1 ${View.SCROLLBARS_INSIDE_OVERLAY}")
        // Log.d("LOG", "RESP 2 ${View.SCROLLBARS_INSIDE_INSET}")
        // Log.d("LOG", "RESP 3 ${View.SCROLLBARS_OUTSIDE_OVERLAY}")
        // Log.d("LOG", "RESP 4 ${View.SCROLLBARS_OUTSIDE_INSET}")

        return asd
    }

    // fun onLayout() {

    // }

    // @ReactPropGroup(names = ["width", "height"], customType = "Style")
    // fun setStyle(view: ReactScrollView, index: Int, value: Int) {
    //     // if (index == 0) propWidth = value
    //     // if (index == 1) propHeight = value
    //     Log.d("LOG", "RECEIVED ${index} ${value}");
    // }

    fun dpToPx(dp: Float): Int = TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics).toInt()

    @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
    fun setPaddings(view: ReactScrollView, index: Int, value: Float) {
        // if (index == 0) paddingLeft = dpToPx(value)
        // if (index == 1) paddingTop = dpToPx(value)
        // if (index == 2) paddingRight = dpToPx(value)
        // if (index == 3) paddingBottom = dpToPx(value)
        //view.updatePadding(PADDING_TYPES[index] = value);

        if (index == 0) view.updatePadding(left = dpToPx(value))
        if (index == 1) view.updatePadding(top = dpToPx(value))
        if (index == 2) view.updatePadding(right = dpToPx(value))
        if (index == 3) view.updatePadding(bottom = dpToPx(value))

        //view.updatePadding(left.also { left = value })

        //Log.d("LOG", "RECEIVED PRE ${index} ${value}");

        //Log.d("LOG", "RECEIVED AFTER ${index} ${TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, Resources.getSystem().displayMetrics).toInt()}");

        //view.setPadding(paddingLeft, paddingTop, paddingRight, paddingBottom)

        //view.updateView()

        //TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, value, Resources.getSystem().displayMetrics).toInt()
        //Log.d("LOG", "RECEIVED ${padding}");
    }

    //private val mTempYogaValue = MutableYogaValue()

    //private val PADDING_TYPES = intArrayOf(
    // Spacing.ALL, Spacing.LEFT, Spacing.TOP, Spacing.RIGHT, Spacing.BOTTOM
    // val PADDING_TYPES = intArrayOf(
    //     Spacing.LEFT, Spacing.TOP, Spacing.RIGHT, Spacing.BOTTOM
    // )


    ////// @ReactPropGroup(names = [ "paddingLeft", "paddingTop", "paddingRight", "paddingBottom" ])
    // fun setPaddings(view: ReactScrollView, index: Int, value: Int) {
    //     Log.d("LOG", "RECEIVED INDEX ${index}");
    //     Log.d("LOG", "RECEIVED VALUE ${value}");
    //     //view.setContentPadding(PADDING_TYPES[index], value);
    //     //view.setPadding(PADDING_TYPES[index], value);
    //     //super.setPaddings(index, value);
    //     //view.setContentPadding(PADDING_TYPES[index], padding);
    //     //view.setPadding(index, value)
    //     //super.setPaddings(index, value);
    //     //view.setPadding(left, top, right, bottom)
    //     //view.setPadding(view.paddingLeft, view.paddingTop, view.paddingRight, view.paddingBottom)
    //     // val asd = "left"
    //     // if (index == 2) {
    //     //   view.updatePadding(2 = value)
    //     // }

    //     //Log.d("LOG", "PPPPARAMETER ${updatePadding.parameters}");

    //     //val dyn = 'left'
    //     view.updatePadding(if (index == 0) left = value else if (index));
    //     //view.updatePadding(updatePadding::property.left = value);
    //     //view.updatePadding(PADDING_TYPES[index] = value);
        

    //     // Log.d("LOG", "RECEIVED LEFT ${left}");
    //     // Log.d("LOG", "RECEIVED TOP ${top}");
    //     //view.setPadding(left, top, right, bottom)
    // }

    // fun dpToPx(dp: Float): Int {
    //     return TypedValue.applyDimension(
    //         TypedValue.COMPLEX_UNIT_DIP, dp, Resources.getSystem().displayMetrics
    //     ).toInt()
    // }

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