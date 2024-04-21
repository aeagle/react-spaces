import * as React from "react";
import { ViewPort, Centered, Positioned } from "../..";
import { ResizeType } from "../../../core-types";
import { useCurrentSpace } from "../../../core-react";
import { green, description } from "../Utils";

export default {
	title: "Components/Positioned/Width and height specified",
	component: Positioned,
};

export const NonResizable = {
	render: () => (
		<ViewPort>
			<Positioned style={green} left={200} top={200} width={400} height={300}>
				{description("Positioned")}
			</Positioned>
		</ViewPort>
	),

	name: "Non-resizable",
};

export const ResizeHandlesAllSides = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.All]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (all sides)",
};

export const ResizeHandlesLeft = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.Left]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (left)",
};

export const ResizeHandlesTop = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.Top]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (top)",
};

export const ResizeHandlesRight = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.Right]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (right)",
};

export const ResizeHandlesBottom = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.Bottom]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (bottom)",
};

export const ResizeHandlesTopLeft = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.TopLeft]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (top-left)",
};

export const ResizeHandlesTopRight = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.TopRight]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (top-right)",
};

export const ResizeHandlesBottomLeft = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.BottomLeft]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (bottom-left)",
};

export const ResizeHandlesBottomRight = {
	render: () => {
		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.BottomRight]}>
					{description("Positioned")}
				</Positioned>
			</ViewPort>
		);
	},

	name: "Resize handles (bottom-right)",
};

export const DragHandle = {
	render: () => {
		const DragHandle = () => {
			const space = useCurrentSpace();

			return (
				<Centered>
					<button onMouseDown={(e) => space.startMouseDrag(e)} onTouchStart={(e) => space.startTouchDrag(e)}>
						Drag handle
					</button>
				</Centered>
			);
		};

		return (
			<ViewPort>
				<Positioned style={green} left={200} top={200} width={400} height={300} touchHandleSize={20} trackSize={true}>
					<DragHandle />
				</Positioned>
			</ViewPort>
		);
	},

	name: "Drag handle",
};

export const DragHandleAndResizable = {
	render: () => {
		const DragHandle = () => {
			const space = useCurrentSpace();

			return (
				<Centered>
					<button onMouseDown={(e) => space.startMouseDrag(e)} onTouchStart={(e) => space.startTouchDrag(e)}>
						Drag handle
					</button>
				</Centered>
			);
		};

		return (
			<ViewPort>
				<Positioned
					style={green}
					left={200}
					top={200}
					width={400}
					height={300}
					touchHandleSize={20}
					trackSize={true}
					resizable={[ResizeType.All]}>
					<DragHandle />
				</Positioned>
			</ViewPort>
		);
	},

	name: "Drag handle and resizable",
};
