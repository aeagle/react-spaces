import * as React from 'react';
import './Centered.scss';

export const Centered : React.FC = (props) => (
	<div className='spaces-centered'>
		{props.children}
	</div>
)