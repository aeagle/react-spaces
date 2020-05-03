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
		startSize: number,
		originalX: number,
		originalY: number,
		x: number,
		y: number,
		minimumAdjust: number,
		maximumAdjust: number | undefined,
	) {
		let adjustment =
			startSize +
			(space.orientation === Orientation.Horizontal
				? resizeType === ResizeType.Left
					? originalX - x
					: x - originalX
				: resizeType === ResizeType.Top
				? originalY - y
				: y - originalY);

		if (adjustment < minimumAdjust) {
			adjustment = minimumAdjust;
		} else {
			if (maximumAdjust) {
				if (adjustment > maximumAdjust) {
					adjustment = maximumAdjust;
				}
			}
		}

		if (adjustment !== targetSize.resized) {
			targetSize.resized = adjustment;
			store.updateStyles(space);
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

			const rect = space.element.getBoundingClientRect();
			const size = space.orientation === Orientation.Horizontal ? rect.width : rect.height;
			const originalCoords = getCoords(e);
			const startSize = targetSize.resized;
			const minimumAdjust = coalesce(space.minimumSize, 20)! - size + targetSize.resized;
			const maximumAdjust = space.maximumSize ? space.maximumSize - size + targetSize.resized : undefined;

			let lastX = 0;
			let lastY = 0;
			let moved = false;

			const resize = (x: number, y: number) =>
				onResize(space, targetSize, resizeType, startSize, originalCoords.x, originalCoords.y, x, y, minimumAdjust, maximumAdjust);

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
