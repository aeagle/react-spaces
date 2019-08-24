import * as React from 'react';
import { Resizable, ResizeType } from '../Resizable';
import { Guid } from 'guid-typescript';
import { CenteredVertically, Centered } from '../Centered';
import { AnchorType, AllProps, IState, ISpaceContext, ISpaceTaker, CenterType } from './Types';

const getSizeString = 
	(size: string | number) => typeof(size) === "string" ? size : `${size}px`;

const isFilledSpace = 
	(props: AllProps) => !props.anchor

export const isHorizontalSpace = (props: AllProps) => 
	props.anchor && (props.anchor === AnchorType.Left || props.anchor === AnchorType.Right)

export const isVerticalSpace = (props: AllProps) => 
	props.anchor && (props.anchor === AnchorType.Top || props.anchor === AnchorType.Bottom)

export const initialState = (props: AllProps) => ({
	id: Guid.create().toString(),
	currentWidth: 0,
	currentHeight: 0,
	adjustedSize: 0,
	spaceTakers: [],

	parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
	left: props.anchor !== AnchorType.Right ? 0 : undefined,
	top: props.anchor !== AnchorType.Bottom ? 0 : undefined,
	right: props.anchor !== AnchorType.Left ? 0 : undefined,
	bottom: props.anchor !== AnchorType.Top ? 0 : undefined,
	width: isHorizontalSpace(props) ? props.anchorSize || 0 : undefined,
	height: isVerticalSpace(props) ? props.anchorSize || 0 : undefined,
	debug: props.debug !== undefined ? props.debug : false,
})

const createContext = (state: IState, setState: (stateDelta: Partial<IState>) => void, parent: ISpaceContext | null) => {
	return {
		debug: parent ? (parent.debug ? true : state.debug) : state.debug,
		level: parent ? parent.level + 1 : 0,
		width: state.currentWidth,
		height: state.currentHeight,
		spaceTakers: state.spaceTakers,
		registerSpaceTaker: 
			(spaceTaker: ISpaceTaker) => {
				const existing = state.spaceTakers.find(t => t.id === spaceTaker.id);

				if (!existing) {
					setState({
						spaceTakers: [ ...state.spaceTakers, spaceTaker ]
					})
				} else {
					existing.order = spaceTaker.order;
					existing.anchorType = spaceTaker.anchorType;
					existing.size = spaceTaker.size;
				}
			},
		removeSpaceTaker:
			(id: string) => {
				setState({
					spaceTakers: state.spaceTakers.filter(t => t.id !== id)
				})
			},
		updateSpaceTakerAdjustedSize:
			(id: string, adjustedSize: number) => {
				setState({
					spaceTakers: 
						state.spaceTakers.map(t =>
							t.id === id ?
								{...t, ...{ adjustedSize: adjustedSize }} :
								t
					)
				})
			},
		updateDebug:
			(id: string, debug: boolean) => {
				setState({
					spaceTakers: 
						state.spaceTakers.map(t =>
							t.id === id ?
								{...t, ...{ debug: debug }} :
								t
					)
				})
			}
	}
}

const applyResize = (props: AllProps, state: IState, setState: (stateDelta: Partial<IState>) => void, parentContext: ISpaceContext | null, handleSize: number) => {

	let resizeType : ResizeType = ResizeType.Left;
	let resizeHandleWidth : number | undefined;
	let resizeHandleHeight : number | undefined;

	if (parentContext && props.anchor && props.resizable) {
		switch (props.anchor) {
			case AnchorType.Left:
				resizeType = ResizeType.Right;
				resizeHandleWidth = handleSize;
				break;
			case AnchorType.Right:
				resizeType = ResizeType.Left;
				resizeHandleWidth = props.handleSize || 5;
				break;
			case AnchorType.Top:
				resizeType = ResizeType.Bottom;
				resizeHandleHeight = props.handleSize || 5;
				break;
			case AnchorType.Bottom:
				resizeType = ResizeType.Top;
				resizeHandleHeight = props.handleSize || 5;
				break;
		}
		
		return {
			resizeHandle:
				<Resizable 
					type={resizeType} 
					width={resizeHandleWidth}
					height={resizeHandleHeight}
					minimumAdjust={ -(state.parsedSize || 0) + (props.minimumSize || 20) }
					maximumAdjust={ props.maximumSize ? (props.maximumSize - (state.parsedSize || 0)) : undefined }
					onResize={(adjustedSize) => { 
						setState({ adjustedSize: adjustedSize });
						parentContext.updateSpaceTakerAdjustedSize(state.id, adjustedSize);
					}} />,
			resizeType: 
				resizeType
		}
	}

	return { resizeHandle: null, resizeType: null };
}

