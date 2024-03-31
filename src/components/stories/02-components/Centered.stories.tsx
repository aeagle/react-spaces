import * as React from "react";
import { ViewPort, Centered } from "../..";
import { blue } from "../Utils";

export default {
	title: "Components/Centered",
	component: Centered,
};

export const Default = {
	render: () => (
		<ViewPort style={blue}>
			<Centered>Centered content horizontally and vertically</Centered>
		</ViewPort>
	),

	name: "Default",
};
