import * as React from "react";
import { ViewPort, Left, Top, Right, Bottom, LeftResizable, TopResizable, RightResizable, BottomResizable, Fill } from "../..";
import { green, description, lorem } from "../Utils";
import { PropsTable, StandardProps } from "../Utils";

export default {
	title: "Components/Fill",
	component: Fill,
};

export const WithLeftSpace = {
	render: () => (
		<ViewPort>
			<Left size="20%">{description("Left 20%")}</Left>
			<Fill style={green}>{description("Fill")}</Fill>
		</ViewPort>
	),

	name: "With left space",
};

export const WithTopSpace = {
	render: () => (
		<ViewPort>
			<Top size="20%">{description("Top 20%")}</Top>
			<Fill style={green}>{description("Fill")}</Fill>
		</ViewPort>
	),

	name: "With top space",
};

export const WithRightSpace = {
	render: () => (
		<ViewPort>
			<Right size="20%">{description("Right 20%")}</Right>
			<Fill style={green}>{description("Fill")}</Fill>
		</ViewPort>
	),

	name: "With right space",
};

export const WithBottomSpace = {
	render: () => (
		<ViewPort>
			<Bottom size="20%">{description("Bottom 20%")}</Bottom>
			<Fill style={green}>{description("Fill")}</Fill>
		</ViewPort>
	),

	name: "With bottom space",
};

export const WithLeftResizableSpace = {
	render: () => (
		<ViewPort>
			<LeftResizable size="20%" trackSize={true}>
				{description("Left resizable 20%")}
			</LeftResizable>
			<Fill style={green} trackSize={true}>
				{description("Fill")}
			</Fill>
		</ViewPort>
	),

	name: "With left resizable space",
};

export const WithTopResizableSpace = {
	render: () => (
		<ViewPort>
			<TopResizable size="20%" trackSize={true}>
				{description("Top resizable 20%")}
			</TopResizable>
			<Fill style={green} trackSize={true}>
				{description("Fill")}
			</Fill>
		</ViewPort>
	),

	name: "With top resizable space",
};

export const WithRightResizableSpace = {
	render: () => (
		<ViewPort>
			<RightResizable size="20%" trackSize={true}>
				{description("Right resizable 20%")}
			</RightResizable>
			<Fill style={green} trackSize={true}>
				{description("Fill")}
			</Fill>
		</ViewPort>
	),

	name: "With right resizable space",
};

export const WithBottomResizableSpace = {
	render: () => (
		<ViewPort>
			<BottomResizable size="20%" trackSize={true}>
				{description("Bottom resizable 20%")}
			</BottomResizable>
			<Fill style={green} trackSize={true}>
				{description("Fill")}
			</Fill>
		</ViewPort>
	),

	name: "With bottom resizable space",
};

export const Scrollable = {
	render: () => (
		<ViewPort>
			<Fill style={green} scrollable={true}>
				{lorem}
			</Fill>
		</ViewPort>
	),

	name: "Scrollable",
};

export const Properties = () => (
	<PropsTable>
		<StandardProps />
	</PropsTable>
);
