import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ResizeSensor } from 'css-element-queries';
import * as PropTypes from 'prop-types';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".spaces-centered-vertically {\r\n\tposition: relative;\r\n\ttop: 50%;\r\n\ttransform: translateY(-50%);\r\n}\r\n\r\n.spaces-centered {\r\n\tposition: relative;\r\n\ttop: 50%;\r\n\ttransform: translateY(-50%);\r\n\ttext-align: center;\r\n}\r\n\r\n.spaces-clearfix:after {\r\n\tcontent: \"\";\r\n\tdisplay: table;\r\n\tclear: both;\r\n}\r\n\r\n.spaces-resize-handle {\r\n\tposition: absolute;\r\n\tz-index: 9999;\r\n\tbackground: transparent;\r\n}\r\n\r\n.spaces-resize-handle:before {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tz-index: 2;\r\n}\r\n\r\n.spaces-resize-handle:after {\r\n\tcontent: \"\";\r\n\tposition: absolute;\r\n\tz-index: 1;\r\n}\r\n\r\n.spaces-touch-handle {\r\n\tposition: absolute;\r\n\tz-index: 9998;\r\n\tpointer-events: all;\r\n\tbackground: transparent;\r\n}\r\n\r\n.spaces-resize-handle.resize-left {\r\n\ttop: 0;\r\n\tbottom: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-left:before {\r\n\tcursor: w-resize;\r\n}\r\n\r\n.spaces-touch-handle.resize-left {\r\n\ttop: 0;\r\n\tbottom: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-right {\r\n\ttop: 0;\r\n\tbottom: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-right:before {\r\n\tcursor: e-resize;\r\n}\r\n\r\n.spaces-touch-handle.resize-right {\r\n\ttop: 0;\r\n\tbottom: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-top {\r\n\tleft: 0;\r\n\tright: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-top:before {\r\n\tcursor: n-resize;\r\n}\r\n\r\n.spaces-touch-handle.resize-top {\r\n\tleft: 0;\r\n\tright: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-bottom {\r\n\tleft: 0;\r\n\tright: 0;\r\n}\r\n\r\n.spaces-resize-handle.resize-bottom:before {\r\n\tcursor: s-resize;\r\n}\r\n\r\n.spaces-touch-handle.resize-bottom {\r\n\tleft: 0;\r\n\tright: 0;\r\n}\r\n\r\n.spaces-space {\r\n\toverflow: hidden;\r\n\ttouch-action: none;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.spaces-resizing .spaces-space {\r\n\ttransition: none !important;\r\n}\r\n\r\n.spaces-space .spaces-space-inner {\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n\tright: 0;\r\n\tbottom: 0;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n.spaces-space.scrollable .spaces-space-inner {\r\n\toverflow: auto;\r\n\ttouch-action: auto;\r\n}\r\n";
styleInject(css_248z);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Type;
(function (Type) {
    Type["ViewPort"] = "viewport";
    Type["Fixed"] = "fixed";
    Type["Fill"] = "fill";
    Type["Positioned"] = "positioned";
    Type["Anchored"] = "anchored";
    Type["Custom"] = "custom";
})(Type || (Type = {}));
var AnchorType;
(function (AnchorType) {
    AnchorType["Left"] = "anchor-left";
    AnchorType["Right"] = "anchor-right";
    AnchorType["Top"] = "anchor-top";
    AnchorType["Bottom"] = "anchor-bottom";
})(AnchorType || (AnchorType = {}));
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(Orientation || (Orientation = {}));
var ResizeType;
(function (ResizeType) {
    ResizeType["Left"] = "resize-left";
    ResizeType["Right"] = "resize-right";
    ResizeType["Top"] = "resize-top";
    ResizeType["Bottom"] = "resize-bottom";
    ResizeType["TopLeft"] = "resize-topleft";
    ResizeType["TopRight"] = "resize-topright";
    ResizeType["BottomLeft"] = "resize-bottomleft";
    ResizeType["BottomRight"] = "resize-bottomright";
})(ResizeType || (ResizeType = {}));
var ResizeHandlePlacement;
(function (ResizeHandlePlacement) {
    ResizeHandlePlacement["OverlayInside"] = "overlay-inside";
    ResizeHandlePlacement["Inside"] = "inside";
    ResizeHandlePlacement["OverlayBoundary"] = "overlay-boundary";
})(ResizeHandlePlacement || (ResizeHandlePlacement = {}));
var CenterType;
(function (CenterType) {
    CenterType["None"] = "none";
    CenterType["Vertical"] = "vertical";
    CenterType["HorizontalVertical"] = "horizontalVertical";
})(CenterType || (CenterType = {}));
var MoveEvent;
(function (MoveEvent) {
    MoveEvent["Mouse"] = "mousemove";
    MoveEvent["Touch"] = "touchmove";
})(MoveEvent || (MoveEvent = {}));
var EndEvent;
(function (EndEvent) {
    EndEvent["Mouse"] = "mouseup";
    EndEvent["Touch"] = "touchend";
})(EndEvent || (EndEvent = {}));

