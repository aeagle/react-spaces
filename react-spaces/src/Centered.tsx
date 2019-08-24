import * as React from 'react';
import './Styles.css';

export const Centered : React.FC = (props) => (
	<div className={`spaces-centered`}>
		{props.children}
	</div>
)

export const CenteredVertically : React.FC = (props) => (
	<div className={`spaces-centered-vertically`}>
		{props.children}
	</div>
)