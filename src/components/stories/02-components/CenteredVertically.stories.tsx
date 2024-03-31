import * as React from "react";
import { ViewPort, CenteredVertically } from "../..";
import { blue } from "../Utils";

export default {
	title: "Components/CenteredVertically",
	component: CenteredVertically,
};

export const Default = {
	render: () => (
		<ViewPort style={blue}>
			<CenteredVertically>Centered content vertically</CenteredVertically>
		</ViewPort>
	),

	name: "Default",
};
