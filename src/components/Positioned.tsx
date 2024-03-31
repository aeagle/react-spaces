import { Type, SizeUnit, ResizeType, ResizeHandlePlacement } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps, IReactSpaceCommonProps } from "../core-react";

export interface IPositionedProps extends IReactSpaceCommonProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	resizable?: ResizeType[];
	handleSize?: number | undefined;
	handlePlacement?: ResizeHandlePlacement;
	touchHandleSize?: number | undefined;
	onResizeStart?: () => void | boolean;
	onResizeEnd?: (newSize: SizeUnit) => void;
}

export const Positioned: React.FC<IPositionedProps> = ({ left, top, right, bottom, width, height, resizable, ...props }) => {
	const resizeTypes = resizable || [];

	return (
		<Space
			{...props}
			type={Type.Positioned}
			position={{
				left: left,
				top: top,
				right: right,
				bottom: bottom,
				leftResizable: resizeTypes.includes(ResizeType.Left) || resizeTypes.includes(ResizeType.All),
				topResizable: resizeTypes.includes(ResizeType.Top) || resizeTypes.includes(ResizeType.All),
				rightResizable: resizeTypes.includes(ResizeType.Right) || resizeTypes.includes(ResizeType.All),
				bottomResizable: resizeTypes.includes(ResizeType.Bottom) || resizeTypes.includes(ResizeType.All),
				topLeftResizable: resizeTypes.includes(ResizeType.TopLeft) || resizeTypes.includes(ResizeType.All),
				topRightResizable: resizeTypes.includes(ResizeType.TopRight) || resizeTypes.includes(ResizeType.All),
				bottomLeftResizable: resizeTypes.includes(ResizeType.BottomLeft) || resizeTypes.includes(ResizeType.All),
				bottomRightResizable: resizeTypes.includes(ResizeType.BottomRight) || resizeTypes.includes(ResizeType.All),
				width: width,
				height: height,
			}}>
			{props.children}
		</Space>
	);
};

Positioned.propTypes = {
	...commonProps,
	...{
		left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		resizable: PropTypes.array,
	},
};
