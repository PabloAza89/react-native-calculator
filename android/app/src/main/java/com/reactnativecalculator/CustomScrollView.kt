package com.reactnativecalculator

import android.content.Context
import android.util.AttributeSet
import android.widget.ScrollView
import com.reactnativecalculator.R // Replace with your project's R file
import com.facebook.react.views.scroll.ReactScrollView
import com.facebook.react.uimanager.ThemedReactContext
import android.graphics.drawable.Drawable

import com.facebook.react.bridge.UiThreadUtil
import android.util.Log
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.LayerDrawable
import android.graphics.drawable.shapes.RectShape
import android.graphics.Color

class CustomScrollView(context: ThemedReactContext) : ReactScrollView(context) {

    /**
     * Public method to force a redraw of the view from the ViewManager.
     */
    fun setVerticalThumbAndRedraw(drawable: Drawable?) {
        // Invalidate() is defined on the Android View class, which ReactScrollView extends.
        //invalidate() 
        //this.setVerticalThumbDrawable(drawable)
        
        // 2. Expose the protected method publicly
        // Awaken scrollbars to force redraw
        this.awakenScrollBars(0) 
        
        // Final safety redraw
        this.invalidate()
    }

    // val thumbDrawable = ShapeDrawable(RectShape()).apply { 
    //     paint.color = Color.parseColor("#a8378e") 
    // }
    // val layerDrawable = LayerDrawable(arrayOf(thumbDrawable))

    // override fun onScrollChanged(l: Int, t: Int, oldl: Int, oldt: Int) {
    //     super.onScrollChanged(l, t, oldl, oldt)

    //     // Check if this scroll event was triggered by our scroll-down hack
    //     // if (isForcingRedraw && t == oldt + 1) { 
    //     //     isForcingRedraw = false // Reset the flag
            
    //     //     // This is the "last function" executed after the 1-pixel scroll has finished
    //     //     // Note: You must run this scroll-back on the UI thread, though onScrollChanged 
    //     //     // usually executes there. Using runOnUiThread is safer.
    //     //     UiThreadUtil.runOnUiThread {
    //     //         this.scrollBy(0, -1) // Scroll back
    //     //         this.invalidate()    // Force final redraw
    //     //     }
    //     // }

    //     UiThreadUtil.runOnUiThread {
    //          //this.scrollBy(0, -1) // Scroll back
    //          //this.invalidate()    // Force final redraw
    //          this.scrollTo(0, 0)
    //          Log.d("LOG", "AAAAAAAAAAAAAAAAAAAAAAA");
    //     }

    //     //Log.d("LOG", "AAAAAAAAAAAAAAAAAAAAAAA");
    // }

    // override fun onDraw(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
    //     super.onLayout(changed, l, t, r, b)
    // override fun onDraw(canvas: android.graphics.Canvas) { 
    //     super.onDraw(canvas)
        
    //     // Check if a flag is set from the ViewManager and execute the scroll back
    //     // WARNING: This is less reliable as it can cause performance issues or infinite loops
        
    //     UiThreadUtil.runOnUiThread {
    //          //this.scrollBy(0, -1) // Scroll back
    //          //this.invalidate()    // Force final redraw
    //          this.scrollTo(0, 100)
    //          Log.d("LOG", "AAAAAAAAAAAAAAAAAAAAAAA");
    //     }
    // }
    
    // You could also add the scrollbar redraw method here:
    /*
    fun redrawScrollbars() {
        // ... reflection code for awakenScrollBars() ...
    }
    */
}