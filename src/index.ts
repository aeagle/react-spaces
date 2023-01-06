export * from "./components";

import type {
	ISpaceContext,
	IPosition,
	OnResizeStart,
	OnResizeEnd,
	OnDragEnd,
	ResizeMouseEvent,
	ResizeTouchEvent
} from "./core-types";

export { ResizeHandlePlacement, ResizeType, AnchorType, CenterType, Type } from "./core-types";

export type {
	ISpaceContext,
	IPosition,
	OnResizeStart,
	OnResizeEnd,
	OnDragEnd,
	ResizeMouseEvent,
	ResizeTouchEvent
}

export { useCurrentSpace, enabledSsrSupport } from "./core-react";