import * as React from "react";
import { ViewPort } from "../..";
import { blue, description } from "../Utils";
import { PropsTable, PropsHeader, Prop, StandardProps } from "../Utils";

export default {
	title: "Components/ViewPort",
	component: ViewPort,
};

export const Default = {
	render: () => <ViewPort style={blue}>{description("ViewPort")}</ViewPort>,

	name: "Default",
};

export const TopOffset = {
	render: () => (
		<ViewPort style={blue} top={50}>
			{description("ViewPort with top offset")}
		</ViewPort>
	),

	name: "Top offset",
};

export const RightOffset = {
	render: () => (
		<ViewPort style={blue} right={50}>
			{description("ViewPort with right offset")}
		</ViewPort>
	),

	name: "Right offset",
};

export const BottomOffset = {
	render: () => (
		<ViewPort style={blue} bottom={50}>
			{description("ViewPort with bottom offset")}
		</ViewPort>
	),

	name: "Bottom offset",
};

export const LeftOffset = {
	render: () => (
		<ViewPort style={blue} left={50}>
			{description("ViewPort with left offset")}
		</ViewPort>
	),

	name: "Left offset",
};

export const Properties = {
	render: () => (
		<PropsTable>
			<PropsHeader>ViewPort properties</PropsHeader>
			<Prop name="bottom" type="number | string" description="Bottom offset from viewport edge." />
			<Prop name="left" type="number | string" description="Left offset from viewport edge" />
			<Prop name="right" type="number | string" description="Right offset from viewport edge" />
			<Prop name="top" type="number | string" description="Top offset from viewport edge" />
			<StandardProps />
		</PropsTable>
	),

	name: "Properties",
};
