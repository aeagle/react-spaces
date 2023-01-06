import { Type, SizeUnit, IPositionalProps, AnchorType, ResizeType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { IReactSpaceCommonProps } from "../core-react";
import { anchoredProps, IAnchorProps } from "./Anchored";
import { omit } from "../core-utils";

type ICustomProps = Omit<IReactSpaceCommonProps & IAnchorProps, "size"> & {
	type?: Type;

	// Anchored
	anchor?: AnchorType;
	anchorSize?: SizeUnit;

	// Positioned
	left?: SizeUnit | undefined;
	top?: SizeUnit | undefined;
	right?: SizeUnit | undefined;
	bottom?: SizeUnit | undefined;
	width?: SizeUnit | undefined;
	height?: SizeUnit | undefined;
	resizeTypes?: ResizeType[];
};

const customProps = omit(
	{
		...anchoredProps,
		...{
			type: PropTypes.oneOf([Type.Positioned, Type.Fill, Type.Anchored]),

			anchor: PropTypes.oneOf([AnchorType.Left, AnchorType.Top, AnchorType.Right, AnchorType.Bottom]),
			anchorSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

			left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			resizeTypes: PropTypes.array,
		},
	},
	"size",
);

export const Custom: React.FC<ICustomProps> = ({
	children,
	type,
	left,
	top,
	right,
	bottom,
	width,
	height,
	anchorSize,
	anchor,
	resizable,
	resizeTypes,
	...props
}) => {
	let position: IPositionalProps;
	type = type || Type.Fill;

	if (type === Type.Positioned) {
		position = {
			left: left,
			top: top,
			right: right,
			bottom: bottom,
			width: width,
			height: height,
			leftResizable: resizeTypes && (resizeTypes.includes(ResizeType.Left) || resizeTypes.includes(ResizeType.All)),
			topResizable: resizeTypes && (resizeTypes.includes(ResizeType.Top) || resizeTypes.includes(ResizeType.All)),
			rightResizable: resizeTypes && (resizeTypes.includes(ResizeType.Right) || resizeTypes.includes(ResizeType.All)),
			bottomResizable: resizeTypes && (resizeTypes.includes(ResizeType.Bottom) || resizeTypes.includes(ResizeType.All)),
			topLeftResizable: resizeTypes && (resizeTypes.includes(ResizeType.TopLeft) || resizeTypes.includes(ResizeType.All)),
			topRightResizable: resizeTypes && (resizeTypes.includes(ResizeType.TopRight) || resizeTypes.includes(ResizeType.All)),
			bottomLeftResizable: resizeTypes && (resizeTypes.includes(ResizeType.BottomLeft) || resizeTypes.includes(ResizeType.All)),
			bottomRightResizable: resizeTypes && (resizeTypes.includes(ResizeType.BottomRight) || resizeTypes.includes(ResizeType.All)),
		};
	} else {
		if (anchor === AnchorType.Left) {
			position = { left: 0, top: 0, bottom: 0, width: anchorSize, rightResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Right) {
			position = { right: 0, top: 0, bottom: 0, width: anchorSize, leftResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Top) {
			position = { left: 0, top: 0, right: 0, height: anchorSize, bottomResizable: resizable };
			type = Type.Anchored;
		} else if (anchor === AnchorType.Bottom) {
			position = { left: 0, bottom: 0, right: 0, height: anchorSize, topResizable: resizable };
			type = Type.Anchored;
		} else {
			position = {
				left: 0,
				top: 0,
				bottom: 0,
				right: 0,
			};
			type = Type.Fill;
		}
	}

	return (
		<Space {...props} type={type} anchor={anchor} position={position}>
			{children}
		</Space>
	);
};

Custom.propTypes = customProps;
