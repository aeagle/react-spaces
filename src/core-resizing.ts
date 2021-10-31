import { SyntheticEvent } from "react";
import { ISpaceDefinition, ResizeType, ISpaceStore, OnResizeEnd, EndEvent, MoveEvent } from "./core-types";
import { throttle } from "./core-utils";

const RESIZE_THROTTLE = 0;

export interface IResizeChange {
	x: number;
	y: number;
}

function isHorizontal(resizeType: ResizeType) {
	return resizeType === ResizeType.Left || resizeType === ResizeType.Right;
}

type ResizeAdjuster = (currentX: number, currentY: number) => void;

function createAdjuster(resizeType: ResizeType, space: ISpaceDefinition, originalX: number, originalY: number): ResizeAdjuster {
	const dimensionToAdjust = (() => {
		if (resizeType === ResizeType.Left) {
			return space.left;
		} else if (resizeType === ResizeType.Right) {
			return space.right;
		} else if (resizeType === ResizeType.Bottom) {
			return space.bottom;
		} else if (resizeType === ResizeType.Top) {
			return space.top;
		} else {
			throw new Error("unknown resize type");
		}
	})();

	const negater = resizeType === ResizeType.Right || resizeType === ResizeType.Bottom ? (val: number) => -val : (val: number) => val;

	const candidateOppositeDimensionToAdjust = isHorizontal(resizeType) ? space.width : space.height;

	const offset1 = dimensionToAdjust.resized;
	const offset2 = candidateOppositeDimensionToAdjust.resized;

	// const rect = space.element.getBoundingClientRect();
	// const size = isHorizontal(resizeType) ? rect.width : rect.height;
	// const minimumAdjust = coalesce(space.minimumSize, 20)! - size + 0;
	// const maximumAdjust = space.maximumSize ? space.maximumSize - size + 0 : undefined;

	return (currentX: number, currentY: number) => {
		const adjustment = (isHorizontal(resizeType) ? originalX : originalY) - (isHorizontal(resizeType) ? currentX : currentY);

		// if (adjustment < minimumAdjust) {
		// 	adjustment = minimumAdjust;
		// } else {
		// 	if (typeof maximumAdjust === "number") {
		// 		if (adjustment > maximumAdjust) {
		// 			adjustment = maximumAdjust;
		// 		}
		// 	}
		// }

		if (dimensionToAdjust.size !== undefined) {
			dimensionToAdjust.resized = negater(-adjustment) + offset1;
			if (candidateOppositeDimensionToAdjust.size) {
				candidateOppositeDimensionToAdjust.resized = negater(adjustment) + offset2;
			}
		} else {
			candidateOppositeDimensionToAdjust.resized = negater(adjustment) + offset2;
		}
	};
}

export function createResize(store: ISpaceStore) {
	return {
		startResize<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
			e: T,
			resizeType: ResizeType,
			space: ISpaceDefinition,
			endEvent: EndEvent,
			moveEvent: MoveEvent,
			getCoords: (event: T) => { x: number; y: number },
			onResizeEnd?: OnResizeEnd,
		) {
			if (space.onResizeStart) {
				const result = space.onResizeStart(resizeType);
				if (typeof result === "boolean" && !result) {
					return;
				}
			}

			const originalCoords = getCoords(e);
			const adjuster = createAdjuster(resizeType, space, originalCoords.x, originalCoords.y);

			space.resizing = true;
			space.updateParent();

			let lastX = 0;
			let lastY = 0;
			let moved = false;

			const resize = (currentX: number, currentY: number) => {
				adjuster(currentX, currentY);
				store.updateStyles(space);
			};

			const withPreventDefault = (e: T) => {
				moved = true;
				const newCoords = getCoords(e);
				lastX = newCoords.x;
				lastY = newCoords.y;
				e.preventDefault();

				throttle((x, y) => window.requestAnimationFrame(() => resize(x, y)), RESIZE_THROTTLE)(lastX, lastY);
			};

			const removeListener = () => {
				if (moved) {
					resize(lastX, lastY);
				}
				window.removeEventListener(moveEvent, withPreventDefault as EventListener);
				window.removeEventListener(endEvent, removeListener);

				space.resizing = false;
				space.updateParent();

				const resizeEnd = onResizeEnd || space.onResizeEnd;
				if (resizeEnd) {
					const currentRect = space.element.getBoundingClientRect();
					resizeEnd(Math.floor(isHorizontal(resizeType) ? currentRect.width : currentRect.height), currentRect as DOMRect, resizeType);
				}
			};

			window.addEventListener(moveEvent, withPreventDefault as EventListener);
			window.addEventListener(endEvent, removeListener);
		},
	};
}
