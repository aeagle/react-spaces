import { SyntheticEvent } from "react";
import { ISpaceDefinition, ISpaceStore, EndEvent, MoveEvent, OnDragEnd } from "./core-types";
import { throttle } from "./core-utils";

export function createDrag(store: ISpaceStore) {
	function onMove(space: ISpaceDefinition, originalX: number, originalY: number, x: number, y: number) {
		const adjustmentX = -(originalX - x);
		const adjustmentY = -(originalY - y);

		space.left.adjusted = [adjustmentX];
		space.top.adjusted = [adjustmentY];

		if (space.right.size) {
			space.right.adjusted = [-adjustmentX];
		}

		if (space.bottom.size) {
			space.bottom.adjusted = [-adjustmentY];
		}

		store.updateStyles(space);
	}

	return {
		startDrag<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
			e: T,
			space: ISpaceDefinition,
			endEvent: EndEvent,
			moveEvent: MoveEvent,
			getCoords: (event: T) => { x: number; y: number },
			onDragEnd?: OnDragEnd,
		) {
			if (space.element) {
				const coords = getCoords(e);
				const adjustedLeft = space.left.adjusted.length === 0 ? 0 : (space.left.adjusted[0] as number);
				const adjustedTop = space.top.adjusted.length === 0 ? 0 : (space.top.adjusted[0] as number);
				const originalMouseX = coords.x - adjustedLeft;
				const originalMouseY = coords.y - adjustedTop;
				let lastX = 0;
				let lastY = 0;
				let moved = false;

				const mouseMove = (x: number, y: number) => onMove(space, originalMouseX, originalMouseY, x, y);
				const throttledMouseMove = throttle<typeof mouseMove>(mouseMove, 5);

				const withPreventDefault = (e: T) => {
					moved = true;
					const newCoords = getCoords(e);
					lastX = newCoords.x;
					lastY = newCoords.y;
					e.preventDefault();

					throttledMouseMove(lastX, lastY);
				};

				const removeListener = () => {
					if (moved) {
						mouseMove(lastX, lastY);
					}
					window.removeEventListener(moveEvent, withPreventDefault as EventListener);
					window.removeEventListener(endEvent, removeListener);

					if (onDragEnd) {
						const info = (({ left, top, right, bottom, width, height }) => ({ left, top, right, bottom, width, height }))(
							space.element.getBoundingClientRect(),
						);
						onDragEnd(info);
					}
				};
				window.addEventListener(moveEvent, withPreventDefault as EventListener);
				window.addEventListener(endEvent, removeListener);
			}
		},
	};
}
