import { SyntheticEvent } from "react";
import { ISpaceDefinition, ResizeType, ISpaceStore, OnResizeEnd, EndEvent, MoveEvent, Type, ISize } from "./core-types";
import { coalesce, throttle } from "./core-utils";

const RESIZE_THROTTLE = 0;

export interface IResizeChange {
	x: number;
	y: number;
}

function isHorizontal(resizeType: ResizeType) {
	return resizeType === ResizeType.Left || resizeType === ResizeType.Right;
}

type ResizeAdjuster = (currentX: number, currentY: number) => void;

function createSideAdjuster(
	rect: DOMRect,
	resizeType: ResizeType,
	dimensionToAdjust: ISize,
	space: ISpaceDefinition,
	originalX: number,
	originalY: number,
): ResizeAdjuster {
	const negater = resizeType === ResizeType.Right || resizeType === ResizeType.Bottom ? (val: number) => -val : (val: number) => val;

	const candidateOppositeDimensionToAdjust = isHorizontal(resizeType) ? space.width : space.height;

	const offset1 = dimensionToAdjust.resized;
	const offset2 = candidateOppositeDimensionToAdjust.resized;

	const size = isHorizontal(resizeType) ? rect.width : rect.height;
	const minimumAdjust = coalesce(space.minimumSize, 20)! - size + 0;
	const maximumAdjust = space.maximumSize ? space.maximumSize - size + 0 : undefined;

	return (currentX: number, currentY: number) => {
		let adjustment = (isHorizontal(resizeType) ? originalX : originalY) - (isHorizontal(resizeType) ? currentX : currentY);
		let dimensionResized = negater(adjustment);

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
		} else {
			candidateOppositeDimensionToAdjust.resized = dimensionResized + offset2;
		}
	};
}

function createAdjuster(resizeType: ResizeType, space: ISpaceDefinition, originalX: number, originalY: number): ResizeAdjuster {
	const rect = space.element.getBoundingClientRect();
	switch (resizeType) {
		case ResizeType.Left:
			return createSideAdjuster(rect, resizeType, space.left, space, originalX, originalY);
		case ResizeType.Right:
			return createSideAdjuster(rect, resizeType, space.right, space, originalX, originalY);
		case ResizeType.Bottom:
			return createSideAdjuster(rect, resizeType, space.bottom, space, originalX, originalY);
		case ResizeType.Top:
			return createSideAdjuster(rect, resizeType, space.top, space, originalX, originalY);
		case ResizeType.TopLeft:
			const topAdjuster = createSideAdjuster(rect, ResizeType.Top, space.top, space, originalX, originalY);
			const leftAdjuster = createSideAdjuster(rect, ResizeType.Left, space.left, space, originalX, originalY);
			return (x, y) => {
				topAdjuster(x, y);
				leftAdjuster(x, y);
			};
		case ResizeType.TopRight:
			const top1Adjuster = createSideAdjuster(rect, ResizeType.Top, space.top, space, originalX, originalY);
			const rightAdjuster = createSideAdjuster(rect, ResizeType.Right, space.right, space, originalX, originalY);
			return (x, y) => {
				top1Adjuster(x, y);
				rightAdjuster(x, y);
			};
		case ResizeType.BottomLeft:
			const bottomAdjuster = createSideAdjuster(rect, ResizeType.Bottom, space.bottom, space, originalX, originalY);
			const left1Adjuster = createSideAdjuster(rect, ResizeType.Left, space.left, space, originalX, originalY);
			return (x, y) => {
				bottomAdjuster(x, y);
				left1Adjuster(x, y);
			};
		case ResizeType.BottomRight:
			const bottom1Adjuster = createSideAdjuster(rect, ResizeType.Bottom, space.bottom, space, originalX, originalY);
			const right1Adjuster = createSideAdjuster(rect, ResizeType.Right, space.right, space, originalX, originalY);
			return (x, y) => {
				bottom1Adjuster(x, y);
				right1Adjuster(x, y);
			};
		default:
			throw `Resize type ${resizeType} not supported`;
	}
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

				if (RESIZE_THROTTLE > 0) {
					throttle(
						(x, y) =>
							window.requestAnimationFrame(() => {
								if (space.resizing) {
									resize(x, y);
								}
							}),
						RESIZE_THROTTLE,
					)(lastX, lastY);
				} else {
					window.requestAnimationFrame(() => {
						if (space.resizing) {
							resize(lastX, lastY);
						}
					});
				}
			};

			const removeListener = () => {
				space.resizing = false;

				if (moved) {
					resize(lastX, lastY);
				}

				window.removeEventListener(moveEvent, withPreventDefault as EventListener);
				window.removeEventListener(endEvent, removeListener);
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
