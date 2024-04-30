import * as React from "react";
import { createStore } from "./core";
import {
	ISpaceProps,
	ISpaceStore,
	ISpaceDefinition,
	ResizeType,
	CenterType,
	ISpaceContext,
	ICommonProps,
	ResizeMouseEvent,
	OnDragEnd,
	ResizeTouchEvent,
} from "./core-types";
import { coalesce, shortuuid } from "./core-utils";
import { ResizeSensor } from "css-element-queries";
import * as PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// WORKAROUND for React18 strict mode
// https://blog.ag-grid.com/avoiding-react-18-double-mount/
export const useEffectOnce = (effect: () => void | (() => void)) => {
	const destroyFunc = useRef<void | (() => void)>();
	const effectCalled = useRef(false);
	const renderAfterCalled = useRef(false);
	const [_val, setVal] = useState<number>(0);

	if (effectCalled.current) {
		renderAfterCalled.current = true;
	}

	useEffect(() => {
		// only execute the effect first time around
		if (!effectCalled.current) {
			destroyFunc.current = effect();
			effectCalled.current = true;
		}

		// this forces one render after the effect is run
		setVal((val) => val + 1);

		return () => {
			// if the comp didn't render since the useEffect was called,
			// we know it's the dummy React cycle
			if (!renderAfterCalled.current) {
				return;
			}
			if (destroyFunc.current) {
				destroyFunc.current();
			}
		};
	}, []);
};

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
	onDoubleClick: PropTypes.func,
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
	innerComponentStyle?: React.CSSProperties; // For people who like to modify the inner `as` component
	as?: keyof React.ReactDOM | React.ComponentType<ICommonProps>;
	children?: React.ReactNode;
	style?: React.CSSProperties; // Normal styles for the wrapper itself as it is the main component that is resized
}

export interface IReactSpaceInnerProps extends IReactSpaceCommonProps, ISpaceProps, IReactEvents {
	handleRender?: (handleProps: IResizeHandleProps) => React.ReactNode;
}

export interface IReactSpacesOptions {
	debug?: boolean;
}

export function useForceUpdate() {
	const [, setTick] = React.useState(0);
	return React.useCallback(() => {
		setTick((tick) => tick + 1);
	}, []);
}

export function useUniqueId() {
	if (SSR_SUPPORT_ENABLED) {
		if (React.version.startsWith("18")) {
			return `s${(React as any)["useId"]().replace(/\:/g, "")}`;
		}

		if ((React as any)["unstable_useOpaqueIdentifier"]) {
			return `s${(React as any)["unstable_useOpaqueIdentifier"]().replace(/\:/g, "")}`;
		}
	}

	return `s${shortuuid()}`;
}

export function useSpace(props: IReactSpaceInnerProps) {
	const store = currentStore;
	const update = useForceUpdate();
	const parent = React.useContext(ParentContext);
	const layer = React.useContext(LayerContext);
	const { debug } = React.useContext(OptionsContext);
	const uniqueId = useUniqueId();
	const [spaceId] = React.useState(props.id || uniqueId);
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

	useEffectOnce(() => {
		const rect = elementRef.current ? elementRef.current.getBoundingClientRect() : new DOMRect();
		space.dimension = {
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
		setDomRect(space.dimension);

		if (props.trackSize) {
			resizeSensor.current = new ResizeSensor(elementRef.current!, (size) => {
				space.dimension = {
					...rect,
					...{
						width: Math.floor(size.width),
						height: Math.floor(size.height),
					},
				};
				setDomRect(space.dimension);
			});
		}

		return () => {
			resizeSensor.current && resizeSensor.current.detach();
			store.removeSpace(space);
		};
	});

	return { space: space, resizeHandles: resizeHandles, domRect: domRect, elementRef: elementRef };
}

export interface IResizeHandleProps {
	id?: string;
	key: string | number;
	className?: string;
	onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
}

const resizeSetup = [
	{ id: "ml", className: "resize-left", resizeType: ResizeType.Left, condition: (space: ISpaceDefinition) => space.canResizeLeft },
	{ id: "mr", className: "resize-right", resizeType: ResizeType.Right, condition: (space: ISpaceDefinition) => space.canResizeRight },
	{ id: "mt", className: "resize-top", resizeType: ResizeType.Top, condition: (space: ISpaceDefinition) => space.canResizeTop },
	{ id: "mb", className: "resize-bottom", resizeType: ResizeType.Bottom, condition: (space: ISpaceDefinition) => space.canResizeBottom },
	{ id: "mtl", className: "resize-top-left", resizeType: ResizeType.TopLeft, condition: (space: ISpaceDefinition) => space.canResizeTopLeft },
	{ id: "mtr", className: "resize-top-right", resizeType: ResizeType.TopRight, condition: (space: ISpaceDefinition) => space.canResizeTopRight },
	{
		id: "mbl",
		className: "resize-bottom-left",
		resizeType: ResizeType.BottomLeft,
		condition: (space: ISpaceDefinition) => space.canResizeBottomLeft,
	},
	{
		id: "mbr",
		className: "resize-bottom-right",
		resizeType: ResizeType.BottomRight,
		condition: (space: ISpaceDefinition) => space.canResizeBottomRight,
	},
];

export function useSpaceResizeHandles(store: ISpaceStore, space: ISpaceDefinition) {
	const mouseHandles: IResizeHandleProps[] = [];

	const setupResizeHandle = (id: string, className: string, resizeType: ResizeType) => {
		mouseHandles.push({
			id: `${space.id}-${id}`,
			key: id,
			className: `spaces-resize-handle ${className}`,
			onMouseDown: (event) => store.startMouseResize(resizeType, space, event),
			onTouchStart: (event) => store.startTouchResize(resizeType, space, event),
		});
	};

	resizeSetup.forEach((resizeItem) => {
		if (resizeItem.condition(space)) {
			setupResizeHandle(resizeItem.id, resizeItem.className, resizeItem.resizeType);
		}
	});

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
	const onMouseDrag = React.useCallback(
		(e: ResizeMouseEvent, onDragEnd: OnDragEnd | undefined) => (space ? store.startMouseDrag(space, e, onDragEnd) : null),
		[spaceId],
	);
	const onTouchDrag = React.useCallback(
		(e: ResizeTouchEvent, onDragEnd: OnDragEnd | undefined) => (space ? store.startTouchDrag(space, e, onDragEnd) : null),
		[spaceId],
	);
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

export let SSR_SUPPORT_ENABLED = false;
export function enabledSsrSupport() {
	SSR_SUPPORT_ENABLED = true;
}
