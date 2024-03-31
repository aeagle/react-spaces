import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ViewPort, BottomResizable, TopResizable, RightResizable, LeftResizable } from "../..";
import { green, description } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/Resizable/By pixel",
	component: BottomResizable,
};

export const Bottom = {
	render: () => (
		<ViewPort>
			<BottomResizable
				style={green}
				size={250}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Bottom resizable")}
			</BottomResizable>
		</ViewPort>
	),

	name: "Bottom",
};

export const Top = {
	render: () => (
		<ViewPort>
			<TopResizable
				style={green}
				size={250}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Top resizable")}
			</TopResizable>
		</ViewPort>
	),

	name: "Top",
};

export const Left = {
	render: () => (
		<ViewPort>
			<LeftResizable
				style={green}
				size={250}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Left resizable")}
			</LeftResizable>
		</ViewPort>
	),

	name: "Left",
};

export const Right = {
	render: () => (
		<ViewPort>
			<RightResizable
				style={green}
				size={250}
				touchHandleSize={20}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Right",
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
