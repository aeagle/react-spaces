import * as React from 'react';
import './Styles.css';
import { debounce } from './Globals/Utils';

export enum ResizeType {
	Left = "resize-left",
	Right = "resize-right",
	Top = "resize-top",
	Bottom = "resize-bottom"
}

interface IProps {
	type: ResizeType,
	width?: number,
	height?: number,
	minimumAdjust: number,
	maximumAdjust?: number,
	onResize: (adjustedSize: number) => void
}

export const Resizable : React.FC<IProps> = (props) => {
	const [ adjustedSize, setAdjustedSize ] = React.useState(0);

	const resize = (originalX: number, originalY: number, x: number, y: number) => {
		const adjustmentX = 
		Math.min(
			Math.max(props.type === ResizeType.Left ? originalX - x : x - originalX, props.minimumAdjust),
			props.maximumAdjust || 999999
		);
		const adjustmentY = 
			Math.min(
				Math.max(props.type === ResizeType.Top ? originalY - y : y - originalY, props.minimumAdjust),
				props.maximumAdjust || 999999
			);
		const adjustment = props.type === ResizeType.Left || props.type === ResizeType.Right ?  adjustmentX : adjustmentY;

		if (adjustment !== adjustedSize) {
			setAdjustedSize(adjustment);
			props.onResize(adjustment);
		}
	}

	const startTouchResize = (e: React.TouchEvent<HTMLDivElement>) => {
		const originalTouchX = props.type === ResizeType.Left ? e.touches[0].pageX + adjustedSize : e.touches[0].pageX - adjustedSize;
		const originalTouchY = props.type === ResizeType.Top ? e.touches[0].pageY + adjustedSize : e.touches[0].pageY - adjustedSize;

		const touchResize = (e: TouchEvent) => resize(originalTouchX, originalTouchY, e.touches[0].pageX, e.touches[0].pageY);
		const debouncedTouchResize = debounce<typeof touchResize>(touchResize, 10);
		const withPreventDefault = (e: TouchEvent) => { e.preventDefault(); e.stopImmediatePropagation(); debouncedTouchResize(e); };
		window.addEventListener('touchmove', withPreventDefault);
		window.addEventListener('touchend', () => window.removeEventListener('touchmove', withPreventDefault));
		e.preventDefault();
		e.stopPropagation();
	}

	const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const originalMouseX = props.type === ResizeType.Left ? e.pageX + adjustedSize : e.pageX - adjustedSize;
		const originalMouseY = props.type === ResizeType.Top ? e.pageY + adjustedSize : e.pageY - adjustedSize;

		const mouseResize = (e: MouseEvent) => resize(originalMouseX, originalMouseY, e.pageX, e.pageY);
		const debouncedMouseResize = debounce<typeof mouseResize>(mouseResize, 10);
		const withPreventDefault = (e: MouseEvent) => { e.preventDefault(); e.stopImmediatePropagation(); debouncedMouseResize(e); };
		window.addEventListener('mousemove', withPreventDefault);
		window.addEventListener('mouseup', () => window.removeEventListener('mousemove', withPreventDefault));
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<div 
			style={{ width: props.width, height: props.height }}
			className={`spaces-resize-handle ${props.type}`} 
			onMouseDown={startResize}
			onTouchStart={startTouchResize} />
	)
}