import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ViewPort, BottomResizable } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/BottomResizable",
	component: BottomResizable,
};

export const Default = {
	render: () => (
		<ViewPort>
			<BottomResizable
				style={green}
				size="50%"
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Bottom resizable")}
			</BottomResizable>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<BottomResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Bottom resizable")}
			</BottomResizable>
		</ViewPort>
	),

	name: "Default (px)",
};

export const WithResizeConstraints = {
	render: () => (
		<ViewPort>
			<BottomResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				minimumSize={150}
				maximumSize={450}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Bottom resizable")}
			</BottomResizable>
		</ViewPort>
	),

	name: "With resize constraints",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<BottomResizable
				style={green}
				size={300}
				touchHandleSize={20}
				scrollable={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{lorem}
			</BottomResizable>
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
