import * as React from "react";
import { action } from "@storybook/addon-actions";
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
			<RightResizable
				style={green}
				size="50%"
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<RightResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Default (px)",
};

export const WithResizeConstraints = {
	render: () => (
		<ViewPort>
			<RightResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				minimumSize={150}
				maximumSize={450}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "With resize constraints",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<RightResizable
				style={green}
				size={300}
				touchHandleSize={20}
				scrollable={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{lorem}
			</RightResizable>
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
