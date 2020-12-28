import { ICommonProps, Type, SizeUnit, ResizeType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps } from "../core-react";

interface IPositionedProps extends ICommonProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	resizable?: ResizeType[];
}

export const Positioned: React.FC<IPositionedProps> = ({ left, top, right, bottom, width, height, resizable, ...props }) => {
	const resizeTypes = resizable || [];

	return (
		<Space
			{...props}
			type={Type.Positioned}
			position={{
				left: left,
				leftResizable: resizeTypes.includes(ResizeType.Left),
				top: top,
				topResizable: resizeTypes.includes(ResizeType.Top),
				right: right,
				rightResizable: resizeTypes.includes(ResizeType.Right),
				bottom: bottom,
				bottomResizable: resizeTypes.includes(ResizeType.Bottom),
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
