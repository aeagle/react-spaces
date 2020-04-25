import { ICommonProps, Type } from "../core-types";
import * as React from "react";
import { Space } from "./Space";

interface IPositionedProps extends ICommonProps {
	left?: number;
	top?: number;
	right?: number;
	bottom?: number;
	width?: number;
	height?: number;
}

export const Positioned: React.FC<IPositionedProps> = ({ left, top, right, bottom, width, height, ...props }) => (
	<Space {...props} type={Type.Positioned} position={{ left: left, top: top, right: right, bottom: bottom, width: width, height: height }}>
		{props.children}
	</Space>
);
