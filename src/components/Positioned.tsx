import { ICommonProps, Type, SizeUnit } from "../core-types";
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
	resizable?: boolean;
}

export const Positioned: React.FC<IPositionedProps> = ({ left, top, right, bottom, width, height, resizable, ...props }) => (
	<Space {...props} type={Type.Positioned} position={{ left: left, top: top, right: right, bottom: bottom, width: width, height: height }}>
		{props.children}
	</Space>
);

Positioned.propTypes = {
	...commonProps,
	...{
		left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		resizable: PropTypes.bool,
	},
};
