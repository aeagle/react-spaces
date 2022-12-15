import { Type, SizeUnit, ResizeType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps, IReactSpaceCommonProps } from "../core-react";

interface IPositionedProps extends IReactSpaceCommonProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	resizable?: ResizeType[];
	onResizeStart?: () => void | boolean;
	onResizeEnd?: (newSize: SizeUnit) => void;
}

export const Positioned: React.FC<IPositionedProps> = ({ left, top, right, bottom, width, height, resizable, ...props }) => {
	const resizeTypes = resizable || [];

	console.log(resizeTypes);

	return (
		<Space
			{...props}
			type={Type.Positioned}
			position={{
				left: left,
				top: top,
				right: right,
				bottom: bottom,
				leftResizable: resizeTypes.includes(ResizeType.Left),
				topResizable: resizeTypes.includes(ResizeType.Top),
				rightResizable: resizeTypes.includes(ResizeType.Right),
				bottomResizable: resizeTypes.includes(ResizeType.Bottom),
				topLeftResizable: resizeTypes.includes(ResizeType.TopLeft),
				topRightResizable: resizeTypes.includes(ResizeType.TopRight),
				bottomLeftResizable: resizeTypes.includes(ResizeType.BottomLeft),
				bottomRightResizable: resizeTypes.includes(ResizeType.BottomRight),
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
