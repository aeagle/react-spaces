import * as React from "react";
import { ViewPort, LeftResizable, RightResizable, Left, Right, TopResizable, BottomResizable, Top, Bottom, Fill } from "../..";
import { red, green, blue, description } from "../Utils";

export default {
	title: "Basic examples/Stacked",
};

export const FixedVertical = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<Left size="15%" style={blue} order={1}>
					{description("Left 1")}
				</Left>
				<Left size="15%" style={red} order={2}>
					{description("Left 2")}
				</Left>
				<Fill style={green}>{description("Fill")}</Fill>
				<Right size="15%" style={red} order={2}>
					{description("Right 2")}
				</Right>
				<Right size="15%" style={blue} order={1}>
					{description("Right 1")}
				</Right>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Fixed vertical",
};

export const FixedHorizontal = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<Top size="15%" style={blue} order={1}>
					{description("Top 1")}
				</Top>
				<Top size="15%" style={red} order={2}>
					{description("Top 2")}
				</Top>
				<Fill style={green}>{description("Fill")}</Fill>
				<Bottom size="15%" style={red} order={2}>
					{description("Bottom 2")}
				</Bottom>
				<Bottom size="15%" style={blue} order={1}>
					{description("Bottom 1")}
				</Bottom>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Fixed horizontal",
};

export const ResizableVertical = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<LeftResizable size="15%" style={blue} trackSize={true} order={1}>
					{description("Left 1")}
				</LeftResizable>
				<LeftResizable size="15%" style={red} trackSize={true} order={2}>
					{description("Left 2")}
				</LeftResizable>
				<Fill style={green} trackSize={true}>
					{description("Fill")}
				</Fill>
				<RightResizable size="15%" style={red} trackSize={true} order={2}>
					{description("Right 2")}
				</RightResizable>
				<RightResizable size="15%" style={blue} trackSize={true} order={1}>
					{description("Right 1")}
				</RightResizable>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Resizable vertical",
};

export const ResizableHorizontal = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<TopResizable size="15%" style={blue} trackSize={true} order={1}>
					{description("Top 1")}
				</TopResizable>
				<TopResizable size="15%" style={red} trackSize={true} order={2}>
					{description("Top 2")}
				</TopResizable>
				<Fill style={green} trackSize={true}>
					{description("Fill")}
				</Fill>
				<BottomResizable size="15%" style={red} trackSize={true} order={2}>
					{description("Bottom 2")}
				</BottomResizable>
				<BottomResizable size="15%" style={blue} trackSize={true} order={1}>
					{description("Bottom 1")}
				</BottomResizable>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Resizable horizontal",
};
