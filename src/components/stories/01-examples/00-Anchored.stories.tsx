import * as React from "react";
import { ViewPort, Left, Top, Right, Bottom, LeftResizable, TopResizable, RightResizable, BottomResizable, Fill } from "../..";
import { red, green, blue, description } from "../Utils";

export default {
	title: "Basic examples/Anchored",
};

export const NonResizable = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<Left size="20%" style={blue} trackSize={true}>
					{description("Left")}
				</Left>
				<Fill style={green} trackSize={true}>
					<Top size="20%" style={red} trackSize={true}>
						{description("Top")}
					</Top>
					<Fill style={green} trackSize={true}>
						{description("Fill")}
					</Fill>
					<Bottom size="20%" style={red} trackSize={true}>
						{description("Bottom")}
					</Bottom>
				</Fill>
				<Right size="20%" style={blue} trackSize={true}>
					{description("Right")}
				</Right>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Non-resizable",
};

export const Resizable = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<LeftResizable size="20%" style={blue} trackSize={true}>
					{description("Left")}
				</LeftResizable>
				<Fill style={green}>
					<TopResizable size="20%" style={red} trackSize={true}>
						{description("Top")}
					</TopResizable>
					<Fill style={green} trackSize={true}>
						{description("Fill")}
					</Fill>
					<BottomResizable size="20%" style={red} trackSize={true}>
						{description("Bottom")}
					</BottomResizable>
				</Fill>
				<RightResizable size="20%" style={blue} trackSize={true}>
					{description("Right")}
				</RightResizable>
			</ViewPort>
		</React.StrictMode>
	),

	name: "Resizable",
};
