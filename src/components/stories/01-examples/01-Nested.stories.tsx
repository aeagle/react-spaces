import * as React from "react";
import { ViewPort, Left, Top, Right, Bottom, LeftResizable, TopResizable, RightResizable, BottomResizable, Fill } from "../..";
import { red, green, blue, description } from "../Utils";

export default {
	title: "Basic examples/Nested",
};

export const NonResizable = {
	render: () => (
		<React.StrictMode>
			<ViewPort>
				<Left size="20%" style={green}>
					{description("Left")}
				</Left>
				<Fill style={green}>
					<Top size="20%" style={red}>
						{description("Top")}
					</Top>
					<Fill style={green}>
						<Left size="20%" style={blue}>
							{description("Left")}
						</Left>
						<Fill style={green}>
							<Top size="20%" style={green}>
								{description("Top")}
							</Top>
							<Fill style={red}>{description("Fill")}</Fill>
							<Bottom size="20%" style={green}>
								{description("Bottom")}
							</Bottom>
						</Fill>
						<Right size="20%" style={blue}>
							{description("Right")}
						</Right>
					</Fill>
					<Bottom size="20%" style={red}>
						{description("Bottom")}
					</Bottom>
				</Fill>
				<Right size="20%" style={green}>
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
				<LeftResizable size="20%" style={green} trackSize={true}>
					{description("Left")}
				</LeftResizable>
				<Fill style={green}>
					<TopResizable size="20%" style={red} trackSize={true}>
						{description("Top")}
					</TopResizable>
					<Fill style={green} trackSize={true}>
						<LeftResizable size="20%" style={blue} trackSize={true}>
							{description("Left")}
						</LeftResizable>
						<Fill style={green}>
							<TopResizable size="20%" style={green} trackSize={true}>
								{description("Top")}
							</TopResizable>
							<Fill style={red} trackSize={true}>
								{description("Fill")}
							</Fill>
							<BottomResizable size="20%" style={green} trackSize={true}>
								{description("Bottom")}
							</BottomResizable>
						</Fill>
						<RightResizable size="20%" style={blue} trackSize={true}>
							{description("Right")}
						</RightResizable>
					</Fill>
					<BottomResizable size="20%" style={red} trackSize={true}>
						{description("Bottom")}
					</BottomResizable>
				</Fill>
				<RightResizable size="20%" style={green} trackSize={true}>
					{description("Right")}
				</RightResizable>
			</ViewPort>
			`
		</React.StrictMode>
	),

	name: "Resizable",
};