export const calculateSpace = (props: AllProps, state: IState, setState: (stateDelta: Partial<IState>) => void, registerOnRemove: (handler: () => void) => void, parentContext: ISpaceContext | null) => {

	const outerStyle = {
		left: (state.left !== undefined ? `calc(${state.left}px)` : undefined) as string | undefined,
		top: (state.top !== undefined ? `calc(${state.top}px)` : undefined) as string,
		right: (state.right !== undefined ? `calc(${state.right}px)` : undefined) as string,
		bottom: (state.bottom !== undefined ? `calc(${state.bottom}px)` : undefined) as string,
		width: 
			isHorizontalSpace(props) ? 
					`calc(${getSizeString(props.anchorSize || 0)} + ${state.adjustedSize}px)`
					: undefined,
		height: 
			isVerticalSpace(props) ? 
					`calc(${getSizeString(props.anchorSize || 0)} + ${state.adjustedSize}px)`
					: undefined,
	};

	if (parentContext) {
		registerOnRemove(() => {
			parentContext.removeSpaceTaker(state.id);
		});

		let adjustedTop: string[] = [];
		let adjustedLeft: string[] = [];
		let adjustedRight: string[] = [];
		let adjustedBottom: string[] = [];

		[ AnchorType.Left, 
		  AnchorType.Right, 
		  AnchorType.Bottom, 
		  AnchorType.Top ]
			.forEach(a => {
				const spaceTakers = 
					parentContext.spaceTakers
						.filter(t => t.anchorType === a)
						.sort((a, b) => a.order - b.order);

				for (let i = 0; i < spaceTakers.length; i ++)
				{
					const t = spaceTakers[i];
					if (t.id !== state.id) {
						const adjustedSize = t.adjustedSize !== 0 ?` + ${t.adjustedSize}px` : ``;
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
			});

		[
			{ adjusted: adjustedTop, setter: (value: string) => outerStyle.top = value },
			{ adjusted: adjustedBottom, setter: (value: string) => outerStyle.bottom = value },
			{ adjusted: adjustedLeft, setter: (value: string) => outerStyle.left = value },
			{ adjusted: adjustedRight, setter: (value: string) => outerStyle.right = value }
		].map(x => x.adjusted.length > 0 ? x.setter(`calc(${x.adjusted.join(" + ")})`) : null);
		
		if (props.anchor) {
			parentContext.registerSpaceTaker({
				id: state.id,
				order: props.order || 1,
				anchorType: props.anchor,
				size: props.anchorSize || 0,
				adjustedSize: 0
			});
		}
	}

	const currentContext = createContext(state, setState, parentContext);
	const handleSize = props.handleSize || 5;
	const overlayHandle = props.overlayHandle !== undefined ? props.overlayHandle : true;
	let children = props.children;

	const resize = applyResize(props, state, setState, parentContext, handleSize);

	if (props.centerContent === CenterType.Vertical) {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === CenterType.HorizontalVertical) {
		children = <Centered>{children}</Centered>;
	}
	
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

	return {
		currentContext,
		resizeHandle: resize.resizeHandle,
		resizeType: resize.resizeType,
		outerStyle,
		innerStyle,
		children
	} 
}