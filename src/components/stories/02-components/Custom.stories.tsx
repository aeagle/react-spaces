import * as React from "react";
import { action } from "@storybook/addon-actions";
import { ViewPort, Custom } from "../..";
import { AnchorType, Type } from "../../../core-types";
import { green, description } from "../Utils";
import { PropsTable, PropsHeader, Prop, StandardProps } from "../Utils";

export default {
	title: "Components/Custom",
	component: Custom,
};

export const Fill = {
	render: () => (
		<ViewPort>
			<Custom style={green}>{description("Custom fill")}</Custom>
		</ViewPort>
	),

	name: "Fill",
};

export const Positioned = {
	render: () => (
		<ViewPort>
			<Custom style={green} type={Type.Positioned} left={200} top={200} width={300} height={300}>
				{description("Custom positioned")}
			</Custom>
		</ViewPort>
	),

	name: "Positioned",
};

export const AnchoredLeft = {
	render: () => (
		<ViewPort>
			<Custom style={green} anchor={AnchorType.Left} anchorSize={200}>
				{description("Custom anchored left")}
			</Custom>
		</ViewPort>
	),

	name: "Anchored left",
};

export const AnchoredTop = {
	render: () => (
		<ViewPort>
			<Custom style={green} anchor={AnchorType.Top} anchorSize={200}>
				{description("Custom anchored top")}
			</Custom>
		</ViewPort>
	),

	name: "Anchored top",
};

export const AnchoredRight = {
	render: () => (
		<ViewPort>
			<Custom style={green} anchor={AnchorType.Right} anchorSize={200}>
				{description("Custom anchored right")}
			</Custom>
		</ViewPort>
	),

	name: "Anchored right",
};

export const AnchoredBottom = {
	render: () => (
		<ViewPort>
			<Custom style={green} anchor={AnchorType.Bottom} anchorSize={200}>
				{description("Custom anchored bottom")}
			</Custom>
		</ViewPort>
	),

	name: "Anchored bottom",
};

export const ResizableLeft = {
	render: () => (
		<ViewPort>
			<Custom
				style={green}
				anchor={AnchorType.Left}
				anchorSize={200}
				resizable={true}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Custom resizable left")}
			</Custom>
		</ViewPort>
	),

	name: "Resizable left",
};

export const ResizableTop = {
	render: () => (
		<ViewPort>
			<Custom
				style={green}
				anchor={AnchorType.Top}
				anchorSize={200}
				resizable={true}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Custom resizable top")}
			</Custom>
		</ViewPort>
	),

	name: "Resizable top",
};

export const ResizableRight = {
	render: () => (
		<ViewPort>
			<Custom
				style={green}
				anchor={AnchorType.Right}
				anchorSize={200}
				resizable={true}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Custom resizable right")}
			</Custom>
		</ViewPort>
	),

	name: "Resizable right",
};

export const ResizableBottom = {
	render: () => (
		<ViewPort>
			<Custom
				style={green}
				anchor={AnchorType.Bottom}
				anchorSize={200}
				resizable={true}
				trackSize={true}
				onResizeStart={action("onResizeStart")}
				onResizeEnd={action("onResizeEnd")}>
				{description("Custom resizable bottom")}
			</Custom>
		</ViewPort>
	),

	name: "Resizable bottom",
};

export const Properties = () => (
	<PropsTable>
		<PropsHeader>Relevant as positioned</PropsHeader>
		<Prop
			name="isPositioned"
			type="boolean"
			default="false"
			description="Position space based on bottom, left, right, top, width and height properties."
		/>
		<Prop name="bottom" type="number | string" description="Bottom offset from viewport edge." />
		<Prop name="left" type="number | string" description="Left offset from viewport edge." />
		<Prop name="right" type="number | string" description="Right offset from viewport edge." />
		<Prop name="top" type="number | string" description="Top offset from viewport edge." />
		<Prop name="width" type="number | string" description="Width of space." />
		<Prop name="height" type="number | string" description="Height of space." />
		<PropsHeader>Relevant as anchored</PropsHeader>
		<Prop
			name="anchor"
			type="AnchorType.Left, AnchorType.Top, AnchorType.Right, AnchorType.Bottom, 'anchor-left', 'anchor-top', 'anchor-right', 'anchor-bottom'"
			description="Anchor the space to the parents edge"
		/>
		<Prop name="anchorSize" type="number | string" description="Size of space when anchored." />
		<PropsHeader>Relevant as resizable</PropsHeader>
		<Prop name="resizable" type="boolean" default="false" description="Makes the space resizable." />
		<Prop name="handleSize" type="number" default="5" description="Size of the resize handle in pixels." />
		<Prop
			name="overlayHandle"
			type="boolean"
			default="true"
			description="Determines method of placement of the resize handle. By default the handle is placed over the space. When set to false, the space resize handle sits next to the space reducing the size of the space."
		/>
		<Prop name="minimumSize" type="number" description="Constrains resizing of the space to a minimum size." />
		<Prop name="maximumSize" type="number" description="Constrains resizing of the space to a maximum size." />
		<Prop
			name="onResizeStart"
			type="() => boolean"
			description="Triggered when a resize starts. Returning false from the event handler cancels the resize."
		/>
		<Prop
			name="onResizeEnd"
			type="(newSize: number) => void"
			description="Triggered when a resize ends. The final size in pixels of the space in after the resize is passed as the first parameter."
		/>
		<StandardProps />
	</PropsTable>
);
