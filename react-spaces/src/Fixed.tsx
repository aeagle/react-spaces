import * as React from 'react';
import './Styles.css';
import * as PropTypes from "prop-types";
import { SpaceInternal } from './Space';

interface IProps {
	className?: string,
	style?: React.CSSProperties,
	width?: number,
	height: number
}

export const Fixed : React.FC<IProps> = (props) => {
	const style = {
		...props.style,
		...{ 
			width: props.width,
			height: props.height
		}
	};

	return (
	<div 
		className={`spaces-fixedsize-layout${props.className ? ` ${props.className}` : ``}`}
		style={style}>
		<SpaceInternal topMost={true}>
			{props.children}
		</SpaceInternal>
	</div>
	)
}

Fixed.propTypes = {
	className: PropTypes.string,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	width: PropTypes.number,
	height: PropTypes.number.isRequired
}