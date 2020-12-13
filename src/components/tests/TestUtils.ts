import { fireEvent } from "@testing-library/react";

type FakeMouseEventInit = {
	bubbles?: boolean;
	cancelable?: boolean;
	composed?: boolean;
	altKey?: boolean;
	button?: 0 | 1 | 2 | 3 | 4;
	buttons?: number;
	clientX?: number;
	clientY?: number;
	ctrlKey?: boolean;
	metaKey?: boolean;
	movementX?: number;
	movementY?: number;
	offsetX?: number;
	offsetY?: number;
	pageX?: number;
	pageY?: number;
	screenX?: number;
	screenY?: number;
	shiftKey?: boolean;
	x?: number;
	y?: number;
};

class FakeMouseEvent extends MouseEvent {
	offsetX: number;
	offsetY: number;
	pageX: number;
	pageY: number;
	x: number;
	y: number;

	constructor(type: string, values: FakeMouseEventInit) {
		const { pageX, pageY, offsetX, offsetY, x, y /*, ...mouseValues */ } = values;
		super(type, undefined);

		Object.assign(this, {
			offsetX: offsetX || 0,
			offsetY: offsetY || 0,
			pageX: pageX || 0,
			pageY: pageY || 0,
			x: x || 0,
			y: y || 0,
		});
	}
}

export function getMouseEvent(type: string, values: FakeMouseEventInit): FakeMouseEvent {
	values = {
		bubbles: true,
		cancelable: true,
		...values,
	};
	return new FakeMouseEvent(type, values);
}

const defaultDomRect = { x: 0, y: 0, width: 0, height: 0, bottom: 0, left: 0, right: 0, top: 0, toJSON: () => null };

export function drag(
	resizeElement: Element,
	spaceElement: Element,
	startRect: Partial<DOMRect>,
	endRect: Partial<DOMRect>,
	endX: number,
	endY: number,
) {
	spaceElement.getBoundingClientRect = jest.fn(() => ({
		...defaultDomRect,
		...startRect,
	}));
	fireEvent.mouseDown(resizeElement, { clientX: 0, clientY: 0 });
	spaceElement.getBoundingClientRect = jest.fn(() => ({
		...defaultDomRect,
		...endRect,
	}));
	fireEvent.mouseMove(resizeElement, { clientX: endX, clientY: endY });
	fireEvent.mouseUp(resizeElement, { clientX: endX, clientY: endY });
}
