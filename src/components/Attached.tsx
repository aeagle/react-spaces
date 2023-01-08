import { Type, SizeUnit, AttachType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps, IReactSpaceCommonProps } from "../core-react";

interface IAttachedProps extends IReactSpaceCommonProps {
	width?: SizeUnit;
	height?: SizeUnit;
	attachType: AttachType;
}

export const Attached: React.FC<IAttachedProps> = ({ width, height, attachType, ...props }) => {
	return (
		<Space
			{...props}
			type={Type.Attached}
			attachType={attachType}
			position={{
				width: width,
				height: height,
			}}>
			{props.children}
		</Space>
	);
};

Attached.propTypes = {
	...commonProps,
	...{
		width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	},
};