function shortuuid() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}
function getSizeString(size) {
    return typeof size === "string" ? size : size + "px";
}
function css(size, dontAddCalc) {
    if (size.size === 0 && size.adjusted.length === 0 && size.resized === 0) {
        return "0px";
    }
    var parts = [];
    if (size.size !== undefined) {
        parts.push(getSizeString(size.size));
    }
    size.adjusted.forEach(function (l) { return parts.push(getSizeString(l)); });
    if (size.resized !== 0) {
        parts.push(getSizeString(size.resized));
    }
    if (parts.length === 0) {
        return undefined;
    }
    if (parts.length === 1) {
        return parts[0];
    }
    if (dontAddCalc) {
        return parts.join(" + ");
    }
    return "calc(" + parts.join(" + ") + ")";
}
function coalesce() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.find(function (x) { return x !== null && x !== undefined; });
}
function adjustmentsEqual(item1, item2) {
    if (item1.length !== item2.length) {
        return false;
    }
    for (var i = 0, len = item1.length; i < len; i++) {
        if (item1[i] !== item2[i]) {
            return false;
        }
    }
    return true;
}
function throttle(callback, limit) {
    var wait = false; // Initially, we're not waiting
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // We return a throttled function
        if (!wait) {
            // If we're not waiting
            callback.apply(void 0, args); // Execute users function
            wait = true; // Prevent future invocations
            setTimeout(function () {
                // After a period of time
                wait = false; // And allow future invocations
            }, limit);
        }
    };
}
function styleDefinition(space) {
    var cssElements = [];
    var style = {
        position: space.position,
        left: css(space.left),
        top: css(space.top),
        right: css(space.right),
        bottom: css(space.bottom),
        width: css(space.width),
        height: css(space.height),
        zIndex: space.zIndex,
    };
    var cssString = [];
    if (style.position) {
        cssString.push("position: " + style.position + ";");
    }
    if (style.left) {
        cssString.push("left: " + style.left + ";");
    }
    if (style.top) {
        cssString.push("top: " + style.top + ";");
    }
    if (style.right) {
        cssString.push("right: " + style.right + ";");
    }
    if (style.bottom) {
        cssString.push("bottom: " + style.bottom + ";");
    }
    if (style.width) {
        cssString.push("width: " + style.width + ";");
    }
    if (style.height) {
        cssString.push("height: " + style.height + ";");
    }
    if (style.zIndex) {
        cssString.push("z-index: " + style.zIndex + ";");
    }
    if (space.allowOverflow) {
        cssString.push("overflow: visible;");
    }
    if (cssString.length > 0) {
        cssElements.push("#" + space.id + " { " + cssString.join(" ") + " }");
    }
    if (space.scrollable) {
        cssElements.push("#" + space.id + " > .spaces-space-inner { overflow: auto; touch-action: auto; }");
    }
    var handleOffset = 0;
    var touchHandleSize = space.touchHandleSize / 2 - space.handleSize / 2;
    switch (space.handlePlacement) {
        case ResizeHandlePlacement.Inside:
        case ResizeHandlePlacement.OverlayInside:
            handleOffset = space.handleSize;
            if (space.type === Type.Positioned) {
                handleOffset = 0;
            }
            break;
        case ResizeHandlePlacement.OverlayBoundary:
            handleOffset = space.handleSize / 2;
            break;
    }
    if (space.type === Type.Positioned) {
        if (space.canResizeLeft) {
            cssElements.push("#" + space.id + "-ml { left: calc(" + css(space.left, true) + " - " + handleOffset + "px); width: " + space.handleSize + "px; top: " + css(space.top) + "; bottom: " + css(space.bottom) + "; height: " + css(space.height) + "; }");
        }
        if (space.canResizeTop) {
            cssElements.push("#" + space.id + "-mt { top: calc(" + css(space.top, true) + " - " + handleOffset + "px); height: " + space.handleSize + "px; left: " + css(space.left) + "; right: " + css(space.right) + "; width: " + css(space.width) + "; }");
            cssElements.push("#" + space.id + "-mt:after { top: -" + touchHandleSize + "px; bottom: -" + touchHandleSize + "px; left: " + css(space.left) + "; right: " + css(space.right) + "; width: " + css(space.width) + "; }");
        }
        if (space.canResizeRight) {
            cssElements.push("#" + space.id + "-mr:after { left: -" + touchHandleSize + "px; right: -" + touchHandleSize + "px; top: 0; bottom: 0; }");
            if (space.width.size) {
                cssElements.push("#" + space.id + "-mr { left: calc(" + css(space.left, true) + " + " + css(space.width, true) + " - " + space.handleSize + "px + " + handleOffset + "px); width: " + space.handleSize + "px; top: " + css(space.top) + "; bottom: " + css(space.bottom) + "; height: " + css(space.height) + "; }");
            }
            else {
                cssElements.push("#" + space.id + "-mr { right: calc(" + css(space.right, true) + " - " + handleOffset + "px); width: " + space.handleSize + "px; top: " + css(space.top) + "; bottom: " + css(space.bottom) + "; height: " + css(space.height) + "; }");
            }
            cssElements.push("#" + space.id + "-mr:after { left: -" + touchHandleSize + "px; right: -" + touchHandleSize + "px; top: 0; bottom: 0; }");
        }
        if (space.canResizeBottom) {
            if (space.height.size) {
                cssElements.push("#" + space.id + "-mb { top: calc(" + css(space.top, true) + " + " + css(space.height, true) + " - " + space.handleSize + "px + " + handleOffset + "px); height: " + space.handleSize + "px; left: " + css(space.left) + "; right: " + css(space.right) + "; width: " + css(space.width) + "; }");
            }
            else {
                cssElements.push("#" + space.id + "-mb { bottom: calc(" + css(space.bottom, true) + " - " + handleOffset + "px); height: " + space.handleSize + "px; left: " + css(space.left) + "; right: " + css(space.right) + "; width: " + css(space.width) + "; }");
            }
            cssElements.push("#" + space.id + "-mb:after { top: -" + touchHandleSize + "px; bottom: -" + touchHandleSize + "px; left: 0; right: 0; }");
        }
    }
    else {
        if (space.canResizeLeft) {
            cssElements.push("#" + space.id + "-ml { right: calc(" + css(space.right, true) + " + " + css(space.width, true) + " - " + handleOffset + "px); width: " + space.handleSize + "px; }");
            cssElements.push("#" + space.id + "-ml:after { left: -" + touchHandleSize + "px; right: -" + touchHandleSize + "px; top: 0; bottom: 0; }");
        }
        if (space.canResizeTop) {
            cssElements.push("#" + space.id + "-mt { bottom: calc(" + css(space.bottom, true) + " + " + css(space.height, true) + " - " + handleOffset + "px); height: " + space.handleSize + "px; }");
            cssElements.push("#" + space.id + "-mt:after { top: -" + touchHandleSize + "px; bottom: -" + touchHandleSize + "px; left: 0; right: 0; }");
        }
        if (space.canResizeRight) {
            cssElements.push("#" + space.id + "-mr { left: calc(" + css(space.left, true) + " + " + css(space.width, true) + " - " + handleOffset + "px); width: " + space.handleSize + "px; }");
            cssElements.push("#" + space.id + "-mr:after { left: -" + touchHandleSize + "px; right: -" + touchHandleSize + "px; top: 0; bottom: 0; }");
        }
        if (space.canResizeBottom) {
            cssElements.push("#" + space.id + "-mb { top: calc(" + css(space.top, true) + " + " + css(space.height, true) + " - " + handleOffset + "px); height: " + space.handleSize + "px; }");
            cssElements.push("#" + space.id + "-mb:after { top: -" + touchHandleSize + "px; bottom: -" + touchHandleSize + "px; left: 0; right: 0; }");
        }
    }
    return cssElements.join(" ");
}
function updateStyleDefinition(space) {
    var definition = styleDefinition(space);
    var existing = document.getElementById("style_" + space.id);
    if (existing) {
        if (existing.innerHTML !== definition) {
            existing.innerHTML = definition;
        }
    }
    else {
        var newStyle = document.createElement("style");
        newStyle.id = "style_" + space.id;
        newStyle.innerHTML = definition;
        document.head.appendChild(newStyle);
    }
}
function removeStyleDefinition(space) {
    var existing = document.getElementById("style_" + space.id);
    if (existing) {
        document.head.removeChild(existing);
    }
}

