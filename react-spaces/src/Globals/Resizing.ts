import { ResizeType, AllProps, AnchorToResizeTypeMap, ISpace } from "./Types";
import { isHorizontalSpace } from "./Utils";
import { ISpaceContext, updateSpace } from "./ISpaceContext";
import { throttle } from "./Throttle";

const RESIZE_THROTTLE = 5;

const onResizeEnd = (props: AllProps, resizeType: ResizeType, element: HTMLElement) => {
	const currentRect = element.getBoundingClientRect();
	props.onResizeEnd &&
		props.onResizeEnd(Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height));
};

const onResize = (
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
) => {
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
};

export const startTouchResize = (
	e: React.TouchEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
) => {
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

		const originalTouchX = resizeType === ResizeType.Left ? e.touches[0].pageX + space.adjustedSize : e.touches[0].pageX - space.adjustedSize;
		const originalTouchY = resizeType === ResizeType.Top ? e.touches[0].pageY + space.adjustedSize : e.touches[0].pageY - space.adjustedSize;
		const minimumAdjust = (props.minimumSize === undefined ? 20 : props.minimumSize) - size + space.adjustedSize;
		const maximumAdjust = props.maximumSize ? props.maximumSize - size + space.adjustedSize : undefined;
		let lastX = 0;
		let lastY = 0;
		let moved = false;

		const touchResize = (x: number, y: number) =>
			onResize(props, parentContext, space, resizeType, originalTouchX, originalTouchY, x, y, minimumAdjust, maximumAdjust);
		const throttledTouchResize = throttle<typeof touchResize>(touchResize, RESIZE_THROTTLE);
		const withPreventDefault = (e: TouchEvent) => {
			moved = true;
			lastX = e.touches[0].pageX;
			lastY = e.touches[0].pageY;
			e.preventDefault();
			e.stopImmediatePropagation();
			throttledTouchResize(lastX, lastY);
		};
		const removeListener = () => {
			if (moved) {
				touchResize(lastX, lastY);
			}
			window.removeEventListener("touchmove", withPreventDefault);
			window.removeEventListener("touchend", removeListener);

			if (parentContext) {
				parentContext.updateResizing(false);
			}

			onResizeEnd(props, resizeType, element);
		};
		window.addEventListener("touchmove", withPreventDefault);
		window.addEventListener("touchend", removeListener);
		e.preventDefault();
		e.stopPropagation();
	}
};

export const startResize = (
	e: React.MouseEvent<HTMLElement>,
	parentContext: ISpaceContext | undefined,
	space: ISpace,
	props: AllProps,
	element: HTMLElement | undefined,
) => {
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

		const originalMouseX = resizeType === ResizeType.Left ? e.pageX + space.adjustedSize : e.pageX - space.adjustedSize;
		const originalMouseY = resizeType === ResizeType.Top ? e.pageY + space.adjustedSize : e.pageY - space.adjustedSize;
		const minimumAdjust = (props.minimumSize === undefined ? 20 : props.minimumSize) - size + space.adjustedSize;
		const maximumAdjust = props.maximumSize ? props.maximumSize - size + space.adjustedSize : undefined;
		let lastX = 0;
		let lastY = 0;
		let moved = false;

		const mouseResize = (x: number, y: number) =>
			onResize(props, parentContext, space, resizeType, originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust);
		const throttledMouseResize = throttle<typeof mouseResize>(mouseResize, RESIZE_THROTTLE);
		const withPreventDefault = (e: MouseEvent) => {
			moved = true;
			lastX = e.pageX;
			lastY = e.pageY;
			e.preventDefault();
			e.stopImmediatePropagation();
			throttledMouseResize(lastX, lastY);
		};
		const removeListener = () => {
			if (moved) {
				mouseResize(lastX, lastY);
			}
			window.removeEventListener("mousemove", withPreventDefault);
			window.removeEventListener("mouseup", removeListener);

			if (parentContext) {
				parentContext.updateResizing(false);
			}

			onResizeEnd(props, resizeType, element);
		};
		window.addEventListener("mousemove", withPreventDefault);
		window.addEventListener("mouseup", removeListener);
		e.preventDefault();
		e.stopPropagation();
	}
};
