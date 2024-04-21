import * as React from "react";
import { ViewPort, Left } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps } from "../Utils";

export default {
	title: "Components/Left",
	component: Left,
};

export const Default = {
	render: () => (
		<ViewPort>
			<Left style={green} size="50%">
				{description("Left 50%")}
			</Left>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<Left style={green} size={300}>
				{description("Left 300px")}
			</Left>
		</ViewPort>
	),

	name: "Default (px)",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<Left style={green} size={300} scrollable={true}>
				{lorem}
			</Left>
		</ViewPort>
	),

	name: "Scrollable",
};

export const Properties = () => (
	<PropsTable>
		<AnchoredProps />
		<StandardProps />
	</PropsTable>
);