var RESIZE_THROTTLE = 0;
function isHorizontal(resizeType) {
    return resizeType === ResizeType.Left || resizeType === ResizeType.Right;
}
function createAdjuster(resizeType, space, originalX, originalY) {
    var dimensionToAdjust = (function () {
        if (resizeType === ResizeType.Left) {
            return space.left;
        }
        else if (resizeType === ResizeType.Right) {
            return space.right;
        }
        else if (resizeType === ResizeType.Bottom) {
            return space.bottom;
        }
        else if (resizeType === ResizeType.Top) {
            return space.top;
        }
        else {
            throw new Error("unknown resize type");
        }
    })();
    var negater = resizeType === ResizeType.Right || resizeType === ResizeType.Bottom ? function (val) { return -val; } : function (val) { return val; };
    var candidateOppositeDimensionToAdjust = isHorizontal(resizeType) ? space.width : space.height;
    var offset1 = dimensionToAdjust.resized;
    var offset2 = candidateOppositeDimensionToAdjust.resized;
    var rect = space.element.getBoundingClientRect();
    var size = isHorizontal(resizeType) ? rect.width : rect.height;
    var minimumAdjust = coalesce(space.minimumSize, 20) - size + 0;
    var maximumAdjust = space.maximumSize ? space.maximumSize - size + 0 : undefined;
    return function (currentX, currentY) {
        var adjustment = (isHorizontal(resizeType) ? originalX : originalY) - (isHorizontal(resizeType) ? currentX : currentY);
        var dimensionResized = negater(adjustment);
        if (space.type !== Type.Positioned) {
            dimensionResized = Math.max(negater(adjustment), minimumAdjust);
            if (dimensionResized < minimumAdjust) {
                dimensionResized = minimumAdjust;
            }
            if (typeof maximumAdjust === "number") {
                if (dimensionResized > maximumAdjust) {
                    dimensionResized = maximumAdjust;
                }
            }
        }
        if (dimensionToAdjust.size !== undefined) {
            dimensionToAdjust.resized = negater(-adjustment) + offset1;
            if (candidateOppositeDimensionToAdjust.size) {
                candidateOppositeDimensionToAdjust.resized = negater(adjustment) + offset2;
            }
        }
        else {
            candidateOppositeDimensionToAdjust.resized = dimensionResized + offset2;
        }
    };
}
function createResize(store) {
    return {
        startResize: function (e, resizeType, space, endEvent, moveEvent, getCoords, onResizeEnd) {
            if (space.onResizeStart) {
                var result = space.onResizeStart(resizeType);
                if (typeof result === "boolean" && !result) {
                    return;
                }
            }
            var originalCoords = getCoords(e);
            var adjuster = createAdjuster(resizeType, space, originalCoords.x, originalCoords.y);
            space.resizing = true;
            space.updateParent();
            var lastX = 0;
            var lastY = 0;
            var moved = false;
            var resize = function (currentX, currentY) {
                adjuster(currentX, currentY);
                store.updateStyles(space);
            };
            var withPreventDefault = function (e) {
                moved = true;
                var newCoords = getCoords(e);
                lastX = newCoords.x;
                lastY = newCoords.y;
                e.preventDefault();
                throttle(function (x, y) { return window.requestAnimationFrame(function () { return resize(x, y); }); }, RESIZE_THROTTLE)(lastX, lastY);
            };
            var removeListener = function () {
                if (moved) {
                    resize(lastX, lastY);
                }
                window.removeEventListener(moveEvent, withPreventDefault);
                window.removeEventListener(endEvent, removeListener);
                space.resizing = false;
                space.updateParent();
                var resizeEnd = onResizeEnd || space.onResizeEnd;
                if (resizeEnd) {
                    var currentRect = space.element.getBoundingClientRect();
                    resizeEnd(Math.floor(isHorizontal(resizeType) ? currentRect.width : currentRect.height), currentRect, resizeType);
                }
            };
            window.addEventListener(moveEvent, withPreventDefault);
            window.addEventListener(endEvent, removeListener);
        },
    };
}

function createDrag(store) {
    function onMove(space, originalX, originalY, x, y) {
        var adjustmentX = -(originalX - x);
        var adjustmentY = -(originalY - y);
        space.left.adjusted = [adjustmentX];
        space.top.adjusted = [adjustmentY];
        if (space.right.size) {
            space.right.adjusted = [-adjustmentX];
        }
        if (space.bottom.size) {
            space.bottom.adjusted = [-adjustmentY];
        }
        store.updateStyles(space);
    }
    return {
        startDrag: function (e, space, endEvent, moveEvent, getCoords, onDragEnd) {
            if (space.element) {
                var coords = getCoords(e);
                var adjustedLeft = space.left.adjusted.length === 0 ? 0 : space.left.adjusted[0];
                var adjustedTop = space.top.adjusted.length === 0 ? 0 : space.top.adjusted[0];
                var originalMouseX_1 = coords.x - adjustedLeft;
                var originalMouseY_1 = coords.y - adjustedTop;
                var lastX_1 = 0;
                var lastY_1 = 0;
                var moved_1 = false;
                var mouseMove_1 = function (x, y) { return onMove(space, originalMouseX_1, originalMouseY_1, x, y); };
                var throttledMouseMove_1 = throttle(mouseMove_1, 5);
                var withPreventDefault_1 = function (e) {
                    moved_1 = true;
                    var newCoords = getCoords(e);
                    lastX_1 = newCoords.x;
                    lastY_1 = newCoords.y;
                    e.preventDefault();
                    throttledMouseMove_1(lastX_1, lastY_1);
                };
                var removeListener_1 = function () {
                    var _a;
                    if (moved_1) {
                        mouseMove_1(lastX_1, lastY_1);
                    }
                    window.removeEventListener(moveEvent, withPreventDefault_1);
                    window.removeEventListener(endEvent, removeListener_1);
                    if (onDragEnd) {
                        var parentInfo = (space.parentId && ((_a = store.getSpace(space.parentId)) === null || _a === void 0 ? void 0 : _a.element.getBoundingClientRect())) || {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 0,
                            height: 0,
                        };
                        var info = (function (_a) {
                            var left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height;
                            return ({ left: left, top: top, right: right, bottom: bottom, width: width, height: height });
                        })(space.element.getBoundingClientRect());
                        onDragEnd(__assign(__assign({}, info), {
                            left: info.left - parentInfo.left,
                            top: info.top - parentInfo.top,
                        }), moved_1);
                    }
                };
                window.addEventListener(moveEvent, withPreventDefault_1);
                window.addEventListener(endEvent, removeListener_1);
            }
        },
    };
}

