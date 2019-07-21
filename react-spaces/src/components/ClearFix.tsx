import * as React from 'react';
import './ClearFix.scss';

export const ClearFix : React.FC = (props) => (
	<div className='spaces-clearfix'>
		{props.children}
	</div>
)