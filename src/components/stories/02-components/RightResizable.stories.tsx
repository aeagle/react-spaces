import * as React from "react";
import { ViewPort, RightResizable } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/RightResizable",
	component: RightResizable,
};

export const Default = {
	render: () => (
		<ViewPort>
			<RightResizable style={green} size="50%" touchHandleSize={20} trackSize={true}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<RightResizable style={green} size={300} touchHandleSize={20} trackSize={true}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Default (px)",
};

export const WithResizeConstraints = {
	render: () => (
		<ViewPort>
			<RightResizable style={green} size={300} touchHandleSize={20} trackSize={true} minimumSize={150} maximumSize={450}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "With resize constraints",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<RightResizable style={green} size={300} touchHandleSize={20} scrollable={true}>
				{lorem}
			</RightResizable>
		</ViewPort>
	),

	name: "Scrollable",
};

export const Properties = () => (
	<PropsTable>
		<ResizableProps />
		<AnchoredProps />
		<StandardProps />
	</PropsTable>
);
