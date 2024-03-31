import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ViewPort, TopResizable } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/TopResizable",
	component: TopResizable,
};

export const Default = {
	render: () => (
		<ViewPort>
			<TopResizable
				style={green}
				size="50%"
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Top resizable")}
			</TopResizable>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<TopResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Top resizable")}
			</TopResizable>
		</ViewPort>
	),

	name: "Default (px)",
};

export const WithResizeConstraints = {
	render: () => (
		<ViewPort>
			<TopResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				minimumSize={150}
				maximumSize={450}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Top resizable")}
			</TopResizable>
		</ViewPort>
	),

	name: "With resize constraints",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<TopResizable
				style={green}
				size={300}
				touchHandleSize={20}
				scrollable={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{lorem}
			</TopResizable>
		</ViewPort>
	),

	name: "Scrollable",
};

export const Properties = {
	render: () => (
		<PropsTable>
			<ResizableProps />
			<AnchoredProps />
			<StandardProps />
		</PropsTable>
	),

	name: "Properties",
};
