import { ICommonProps, Type, SizeUnit, IPositionalProps, AnchorType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";

interface ICustomProps extends ICommonProps {
	left?: SizeUnit | undefined;
	top?: SizeUnit | undefined;
	right?: SizeUnit | undefined;
	bottom?: SizeUnit | undefined;
	width?: SizeUnit | undefined;
	height?: SizeUnit | undefined;
	isPositioned?: boolean;
	anchor?: AnchorType;
	anchorSize?: SizeUnit;
	resizable?: boolean;
	handleSize?: number;
	overlayHandle?: boolean;
	minimumSize?: number;
	maximumSize?: number;
}

export const Custom: React.FC<ICustomProps> = ({
	children,
	left,
	top,
	right,
	bottom,
	width,
	height,
	anchorSize,
	anchor,
	isPositioned,
	resizable,
	...props
}) => {
	let position: IPositionalProps;
	let type = Type.Positioned;

	if (!isPositioned) {
		if (anchor === AnchorType.Left) {
			position = { left: 0, top: 0, bottom: 0, width: anchorSize, right: undefined, rightResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Right) {
			position = { right: 0, top: 0, bottom: 0, width: anchorSize, left: undefined, leftResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Top) {
			position = { left: 0, top: 0, right: 0, height: anchorSize, bottom: undefined, bottomResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Bottom) {
			position = { left: 0, bottom: 0, right: 0, height: anchorSize, top: undefined, topResizable: resizable };
			type = Type.Anchored;
		} else {
			position = { left: 0, top: 0, bottom: 0, right: 0, width: undefined, height: undefined };
			type = Type.Fill;
		}
	} else {
		position = { left: left, top: top, right: right, bottom: bottom, width: width, height: height };
	}

	return (
		<Space {...props} type={type} anchor={anchor} position={position}>
			{children}
		</Space>
	);
};
