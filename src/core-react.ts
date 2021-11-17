import * as React from "react";
import { createStore } from "./core";
import { ISpaceProps, ISpaceStore, ISpaceDefinition, ResizeType, CenterType, ISpaceContext, ICommonProps } from "./core-types";
import { coalesce, shortuuid } from "./core-utils";
import { ResizeSensor } from "css-element-queries";
import * as PropTypes from "prop-types";

export const ParentContext = React.createContext<string | undefined>(undefined);
export const DOMRectContext = React.createContext<DOMRect | undefined>(undefined);
export const LayerContext = React.createContext<number | undefined>(undefined);
export const OptionsContext = React.createContext<IReactSpacesOptions>({});
export const currentStore = createStore();

export const commonProps = {
	id: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	as: PropTypes.any,
	centerContent: PropTypes.oneOf([CenterType.None, CenterType.Vertical, CenterType.HorizontalVertical]),
	zIndex: PropTypes.number,
	scrollable: PropTypes.bool,
	trackSize: PropTypes.bool,
	allowOverflow: PropTypes.bool,
	handleRender: PropTypes.func,
	onClick: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onMouseMove: PropTypes.func,
	onTouchStart: PropTypes.func,
	onTouchMove: PropTypes.func,
	onTouchEnd: PropTypes.func,
};

export interface IReactSpacesOptions {
	debug?: boolean;
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

export interface IReactSpaceCommonProps extends ICommonProps, IReactEvents {
	style?: React.CSSProperties;
	as?: keyof React.ReactDOM | React.ComponentType<ICommonProps>;
}

export interface IReactSpaceInnerProps extends IReactSpaceCommonProps, ISpaceProps, IReactEvents {
	handleRender?: (handleProps: IResizeHandleProps) => React.ReactNode;
}

export interface IReactSpacesOptions {
	debug?: boolean;
}

export function useForceUpdate() {
	const [, setTick] = React.useState(0);
	const update = React.useCallback(() => {
		setTick((tick) => tick + 1);
	}, []);
	return update;
}

export function useSpace(props: IReactSpaceInnerProps) {
	const store = currentStore;
	const update = useForceUpdate();
	const parent = React.useContext(ParentContext);
	const layer = React.useContext(LayerContext);
	const { debug } = React.useContext(OptionsContext);
	const [spaceId] = React.useState(props.id || `s${shortuuid()}`);
	const elementRef = React.useRef<HTMLElement>();
	const resizeSensor = React.useRef<ResizeSensor>();
	const [domRect, setDomRect] = React.useState<DOMRect>();

	let space = store.getSpace(spaceId)!;

	if (debug) {
		console.table(store.getSpaces());
	}

	const parsedProps = {
		...props,
		...{
			id: spaceId,
			zIndex: coalesce(props.zIndex, layer),
		},
	};

	if (!space) {
		space = store.createSpace(parent, parsedProps, update);
		store.addSpace(space);
	} else {
		store.updateSpace(space, parsedProps);
	}

	const resizeHandles = useSpaceResizeHandles(store, space);

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

export interface IResizeHandleProps {
	id?: string;
	key: string | number;
	className?: string;
	onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
}

export function useSpaceResizeHandles(store: ISpaceStore, space: ISpaceDefinition) {
	const mouseHandles: IResizeHandleProps[] = [];

	if (space.canResizeLeft) {
		mouseHandles.push({
			id: `${space.id}-ml`,
			key: "left",
			className: `spaces-resize-handle resize-left`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Left, space, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Left, space, event),
		});
	}

	if (space.canResizeRight) {
		mouseHandles.push({
			id: `${space.id}-mr`,
			key: "right",
			className: `spaces-resize-handle resize-right`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Right, space, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Right, space, event),
		});
	}

	if (space.canResizeTop) {
		mouseHandles.push({
			id: `${space.id}-mt`,
			key: "top",
			className: `spaces-resize-handle resize-top`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Top, space, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Top, space, event),
		});
	}

	if (space.canResizeBottom) {
		mouseHandles.push({
			id: `${space.id}-mb`,
			key: "bottom",
			className: `spaces-resize-handle resize-bottom`,
			onMouseDown: (event) => store.startMouseResize(ResizeType.Bottom, space, event),
			onTouchStart: (event) => store.startTouchResize(ResizeType.Bottom, space, event),
		});
	}

	return {
		mouseHandles,
	};
}

export function useCurrentSpace() {
	const store = currentStore;
	const spaceId = React.useContext(ParentContext);

	const space = spaceId ? store.getSpace(spaceId) : undefined;

	const domRect = React.useContext(DOMRectContext);
	const layer = React.useContext(LayerContext);
	const onMouseDrag = React.useCallback((e, onDragEnd) => (space ? store.startMouseDrag(space, e, onDragEnd) : null), [spaceId]);
	const onTouchDrag = React.useCallback((e, onDragEnd) => (space ? store.startTouchDrag(space, e, onDragEnd) : null), [spaceId]);
	const onForceUpdate = React.useCallback(() => (space ? store.updateStyles(space) : null), [spaceId]);

	const defaults = { width: 0, height: 0, x: 0, y: 0 };
	const size = {
		...defaults,
		...domRect,
	};

	return {
		size: size,
		layer: layer || 0,
		startMouseDrag: onMouseDrag,
		startTouchDrag: onTouchDrag,
		forceUpdate: onForceUpdate,
	} as ISpaceContext;
}
