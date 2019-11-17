import * as React from 'react';
import { AllProps, IState, AnchorType, ISize } from 'src/Globals/Types';
import { initialState, isHorizontalSpace, isVerticalSpace } from 'src/Globals/Utils';
import { ISpaceContext, updateSpace, removeSpace, registerSpace, createSpaceContext } from 'src/Globals/ISpaceContext';
import { SpaceLayerContext, SpaceContext } from 'src/Globals/Contexts';
import { ResizeSensor } from 'css-element-queries';
import { throttle } from 'src/Globals/Throttle';

export const useSpace = (props: AllProps, divElementRef: React.MutableRefObject<HTMLElement | undefined>) => {

	const [ state, changeState ] = React.useState<IState>(initialState(props));
	const [ currentSize, setCurrentSize ] = React.useState<ISize | null>(null);
	const resizeSensor = React.useRef<ResizeSensor>();
	const onRemove = React.useRef<(() => void)>();
	
	const setState = (stateDelta: Partial<IState>) => changeState(prev => ({...prev, ...stateDelta}));

	const parentContext = React.useContext(SpaceContext) as ISpaceContext;

	if (!parentContext) {
		throw new Error("No top-level space: There must be a <ViewPort /> or <Fixed /> ancestor space");
	}

	const layerContext = React.useContext(SpaceLayerContext); 
	const currentZIndex = props.zIndex || layerContext || 0;

	// Deal with property changes to size / zIndex / anchoring 
	React.useEffect(() => {
		setCurrentSize(prev => ({ 
			parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
			width: prev ? prev.width : 0,
			height: prev ? prev.height : 0
		}));
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
		setCurrentSize(prev => ({ 
			parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
			width: prev ? prev.width : 0,
			height: prev ? prev.height : 0
		}));
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

	const space = 
		registerSpace(
			parentContext,
			{
				id: state.id,
				zIndex: currentZIndex,
				order: props.order === undefined ? 1 : props.order,
				anchorType: props.anchor,
				size: props.anchorSize || 0,
				adjustedSize: 0,
				adjustedLeft: 0,
				adjustedTop: 0,
				width: props.anchor && isHorizontalSpace(props.anchor) ? props.anchorSize || 0 : props.width,
				height: props.anchor && isVerticalSpace(props.anchor) ? props.anchorSize || 0 : props.height
			}
		);
	
	// Setup / cleanup
	const determineCurrentSize = React.useCallback(throttle(() => {
		if (divElementRef.current) {
			const currentRect = divElementRef.current.getBoundingClientRect();
			setCurrentSize({
				parsedSize: (isHorizontalSpace(props.anchor) ? currentRect.width : currentRect.height),
				width: currentRect.width,
				height: currentRect.height
			});
		}
	}, 200), []);

	React.useEffect(() => {
		if (divElementRef.current) {
			if (props.trackSize) {
				resizeSensor.current = new ResizeSensor(
					divElementRef.current, 
					(size) => setCurrentSize({ 
						parsedSize: (isHorizontalSpace(props.anchor) ? size.width : size.height),
						width: size.width, 
						height: size.height 
					})
				);
			}
			determineCurrentSize();
		}

		const cleanup = () => {
			resizeSensor.current && resizeSensor.current.detach();
			onRemove.current && onRemove.current();
		}

		return cleanup;
	}, []);

	onRemove.current = () => {
		removeSpace(parentContext, state.id);
	}

	const currentContext = 
		createSpaceContext(
			state.children, 
			(children) => setState({ children: children }), 
			space, 
			parentContext
		);

	return {
		space,
		currentSize,
		parentContext,
		currentContext
	} 
}