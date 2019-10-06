import * as React from 'react';
import './Styles.css';

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

	const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const originalMouseX = props.type === ResizeType.Left ? e.pageX + adjustedSize : e.pageX - adjustedSize;
		const originalMouseY = props.type === ResizeType.Top ? e.pageY + adjustedSize : e.pageY - adjustedSize;

		const resize = (e: MouseEvent) => {
			const adjustmentX = 
				Math.min(
					Math.max(props.type === ResizeType.Left ? originalMouseX - e.pageX : e.pageX - originalMouseX, props.minimumAdjust),
					props.maximumAdjust || 999999
				);
			const adjustmentY = 
				Math.min(
					Math.max(props.type === ResizeType.Top ? originalMouseY - e.pageY : e.pageY - originalMouseY, props.minimumAdjust),
					props.maximumAdjust || 999999
				);
			const adjustment = props.type === ResizeType.Left || props.type === ResizeType.Right ?  adjustmentX : adjustmentY;
	
			if (adjustment !== adjustedSize) {
				setAdjustedSize(adjustment);
				props.onResize(adjustment);
			}
		}

		const stopResize = () => window.removeEventListener('mousemove', resize);
		
		e.preventDefault();
		window.addEventListener('mousemove', resize);
		window.addEventListener('mouseup', stopResize);
	}

	return (
		<div 
			style={{ width: props.width, height: props.height }}
			className={`spaces-resize-handle ${props.type}`} 
			onMouseDown={startResize} />
	)
}