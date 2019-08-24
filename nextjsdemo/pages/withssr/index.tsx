import React from 'react';
import * as Space from 'react-spaces/dist/server';
import 'react-spaces/dist/server.css';

export const Index: React.FC = () => {
	return (
		<Space.ViewPort>
			<Space.LeftResizable style={{ backgroundColor: 'yellow' }} size={300} centerContent={Space.CenterType.HorizontalVertical}>
				Test
			</Space.LeftResizable>
			<Space.Fill centerContent={Space.CenterType.HorizontalVertical}>
				Hello Next.js
			</Space.Fill>
		</Space.ViewPort>
	)
}

export default Index;