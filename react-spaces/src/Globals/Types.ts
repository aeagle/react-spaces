import { ResizeType } from 'src/Resizable';

export enum AnchorType {
	Left = "anchor-left",
	Right = "anchor-right",
	Top = "anchor-top",
	Bottom = "anchor-bottom"
}

export const AnchorTypes = [ 
	AnchorType.Left, 
	AnchorType.Right, 
	AnchorType.Bottom, 
	AnchorType.Top 
];

export const AnchorToResizeTypeMap = {
	"anchor-left": ResizeType.Right,
	"anchor-right": ResizeType.Left,
	"anchor-bottom": ResizeType.Top,
	"anchor-top": ResizeType.Bottom
}

export enum CenterType {
	None,
	Vertical,
	HorizontalVertical
}

export interface IPublicProps {
	id?: string,
	className?: string,
	style?: React.CSSProperties,
	scrollable?: boolean,
	trackSize?: boolean,
	centerContent?: CenterType,
	as?: string,
	children?: React.ReactNode,
	debug?: boolean,
	zIndex?: number,
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void,
	onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export interface IPrivateProps {
	anchorSize?: string | number,
	anchor?: AnchorType,
	resizable?: boolean,
	order?: number
}

export interface IAnchoredProps {
	size: number | string,
	order?: number
}

export interface IResizableProps {
	handleSize?: number,
	overlayHandle?: boolean,
	minimumSize?: number,
	maximumSize?: number
}

export interface IPositionedProps {
	left?: string | number,
	top?: string | number,
	right?: string | number,
	bottom?: string | number,
	width?: string | number,
	height?: string | number,
	resizable?: boolean
}

export type AllProps = IPublicProps & IPrivateProps & IResizableProps & IPositionedProps;

export interface IState {
	id: string,
	currentWidth: number,
	currentHeight: number,
	adjustedSize: number,
	adjustedLeft: number,
	adjustedTop: number,
	spaceTakers: ISpaceTaker[],

	parsedSize?: number;
	left?: number | string;
	top?: number | string;
	right?: number | string;
	bottom?: number | string;
	width?: number | string;
	height?: number | string;
	debug: boolean;
}

export interface ISpaceContext {
	debug: boolean,
	zIndex: number,
	level: number,
	width: number,
	height: number,
	spaceTakers: ISpaceTaker[],
	registerSpaceTaker: (spaceTaker: ISpaceTaker) => void,
	removeSpaceTaker: (id: string) => void,
	updateSpaceTakerAdjustedSize: (id: string, adjustedSize: number) => void,
	updateDebug: (id: string, debug: boolean) => void,
	startDrag: (e: React.MouseEvent) => void
}

export interface ISpaceTaker {
	id: string,
	order: number,
	zIndex: number,
	anchorType: AnchorType,
	size: number | string,
	adjustedSize: number
}

export interface ISpaceInfo {
	width: number,
	height: number
}