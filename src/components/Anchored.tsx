import { ICommonProps, SizeUnit, Type, AnchorType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";

interface IAnchorProps extends ICommonProps {
	size: SizeUnit;
	order?: number;
	resizable?: boolean;
	handleSize?: number;
	overlayHandle?: boolean;
	minimumSize?: number;
	maximumSize?: number;
	onResizeStart?: () => void | boolean;
	onResizeEnd?: (newSize: SizeUnit) => void;
}

export const LeftResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, size, ...props }) => (
	<Space {...props} type={Type.Anchored} anchor={AnchorType.Left} position={{ left: 0, top: 0, bottom: 0, rightResizable: true, width: size }}>
		{children}
	</Space>
);

export const Left: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={AnchorType.Left}
		position={{ left: 0, top: 0, bottom: 0, rightResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const TopResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, size, ...props }) => (
	<Space {...props} type={Type.Anchored} anchor={AnchorType.Top} position={{ left: 0, top: 0, right: 0, bottomResizable: true, height: size }}>
		{children}
	</Space>
);

export const Top: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={AnchorType.Top}
		position={{ left: 0, top: 0, right: 0, bottomResizable: resizable, height: size }}>
		{children}
	</Space>
);

export const RightResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, size, ...props }) => (
	<Space {...props} type={Type.Anchored} anchor={AnchorType.Right} position={{ bottom: 0, top: 0, right: 0, leftResizable: true, width: size }}>
		{children}
	</Space>
);

export const Right: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={AnchorType.Right}
		position={{ bottom: 0, top: 0, right: 0, leftResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const BottomResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, size, ...props }) => (
	<Space {...props} type={Type.Anchored} anchor={AnchorType.Bottom} position={{ bottom: 0, left: 0, right: 0, topResizable: true, height: size }}>
		{children}
	</Space>
);

export const Bottom: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={AnchorType.Bottom}
		position={{ bottom: 0, left: 0, right: 0, topResizable: resizable, height: size }}>
		{children}
	</Space>
);
