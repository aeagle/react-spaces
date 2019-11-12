import * as React from 'react';
import './Styles.css';
import * as PropTypes from "prop-types";
import { SpaceInternal } from './Space';
import { SpaceContext } from './Globals/Contexts';
import { ISpace } from './Globals/Types';
import { createSpaceContext } from './Globals/ISpaceContext';

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
		<SpaceContext.Provider value={createSpaceContext(children, setChildren)}>
			<SpaceInternal topMost={true}>
				{props.children}
			</SpaceInternal>
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