import { ResizeType, AllProps, AnchorToResizeTypeMap, ISpace } from "./Types";
import { isHorizontalSpace } from "./Utils";
import { ISpaceContext, updateSpace } from "./ISpaceContext";
import { throttle } from "./Throttle";
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

export function startTouchResize(
	e: React.TouchEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
) {
	return startResize(e, parentContext, space, props, element, EndEvent.Touch, MoveEvent.Touch, (e) => ({
		x: e.touches[0].pageX,
		y: e.touches[0].pageY,
	}));
}

export function startMouseResize(
	e: React.MouseEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
) {
	return startResize(e, parentContext, space, props, element, EndEvent.Mouse, MoveEvent.Mouse, (e) => ({
		x: e.pageX,
		y: e.pageY,
	}));
}

function onResizeEnd(props: AllProps, resizeType: ResizeType, element: HTMLElement) {
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
) {
	const adjustmentX = Math.min(
		Math.max(resizeType === ResizeType.Left ? originalX - x : x - originalX, minimumAdjust),
		maximumAdjust === undefined ? 999999 : maximumAdjust,
	);
	const adjustmentY = Math.min(
		Math.max(resizeType === ResizeType.Top ? originalY - y : y - originalY, minimumAdjust),
		maximumAdjust === undefined ? 999999 : maximumAdjust,
	);

	const adjustment = isHorizontalSpace(props.anchor) ? adjustmentX : adjustmentY;

	if (adjustment !== space.adjustedSize) {
		updateSpace(parentContext, space.id, { adjustedSize: adjustment });
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
) {
	if (element && props.resizable && props.anchor && parentContext) {
		const resizeType: ResizeType | undefined = AnchorToResizeTypeMap[props.anchor];

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
			onResize(props, parentContext, space, resizeType, originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust);

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

			onResizeEnd(props, resizeType, element);
		};

		window.addEventListener(moveEvent, withPreventDefault as EventListener);
		window.addEventListener(endEvent, removeListener);
		e.preventDefault();
		e.stopPropagation();
	}
}
