import * as React from 'react';
import * as Space from 'react-spaces';
import './Layers.scss';

export const LayersDemo = () => {
	const [ fixedSideBarHovered, setFixedSideBarHovered ] = React.useState(false);
	const [ floatingSideBarHovered, setFloatingSideBarHovered ] = React.useState(false);

	return (
		<Space.Fill className="layers-demo">
			<Space.Layer zIndex={0}>
				<Space.Left 
					size={fixedSideBarHovered ? "40%" : "15%" } 
					onMouseEnter={() => setFixedSideBarHovered(true)} 
					onMouseLeave={() => setFixedSideBarHovered(false)} 
					as="nav">
					{Description("Layer 1 left")}
				</Space.Left>

				<Space.Fill as="main">
					{Description("Fill space not affected by floated left space in different layer")}
				</Space.Fill>
			</Space.Layer>

			<Space.Layer zIndex={1}>
				<Space.Left 
					size={floatingSideBarHovered ? "30%" : 50 } 
					onMouseEnter={() => setFloatingSideBarHovered(true)} 
					onMouseLeave={() => setFloatingSideBarHovered(false)} 
					as="aside">
					{Description("Layer 2 left")}
				</Space.Left>
			</Space.Layer>
		</Space.Fill>
	)
}

const Description = (props: string) => (
  <Space.Centered>
	<div className="description">
		<strong>{props}</strong>
	</div>
  </Space.Centered>
);