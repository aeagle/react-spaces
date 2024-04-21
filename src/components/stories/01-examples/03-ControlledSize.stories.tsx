import * as React from "react";
import { ViewPort, LeftResizable, Fill } from "../..";
import { SizeUnit } from "../../../core-types";
import { green, red, description } from "../Utils";

export default {
	title: "Basic examples/Resize events",
};

export const ControlledSize = {
	render: () => {
		const [size, setSize] = React.useState<SizeUnit>("15%");

		return (
			<React.StrictMode>
				<ViewPort>
					<LeftResizable size={size} style={red} trackSize={true} onResizeEnd={(newSize) => setSize(newSize)}>
						{description("Left")}
					</LeftResizable>
					<Fill style={green} trackSize={true}>
						{description("Fill")}
					</Fill>
				</ViewPort>
			</React.StrictMode>
		);
	},

	name: "Controlled size",
};

export const CancelledResize = {
	render: () => {
		return (
			<React.StrictMode>
				<ViewPort>
					<LeftResizable size="15%" style={red} trackSize={true} onResizeStart={() => false}>
						{description("Left")}
					</LeftResizable>
					<Fill style={green} trackSize={true}>
						{description("Fill")}
					</Fill>
				</ViewPort>
			</React.StrictMode>
		);
	},

	name: "Cancelled resize",
};
