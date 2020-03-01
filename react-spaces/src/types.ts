import * as PropTypes from "prop-types";

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

export enum AnchorType {
	Left = "anchor-left",
	Right = "anchor-right",
	Top = "anchor-top",
	Bottom = "anchor-bottom",
}

export const AnchorTypes = [AnchorType.Left, AnchorType.Right, AnchorType.Bottom, AnchorType.Top];

export const AnchorToResizeTypeMap = {
	"anchor-left": ResizeType.Right,
	"anchor-right": ResizeType.Left,
	"anchor-bottom": ResizeType.Top,
	"anchor-top": ResizeType.Bottom,
};

export enum CenterType {
	None = "none",
	Vertical = "vertical",
	HorizontalVertical = "horizontalVertical",
}

export interface IReactEvents {
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

export interface IParentSpace {
	startMouseDrag: (e: React.MouseEvent<HTMLElement, MouseEvent>, onDragEnd?: (info: IPosition) => void) => void;
	startMouseResize: (e: React.MouseEvent<HTMLElement, MouseEvent>, resizeType: ResizeType, onResizeEnd?: (e: any) => void) => void;
}

export interface IPosition {
	left?: number;
	top?: number;
	right?: number;
	bottom?: number;
	width?: number;
	height?: number;
}

export interface IPublicProps extends IReactEvents {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	scrollable?: boolean;
	trackSize?: boolean;
	centerContent?: CenterType;
	as?: string;
	children?: React.ReactNode;
	zIndex?: number;
}

export const publicProps = {
	id: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	scrollable: PropTypes.bool,
	trackSize: PropTypes.bool,
	centerContent: PropTypes.oneOf([CenterType.None, CenterType.Vertical, CenterType.HorizontalVertical]),
	as: PropTypes.string,
	zIndex: PropTypes.number,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseMove: PropTypes.func,
	onTouchStart: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchEnd: PropTypes.func,
};

export interface IPrivateProps {
	isPositioned?: boolean;
	anchorSize?: SizeUnit;
	anchor?: AnchorType;
	resizable?: boolean;
	order?: number;
}

export const privateProps = {
	isPositioned: PropTypes.bool,
	anchorSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	anchor: PropTypes.oneOf([AnchorType.Bottom, AnchorType.Left, AnchorType.Right, AnchorType.Top]),
	resizable: PropTypes.bool,
	order: PropTypes.number,
	topMost: PropTypes.bool,
};

export interface IAnchoredProps {
	size: SizeUnit;
	order?: number;
}

export const anchoredProps = {
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	order: PropTypes.number,
};

export interface IResizableProps {
	handleSize?: number;
	overlayHandle?: boolean;
	minimumSize?: number;
	maximumSize?: number;
	onResizeStart?: () => boolean | void;
	onResizeEnd?: (newSize: number) => void;
}

export const resizableProps = {
	handleSize: PropTypes.number,
	overlayHandle: PropTypes.bool,
	minimumSize: PropTypes.number,
	maximumSize: PropTypes.number,
	onResizeStart: PropTypes.func,
	onResizeEnd: PropTypes.func,
};

export interface IPositionedProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	resizable?: boolean;
}

export const positionedProps = {
	left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	resizable: PropTypes.bool,
};

export type AllProps = IPublicProps & IPrivateProps & IResizableProps & IPositionedProps;

export const allProps = { ...publicProps, ...privateProps, ...resizableProps, ...positionedProps };

export interface IState {
	id: string;
	resizing: boolean;
	children: ISpace[];
}

export interface ISize {
	width: number;
	height: number;
}

export interface ISpace {
	id: string;
	adjustedLeft: number;
	adjustedTop: number;
	order: number;
	zIndex: number;
	anchorType: AnchorType | undefined;
	anchorSize: SizeUnit;
	adjustedSize: number;
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	isPositioned: boolean;
}

export interface ISpaceInfo {
	width: number;
	height: number;
}
