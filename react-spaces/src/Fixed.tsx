import * as React from 'react';
import './Styles.css';
import * as PropTypes from "prop-types";
import { SpaceContext } from './Globals/Contexts';
import { ISpace } from './Globals/Types';
import { createSpaceContext } from './Globals/ISpaceContext';
import { HeadStyles } from './HeadStyles';

interface IProps {
	className?: string,
	style?: React.CSSProperties,
	width?: number,
	height: number
}

export const Fixed : React.FC<IProps> = (props) => {
	const [ children, setChildren ] = React.useState<ISpace[]>([]);

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
		<HeadStyles spaces={children} />
		<SpaceContext.Provider value={createSpaceContext(children, setChildren)}>
			{props.children}
		</SpaceContext.Provider>
	</div>
	)
}

Fixed.propTypes = {
	className: PropTypes.string,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	width: PropTypes.number,
	height: PropTypes.number.isRequired
}