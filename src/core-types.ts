export enum Type {
	ViewPort = "viewport",
	Fixed = "fixed",
	Fill = "fill",
	Positioned = "positioned",
	Anchored = "anchored",
	Custom = "custom",
}

export enum Anchor {
	Left,
	Top,
	Right,
	Bottom,
}

export enum Orientation {
	Horizontal,
	Vertical,
}

export type SizeUnit = number | string | undefined;

export type ResizeType = "left" | "right" | "top" | "bottom";

export enum CenterType {
	None = "none",
	Vertical = "vertical",
	HorizontalVertical = "horizontalVertical",
}

export interface ICommonProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	as?: string;
	centerContent?: CenterType;
	zIndex?: number;
	scrollable?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	trackSize?: boolean;
}

export interface ISpaceProps extends ICommonProps {
	type: Type;
	anchor?: Anchor;
	order?: number;
	position?: IPositionalProps;
}

export interface ISpaceStore {
	getSpaces: () => ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
	updateSpace: (space: ISpaceDefinition, props: ISpaceProps) => void;
	updateStyles: (space: ISpaceDefinition) => void;
	removeSpace: (space: ISpaceDefinition) => void;
	createSpace: (parent: string | undefined, props: ISpaceProps, update: () => void) => ISpaceDefinition;
	startMouseResize: (resizeType: ResizeType, space: ISpaceDefinition, size: ISize, element: HTMLElement, e: React.MouseEvent<HTMLElement>) => void;
	startTouchResize: (resizeType: ResizeType, space: ISpaceDefinition, size: ISize, element: HTMLElement, e: React.TouchEvent<HTMLElement>) => void;
}

export interface IPositionalProps {
	left?: SizeUnit | undefined;
	leftResizable?: boolean;
	top?: SizeUnit | undefined;
	topResizable?: boolean;
	right?: SizeUnit | undefined;
	rightResizable?: boolean;
	bottom?: SizeUnit | undefined;
	bottomResizable?: boolean;
	width?: SizeUnit | undefined;
	height?: SizeUnit | undefined;
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
	anchoredChildren: (anchor: Anchor, zIndex: number) => ISpaceDefinition[];
	id: string;
	type: Type;
	anchor?: Anchor;
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
}
