import * as React from 'react';
import './Styles.css';
import { throttle } from './Globals/Throttle';
import { ResizeType } from './Globals/Types';
import * as PropTypes from 'prop-types';

interface IProps {
	type: ResizeType,
	adjustedSize: number,
	width?: number,
	height?: number,
	minimumAdjust: number,
	maximumAdjust?: number,
	onResize: (adjustedSize: number) => void,
	onResizeStart?: () => void,
	onResizeEnd?: () => void
}

const RESIZE_THROTTLE = 10;

export const Resizable : React.FC<IProps> = (props) => {
	const resize = (originalX: number, originalY: number, x: number, y: number) => {
		const adjustmentX = 
			Math.min(
				Math.max(props.type === ResizeType.Left ? originalX - x : x - originalX, props.minimumAdjust),
				props.maximumAdjust === undefined ? 999999 : props.maximumAdjust
			);
		const adjustmentY = 
			Math.min(
				Math.max(props.type === ResizeType.Top ? originalY - y : y - originalY, props.minimumAdjust),
				props.maximumAdjust === undefined ? 999999 : props.maximumAdjust
			);

		const adjustment = props.type === ResizeType.Left || props.type === ResizeType.Right ? adjustmentX : adjustmentY;

		if (adjustment !== props.adjustedSize) {
			props.onResize(adjustment);
		}
	}

	const startTouchResize = (e: React.TouchEvent<HTMLDivElement>) => {
		const originalTouchX = props.type === ResizeType.Left ? e.touches[0].pageX + props.adjustedSize : e.touches[0].pageX - props.adjustedSize;
		const originalTouchY = props.type === ResizeType.Top ? e.touches[0].pageY + props.adjustedSize : e.touches[0].pageY - props.adjustedSize;
		let lastX = 0;
		let lastY = 0;
		let resizing = true;
		let moved = false;

		const touchResize = (x: number, y: number) => resizing && resize(originalTouchX, originalTouchY, x, y);
		const throttledTouchResize = throttle<typeof touchResize>(touchResize, RESIZE_THROTTLE);
		const withPreventDefault = (e: TouchEvent) => { 
			moved = true; 
			lastX = e.touches[0].pageX; 
			lastY = e.touches[0].pageY; 
			e.preventDefault(); 
			e.stopImmediatePropagation(); 
			throttledTouchResize(lastX, lastY); 
	};
		const removeListener = () => {
			if (moved) {
				touchResize(lastX, lastY);
			}
			resizing = false;
			window.removeEventListener('touchmove', withPreventDefault);
			window.removeEventListener('touchend', removeListener);
			moved && props.onResizeEnd && props.onResizeEnd();
		};
		window.addEventListener('touchmove', withPreventDefault);
		window.addEventListener('touchend', removeListener);
		e.preventDefault();
		e.stopPropagation();
		props.onResizeStart && props.onResizeStart();
	}

	const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const originalMouseX = props.type === ResizeType.Left ? e.pageX + props.adjustedSize : e.pageX - props.adjustedSize;
		const originalMouseY = props.type === ResizeType.Top ? e.pageY + props.adjustedSize : e.pageY - props.adjustedSize;
		let lastX = 0;
		let lastY = 0;
		let resizing = true;
		let moved = false;

		const mouseResize = (x: number, y: number) => resizing && resize(originalMouseX, originalMouseY, x, y);
		const throttledMouseResize = throttle<typeof mouseResize>(mouseResize, RESIZE_THROTTLE);
		const withPreventDefault = (e: MouseEvent) => { 
			moved = true; 
			lastX = e.pageX;
			lastY = e.pageY;
			e.preventDefault(); 
			e.stopImmediatePropagation(); 
			throttledMouseResize(lastX, lastY); 
		};
		const removeListener = () => {
			if (moved) {
				mouseResize(lastX, lastY);
			}
			resizing = false;
			window.removeEventListener('mousemove', withPreventDefault);
			window.removeEventListener('mouseup', removeListener);
			moved && props.onResizeEnd && props.onResizeEnd();
		};
		window.addEventListener('mousemove', withPreventDefault);
		window.addEventListener('mouseup', removeListener);
		e.preventDefault();
		e.stopPropagation();
		props.onResizeStart && props.onResizeStart();
	}

	return (
		<div 
			style={{ width: props.width, height: props.height }}
			className={`spaces-resize-handle ${props.type}`} 
			onMouseDown={startResize}
			onTouchStart={startTouchResize} />
	)
}

Resizable.propTypes = {
	type: PropTypes.oneOf([ ResizeType.Bottom, ResizeType.Left, ResizeType.Right, ResizeType.Top ]).isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	minimumAdjust: PropTypes.number.isRequired,
	maximumAdjust: PropTypes.number,
	onResize: PropTypes.any,
	onResizeStart: PropTypes.func,
	onResizeEnd: PropTypes.func
}