var spaceDefaults = {
    id: "",
    zIndex: 0,
    scrollable: false,
    resizing: false,
    allowOverflow: false,
    centerContent: "none",
    dimension: { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: function () { return ""; } },
    handleSize: 5,
    touchHandleSize: 5,
    handlePlacement: ResizeHandlePlacement.OverlayInside,
    adjustLeft: function () { return false; },
    adjustRight: function () { return false; },
    adjustTop: function () { return false; },
    adjustBottom: function () { return false; },
    adjustEdge: function () { return false; },
    anchoredChildren: function () { return []; },
};
var anchorTypes = [AnchorType.Left, AnchorType.Top, AnchorType.Right, AnchorType.Bottom];
function getPosition(type) {
    if (type === Type.ViewPort) {
        return "fixed";
    }
    if (type === Type.Fixed) {
        return "relative";
    }
    return "absolute";
}
function getOrientation(anchor) {
    return anchor === AnchorType.Bottom || anchor === AnchorType.Top ? Orientation.Vertical : Orientation.Horizontal;
}
function anchorUpdates(space) {
    return [
        {
            anchor: AnchorType.Left,
            update: space.adjustLeft,
        },
        {
            anchor: AnchorType.Top,
            update: space.adjustTop,
        },
        {
            anchor: AnchorType.Right,
            update: space.adjustRight,
        },
        {
            anchor: AnchorType.Bottom,
            update: space.adjustBottom,
        },
    ];
}
function sizeInfoDefault(size) {
    return { size: size, adjusted: [], resized: 0 };
}
function createStore() {
    var spaces = [];
    var setSpaces = function (newSpaces) {
        spaces = newSpaces;
    };
    var getSpace = function (id) {
        return getSpaces().find(function (s) { return s.id === id; });
    };
    var getSpaces = function () { return spaces; };
    var recalcSpaces = function (parent) {
        var onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        var addDefaultOrders = function (spaces) {
            var result = [];
            anchorTypes.forEach(function (t) {
                var anchoredSpaces = spaces.filter(function (s) { return s.anchor !== undefined && s.anchor === t; });
                var zIndices = anchoredSpaces.map(function (s) { return s.zIndex; }).filter(onlyUnique);
                zIndices.forEach(function (i) {
                    var anchoredSpacesInLayer = anchoredSpaces.filter(function (s) { return s.zIndex === i; });
                    var orderedSpaces = anchoredSpacesInLayer.filter(function (c) { return c.order !== undefined; });
                    var unorderedSpaces = anchoredSpacesInLayer.filter(function (c) { return c.order === undefined; });
                    var maxOrder = orderedSpaces.length > 0 ? orderedSpaces.map(function (a) { return a.order; }).reduce(function (a, b) { return Math.max(a, b); }) : 0;
                    result = __spreadArray(__spreadArray([], result, true), __spreadArray(__spreadArray([], orderedSpaces, true), unorderedSpaces.map(function (c, idx) { return (__assign(__assign({}, c), { order: maxOrder + idx + 1 })); }), true), true);
                });
            });
            return __spreadArray(__spreadArray([], result, true), spaces.filter(function (s) { return s.anchor === undefined; }), true);
        };
        var orderedSpaces = addDefaultOrders(parent.children);
        var _loop_1 = function () {
            var space = orderedSpaces[i];
            var changed = false;
            if (space.type === Type.Fill) {
                anchorUpdates(space).forEach(function (info) {
                    var adjusted = [];
                    var anchoredSpaces = parent.anchoredChildren(orderedSpaces, info.anchor, space.zIndex);
                    anchoredSpaces.forEach(function (as) {
                        if (as.orientation === Orientation.Vertical) {
                            if (as.height.size) {
                                adjusted.push(as.height.size);
                            }
                            if (as.height.resized) {
                                adjusted.push(as.height.resized);
                            }
                        }
                        else {
                            if (as.width.size) {
                                adjusted.push(as.width.size);
                            }
                            if (as.width.resized) {
                                adjusted.push(as.width.resized);
                            }
                        }
                    });
                    if (info.update(adjusted)) {
                        changed = true;
                    }
                });
            }
            else if (space.type === Type.Anchored) {
                var adjusted_1 = [];
                var anchoredSpaces = parent
                    .anchoredChildren(orderedSpaces, space.anchor, space.zIndex)
                    .filter(function (s) { return s.id !== space.id && s.order <= space.order; });
                anchoredSpaces.forEach(function (as) {
                    if (as.orientation === Orientation.Vertical) {
                        if (as.height.size) {
                            adjusted_1.push(as.height.size);
                        }
                        if (as.height.resized) {
                            adjusted_1.push(as.height.resized);
                        }
                    }
                    else {
                        if (as.width.size) {
                            adjusted_1.push(as.width.size);
                        }
                        if (as.width.resized) {
                            adjusted_1.push(as.width.resized);
                        }
                    }
                });
                if (space.adjustEdge(adjusted_1)) {
                    changed = true;
                }
            }
            if (changed) {
                updateStyleDefinition(space);
            }
        };
        for (var i = 0, len = orderedSpaces.length; i < len; i++) {
            _loop_1();
        }
    };
    var store = {
        getSpaces: getSpaces,
        getSpace: getSpace,
        addSpace: function (space) {
            getSpaces().push(space);
            if (space.parentId) {
                var parentSpace = getSpace(space.parentId);
                if (parentSpace) {
                    parentSpace.children.push(space);
                    recalcSpaces(parentSpace);
                }
            }
            updateStyleDefinition(space);
        },
        removeSpace: function (space) {
            setSpaces(getSpaces().filter(function (s) { return s.id !== space.id; }));
            if (space.parentId) {
                var parentSpace = getSpace(space.parentId);
                if (parentSpace) {
                    parentSpace.children = parentSpace.children.filter(function (s) { return s.id !== space.id; });
                    recalcSpaces(parentSpace);
                }
            }
            removeStyleDefinition(space);
        },
        updateStyles: function (space) {
            if (space.parentId) {
                var parent_1 = getSpace(space.parentId);
                if (parent_1) {
                    recalcSpaces(parent_1);
                }
            }
            updateStyleDefinition(space);
        },
        updateSpace: function (space, props) {
            var type = props.type, anchor = props.anchor, order = props.order, zIndex = props.zIndex, scrollable = props.scrollable, position = props.position, centerContent = props.centerContent, minimumSize = props.minimumSize, maximumSize = props.maximumSize, handleSize = props.handleSize, touchHandleSize = props.touchHandleSize, handlePlacement = props.handlePlacement, allowOverflow = props.allowOverflow;
            var canResizeLeft = (position && position.leftResizable) || false;
            var canResizeRight = (position && position.rightResizable) || false;
            var canResizeTop = (position && position.topResizable) || false;
            var canResizeBottom = (position && position.bottomResizable) || false;
            var changed = false;
            if (space.type !== type) {
                space.type = type;
                space.position = getPosition(type);
                changed = true;
            }
            if (space.anchor !== anchor) {
                space.anchor = anchor;
                space.orientation = getOrientation(anchor);
                changed = true;
                if (type === Type.Anchored) {
                    if (anchor === AnchorType.Left) {
                        space.adjustEdge = space.adjustLeft;
                    }
                    else if (anchor === AnchorType.Top) {
                        space.adjustEdge = space.adjustTop;
                    }
                    else if (anchor === AnchorType.Right) {
                        space.adjustEdge = space.adjustRight;
                    }
                    else if (anchor === AnchorType.Bottom) {
                        space.adjustEdge = space.adjustBottom;
                    }
                }
            }
            if (space.left.size !== (position && position.left)) {
                space.left.size = position && position.left;
                space.left.resized = 0;
                space.left.adjusted = [];
                changed = true;
            }
            if (space.right.size !== (position && position.right)) {
                space.right.size = position && position.right;
                space.right.resized = 0;
                space.right.adjusted = [];
                changed = true;
            }
            if (space.top.size !== (position && position.top)) {
                space.top.size = position && position.top;
                space.top.resized = 0;
                space.top.adjusted = [];
                changed = true;
            }
            if (space.bottom.size !== (position && position.bottom)) {
                space.bottom.size = position && position.bottom;
                space.bottom.resized = 0;
                space.bottom.adjusted = [];
                changed = true;
            }
            if (space.width.size !== (position && position.width)) {
                space.width.size = position && position.width;
                space.width.resized = 0;
                space.width.adjusted = [];
                changed = true;
            }
            if (space.height.size !== (position && position.height)) {
                space.height.size = position && position.height;
                space.height.resized = 0;
                space.height.adjusted = [];
                changed = true;
            }
            if (coalesce(space.order, 0) !== coalesce(order, 0)) {
                space.order = coalesce(order, 0);
                changed = true;
            }
            if (coalesce(space.zIndex, 0) !== coalesce(zIndex, 0)) {
                space.zIndex = coalesce(zIndex, 0);
                changed = true;
            }
            if (coalesce(space.scrollable, false) !== coalesce(scrollable, false)) {
                space.scrollable = coalesce(scrollable, false);
                changed = true;
            }
            if (space.minimumSize !== minimumSize) {
                space.minimumSize = minimumSize;
                changed = true;
            }
            if (space.maximumSize !== maximumSize) {
                space.maximumSize = maximumSize;
                changed = true;
            }
            if (coalesce(space.centerContent, CenterType.None) !== coalesce(centerContent, CenterType.None)) {
                space.centerContent = coalesce(centerContent, CenterType.None);
                changed = true;
            }
            if (space.handleSize !== handleSize) {
                space.handleSize = handleSize || spaceDefaults.handleSize;
                changed = true;
            }
            if (space.touchHandleSize !== touchHandleSize) {
                space.touchHandleSize = touchHandleSize || spaceDefaults.touchHandleSize;
                changed = true;
            }
            if (space.handlePlacement !== handlePlacement) {
                space.handlePlacement = handlePlacement || spaceDefaults.handlePlacement;
                changed = true;
            }
            if (space.canResizeBottom !== canResizeBottom) {
                space.canResizeBottom = canResizeBottom;
                changed = true;
            }
            if (space.canResizeTop !== canResizeTop) {
                space.canResizeTop = canResizeTop;
                changed = true;
            }
            if (space.canResizeLeft !== canResizeLeft) {
                space.canResizeLeft = canResizeLeft;
                changed = true;
            }
            if (space.canResizeRight !== canResizeRight) {
                space.canResizeRight = canResizeRight;
                changed = true;
            }
            if (space.allowOverflow !== allowOverflow) {
                space.allowOverflow = allowOverflow || spaceDefaults.allowOverflow;
                changed = true;
            }
            if (changed) {
                if (space.parentId) {
                    var parentSpace = getSpace(space.parentId);
                    if (parentSpace) {
                        recalcSpaces(parentSpace);
                    }
                }
                updateStyleDefinition(space);
            }
        },
        createSpace: function () { return ({}); },
        startMouseResize: function () { return null; },
        startTouchResize: function () { return null; },
        startMouseDrag: function () { return null; },
        startTouchDrag: function () { return null; },
    };
    var resize = createResize(store);
    var drag = createDrag(store);
    store.createSpace = function (parentId, props, update) {
        var position = props.position, anchor = props.anchor, type = props.type, commonProps = __rest(props, ["position", "anchor", "type"]);
        var canResizeLeft = (position && position.rightResizable) || false;
        var canResizeRight = (position && position.leftResizable) || false;
        var canResizeTop = (position && position.bottomResizable) || false;
        var canResizeBottom = (position && position.topResizable) || false;
        var newSpace = __assign(__assign(__assign({}, spaceDefaults), commonProps), {
            store: store,
            update: update,
            updateParent: function () {
                if (parentId) {
                    var parentSpace = store.getSpace(parentId);
                    if (parentSpace) {
                        parentSpace.update();
                    }
                }
            },
            parentId: parentId,
            children: [],
            anchor: anchor,
            type: type,
            orientation: getOrientation(anchor),
            position: getPosition(type),
            left: sizeInfoDefault(position && position.left),
            right: sizeInfoDefault(position && position.right),
            top: sizeInfoDefault(position && position.top),
            bottom: sizeInfoDefault(position && position.bottom),
            width: sizeInfoDefault(position && position.width),
            height: sizeInfoDefault(position && position.height),
            canResizeLeft: canResizeLeft,
            canResizeRight: canResizeRight,
            canResizeTop: canResizeTop,
            canResizeBottom: canResizeBottom,
        });
        newSpace.anchoredChildren = function (children, anchor, zIndex) {
            return children.filter(function (s) { return s.type === Type.Anchored && s.anchor === anchor && s.zIndex === zIndex; });
        };
        newSpace.adjustLeft = function (adjusted) {
            if (adjustmentsEqual(newSpace.left.adjusted, adjusted)) {
                return false;
            }
            newSpace.left.adjusted = adjusted;
            return true;
        };
        newSpace.adjustRight = function (adjusted) {
            if (adjustmentsEqual(newSpace.right.adjusted, adjusted)) {
                return false;
            }
            newSpace.right.adjusted = adjusted;
            return true;
        };
        newSpace.adjustTop = function (adjusted) {
            if (adjustmentsEqual(newSpace.top.adjusted, adjusted)) {
                return false;
            }
            newSpace.top.adjusted = adjusted;
            return true;
        };
        newSpace.adjustBottom = function (adjusted) {
            if (adjustmentsEqual(newSpace.bottom.adjusted, adjusted)) {
                return false;
            }
            newSpace.bottom.adjusted = adjusted;
            return true;
        };
        if (type === Type.Anchored) {
            if (anchor === AnchorType.Left) {
                newSpace.adjustEdge = newSpace.adjustLeft;
            }
            else if (anchor === AnchorType.Top) {
                newSpace.adjustEdge = newSpace.adjustTop;
            }
            else if (anchor === AnchorType.Right) {
                newSpace.adjustEdge = newSpace.adjustRight;
            }
            else if (anchor === AnchorType.Bottom) {
                newSpace.adjustEdge = newSpace.adjustBottom;
            }
        }
        return newSpace;
    };
    store.startMouseResize = function (resizeType, space, event, onResizeEnd) {
        resize.startResize(event, resizeType, space, EndEvent.Mouse, MoveEvent.Mouse, function (e) { return ({
            x: e.clientX,
            y: e.clientY,
        }); }, onResizeEnd);
    };
    store.startTouchResize = function (resizeType, space, event, onResizeEnd) {
        resize.startResize(event, resizeType, space, EndEvent.Touch, MoveEvent.Touch, function (e) { return ({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }); }, onResizeEnd);
    };
    store.startMouseDrag = function (space, event, onDragEnd) {
        drag.startDrag(event, space, EndEvent.Mouse, MoveEvent.Mouse, function (e) { return ({
            x: e.clientX,
            y: e.clientY,
        }); }, onDragEnd);
    };
    store.startTouchDrag = function (space, event, onDragEnd) {
        drag.startDrag(event, space, EndEvent.Touch, MoveEvent.Touch, function (e) { return ({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }); }, onDragEnd);
    };
    return store;
}

