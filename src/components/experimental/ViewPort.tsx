import { ICommonProps, Type, SizeUnit } from "../../core-types";
import * as React from "react";
import { Space } from "./Space";

interface IViewPortProps extends ICommonProps {
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
