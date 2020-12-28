import { SyntheticEvent } from "react";
import { ISpaceDefinition, ISize, ResizeType, ISpaceStore, OnResizeEnd, Type } from "./core-types";
import { throttle, coalesce } from "./core-utils";

const RESIZE_THROTTLE = 0;

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

function customSizeHoriz(space: ISpaceDefinition, adjust: number) {
	if (space.width.size) {
		space.width.resized = -adjust;
	}
	return true;
}

function customSizeVert(space: ISpaceDefinition, adjust: number) {
	if (space.height.size) {
		space.height.resized = -adjust;
	}
	return true;
}

function getCustomSizing(resizeType: ResizeType, space: ISpaceDefinition) {
	if (resizeType === ResizeType.Left) {
		return space.type === Type.Positioned ? (a: number) => customSizeHoriz(space, a) : undefined;
	} else if (resizeType === ResizeType.Right) {
		return space.type === Type.Positioned ? (space.width.size ? undefined : (a: number) => customSizeHoriz(space, a)) : undefined;
	} else if (resizeType === ResizeType.Top) {
		return space.type === Type.Positioned ? (a: number) => customSizeVert(space, a) : undefined;
	} else if (resizeType === ResizeType.Bottom) {
		return space.type === Type.Positioned ? (space.height.size ? undefined : (a: number) => customSizeVert(space, a)) : undefined;
	}
	throw new Error("unknown resize type");
}

function getTargetSize(resizeType: ResizeType, space: ISpaceDefinition) {
	if (resizeType === ResizeType.Left) {
		return space.type === Type.Positioned ? space.left : space.width;
	} else if (resizeType === ResizeType.Right) {
		return space.type === Type.Positioned ? (space.width.size ? space.width : space.right) : space.width;
	} else if (resizeType === ResizeType.Top) {
		return space.type === Type.Positioned ? space.top : space.height;
	} else if (resizeType === ResizeType.Bottom) {
		return space.type === Type.Positioned ? (space.height.size ? space.height : space.bottom) : space.height;
	}
	throw new Error("unknown resize type");
}

function getResizeType(resizeType: ResizeType, space: ISpaceDefinition) {
	if (resizeType === ResizeType.Left) {
		return ResizeType.Left;
	} else if (resizeType === ResizeType.Right) {
		return space.type === Type.Positioned ? (space.width.size ? ResizeType.Left : ResizeType.Right) : ResizeType.Right;
	} else if (resizeType === ResizeType.Top) {
		return ResizeType.Top;
	} else if (resizeType === ResizeType.Bottom) {
		return space.type === Type.Positioned ? (space.height.size ? ResizeType.Top : ResizeType.Bottom) : ResizeType.Bottom;
	}
	throw new Error("unknown resize type");
}

function getCustomOriginal(resizeType: ResizeType, space: ISpaceDefinition) {
	if (resizeType === ResizeType.Left) {
		return space.width.size ? -space.width.resized : 0;
	} else if (resizeType === ResizeType.Right) {
		return 0;
	} else if (resizeType === ResizeType.Top) {
		return space.height.size ? -space.height.resized : 0;
	} else if (resizeType === ResizeType.Bottom) {
		return 0;
	}
	throw new Error("unknown resize type");
}

export function createResize(store: ISpaceStore) {
	function onResize(
		space: ISpaceDefinition,
		targetSize: ISize,
		resizeType: ResizeType,
		startSize: number,
		originalX: number,
		originalY: number,
		customOriginal: number,
		x: number,
		y: number,
		minimumAdjust: number,
		maximumAdjust: number | undefined,
		customAdjust?: (adjustment: number) => boolean,
	) {
		let adjustment =
			startSize +
			(resizeType === ResizeType.Left || resizeType === ResizeType.Right
				? resizeType === ResizeType.Left
					? x - originalX
					: originalX - x
				: resizeType === ResizeType.Top
				? y - originalY
				: originalY - y);

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

			if (customAdjust) {
				customAdjust(adjustment + customOriginal);
			}

			store.updateStyles(space);
		}
	}

	return {
		startResize<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
			e: T,
			resizeHandleType: ResizeType,
			space: ISpaceDefinition,
			endEvent: EndEvent,
			moveEvent: MoveEvent,
			getCoords: (event: T) => { x: number; y: number },
			onResizeEnd?: OnResizeEnd,
		) {
			if (space.onResizeStart) {
				const result = space.onResizeStart();
				if (typeof result === "boolean" && !result) {
					return;
				}
			}

			const originalCoords = getCoords(e);
			const resizeType = getResizeType(resizeHandleType, space);
			const customAdjust = getCustomSizing(resizeHandleType, space);
			const targetSize = getTargetSize(resizeHandleType, space);
			const customOriginal = getCustomOriginal(resizeHandleType, space);

			space.resizing = true;
			space.updateParent();

			const rect = space.element.getBoundingClientRect();
			const size = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? rect.width : rect.height;
			const startSize = targetSize.resized;
			const minimumAdjust = coalesce(space.minimumSize, 20)! - size + targetSize.resized;
			const maximumAdjust = space.maximumSize ? space.maximumSize - size + targetSize.resized : undefined;

			let lastX = 0;
			let lastY = 0;
			let moved = false;

			const resize = (x: number, y: number) =>
				onResize(
					space,
					targetSize,
					resizeType,
					startSize,
					originalCoords.x,
					originalCoords.y,
					customOriginal,
					x,
					y,
					minimumAdjust,
					maximumAdjust,
					customAdjust,
				);

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
				} else {
					// if (elementsUnderneathPointer && elementsUnderneathPointer.length > 1) {
					// 	const target = elementsUnderneathPointer[1] as any;
					// 	target.submitMessage(e);
					// }
				}
				window.removeEventListener(moveEvent, withPreventDefault as EventListener);
				window.removeEventListener(endEvent, removeListener);

				space.resizing = false;
				space.updateParent();

				const resizeEnd = onResizeEnd || space.onResizeEnd;
				if (resizeEnd) {
					const currentRect = space.element.getBoundingClientRect();
					resizeEnd(
						Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height),
						currentRect as DOMRect,
					);
				}
			};

			window.addEventListener(moveEvent, withPreventDefault as EventListener);
			window.addEventListener(endEvent, removeListener);
			//e.preventDefault();
		},
	};
}
