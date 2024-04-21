import * as React from "react";
import { ViewPort, Layer, Positioned } from "../..";
import { blue, red } from "../Utils";
import { description, PropsTable, Prop } from "../Utils";

export default {
	title: "Components/Layer",
	component: Layer,
};

export const Default = {
	render: () => (
		<ViewPort>
			<Layer zIndex={1}>
				<Positioned style={blue} left={100} top={100} width={200} height={200}>
					{description("Positioned in layer with zIndex 1")}
				</Positioned>
				<Positioned style={blue} left={350} top={100} width={200} height={200}>
					{description("Positioned in layer with zIndex 1")}
				</Positioned>
			</Layer>
			<Layer zIndex={2}>
				<Positioned style={red} left={200} top={250} width={200} height={200}>
					{description("Positioned in layer with zIndex 2")}
				</Positioned>
				<Positioned style={red} left={450} top={250} width={200} height={200}>
					{description("Positioned in layer with zIndex 2")}
				</Positioned>
			</Layer>
		</ViewPort>
	),

	name: "Default",
};

export const Properties = () => (
	<PropsTable>
		<Prop name="zIndex" type="number" description="zIndex to apply to all child spaces." />
	</PropsTable>
);
