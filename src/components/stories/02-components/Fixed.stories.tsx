import * as React from "react";
import { Fixed } from "../..";
import { blue, description } from "../Utils";
import { PropsTable, PropsHeader, Prop, StandardProps } from "../Utils";

export default {
	title: "Components/Fixed",
	component: Fixed,
};

export const WithWidth = {
	render: () => (
		<Fixed style={blue} width={300} height={300}>
			{description("Fixed 300px x 300px")}
		</Fixed>
	),

	name: "With width",
};

export const WithoutWidth = {
	render: () => (
		<Fixed style={blue} height={300}>
			{description("Fixed 100% x 300px")}
		</Fixed>
	),

	name: "Without width",
};

export const Properties = {
	render: () => (
		<PropsTable>
			<PropsHeader>Fixed properties</PropsHeader>
			<Prop
				name="width"
				type="number | string"
				description="Optional width of space. When not specified the space will fill 100% of it's container."
			/>
			<Prop name="height" type="number | string" description="Height of space." />
			<StandardProps />
		</PropsTable>
	),

	name: "Properties",
};
