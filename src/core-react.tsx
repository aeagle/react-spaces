import * as React from "react";
import { createStore } from "./core";
import { ISpaceProps, ISpaceStore, ISpaceDefinition, IPositionalProps } from "./core-types";
import { coalesce, shortuuid } from "./core-utils";
import { ResizeSensor } from "css-element-queries";

export const ParentContext = React.createContext<string | undefined>(undefined);
export const DOMRectContext = React.createContext<DOMRect | undefined>(undefined);
export const LayerContext = React.createContext<number | undefined>(undefined);
export const currentStore = createStore();

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

	const resizeHandles = useSpaceResizeHandles(store, space, props.position, elementRef);

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

export function useSpaceResizeHandles(
	store: ISpaceStore,
	space: ISpaceDefinition,
	position: IPositionalProps | undefined,
	elementRef: React.MutableRefObject<HTMLElement | undefined>,
) {
	const resizeHandles: React.ReactNode[] = [];

	if (position && position.rightResizable) {
		resizeHandles.push(
			<div
				key={"right"}
				style={{ width: 6 }}
				className={`spaces-resize-handle resize-right`}
				onMouseDown={(e) => store.startMouseResize("right", space, space.width, elementRef.current!, e)}
				onTouchStart={(e) => store.startTouchResize("right", space, space.width, elementRef.current!, e)}
			/>,
		);
	}

	if (position && position.leftResizable) {
		resizeHandles.push(
			<div
				key={"left"}
				style={{ width: 6 }}
				className={`spaces-resize-handle resize-left`}
				onMouseDown={(e) => store.startMouseResize("left", space, space.width, elementRef.current!, e)}
				onTouchStart={(e) => store.startTouchResize("left", space, space.width, elementRef.current!, e)}
			/>,
		);
	}

	if (position && position.topResizable) {
		resizeHandles.push(
			<div
				key={"top"}
				style={{ height: 6 }}
				className={`spaces-resize-handle resize-top`}
				onMouseDown={(e) => store.startMouseResize("top", space, space.height, elementRef.current!, e)}
				onTouchStart={(e) => store.startTouchResize("top", space, space.height, elementRef.current!, e)}
			/>,
		);
	}

	if (position && position.bottomResizable) {
		resizeHandles.push(
			<div
				key={"bottom"}
				style={{ height: 6 }}
				className={`spaces-resize-handle resize-bottom`}
				onMouseDown={(e) => store.startMouseResize("bottom", space, space.height, elementRef.current!, e)}
				onTouchStart={(e) => store.startTouchResize("bottom", space, space.height, elementRef.current!, e)}
			/>,
		);
	}

	return resizeHandles;
}
