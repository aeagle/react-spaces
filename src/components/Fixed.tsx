import { SizeUnit, Type } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps, IReactSpaceCommonProps } from "../core-react";

export interface IFixedProps extends IReactSpaceCommonProps {
	width?: SizeUnit;
	height: SizeUnit;
}

export const Fixed: React.FC<IFixedProps> = ({ width, height, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Fixed} position={{ width: width, height: height }}>
		{children}
	</Space>
);

Fixed.propTypes = {
	...commonProps,
	...{
		width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	},
};
