declare type FakeMouseEventInit = {
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
declare class FakeMouseEvent extends MouseEvent {
    offsetX: number;
    offsetY: number;
    pageX: number;
    pageY: number;
    x: number;
    y: number;
    constructor(type: string, values: FakeMouseEventInit);
}
export declare function getMouseEvent(type: string, values: FakeMouseEventInit): FakeMouseEvent;
export declare function drag(resizeElement: Element, spaceElement: Element, startRect: Partial<DOMRect>, endRect: Partial<DOMRect>, endX: number, endY: number): void;
export {};
