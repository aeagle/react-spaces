import * as React from "react";
import { ViewPort, BottomResizable, TopResizable, RightResizable, LeftResizable } from "../..";
import { green, description } from "../Utils";
import { PropsTable, StandardProps, AnchoredProps, ResizableProps } from "../Utils";

export default {
	title: "Components/Resizable/By percentage",
	component: BottomResizable,
};

export const Bottom = {
	render: () => (
		<ViewPort>
			<BottomResizable style={green} size="50%" touchHandleSize={20} trackSize={true}>
				{description("Bottom resizable")}
			</BottomResizable>
		</ViewPort>
	),

	name: "Bottom",
};

export const Top = {
	render: () => (
		<ViewPort>
			<TopResizable style={green} size="50%" touchHandleSize={20} trackSize={true}>
				{description("Top resizable")}
			</TopResizable>
		</ViewPort>
	),

	name: "Top",
};

export const Left = {
	render: () => (
		<ViewPort>
			<LeftResizable style={green} size="50%" touchHandleSize={20} trackSize={true}>
				{description("Left resizable")}
			</LeftResizable>
		</ViewPort>
	),

	name: "Left",
};

export const Right = {
	render: () => (
		<ViewPort>
			<RightResizable style={green} size="50%" touchHandleSize={20} trackSize={true}>
				{description("Right resizable")}
			</RightResizable>
		</ViewPort>
	),

	name: "Right",
};

export const Properties = () => (
	<PropsTable>
		<ResizableProps />
		<AnchoredProps />
		<StandardProps />
	</PropsTable>
);
