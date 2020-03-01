import * as React from "react";
import { AllProps, IState, AnchorType, ISize, SizeUnit, ResizeType } from "src/types";
import { initialState, isHorizontalSpace, isVerticalSpace, coalesce } from "src/utils";
import { ISpaceContext, updateSpace, removeSpace, registerSpace, createSpaceContext } from "src/ISpaceContext";
import { SpaceLayerContext, SpaceContext } from "src/components/Contexts";
import { ResizeSensor } from "css-element-queries";
import { startMouseDrag } from "src/dragging";
import { startMouseResize } from "src/resizing";

const calcProp = (props: AllProps, positionedFn: (p: AllProps) => SizeUnit, elseFn: (p: AllProps) => SizeUnit) =>
	props.isPositioned ? positionedFn(props) : elseFn(props);

const initialLeft = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.left,
		(p) => (p.anchor !== AnchorType.Right ? p.left || 0 : undefined),
	);

const initialTop = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.top,
		(p) => (p.anchor !== AnchorType.Bottom ? p.top || 0 : undefined),
	);

const initialRight = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.right,
		(p) => (p.anchor !== AnchorType.Left ? p.right || 0 : undefined),
	);

const initialBottom = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.bottom,
		(p) => (p.anchor !== AnchorType.Top ? p.bottom || 0 : undefined),
	);

const initialWidth = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.width,
		(p) => (isHorizontalSpace(p.anchor) ? p.anchorSize || 0 : p.width),
	);

const initialHeight = (props: AllProps) =>
	calcProp(
		props,
		(p) => p.height,
		(p) => (isVerticalSpace(p.anchor) ? p.anchorSize || 0 : p.height),
	);

export const useSpace = (props: AllProps, spaceElement: React.MutableRefObject<HTMLElement | undefined>) => {
	const parentContext = React.useContext(SpaceContext) as ISpaceContext;

	if (!parentContext) {
		throw new Error("No top-level space: There must be a <ViewPort /> or <Fixed /> ancestor space");
	}

	const [state, changeState] = React.useState<IState>(initialState(props));
	const [currentSize, setCurrentSize] = React.useState<ISize | null>(null);
	const resizeSensor = React.useRef<ResizeSensor>();
	const onRemove = React.useRef<() => void>();
	const setState = (stateDelta: Partial<IState>) => changeState((prev) => ({ ...prev, ...stateDelta }));
	const layerContext = React.useContext(SpaceLayerContext);
	const currentZIndex = props.zIndex || layerContext || 0;

	const updateCurrentSize = React.useCallback(() => {
		if (spaceElement.current) {
			const rect = spaceElement.current.getBoundingClientRect();
			setCurrentSize({
				width: rect.width,
				height: rect.height,
			});
		}
	}, []);

	const space = registerSpace(parentContext, {
		id: state.id,
		zIndex: currentZIndex,
		order: props.order === undefined ? 1 : props.order,
		anchorType: props.anchor,
		anchorSize: props.anchorSize || 0,
		adjustedSize: 0,
		adjustedLeft: 0,
		adjustedTop: 0,
		adjustedWidth: 0,
		adjustedHeight: 0,
		left: initialLeft(props),
		top: initialTop(props),
		right: initialRight(props),
		bottom: initialBottom(props),
		width: initialWidth(props),
		height: initialHeight(props),
		isPositioned: coalesce(props.isPositioned, false),
	});

	React.useEffect(() => {
		setCurrentSize(null);
	}, [parentContext.children.length]);

	// Deal with property changes to size / zIndex / anchoring
	React.useEffect(() => {
		updateSpace(parentContext, state.id, {
			width: isHorizontalSpace(props.anchor) ? initialWidth(props) : undefined,
			height: isVerticalSpace(props.anchor) ? initialHeight(props) : undefined,
			adjustedSize: 0,
			adjustedWidth: 0,
			adjustedHeight: 0,
		});
	}, [props.anchorSize]);

	React.useEffect(() => {
		updateSpace(parentContext, state.id, {
			left: initialLeft(props),
			top: initialTop(props),
			right: initialRight(props),
			bottom: initialBottom(props),
			width: initialWidth(props),
			height: initialHeight(props),
			adjustedLeft: 0,
			adjustedTop: 0,
			adjustedWidth: 0,
			adjustedHeight: 0,
		});
	}, [props.left, props.top, props.bottom, props.right, props.width, props.height, props.anchor]);

	React.useEffect(() => {
		updateSpace(parentContext, state.id, {
			zIndex: currentZIndex,
		});
	}, [currentZIndex]);

	// Setup / cleanup

	React.useEffect(() => {
		if (spaceElement.current) {
			if (props.trackSize) {
				resizeSensor.current = new ResizeSensor(spaceElement.current, (size) =>
					setCurrentSize({
						width: size.width,
						height: size.height,
					}),
				);
			}
		}

		updateCurrentSize();

		const cleanup = () => {
			resizeSensor.current && resizeSensor.current.detach();
			onRemove.current && onRemove.current();
		};

		return cleanup;
	}, []);

	React.useEffect(() => {
		if (!currentSize) {
			updateCurrentSize();
		}
	});

	onRemove.current = React.useCallback(() => {
		removeSpace(parentContext, state.id);
	}, []);

	const currentContext = createSpaceContext(
		state.children,
		(children) => setState({ children: children }),
		(resizing) => setState({ resizing: resizing }),
		(event, onDragEnd) => startMouseDrag(event, parentContext, space, spaceElement.current, onDragEnd),
		(event, resizeType, onResizeEnd) =>
			startMouseResize(
				event,
				parentContext,
				space,
				props,
				spaceElement.current,
				resizeType,
				(r) => {
					switch (resizeType) {
						case ResizeType.Left:
							updateSpace(parentContext, space.id, { adjustedLeft: -r.x });
							break;
						case ResizeType.Top:
							updateSpace(parentContext, space.id, { adjustedTop: -r.y });
							break;
					}
				},
				onResizeEnd,
			),
		parentContext,
	);

	return {
		space,
		parentContext,
		currentContext,
		currentSize: currentSize || { width: 0, height: 0 },
		resizing: state.resizing,
	};
};
