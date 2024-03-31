import * as React from "react";
import { ViewPort, Bottom } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps } from "../Utils";

export default {
	title: "Components/Bottom",
	component: Bottom,
};

export const Default = {
	render: () => (
		<ViewPort>
			<Bottom style={green} size="50%">
				{description("Bottom 50%")}
			</Bottom>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<Bottom style={green} size={300}>
				{description("Bottom 300px")}
			</Bottom>
		</ViewPort>
	),

	name: "Default (px)",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<Bottom style={green} size={300} scrollable={true}>
				{lorem}
			</Bottom>
		</ViewPort>
	),

	name: "Scrollable",
};

export const Properties = {
	render: () => (
		<PropsTable>
			<AnchoredProps />
			<StandardProps />
		</PropsTable>
	),

	name: "Properties",
};
