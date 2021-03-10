export * from "./components";

import type {
	ISpaceContext,
	IPosition,
	OnResizeStart,
	OnResizeEnd,
	OnDragEnd,
	ResizeMouseEvent
} from "./core-types";

export { ResizeHandlePlacement, ResizeType, AnchorType, CenterType } from "./core-types";

export type {
	ISpaceContext,
	IPosition,
	OnResizeStart,
	OnResizeEnd,
	OnDragEnd,
	ResizeMouseEvent
}

export { useCurrentSpace } from "./core-react";
