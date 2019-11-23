import * as React from 'react';
import { AllProps, IState, AnchorType, ISize } from 'src/Globals/Types';
import { initialState, isHorizontalSpace, isVerticalSpace } from 'src/Globals/Utils';
import { ISpaceContext, updateSpace, removeSpace, registerSpace, createSpaceContext } from 'src/Globals/ISpaceContext';
import { SpaceLayerContext, SpaceContext } from 'src/Globals/Contexts';
import { ResizeSensor } from 'css-element-queries';

export const useSpace = (props: AllProps, divElementRef: React.MutableRefObject<HTMLElement | undefined>) => {

	const parentContext = React.useContext(SpaceContext) as ISpaceContext;

	if (!parentContext) {
		throw new Error("No top-level space: There must be a <ViewPort /> or <Fixed /> ancestor space");
	}

	const [ state, changeState ] = React.useState<IState>(initialState(props));
	const [ currentSize, setCurrentSize ] = React.useState<ISize | null>(null);
	const resizeSensor = React.useRef<ResizeSensor>();
	const onRemove = React.useRef<(() => void)>();
	const setState = (stateDelta: Partial<IState>) => changeState(prev => ({...prev, ...stateDelta}));
	const layerContext = React.useContext(SpaceLayerContext); 
	const currentZIndex = props.zIndex || layerContext || 0;

	const updateCurrentSize = React.useCallback(() => {
		if (divElementRef.current) {
			const rect = divElementRef.current.getBoundingClientRect();
			setCurrentSize({
				width: rect.width, 
				height: rect.height 
			});
		}
	}, []);

	const space = 
		registerSpace(
			parentContext,
			{
				id: state.id,
				zIndex: currentZIndex,
				order: props.order === undefined ? 1 : props.order,
				anchorType: props.anchor,
				anchorSize: props.anchorSize || 0,
				adjustedSize: 0,
				adjustedLeft: 0,
				adjustedTop: 0,
				width: props.anchor && isHorizontalSpace(props.anchor) ? props.anchorSize || 0 : props.width,
				height: props.anchor && isVerticalSpace(props.anchor) ? props.anchorSize || 0 : props.height
			}
		);

	React.useEffect(() => {
		setCurrentSize(null);
	}, [ parentContext.children.length ]);

	// Deal with property changes to size / zIndex / anchoring 
	React.useEffect(() => {
		updateSpace(
			parentContext,
			state.id, 
			{
				width: isHorizontalSpace(props.anchor) ? props.anchorSize || 0 : props.width,
				height: isVerticalSpace(props.anchor) ? props.anchorSize || 0 : props.height,
				adjustedSize: 0 
			}
		);
	}, [ props.anchorSize ]);

	React.useEffect(() => {
		updateSpace(
			parentContext,
			state.id, 
			{ 
				left: props.anchor !== AnchorType.Right ? props.left || 0 : undefined,
				top: props.anchor !== AnchorType.Bottom ? props.top || 0 : undefined,
				right: props.anchor !== AnchorType.Left ? props.right || 0 : undefined,
				bottom: props.anchor !== AnchorType.Top ? props.bottom || 0 : undefined,
				width: isHorizontalSpace(props.anchor) ? props.anchorSize || 0 : props.width,
				height: isVerticalSpace(props.anchor) ? props.anchorSize || 0 : props.height
			}
		);
	}, [ props.left, props.top, props.bottom, props.right, props.width, props.height, props.anchor ]);

	React.useEffect(() => {
		updateSpace(
			parentContext,
			state.id, 
			{ 
				zIndex: currentZIndex 
			}
		);
	}, [ currentZIndex ]);
	
	// Setup / cleanup

	React.useEffect(() => {
		if (divElementRef.current) {
			if (props.trackSize) {
				resizeSensor.current = new ResizeSensor(
					divElementRef.current, 
					(size) => setCurrentSize({
						width: size.width, 
						height: size.height 
					})
				);
			}
		}

		updateCurrentSize();

		const cleanup = () => {
			resizeSensor.current && resizeSensor.current.detach();
			onRemove.current && onRemove.current();
		}

		return cleanup;
	}, []);

	React.useEffect(() => {
		if (!currentSize)
		{
			updateCurrentSize();
		}
	})

	onRemove.current = React.useCallback(() => {
		removeSpace(parentContext, state.id);
	}, []);

	const currentContext = 
		createSpaceContext(
			state.children, 
			(children) => setState({ children: children }), 
			space, 
			parentContext
		);

	return {
		space,
		parentContext,
		currentContext,
		currentSize: currentSize || { width: 0, height: 0 }
	} 
}