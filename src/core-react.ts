import * as React from "react";
import { createStore } from "./core";
import { ISpaceProps, ISpaceStore, ISpaceDefinition, IPositionalProps, ResizeType, CenterType } from "./core-types";
import { coalesce, shortuuid } from "./core-utils";
import { ResizeSensor } from "css-element-queries";
import { CSSProperties } from "react";
import * as PropTypes from "prop-types";

export const ParentContext = React.createContext<string | undefined>(undefined);
export const DOMRectContext = React.createContext<DOMRect | undefined>(undefined);
export const LayerContext = React.createContext<number | undefined>(undefined);
export const currentStore = createStore();

export const commonProps = {
	id: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	as: PropTypes.string,
	centerContent: PropTypes.oneOf([CenterType.None, CenterType.Vertical, CenterType.HorizontalVertical]),
	zIndex: PropTypes.number,
	scrollable: PropTypes.bool,
	trackSize: PropTypes.bool,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseMove: PropTypes.func,
	onTouchStart: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchEnd: PropTypes.func,
};

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

export function useForceUpdate() {
	const [, setTick] = React.useState(0);
	const update = React.useCallback(() => {
		setTick((tick) => tick + 1);
	}, []);
	return update;
}

export function useSpace(props: ISpaceProps) {
	const store = currentStore;
	const update = useForceUpdate();
	const parent = React.useContext(ParentContext);
	const layer = React.useContext(LayerContext);
	const spaceId = React.useRef(props.id || `s${shortuuid()}`);
	const elementRef = React.useRef<HTMLElement>();
	const resizeSensor = React.useRef<ResizeSensor>();
	const [domRect, setDomRect] = React.useState<DOMRect>();

	let space = store.getSpace(spaceId.current)!;

	const parsedProps = {
		...props,
		...{
			id: spaceId.current,
			zIndex: coalesce(props.zIndex, layer),
		},
	};

	if (!space) {
		space = store.createSpace(parent, parsedProps, update);
		store.addSpace(space);
	} else {
		store.updateSpace(space, parsedProps);
	}

	const resizeHandles = useSpaceResizeHandles(store, space, props.position, props.handleSize);

	React.useEffect(() => {
		const rect = elementRef.current!.getBoundingClientRect() as DOMRect;
		space!.dimension = {
			...rect,
			...{
				left: Math.floor(rect.left),
				top: Math.floor(rect.top),
				right: Math.floor(rect.right),
				bottom: Math.floor(rect.bottom),
				width: Math.floor(rect.width),
				height: Math.floor(rect.height),
				x: Math.floor(rect.x),
				y: Math.floor(rect.y),
			},
		};
		setDomRect(space!.dimension);

		if (props.trackSize) {
			resizeSensor.current = new ResizeSensor(elementRef.current!, (size) => {
				space!.dimension = {
					...rect,
					...{
						width: Math.floor(size.width),
						height: Math.floor(size.height),
					},
				};
				setDomRect(space!.dimension);
			});
		}

		return () => {
			resizeSensor.current && resizeSensor.current.detach();
			store.removeSpace(space!);
		};
	}, []);

	return { space: space, resizeHandles: resizeHandles, domRect: domRect, elementRef: elementRef };
}

interface IResizeHandleProps {
	key: string | number;
	style: CSSProperties;
	className: string;
	onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
}

export function useSpaceResizeHandles(store: ISpaceStore, space: ISpaceDefinition, position: IPositionalProps | undefined, handleSize?: number) {
	const resizeHandles: IResizeHandleProps[] = [];
	const resizeHandleSize = coalesce(handleSize, 5);

	if (position && position.rightResizable) {
		resizeHandles.push({
			key: "right",
			style: { width: resizeHandleSize },
			className: `spaces-resize-handle resize-right`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Right, space, space.width, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Right, space, space.width, event),
		});
	}

	if (position && position.leftResizable) {
		resizeHandles.push({
			key: "left",
			style: { width: resizeHandleSize },
			className: `spaces-resize-handle resize-left`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Left, space, space.width, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Left, space, space.width, event),
		});
	}

	if (position && position.topResizable) {
		resizeHandles.push({
			key: "top",
			style: { height: resizeHandleSize },
			className: `spaces-resize-handle resize-top`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Top, space, space.height, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Top, space, space.height, event),
		});
	}

	if (position && position.bottomResizable) {
		resizeHandles.push({
			key: "bottom",
			style: { height: resizeHandleSize },
			className: `spaces-resize-handle resize-bottom`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Bottom, space, space.height, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Bottom, space, space.height, event),
		});
	}

	return resizeHandles;
}
