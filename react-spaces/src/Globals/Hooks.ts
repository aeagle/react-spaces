import { AllProps, IState, AnchorTypes, ResizeType } from './Types';
import * as React from 'react';
import { initialState, isHorizontalSpace, isVerticalSpace, getSizeString, isFilledSpace, applyResize, createContext, cssValue } from './Utils';
import { ResizeSensor } from 'css-element-queries';
import { AnchorType } from './Types';
import { SpaceContext, SpaceLayerContext } from './Contexts';

export const useSpace = (props: AllProps, divElementRef: React.MutableRefObject<HTMLElement | undefined>) => {

	const [ state, changeState ] = React.useState<IState>(initialState(props));
	const resizeSensor = React.useRef<ResizeSensor>();
	const onRemove = React.useRef<(() => void)>();
	
	const setState = (stateDelta: Partial<IState>) => changeState(prev => ({...prev, ...stateDelta}));

	const parentContext = React.useContext(SpaceContext);
	const layerContext = React.useContext(SpaceLayerContext);
	const currentZIndex = props.zIndex || layerContext || 0;
	const previouszIndex = usePrevious(currentZIndex);

	// Deal with property changes to size / anchoring 
	React.useEffect(() => {
		setState({
			parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
			left: props.anchor !== AnchorType.Right ? props.left || 0 : undefined,
			top: props.anchor !== AnchorType.Bottom ? props.top || 0 : undefined,
			right: props.anchor !== AnchorType.Left ? props.right || 0 : undefined,
			bottom: props.anchor !== AnchorType.Top ? props.bottom || 0 : undefined,
			width: isHorizontalSpace(props) ? props.anchorSize || 0 : props.width,
			height: isVerticalSpace(props) ? props.anchorSize || 0 : props.height,
			debug: props.debug !== undefined ? props.debug : false,
			adjustedSize: 0
		})
		if (parentContext) {
			parentContext.updateSpaceTakerAdjustedSize(state.id, 0);
			if (currentZIndex !== previouszIndex) {
				parentContext.updateSpaceTakerLayer(state.id, currentZIndex);
			}
		}
	}, [ currentZIndex, props.left, props.top, props.bottom, props.right, props.width, props.height, props.anchor, props.anchorSize, props.debug ]);

	// Setup / cleanup
	React.useEffect(() => {
		if (divElementRef.current) {
			if (props.trackSize) {
				resizeSensor.current = new ResizeSensor(
					divElementRef.current, 
					(size) => setState({ currentWidth: size.width, currentHeight: size.height })
				);
			}
		}

		const cleanup = () => {
			resizeSensor.current && resizeSensor.current.detach();
			onRemove.current && onRemove.current();
		}

		return cleanup;
	}, [])

	React.useEffect(() => {
		if (divElementRef.current && !state.parsedSize) {
			const currentRect = divElementRef.current.getBoundingClientRect();
			setState({
				parsedSize: (isHorizontalSpace(props) ? currentRect.width : currentRect.height),
				currentWidth: currentRect.width,
				currentHeight: currentRect.height
			});
		}
	})

	const outerStyle = {
		left: (state.left !== undefined ? cssValue(state.left, state.adjustedLeft) : undefined),
		top: (state.top !== undefined ? cssValue(state.top, state.adjustedTop) : undefined),
		right: (state.right !== undefined ? cssValue(state.right, state.adjustedLeft) : undefined),
		bottom: (state.bottom !== undefined ? cssValue(state.bottom, state.adjustedTop) : undefined),
		width: isHorizontalSpace(props) ? cssValue(props.anchorSize, state.adjustedSize) : state.width,
		height: isVerticalSpace(props) ? cssValue(props.anchorSize, state.adjustedSize) : state.height,
		zIndex: currentZIndex,
	};

	if (parentContext) {
		onRemove.current = () => {
			parentContext.removeSpaceTaker(state.id);
		}

		let adjustedTop: string[] = [];
		let adjustedLeft: string[] = [];
		let adjustedRight: string[] = [];
		let adjustedBottom: string[] = [];

		for (let at = 0; at < AnchorTypes.length; at ++)
		{
			const spaceTakers = 
				parentContext.spaceTakers
					.filter(t => t.zIndex === currentZIndex && t.anchorType === AnchorTypes[at])
					.sort((a, b) => a.order - b.order);

			for (let i = 0; i < spaceTakers.length; i ++)
			{
				const t = spaceTakers[i];
				if (t.id !== state.id) {
					const adjustedSize = t.adjustedSize !== 0 ? ` + ${getSizeString(t.adjustedSize)}` : ``;
					if (isFilledSpace(props))
					{
						if (t.anchorType === AnchorType.Top) {
							adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Left) {
							adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Bottom) {
							adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Right) {
							adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
						}
					}
					else
					{
						if (t.anchorType === AnchorType.Top && outerStyle.top !== undefined) {
							adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Left && outerStyle.left !== undefined) {
							adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Bottom && outerStyle.bottom !== undefined) {
							adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Right && outerStyle.right !== undefined) {
							adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
						}
					}
				} else {
					break;
				}
			}
		}

		[
			{ adjusted: adjustedTop, setter: (value: string) => outerStyle.top = value },
			{ adjusted: adjustedBottom, setter: (value: string) => outerStyle.bottom = value },
			{ adjusted: adjustedLeft, setter: (value: string) => outerStyle.left = value },
			{ adjusted: adjustedRight, setter: (value: string) => outerStyle.right = value }
		].map(x => x.adjusted.length > 0 && x.setter(`calc(${x.adjusted.join(" + ")})`));
		
		props.anchor && parentContext.registerSpaceTaker({
			id: state.id,
			zIndex: currentZIndex,
			order: props.order === undefined ? 1 : props.order,
			anchorType: props.anchor,
			size: props.anchorSize || 0,
			adjustedSize: 0
		});
	}

	const currentContext = createContext(state, setState, parentContext, currentZIndex);
	const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
	const overlayHandle = props.overlayHandle !== undefined ? props.overlayHandle : true;

	const resize = applyResize(props, state, setState, parentContext, handleSize, divElementRef);
	
	const innerStyle = 
		{
			...props.style, 
			...{ 
				left: resize.resizeType === ResizeType.Left && !overlayHandle ? handleSize : undefined,
				top: resize.resizeType === ResizeType.Top && !overlayHandle ? handleSize : undefined,
				right: resize.resizeType === ResizeType.Right && !overlayHandle ? handleSize : undefined,
				bottom: resize.resizeType === ResizeType.Bottom && !overlayHandle ? handleSize : undefined
			}
		};

	const debug =
		parentContext ? parentContext.debug : false ||
		props.debug !== undefined ? props.debug : false;

	const userClasses = 
		props.className ? 
			props.className.split(' ').map(c => c.trim()) : 
			[];
		
	const outerClasses = 
		[
			...[
				"spaces-space",
				resize.resizeType || undefined,
				props.scrollable ? (resize.resizeHandle ? "scrollable" : "scrollable-a") : undefined,
				debug ? 'debug' : undefined
			],
			...(resize.resizeHandle && props.scrollable ? userClasses.map(c => `${c}-container`) : userClasses)
		].filter(c => c);

	const innerClasses =
		[
			"spaces-space-inner", 
			...userClasses
		].filter(c => c);

	return {
		currentContext,
		resizeHandle: resize.resizeHandle,
		outerStyle,
		outerClasses,
		innerStyle,
		innerClasses,
		currentWidth: state.currentWidth,
		currentHeight: state.currentHeight,
		state
	} 
}

function usePrevious<T>(value: T) {
	// The ref object is a generic container whose current property is mutable ...
	// ... and can hold any value, similar to an instance property on a class
	const ref = React.useRef<T>();
	
	// Store current value in ref
	React.useEffect(() => {
	  ref.current = value;
	}, [value]); // Only re-run if value changes
	
	// Return previous value (happens before update in useEffect above)
	return ref.current;
}

export const useParentSpace = () => {
	const parentContext = React.useContext(SpaceContext);

	return { 
		startDrag: parentContext ? parentContext.startDrag : () => null 
	}
}