// WORKAROUND for React18 strict mode
// https://blog.ag-grid.com/avoiding-react-18-double-mount/
var useEffectOnce = function (effect) {
    var destroyFunc = useRef();
    var effectCalled = useRef(false);
    var renderAfterCalled = useRef(false);
    var _a = useState(0); _a[0]; var setVal = _a[1];
    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }
    useEffect(function () {
        // only execute the effect first time around
        if (!effectCalled.current) {
            destroyFunc.current = effect();
            effectCalled.current = true;
        }
        // this forces one render after the effect is run
        setVal(function (val) { return val + 1; });
        return function () {
            // if the comp didn't render since the useEffect was called,
            // we know it's the dummy React cycle
            if (!renderAfterCalled.current) {
                return;
            }
            if (destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, []);
};
var ParentContext = React.createContext(undefined);
var DOMRectContext = React.createContext(undefined);
var LayerContext = React.createContext(undefined);
var OptionsContext = React.createContext({});
var currentStore = createStore();
var commonProps = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    as: PropTypes.any,
    centerContent: PropTypes.oneOf([CenterType.None, CenterType.Vertical, CenterType.HorizontalVertical]),
    zIndex: PropTypes.number,
    scrollable: PropTypes.bool,
    trackSize: PropTypes.bool,
    allowOverflow: PropTypes.bool,
    handleRender: PropTypes.func,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseMove: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchMove: PropTypes.func,
    onTouchEnd: PropTypes.func,
};
function useForceUpdate() {
    var _a = React.useState(0), setTick = _a[1];
    var update = React.useCallback(function () {
        setTick(function (tick) { return tick + 1; });
    }, []);
    return update;
}
function useSpace(props) {
    var store = currentStore;
    var update = useForceUpdate();
    var parent = React.useContext(ParentContext);
    var layer = React.useContext(LayerContext);
    var debug = React.useContext(OptionsContext).debug;
    var spaceId = React.useState(props.id || "s" + shortuuid())[0];
    var elementRef = React.useRef();
    var resizeSensor = React.useRef();
    var _a = React.useState(), domRect = _a[0], setDomRect = _a[1];
    var space = store.getSpace(spaceId);
    if (debug) {
        console.table(store.getSpaces());
    }
    var parsedProps = __assign(__assign({}, props), {
        id: spaceId,
        zIndex: coalesce(props.zIndex, layer),
    });
    if (!space) {
        space = store.createSpace(parent, parsedProps, update);
        store.addSpace(space);
    }
    else {
        store.updateSpace(space, parsedProps);
    }
    var resizeHandles = useSpaceResizeHandles(store, space);
    useEffectOnce(function () {
        var rect = elementRef.current.getBoundingClientRect();
        space.dimension = __assign(__assign({}, rect), {
            left: Math.floor(rect.left),
            top: Math.floor(rect.top),
            right: Math.floor(rect.right),
            bottom: Math.floor(rect.bottom),
            width: Math.floor(rect.width),
            height: Math.floor(rect.height),
            x: Math.floor(rect.x),
            y: Math.floor(rect.y),
        });
        setDomRect(space.dimension);
        if (props.trackSize) {
            resizeSensor.current = new ResizeSensor(elementRef.current, function (size) {
                space.dimension = __assign(__assign({}, rect), {
                    width: Math.floor(size.width),
                    height: Math.floor(size.height),
                });
                setDomRect(space.dimension);
            });
        }
        return function () {
            resizeSensor.current && resizeSensor.current.detach();
            store.removeSpace(space);
        };
    });
    return { space: space, resizeHandles: resizeHandles, domRect: domRect, elementRef: elementRef };
}
function useSpaceResizeHandles(store, space) {
    var mouseHandles = [];
    if (space.canResizeLeft) {
        mouseHandles.push({
            id: space.id + "-ml",
            key: "left",
            className: "spaces-resize-handle resize-left",
            onMouseDown: function (event) { return store.startMouseResize(ResizeType.Left, space, event); },
            onTouchStart: function (event) { return store.startTouchResize(ResizeType.Left, space, event); },
        });
    }
    if (space.canResizeRight) {
        mouseHandles.push({
            id: space.id + "-mr",
            key: "right",
            className: "spaces-resize-handle resize-right",
            onMouseDown: function (event) { return store.startMouseResize(ResizeType.Right, space, event); },
            onTouchStart: function (event) { return store.startTouchResize(ResizeType.Right, space, event); },
        });
    }
    if (space.canResizeTop) {
        mouseHandles.push({
            id: space.id + "-mt",
            key: "top",
            className: "spaces-resize-handle resize-top",
            onMouseDown: function (event) { return store.startMouseResize(ResizeType.Top, space, event); },
            onTouchStart: function (event) { return store.startTouchResize(ResizeType.Top, space, event); },
        });
    }
    if (space.canResizeBottom) {
        mouseHandles.push({
            id: space.id + "-mb",
            key: "bottom",
            className: "spaces-resize-handle resize-bottom",
            onMouseDown: function (event) { return store.startMouseResize(ResizeType.Bottom, space, event); },
            onTouchStart: function (event) { return store.startTouchResize(ResizeType.Bottom, space, event); },
        });
    }
    return {
        mouseHandles: mouseHandles,
    };
}
function useCurrentSpace() {
    var store = currentStore;
    var spaceId = React.useContext(ParentContext);
    var space = spaceId ? store.getSpace(spaceId) : undefined;
    var domRect = React.useContext(DOMRectContext);
    var layer = React.useContext(LayerContext);
    var onMouseDrag = React.useCallback(function (e, onDragEnd) { return (space ? store.startMouseDrag(space, e, onDragEnd) : null); }, [spaceId]);
    var onTouchDrag = React.useCallback(function (e, onDragEnd) { return (space ? store.startTouchDrag(space, e, onDragEnd) : null); }, [spaceId]);
    var onForceUpdate = React.useCallback(function () { return (space ? store.updateStyles(space) : null); }, [spaceId]);
    var defaults = { width: 0, height: 0, x: 0, y: 0 };
    var size = __assign(__assign({}, defaults), domRect);
    return {
        size: size,
        layer: layer || 0,
        startMouseDrag: onMouseDrag,
        startTouchDrag: onTouchDrag,
        forceUpdate: onForceUpdate,
    };
}

var Centered = function (props) { return React.createElement("div", { className: "spaces-centered" }, props.children); };

var CenteredVertically = function (props) { return React.createElement("div", { className: "spaces-centered-vertically" }, props.children); };

function applyCentering(children, centerType) {
    switch (centerType) {
        case CenterType.Vertical:
            return React.createElement(CenteredVertically, null, children);
        case CenterType.HorizontalVertical:
            return React.createElement(Centered, null, children);
    }
    return children;
}
var Space = /** @class */ (function (_super) {
    __extends(Space, _super);
    function Space() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Space.prototype.render = function () {
        return React.createElement(SpaceInner, __assign({}, this.props, { wrapperInstance: this }));
    };
    return Space;
}(React.Component));
var SpaceInner = function (props) {
    if (!props.id && !props.wrapperInstance["_react_spaces_uniqueid"]) {
        props.wrapperInstance["_react_spaces_uniqueid"] = "s" + shortuuid();
    }
    var style = props.style, className = props.className, onClick = props.onClick, onDoubleClick = props.onDoubleClick, onMouseDown = props.onMouseDown, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onMouseMove = props.onMouseMove, onTouchStart = props.onTouchStart, onTouchMove = props.onTouchMove, onTouchEnd = props.onTouchEnd, children = props.children, handleRender = props.handleRender;
    var events = {
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        onMouseDown: onMouseDown,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onMouseMove: onMouseMove,
        onTouchStart: onTouchStart,
        onTouchMove: onTouchMove,
        onTouchEnd: onTouchEnd,
    };
    var _a = useSpace(__assign(__assign({}, props), { id: props.id || props.wrapperInstance["_react_spaces_uniqueid"] })), space = _a.space, domRect = _a.domRect, elementRef = _a.elementRef, resizeHandles = _a.resizeHandles;
    useEffectOnce(function () {
        space.element = elementRef.current;
    });
    var userClasses = className ? className.split(" ").map(function (c) { return c.trim(); }) : [];
    var outerClasses = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], ["spaces-space", space.children.find(function (s) { return s.resizing; }) ? "spaces-resizing" : undefined], false), [space.type === Type.Fixed ? "spaces-fixedsize-layout" : undefined], false), [space.type === Type.ViewPort ? "spaces-fullpage-layout" : undefined], false), userClasses.map(function (c) { return c + "-container"; }), true).filter(function (c) { return c; });
    var innerClasses = __spreadArray(__spreadArray([], ["spaces-space-inner"], false), userClasses, true);
    var innerStyle = style;
    if (space.handlePlacement === ResizeHandlePlacement.Inside) {
        innerStyle = __assign(__assign({}, style), {
            left: space.anchor === AnchorType.Right ? space.handleSize : undefined,
            right: space.anchor === AnchorType.Left ? space.handleSize : undefined,
            top: space.anchor === AnchorType.Bottom ? space.handleSize : undefined,
            bottom: space.anchor === AnchorType.Top ? space.handleSize : undefined,
        });
    }
    var centeredContent = applyCentering(children, props.centerContent);
    return (React.createElement(React.Fragment, null,
        resizeHandles.mouseHandles.map(function (handleProps) { return (handleRender === null || handleRender === void 0 ? void 0 : handleRender(handleProps)) || React.createElement("div", __assign({}, handleProps)); }),
        React.createElement(props.as || "div", __assign({
            id: space.id,
            ref: elementRef,
            className: outerClasses.join(" "),
        }, events), React.createElement("div", { className: innerClasses.join(" "), style: innerStyle },
            React.createElement(ParentContext.Provider, { value: space.id },
                React.createElement(LayerContext.Provider, { value: undefined },
                    React.createElement(DOMRectContext.Provider, { value: domRect }, centeredContent)))))));
};

