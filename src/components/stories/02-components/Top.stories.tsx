import * as React from "react";
import { ViewPort, Top } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps } from "../Utils";

export default {
	title: "Components/Top",
	component: Top,
};

export const Default = {
	render: () => (
		<ViewPort>
			<Top style={green} size="50%">
				{description("Top 50%")}
			</Top>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<Top style={green} size={300}>
				{description("Top 300px")}
			</Top>
		</ViewPort>
	),

	name: "Default (px)",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<Top style={green} size={300} scrollable={true}>
				{lorem}
			</Top>
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
