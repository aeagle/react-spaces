export enum Type {
	ViewPort = "viewport",
	Fixed = "fixed",
	Fill = "fill",
	Positioned = "positioned",
	Anchored = "anchored",
	Custom = "custom",
}

export enum AnchorType {
	Left = "anchor-left",
	Right = "anchor-right",
	Top = "anchor-top",
	Bottom = "anchor-bottom",
}

export enum Orientation {
	Horizontal,
	Vertical,
}

export type SizeUnit = number | string | undefined;

export enum ResizeType {
	Left = "resize-left",
	Right = "resize-right",
	Top = "resize-top",
	Bottom = "resize-bottom",
	NW = "resize-nw",
	NE = "resize-ne",
	SW = "resize-sw",
	SE = "resize-se",
}

export enum ResizeHandlePlacement {
	OverlayInside = "overlay-inside",
	Inside = "inside",
	OverlayBoundary = "overlay-boundary"
}

export enum CenterType {
	None = "none",
	Vertical = "vertical",
	HorizontalVertical = "horizontalVertical",
}

export interface IPassThroughEvents {
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onDoubleClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onMouseMove?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
	onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
	onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
}

export interface ICommonProps extends IPassThroughEvents {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	as?: string;
	centerContent?: CenterType;
	zIndex?: number;
	scrollable?: boolean;
	trackSize?: boolean;
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
	onResizeStart?: (() => void | boolean) | undefined;
	onResizeEnd?: ((newSize: SizeUnit, domRect: DOMRect) => void) | undefined;
}

export interface ISpaceStore {
	getSpaces: () => ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
	updateSpace: (space: ISpaceDefinition, props: ISpaceProps) => void;
	updateStyles: (space: ISpaceDefinition) => void;
	removeSpace: (space: ISpaceDefinition) => void;
	createSpace: (parent: string | undefined, props: ISpaceProps, update: () => void) => ISpaceDefinition;
	startMouseResize: (resizeType: ResizeType, space: ISpaceDefinition, size: ISize, event: React.MouseEvent<HTMLElement>) => void;
	startTouchResize: (resizeType: ResizeType, space: ISpaceDefinition, size: ISize, event: React.TouchEvent<HTMLElement>) => void;
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
	anchoredChildren: (anchor: AnchorType, zIndex: number) => ISpaceDefinition[];
	onResizeStart?: (() => void | boolean) | undefined;
	onResizeEnd?: ((newSize: SizeUnit, domRect: DOMRect) => void) | undefined;
	element: HTMLElement;
	id: string;
	type: Type;
	anchor?: AnchorType;
	orientation: Orientation;
	scrollable: boolean;
	order: number;
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
}
