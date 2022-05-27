/// <reference types="react" />
export declare type ResizeMouseEvent = React.MouseEvent<HTMLElement, MouseEvent>;
export declare type ResizeTouchEvent = React.TouchEvent<HTMLElement>;
export declare type OnResizeStart = ((resizeType?: ResizeType) => void | boolean) | undefined;
export declare type OnResizeEnd = ((newSize: SizeUnit, domRect: DOMRect, resizeType?: ResizeType) => void) | undefined;
export declare type OnDragEnd = (position: IPosition, moved: boolean) => void;
export declare enum Type {
    ViewPort = "viewport",
    Fixed = "fixed",
    Fill = "fill",
    Positioned = "positioned",
    Anchored = "anchored",
    Custom = "custom"
}
export declare enum AnchorType {
    Left = "anchor-left",
    Right = "anchor-right",
    Top = "anchor-top",
    Bottom = "anchor-bottom"
}
export declare enum Orientation {
    Horizontal = 0,
    Vertical = 1
}
export declare type SizeUnit = number | string | undefined;
export declare enum ResizeType {
    Left = "resize-left",
    Right = "resize-right",
    Top = "resize-top",
    Bottom = "resize-bottom",
    TopLeft = "resize-topleft",
    TopRight = "resize-topright",
    BottomLeft = "resize-bottomleft",
    BottomRight = "resize-bottomright"
}
export declare enum ResizeHandlePlacement {
    OverlayInside = "overlay-inside",
    Inside = "inside",
    OverlayBoundary = "overlay-boundary"
}
export declare enum CenterType {
    None = "none",
    Vertical = "vertical",
    HorizontalVertical = "horizontalVertical"
}
export declare enum MoveEvent {
    Mouse = "mousemove",
    Touch = "touchmove"
}
export declare enum EndEvent {
    Mouse = "mouseup",
    Touch = "touchend"
}
export interface ICommonProps {
    id?: string;
    className?: string;
    centerContent?: CenterType;
    zIndex?: number;
    scrollable?: boolean;
    trackSize?: boolean;
    allowOverflow?: boolean;
}
export interface ISpaceProps extends ICommonProps {
    type: Type;
    anchor?: AnchorType | undefined;
    order?: number | undefined;
    position?: IPositionalProps | undefined;
    handleSize?: number | undefined;
    handlePlacement?: ResizeHandlePlacement;
    touchHandleSize?: number | undefined;
    minimumSize?: number | undefined;
    maximumSize?: number | undefined;
    onResizeStart?: OnResizeStart;
    onResizeEnd?: OnResizeEnd;
}
export interface ISpaceStore {
    getSpaces: () => ISpaceDefinition[];
    getSpace: (id: string) => ISpaceDefinition | undefined;
    addSpace: (space: ISpaceDefinition) => void;
    updateSpace: (space: ISpaceDefinition, props: ISpaceProps) => void;
    updateStyles: (space: ISpaceDefinition) => void;
    removeSpace: (space: ISpaceDefinition) => void;
    createSpace: (parent: string | undefined, props: ISpaceProps, update: () => void) => ISpaceDefinition;
    startMouseResize: (resizeType: ResizeType, space: ISpaceDefinition, event: React.MouseEvent<HTMLElement>, onResizeEnd?: OnResizeEnd) => void;
    startTouchResize: (resizeType: ResizeType, space: ISpaceDefinition, event: React.TouchEvent<HTMLElement>, onResizeEnd?: OnResizeEnd) => void;
    startMouseDrag: (space: ISpaceDefinition, event: ResizeMouseEvent, onDragEnd?: OnDragEnd) => void;
    startTouchDrag: (space: ISpaceDefinition, event: ResizeTouchEvent, onDragEnd?: OnDragEnd) => void;
}
export interface IPosition {
    left?: SizeUnit | undefined;
    top?: SizeUnit | undefined;
    right?: SizeUnit | undefined;
    bottom?: SizeUnit | undefined;
    width?: SizeUnit | undefined;
    height?: SizeUnit | undefined;
}
export interface IPositionalProps extends IPosition {
    leftResizable?: boolean;
    topResizable?: boolean;
    rightResizable?: boolean;
    bottomResizable?: boolean;
}
export interface ISize {
    size: SizeUnit;
    adjusted: SizeUnit[];
    resized: number;
}
export interface ISpaceDefinition {
    update: () => void;
    updateParent: () => void;
    adjustLeft: (adjusted: SizeUnit[]) => boolean;
    adjustRight: (adjusted: SizeUnit[]) => boolean;
    adjustTop: (adjusted: SizeUnit[]) => boolean;
    adjustBottom: (adjusted: SizeUnit[]) => boolean;
    adjustEdge: (adjusted: SizeUnit[]) => boolean;
    anchoredChildren: (children: ISpaceDefinition[], anchor: AnchorType, zIndex: number) => ISpaceDefinition[];
    onResizeStart?: OnResizeStart;
    onResizeEnd?: OnResizeEnd;
    element: HTMLElement;
    id: string;
    type: Type;
    anchor?: AnchorType;
    orientation: Orientation;
    scrollable: boolean;
    order?: number;
    position: "fixed" | "absolute" | "relative";
    children: ISpaceDefinition[];
    parentId: string | undefined;
    store: ISpaceStore;
    left: ISize;
    top: ISize;
    right: ISize;
    bottom: ISize;
    width: ISize;
    height: ISize;
    zIndex: number;
    dimension: DOMRect;
    centerContent: "none" | "vertical" | "horizontalVertical";
    resizing: boolean;
    minimumSize?: number;
    maximumSize?: number;
    handleSize: number;
    touchHandleSize: number;
    handlePlacement: ResizeHandlePlacement;
    canResizeTop: boolean;
    canResizeLeft: boolean;
    canResizeRight: boolean;
    canResizeBottom: boolean;
    allowOverflow: boolean;
}
export interface ISpaceContext {
    size: DOMRect;
    layer: number;
    startMouseDrag: (e: ResizeMouseEvent, onDragEnd?: OnDragEnd) => void;
    startTouchDrag: (e: ResizeTouchEvent, onDragEnd?: OnDragEnd) => void;
    forceUpdate: () => void;
}
