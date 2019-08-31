import * as React from 'react';
import { Resizable, ResizeType } from '../Resizable';
import { AnchorType, AllProps, IState, ISpaceContext, ISpaceTaker, AnchorToResizeTypeMap } from './Types';

export const getSizeString = 
	(size: string | number) => typeof(size) === "string" ? size : `${size}px`;

export const isFilledSpace = 
	(props: AllProps) => !props.anchor

export const isHorizontalSpace = (props: AllProps) => 
	props.anchor && (props.anchor === AnchorType.Left || props.anchor === AnchorType.Right)

export const isVerticalSpace = (props: AllProps) => 
	props.anchor && (props.anchor === AnchorType.Top || props.anchor === AnchorType.Bottom)

const uuid = () =>
	"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
		  let random = Math.random() * 16 | 0;
		  let value = char === "x" ? random : (random % 4 + 8);
		  return value.toString(16);
	});

export const initialState = (props: AllProps) => ({
	id: props.id || uuid(),
	currentWidth: 0,
	currentHeight: 0,
	adjustedSize: 0,
	adjustedLeft: 0,
	adjustedTop: 0,
	spaceTakers: [],

	parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
	left: props.anchor && props.anchor !== AnchorType.Right ? props.left || 0 : props.left,
	top: props.anchor && props.anchor !== AnchorType.Bottom ? props.top || 0 : props.top,
	right: props.anchor && props.anchor !== AnchorType.Left ? props.right || 0 : props.right,
	bottom: props.anchor && props.anchor !== AnchorType.Top ? props.bottom || 0 : props.bottom,
	width: props.anchor && isHorizontalSpace(props) ? props.anchorSize || 0 : props.width,
	height: props.anchor && isVerticalSpace(props) ? props.anchorSize || 0 : props.height,
	debug: props.debug !== undefined ? props.debug : false,
})

export const createContext = (
	state: IState, 
	setState: (stateDelta: Partial<IState>) => void, 
	parent: ISpaceContext | null,
	zIndex: number) => {

	const context : ISpaceContext = {
		debug: parent ? (parent.debug ? true : state.debug) : state.debug,
		level: parent ? parent.level + 1 : 0,
		zIndex: zIndex,
		width: state.currentWidth,
		height: state.currentHeight,
		spaceTakers: state.spaceTakers,
		registerSpaceTaker: 
			(spaceTaker: ISpaceTaker) => {
				const existing = state.spaceTakers.find(t => t.id === spaceTaker.id);

				if (!existing) {
					setState({ spaceTakers: [ ...state.spaceTakers, spaceTaker ] });
				} else {
					existing.order = spaceTaker.order;
					existing.anchorType = spaceTaker.anchorType;
					existing.size = spaceTaker.size;
				}
			},
		removeSpaceTaker:
			(id: string) => 
				setState({ spaceTakers: state.spaceTakers.filter(t => t.id !== id) }),
		updateSpaceTakerAdjustedSize:
			(id: string, adjustedSize: number) =>
				setState({ spaceTakers: state.spaceTakers.map(t => t.id === id ? {...t, ...{ adjustedSize: adjustedSize }} : t) }),
		updateDebug:
			(id: string, debug: boolean) =>
				setState({ spaceTakers: state.spaceTakers.map(t => t.id === id ? {...t, ...{ debug: debug }} : t) }),
		startDrag:
			(e) => {
				const originalMouseX = e.pageX - state.adjustedLeft;
				const originalMouseY = e.pageY - state.adjustedTop;
				const drag = (e: MouseEvent) => setState({ adjustedLeft: e.pageX - originalMouseX, adjustedTop: e.pageY - originalMouseY });
				const stopDrag = () => window.removeEventListener('mousemove', drag);
				e.preventDefault();
				window.addEventListener('mousemove', drag);
				window.addEventListener('mouseup', stopDrag);
			}
	}

	return context;
}

export const applyResize = (props: AllProps, state: IState, setState: (stateDelta: Partial<IState>) => void, parentContext: ISpaceContext | null, handleSize: number) => {

	if (parentContext && props.anchor && props.resizable) {
		const resizeType = AnchorToResizeTypeMap[props.anchor];
		const resizeHandleWidth = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? props.handleSize || 5 : undefined;
		const resizeHandleHeight = resizeType === ResizeType.Top || resizeType === ResizeType.Bottom ? props.handleSize || 5 : undefined;
		
		return {
			resizeHandle:
				<Resizable 
					type={resizeType} 
					width={resizeHandleWidth}
					height={resizeHandleHeight}
					minimumAdjust={ (props.minimumSize || 20) - (state.parsedSize || 0) }
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