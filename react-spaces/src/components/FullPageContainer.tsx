import * as React from 'react';
import './FullPageContainer.scss';
import * as Spaces from './Space';

interface IProps {
	className?: string,
	left?: number,
	top?: number,
	right?: number,
	bottom?: number
}

export const ViewPort : React.FC<IProps> = (props) => (
	<div 
		className={`spaces-fullpage-layout${props.className ? ` ${props.className}` : ``}`}
		style={{ 
			left: props.left || 0, 
			top: props.top || 0, 
			right: props.right || 0, 
			bottom: props.bottom || 0 
		}}>

		<Spaces.Fill>
			{props.children}
		</Spaces.Fill>

	</div>
)