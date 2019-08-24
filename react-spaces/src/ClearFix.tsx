import * as React from 'react';
import './Styles.css';

export const ClearFix : React.FC = (props) => (
	<div className={`spaces-clearfix`}>
		{props.children}
	</div>
)