var resizableProps = __assign(__assign({}, commonProps), {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    order: PropTypes.number,
    handleSize: PropTypes.number,
    touchHandleSize: PropTypes.number,
    handlePlacement: PropTypes.oneOf([ResizeHandlePlacement.Inside, ResizeHandlePlacement.OverlayBoundary, ResizeHandlePlacement.OverlayInside]),
    handleRender: PropTypes.func,
    minimumSize: PropTypes.number,
    maximumSize: PropTypes.number,
    onResizeStart: PropTypes.func,
    onResizeEnd: PropTypes.func,
});
var anchoredProps = __assign(__assign({}, resizableProps), {
    resizable: PropTypes.bool,
});
var LeftResizable = function (_a) {
    var children = _a.children, size = _a.size, props = __rest(_a, ["children", "size"]);
    return (React.createElement(Space, __assign({}, props, { type: Type.Anchored, anchor: AnchorType.Left, position: { left: 0, top: 0, bottom: 0, rightResizable: true, width: size } }), children));
};
LeftResizable.propTypes = resizableProps;
var Left = function (_a) {
    var size = _a.size, children = _a.children, resizable = _a.resizable, commonProps = __rest(_a, ["size", "children", "resizable"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.Anchored, anchor: AnchorType.Left, position: { left: 0, top: 0, bottom: 0, rightResizable: resizable, width: size } }), children));
};
Left.propTypes = anchoredProps;
var TopResizable = function (_a) {
    var children = _a.children, size = _a.size, props = __rest(_a, ["children", "size"]);
    return (React.createElement(Space, __assign({}, props, { type: Type.Anchored, anchor: AnchorType.Top, position: { left: 0, top: 0, right: 0, bottomResizable: true, height: size } }), children));
};
TopResizable.propTypes = resizableProps;
var Top = function (_a) {
    var size = _a.size, children = _a.children, resizable = _a.resizable, commonProps = __rest(_a, ["size", "children", "resizable"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.Anchored, anchor: AnchorType.Top, position: { left: 0, top: 0, right: 0, bottomResizable: resizable, height: size } }), children));
};
Top.propTypes = anchoredProps;
var RightResizable = function (_a) {
    var children = _a.children, size = _a.size, props = __rest(_a, ["children", "size"]);
    return (React.createElement(Space, __assign({}, props, { type: Type.Anchored, anchor: AnchorType.Right, position: { bottom: 0, top: 0, right: 0, leftResizable: true, width: size } }), children));
};
RightResizable.propTypes = resizableProps;
var Right = function (_a) {
    var size = _a.size, children = _a.children, resizable = _a.resizable, commonProps = __rest(_a, ["size", "children", "resizable"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.Anchored, anchor: AnchorType.Right, position: { bottom: 0, top: 0, right: 0, leftResizable: resizable, width: size } }), children));
};
Right.propTypes = anchoredProps;
var BottomResizable = function (_a) {
    var children = _a.children, size = _a.size, props = __rest(_a, ["children", "size"]);
    return (React.createElement(Space, __assign({}, props, { type: Type.Anchored, anchor: AnchorType.Bottom, position: { bottom: 0, left: 0, right: 0, topResizable: true, height: size } }), children));
};
BottomResizable.propTypes = resizableProps;
var Bottom = function (_a) {
    var size = _a.size, children = _a.children, resizable = _a.resizable, commonProps = __rest(_a, ["size", "children", "resizable"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.Anchored, anchor: AnchorType.Bottom, position: { bottom: 0, left: 0, right: 0, topResizable: resizable, height: size } }), children));
};
Bottom.propTypes = anchoredProps;

