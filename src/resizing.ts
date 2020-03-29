import { ResizeType, AllProps, AnchorToResizeTypeMap, ISpace, IPosition } from "./types";
import { isHorizontalSpace } from "./utils";
import { ISpaceContext, updateSpace } from "./ISpaceContext";
import { throttle } from "./throttle";
import { SyntheticEvent } from "react";

const RESIZE_THROTTLE = 5;

enum MoveEvent {
	Mouse = "mousemove",
	Touch = "touchmove",
}

enum EndEvent {
	Mouse = "mouseup",
	Touch = "touchend",
}

interface IResizeChange {
	x: number;
	y: number;
}

export function startTouchResize(
	e: React.TouchEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
	resizeType?: ResizeType,
	customResizeHandler?: (resizeDelta: IResizeChange) => void,
	onResizeEnd?: (size: number, position: IPosition) => void,
) {
	return startResize(
		e,
		parentContext,
		space,
		props,
		element,
		EndEvent.Touch,
		MoveEvent.Touch,
		(e) => ({
			x: e.touches[0].pageX,
			y: e.touches[0].pageY,
		}),
		resizeType,
		customResizeHandler,
		onResizeEnd,
	);
}

export function startMouseResize(
	e: React.MouseEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
	resizeType?: ResizeType,
	customResizeHandler?: (resizeDelta: IResizeChange) => void,
	onResizeEnd?: (size: number, position: IPosition) => void,
) {
	return startResize(
		e,
		parentContext,
		space,
		props,
		element,
		EndEvent.Mouse,
		MoveEvent.Mouse,
		(e) => ({
			x: e.pageX,
			y: e.pageY,
		}),
		resizeType,
		customResizeHandler,
		onResizeEnd,
	);
}

function resizeEnd(props: AllProps, resizeType: ResizeType, element: HTMLElement, onResizeEnd?: (size: number, position: IPosition) => void) {
	const currentRect = element.getBoundingClientRect();
	props.onResizeEnd &&
		props.onResizeEnd(Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height));
}

function onResize(
	props: AllProps,
	parentContext: ISpaceContext,
	space: ISpace,
	resizeType: ResizeType,
	originalX: number,
	originalY: number,
	x: number,
	y: number,
	minimumAdjust: number,
	maximumAdjust: number | undefined,
	customResizeHandler?: (resizeDelta: IResizeChange) => void,
) {
	const adjustmentX = Math.min(
		Math.max(resizeType === ResizeType.Left ? originalX - x : x - originalX, minimumAdjust),
		maximumAdjust === undefined ? 999999 : maximumAdjust,
	);
	const adjustmentY = Math.min(
		Math.max(resizeType === ResizeType.Top ? originalY - y : y - originalY, minimumAdjust),
		maximumAdjust === undefined ? 999999 : maximumAdjust,
	);

	if (customResizeHandler) {
		customResizeHandler({ x: adjustmentX, y: adjustmentY });
	} else {
		const adjustment = isHorizontalSpace(props.anchor) ? adjustmentX : adjustmentY;

		if (adjustment !== space.adjustedSize) {
			updateSpace(parentContext, space.id, { adjustedSize: adjustment });
		}
	}
}

function startResize<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
	e: T,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
	endEvent: EndEvent,
	moveEvent: MoveEvent,
	getCoords: (event: T) => { x: number; y: number },
	resizeType?: ResizeType,
	customResizeHandler?: (resizeDelta: IResizeChange) => void,
	onResizeEnd?: (size: number, position: IPosition) => void,
) {
	const type = resizeType || (props.anchor ? AnchorToResizeTypeMap[props.anchor] : undefined);
	if (element && parentContext && (props.resizable || props.isPositioned) && type) {
		if (props.onResizeStart) {
			const result = props.onResizeStart();
			if (typeof result === "boolean" && !result) {
				return;
			}
		}

		if (parentContext) {
			parentContext.updateResizing(true);
		}

		var rect = element.getBoundingClientRect();
		var size = isHorizontalSpace(props.anchor) ? rect.width : rect.height;
		const coords = getCoords(e);
		const originalMouseX = resizeType === ResizeType.Left ? coords.x + space.adjustedSize : coords.x - space.adjustedSize;
		const originalMouseY = resizeType === ResizeType.Top ? coords.y + space.adjustedSize : coords.y - space.adjustedSize;
		const minimumAdjust = (props.minimumSize === undefined ? 20 : props.minimumSize) - size + space.adjustedSize;
		const maximumAdjust = props.maximumSize ? props.maximumSize - size + space.adjustedSize : undefined;
		let lastX = 0;
		let lastY = 0;
		let moved = false;

		const resize = (x: number, y: number) =>
			onResize(props, parentContext, space, type, originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust, customResizeHandler);

		const withPreventDefault = (e: T) => {
			moved = true;
			const newCoords = getCoords(e);
			lastX = newCoords.x;
			lastY = newCoords.y;
			e.preventDefault();

			throttle(resize, RESIZE_THROTTLE)(lastX, lastY);
		};

		const removeListener = () => {
			if (moved) {
				resize(lastX, lastY);
			}
			window.removeEventListener(moveEvent, withPreventDefault as EventListener);
			window.removeEventListener(endEvent, removeListener);

			if (parentContext) {
				parentContext.updateResizing(false);
			}

			resizeEnd(props, type, element, onResizeEnd);
		};

		window.addEventListener(moveEvent, withPreventDefault as EventListener);
		window.addEventListener(endEvent, removeListener);
		e.preventDefault();
		//e.stopPropagation();
	}
}
