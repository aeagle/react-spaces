import { SyntheticEvent } from "react";
import { ISpaceDefinition, ISize, ResizeType, Orientation, ISpaceStore } from "./core-types";
import { throttle, coalesce } from "./core-utils";

const RESIZE_THROTTLE = 5;

export enum MoveEvent {
	Mouse = "mousemove",
	Touch = "touchmove",
}

export enum EndEvent {
	Mouse = "mouseup",
	Touch = "touchend",
}

export interface IResizeChange {
	x: number;
	y: number;
}

export function createResize(store: ISpaceStore) {
	function onResize(
		space: ISpaceDefinition,
		targetSize: ISize,
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
			const adjustment = space.orientation === Orientation.Horizontal ? adjustmentX : adjustmentY;

			if (adjustment !== targetSize.resized) {
				targetSize.resized = adjustment;
				store.updateStyles(space);
			}
		}
	}

	return {
		startResize<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
			resizeType: ResizeType,
			e: T,
			space: ISpaceDefinition,
			targetSize: ISize,
			endEvent: EndEvent,
			moveEvent: MoveEvent,
			getCoords: (event: T) => { x: number; y: number },
		) {
			if (space.onResizeStart) {
				const result = space.onResizeStart();
				if (typeof result === "boolean" && !result) {
					return;
				}
			}

			space.resizing = true;
			space.updateParent();

			var rect = space.element.getBoundingClientRect();
			var size = space.orientation === Orientation.Horizontal ? rect.width : rect.height;
			const coords = getCoords(e);
			const originalMouseX = resizeType === ResizeType.Left ? coords.x + targetSize.resized : coords.x - targetSize.resized;
			const originalMouseY = resizeType === ResizeType.Top ? coords.y + targetSize.resized : coords.y - targetSize.resized;
			const minimumAdjust = coalesce(space.minimumSize, 20)! - size + targetSize.resized;
			const maximumAdjust = space.maximumSize ? space.maximumSize - size + targetSize.resized : undefined;

			let lastX = 0;
			let lastY = 0;
			let moved = false;

			const resize = (x: number, y: number) =>
				onResize(space, targetSize, resizeType, originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust);

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

				space.resizing = false;
				space.updateParent();

				if (space.onResizeEnd) {
					const currentRect = space.element.getBoundingClientRect();
					space.onResizeEnd(
						Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height),
						currentRect as DOMRect,
					);
				}
			};

			window.addEventListener(moveEvent, withPreventDefault as EventListener);
			window.addEventListener(endEvent, removeListener);
			e.preventDefault();
		},
	};
}
