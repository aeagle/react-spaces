import * as React from 'react';
import './Styles.css';
import * as PropTypes from "prop-types";
import { SpaceContext } from './Globals/Contexts';
import { ISpace, IReactEvents } from './Globals/Types';
import { createSpaceContext } from './Globals/ISpaceContext';
import { HeadStyles } from './HeadStyles';

interface IProps extends IReactEvents {
	className?: string,
	left?: number,
	top?: number,
	right?: number,
	bottom?: number
}

export const ViewPort : React.FC<IProps> = (props) => {
	const [ children, setChildren ] = React.useState<ISpace[]>([]);
	const [ resizing, setResizing ] = React.useState(false);

	return (
		<div 
			className={`spaces-fullpage-layout${props.className ? ` ${props.className}` : ``}${resizing ? ` spaces-resizing` : ``}`}
			style={{ 
				left: props.left || 0, 
				top: props.top || 0, 
				right: props.right || 0, 
				bottom: props.bottom || 0
			}}
			onClick={props.onClick}
			onMouseDown={props.onMouseDown}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onMouseMove={props.onMouseMove}
			onTouchStart={props.onTouchStart}
			onTouchMove={props.onTouchMove}
			onTouchEnd={props.onTouchEnd}>
			<HeadStyles spaces={children} />
			<SpaceContext.Provider value={createSpaceContext(children, setChildren, setResizing)}>
				{props.children}
			</SpaceContext.Provider>
		</div>
	)
}

ViewPort.propTypes = {
	className: PropTypes.string,
	left: PropTypes.number,
	top: PropTypes.number,
	right: PropTypes.number,
	bottom: PropTypes.number
}