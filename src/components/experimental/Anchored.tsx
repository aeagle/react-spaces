import { ICommonProps, SizeUnit, Type, Anchor } from "../../core-types";
import * as React from "react";
import { Space } from "./Space";

interface IAnchorProps extends ICommonProps {
	id?: string;
	size: SizeUnit;
	order?: number;
	resizable?: boolean;
}

export const LeftResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Left {...props} resizable={true}>
		{children}
	</Left>
);

export const Left: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Left}
		position={{ left: 0, top: 0, bottom: 0, rightResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const TopResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Top {...props} resizable={true}>
		{children}
	</Top>
);

export const Top: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Top}
		position={{ left: 0, top: 0, right: 0, bottomResizable: resizable, height: size }}>
		{children}
	</Space>
);

export const RightResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Right {...props} resizable={true}>
		{children}
	</Right>
);

export const Right: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Right}
		position={{ bottom: 0, top: 0, right: 0, leftResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const BottomResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Bottom {...props} resizable={true}>
		{children}
	</Bottom>
);

export const Bottom: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Bottom}
		position={{ bottom: 0, left: 0, right: 0, topResizable: resizable, height: size }}>
		{children}
	</Space>
);
