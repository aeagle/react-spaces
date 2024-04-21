import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ViewPort, LeftResizable } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/LeftResizable",
	component: LeftResizable,
};

export const Default = {
	render: () => (
		<ViewPort>
			<LeftResizable
				style={green}
				size="50%"
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Left resizable")}
			</LeftResizable>
		</ViewPort>
	),

	name: "Default (%)",
};

export const DefaultPx = {
	render: () => (
		<ViewPort>
			<LeftResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Left resizable")}
			</LeftResizable>
		</ViewPort>
	),

	name: "Default (px)",
};

export const WithResizeConstraints = {
	render: () => (
		<ViewPort>
			<LeftResizable
				style={green}
				size={300}
				touchHandleSize={20}
				trackSize={true}
				minimumSize={150}
				maximumSize={450}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Left resizable")}
			</LeftResizable>
		</ViewPort>
	),

	name: "With resize constraints",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<LeftResizable
				style={green}
				size={300}
				touchHandleSize={20}
				scrollable={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{lorem}
			</LeftResizable>
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