var customProps = __assign(__assign({}, anchoredProps), {
    type: PropTypes.oneOf([Type.Positioned, Type.Fill, Type.Anchored]),
    anchor: PropTypes.oneOf([AnchorType.Left, AnchorType.Top, AnchorType.Right, AnchorType.Bottom]),
    anchorSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizeTypes: PropTypes.array,
});
var Custom = function (_a) {
    var children = _a.children, type = _a.type, left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height, anchorSize = _a.anchorSize, anchor = _a.anchor, resizable = _a.resizable, resizeTypes = _a.resizeTypes, props = __rest(_a, ["children", "type", "left", "top", "right", "bottom", "width", "height", "anchorSize", "anchor", "resizable", "resizeTypes"]);
    var position;
    type = type || Type.Fill;
    if (type === Type.Positioned) {
        position = {
            left: left,
            top: top,
            right: right,
            bottom: bottom,
            width: width,
            height: height,
            leftResizable: resizeTypes && resizeTypes.includes(ResizeType.Left),
            topResizable: resizeTypes && resizeTypes.includes(ResizeType.Top),
            rightResizable: resizeTypes && resizeTypes.includes(ResizeType.Right),
            bottomResizable: resizeTypes && resizeTypes.includes(ResizeType.Bottom),
        };
    }
    else {
        if (anchor === AnchorType.Left) {
            position = { left: 0, top: 0, bottom: 0, width: anchorSize, rightResizable: resizable };
            type = Type.Anchored;
        }
        else if (anchor === AnchorType.Right) {
            position = { right: 0, top: 0, bottom: 0, width: anchorSize, leftResizable: resizable };
            type = Type.Anchored;
        }
        else if (anchor === AnchorType.Top) {
            position = { left: 0, top: 0, right: 0, height: anchorSize, bottomResizable: resizable };
            type = Type.Anchored;
        }
        else if (anchor === AnchorType.Bottom) {
            position = { left: 0, bottom: 0, right: 0, height: anchorSize, topResizable: resizable };
            type = Type.Anchored;
        }
        else {
            position = {
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
            };
            type = Type.Fill;
        }
    }
    return (React.createElement(Space, __assign({}, props, { type: type, anchor: anchor, position: position }), children));
};
Custom.propTypes = customProps;

