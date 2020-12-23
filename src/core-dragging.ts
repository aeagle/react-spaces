import { ISpaceDefinition, ISpaceStore, IPosition } from "./core-types";
import { throttle } from "./core-utils";

export function createDrag(store: ISpaceStore) {
	function onMove(space: ISpaceDefinition, originalX: number, originalY: number, x: number, y: number) {
		const adjustmentX = -(originalX - x);
		const adjustmentY = -(originalY - y);

		space.left.adjusted = [adjustmentX];
		space.top.adjusted = [adjustmentY];
		store.updateStyles(space);
	}

	return {
		startMouseDrag(e: React.MouseEvent<HTMLElement, MouseEvent>, space: ISpaceDefinition, onDragEnd?: (position: IPosition) => void) {
			if (space.element) {
				const adjustedLeft = space.left.adjusted.length === 0 ? 0 : (space.left.adjusted[0] as number);
				const adjustedTop = space.top.adjusted.length === 0 ? 0 : (space.top.adjusted[0] as number);
				const originalMouseX = e.pageX - adjustedLeft;
				const originalMouseY = e.pageY - adjustedTop;
				let lastX = 0;
				let lastY = 0;
				let moved = false;

				const mouseMove = (x: number, y: number) => onMove(space, originalMouseX, originalMouseY, x, y);
				const throttledMouseMove = throttle<typeof mouseMove>(mouseMove, 5);
				const withPreventDefault = (e: MouseEvent) => {
					moved = true;
					lastX = e.pageX;
					lastY = e.pageY;
					e.preventDefault();
					e.stopImmediatePropagation();
					throttledMouseMove(lastX, lastY);
				};
				const removeListener = () => {
					if (moved) {
						mouseMove(lastX, lastY);
					}
					window.removeEventListener("mousemove", withPreventDefault);
					window.removeEventListener("mouseup", removeListener);

					if (onDragEnd) {
						const info = (({ left, top, right, bottom, width, height }) => ({ left, top, right, bottom, width, height }))(
							space.element.getBoundingClientRect(),
						);
						onDragEnd(info);
					}
				};
				window.addEventListener("mousemove", withPreventDefault);
				window.addEventListener("mouseup", removeListener);
				e.preventDefault();
				e.stopPropagation();
			}
		},
	};
}
