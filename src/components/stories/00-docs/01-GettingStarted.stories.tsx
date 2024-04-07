import * as React from "react";
import { LeftResizable, Fill, Fixed, BottomResizable, Top } from "../..";
import { CenterType } from "../../../core-types";

export default {
	title: "React Spaces/Getting started",
};

export const Demo1 = {
	render: () => (
		<React.StrictMode>
			<Fixed style={{ outline: "1px solid black" }} className="container" height={400}>
				<LeftResizable style={{ borderRight: "1px dashed black" }} size="25%" centerContent={CenterType.HorizontalVertical}>
					Sidebar
				</LeftResizable>

				<Fill centerContent={CenterType.HorizontalVertical}>Main content</Fill>
			</Fixed>
		</React.StrictMode>
	),

	name: "Non-resizable",
};

export const Demo2 = {
	render: () => (
		<React.StrictMode>
			<Fixed style={{ outline: "1px solid black" }} className="container" height={400}>
				<LeftResizable style={{ borderRight: "1px dashed black" }} size="25%" centerContent={CenterType.HorizontalVertical}>
					Sidebar
				</LeftResizable>

				<Fill>
					<Fill centerContent={CenterType.HorizontalVertical}>Main content</Fill>

					<BottomResizable style={{ borderTop: "1px dashed black" }} size={100} centerContent={CenterType.HorizontalVertical}>
						Bottom area
					</BottomResizable>
				</Fill>
			</Fixed>
		</React.StrictMode>
	),
};

export const Demo3 = {
	render: () => (
		<React.StrictMode>
			<Fixed style={{ outline: "1px solid black" }} className="container" height={400}>
				<Top style={{ borderBottom: "1px dashed black", padding: 5 }} order={1} size={25} centerContent={CenterType.Vertical}>
					Title
				</Top>

				<Top style={{ borderBottom: "1px dashed black", padding: 5 }} order={2} size={25} centerContent={CenterType.Vertical}>
					Menu bar
				</Top>

				<Fill>
					<LeftResizable style={{ borderRight: "1px dashed black" }} size="25%">
						<Top style={{ borderBottom: "1px dashed black", padding: 5 }} size={25} centerContent={CenterType.Vertical}>
							Sidebar title
						</Top>
						<Fill centerContent={CenterType.HorizontalVertical}>Sidebar</Fill>
					</LeftResizable>

					<Fill>
						<Fill centerContent={CenterType.HorizontalVertical}>Main content</Fill>

						<BottomResizable style={{ borderTop: "1px dashed black" }} size={100} centerContent={CenterType.HorizontalVertical}>
							Bottom area
						</BottomResizable>
					</Fill>
				</Fill>
			</Fixed>
		</React.StrictMode>
	),
};
