/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

//package com.ebenum.AuScrollView;
//package com.reactnativecalculator//.AuScrollView;

package com.reactnativecalculator

public interface FpsListener {

    /**
     * @param tag
     */
    fun enable(tag: String)

    /**
     * @param tag
     */
    fun disable(tag: String)

    fun isEnabled(): Boolean
}