var Fill = function (props) { return (React.createElement(Space, __assign({}, props, { type: Type.Fill, position: { left: 0, top: 0, right: 0, bottom: 0 } }), props.children)); };
Fill.propTypes = commonProps;

var Fixed = function (_a) {
    var width = _a.width, height = _a.height, children = _a.children, commonProps = __rest(_a, ["width", "height", "children"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.Fixed, position: { width: width, height: height } }), children));
};
Fixed.propTypes = __assign(__assign({}, commonProps), {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

var Layer = function (props) { return React.createElement(LayerContext.Provider, { value: props.zIndex }, props.children); };
Layer.propTypes = {
    zIndex: PropTypes.number.isRequired,
};

var Positioned = function (_a) {
    var left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, width = _a.width, height = _a.height, resizable = _a.resizable, props = __rest(_a, ["left", "top", "right", "bottom", "width", "height", "resizable"]);
    var resizeTypes = resizable || [];
    return (React.createElement(Space, __assign({}, props, { type: Type.Positioned, position: {
            left: left,
            leftResizable: resizeTypes.includes(ResizeType.Left),
            top: top,
            topResizable: resizeTypes.includes(ResizeType.Top),
            right: right,
            rightResizable: resizeTypes.includes(ResizeType.Right),
            bottom: bottom,
            bottomResizable: resizeTypes.includes(ResizeType.Bottom),
            width: width,
            height: height,
        } }), props.children));
};
Positioned.propTypes = __assign(__assign({}, commonProps), {
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resizable: PropTypes.array,
});

/**
 * @deprecated use useCurrentSpace() hook instead
 */
var Info = function (props) {
    var domRect = React.useContext(DOMRectContext);
    if (domRect) {
        return props.children(domRect);
    }
    return props.children({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: function () { return ""; } });
};

var ViewPort = function (_a) {
    var left = _a.left, top = _a.top, right = _a.right, bottom = _a.bottom, children = _a.children, commonProps = __rest(_a, ["left", "top", "right", "bottom", "children"]);
    return (React.createElement(Space, __assign({}, commonProps, { type: Type.ViewPort, position: { left: left || 0, top: top || 0, right: right || 0, bottom: bottom || 0 } }), children));
};
ViewPort.propTypes = __assign(__assign({}, commonProps), {
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

var Options = function (_a) {
    var children = _a.children, opts = __rest(_a, ["children"]);
    return React.createElement(OptionsContext.Provider, { value: opts }, children);
};

export { AnchorType, Bottom, BottomResizable, CenterType, Centered, CenteredVertically, Custom, Fill, Fixed, Info, Layer, Left, LeftResizable, Options, Positioned, ResizeHandlePlacement, ResizeType, Right, RightResizable, Top, TopResizable, Type, ViewPort, anchoredProps, resizableProps, useCurrentSpace };
//# sourceMappingURL=index.js.map
