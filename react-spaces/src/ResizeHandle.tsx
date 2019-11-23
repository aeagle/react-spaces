import * as React from 'react';
import './Styles.css';
import { ResizeType } from './Globals/Types';
import * as PropTypes from 'prop-types';

interface IProps {
	type: ResizeType,
	adjustedSize: number,
	width?: number,
	height?: number,
	onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
	onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
}

export const ResizeHandle : React.FC<IProps> = (props) => {
	return (
		<div 
			style={{ width: props.width, height: props.height }}
			className={`spaces-resize-handle ${props.type}`} 
			onMouseDown={props.onMouseDown}
			onTouchStart={props.onTouchStart} />
	)
}

ResizeHandle.propTypes = {
	type: PropTypes.oneOf([ ResizeType.Bottom, ResizeType.Left, ResizeType.Right, ResizeType.Top ]).isRequired,
	width: PropTypes.number,
	height: PropTypes.number
}