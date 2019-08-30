export enum AnchorType {
	Left = "anchor-left",
	Right = "anchor-right",
	Top = "anchor-top",
	Bottom = "anchor-bottom"
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

export type AllProps = IPublicProps & IPrivateProps & IResizableProps;

export interface IState {
	id: string,
	currentWidth: number,
	currentHeight: number,
	adjustedSize: number,
	spaceTakers: ISpaceTaker[],

	parsedSize?: number;
	left?: number;
	top?: number;
	right?: number;
	bottom?: number;
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
	updateDebug: (id: string, debug: boolean) => void
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