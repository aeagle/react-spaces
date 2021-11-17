import { Type, SizeUnit } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps, IReactSpaceProps } from "../core-react";

interface IViewPortProps extends IReactSpaceProps {
	left?: SizeUnit;
	right?: SizeUnit;
	top?: SizeUnit;
	bottom?: SizeUnit;
}

export const ViewPort: React.FC<IViewPortProps> = ({ left, top, right, bottom, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.ViewPort} position={{ left: left || 0, top: top || 0, right: right || 0, bottom: bottom || 0 }}>
		{children}
	</Space>
);

ViewPort.propTypes = {
	...commonProps,
	...{
		left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	},
};
