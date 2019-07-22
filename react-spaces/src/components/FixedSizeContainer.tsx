import * as React from 'react';
import './FixedSizeContainer.scss';
import * as Spaces from './Space';

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

		<Spaces.Fill>
			{props.children}
		</Spaces.Fill>

	</div>
	)
}