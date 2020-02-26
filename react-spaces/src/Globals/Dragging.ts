import { ISpace } from './Types';
import { ISpaceContext, updateSpace } from './ISpaceContext';
import { throttle } from './Throttle';

const onMove = (
	parentContext: ISpaceContext | undefined, 
	space: ISpace,
	originalX: number, 
	originalY: number, 
	x: number, 
	y: number) => {

	if (parentContext) {
		const adjustmentX = -(originalX - x);
		const adjustmentY = -(originalY - y);

		if (adjustmentX !== space.adjustedLeft || adjustmentY !== space.adjustedTop) {
			updateSpace(parentContext, space.id, { adjustedLeft: adjustmentX, adjustedTop: adjustmentY });
		}
	}
};

export const startDrag = (
	e: any, 
	parentContext: ISpaceContext | undefined, 
	space: ISpace, 
	element: HTMLElement | undefined) => {

	if (parentContext && element) {
		// if (props.onResizeStart) {
		// 	const result = props.onResizeStart();
		// 	if (typeof result === "boolean" && !result) {
		// 		return;
		// 	}
		// }

		//parentContext.updateResizing(true);

		const originalMouseX = e.pageX - space.adjustedLeft;
		const originalMouseY = e.pageY - space.adjustedTop;
		let lastX = 0;
		let lastY = 0;
		let moved = false;

		const mouseMove = (x: number, y: number) => onMove(parentContext, space, originalMouseX, originalMouseY, x, y);
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
			window.removeEventListener('mousemove', withPreventDefault);
			window.removeEventListener('mouseup', removeListener);

			//parentContext.updateResizing(false);
			//onResizeEnd();
		};
		window.addEventListener('mousemove', withPreventDefault);
		window.addEventListener('mouseup', removeListener);
		e.preventDefault();
		e.stopPropagation();	
	}	
};