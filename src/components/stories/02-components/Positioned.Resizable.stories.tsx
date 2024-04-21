import * as React from "react";
import { Positioned } from "../..";
import { PropsTable, PropsHeader, Prop, StandardProps } from "../Utils";

export default {
	title: "Components/Positioned",
	component: Positioned,
};

export const Properties = () => (
	<PropsTable>
		<PropsHeader>Positioned properties</PropsHeader>
		<Prop name="bottom" type="number | string" description="Bottom offset from edge of parent space. (optional)" />
		<Prop name="left" type="number | string" description="Left offset from edge of parent space." />
		<Prop name="right" type="number | string" description="Right offset from edge of parent space. (optional)" />
		<Prop name="top" type="number | string" description="Top offset from edge of parent space." />
		<Prop name="width" type="number | string" description="Width of space (optional)" />
		<Prop name="height" type="number | string" description="Height of space (optional)" />
		<Prop
			name="resizable"
			type="(ResizeType | 'resize-left' | 'resize-top' | 'resize-right' | 'resize-bottom' | 'resize-topleft' | 'resize-topright' | 'resize-bottomleft' | 'resize-bottomright' | 'resize-all')[]"
			description="Array of sides that are resizable"
		/>
		<StandardProps />
	</PropsTable>
);
