import * as React from "react";
import { ViewPort, Right } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps } from "../Utils";

export default {
	title: "Components/Right",
	component: Right,
};

export const Default = {
	render: () => (
		<ViewPort>
			<Right style={green} size="50%">
				{description("Right 50%")}
			</Right>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<Right style={green} size={300}>
				{description("Right 300px")}
			</Right>
		</ViewPort>
	),

	name: "Default (px)",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<Right style={green} size={300} scrollable={true}>
				{lorem}
			</Right>
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
