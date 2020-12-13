import { ICommonProps, Type, SizeUnit, IPositionalProps, AnchorType } from "../core-types";
import * as React from "react";
import { Space } from "./Space";
import * as PropTypes from "prop-types";
import { commonProps } from "../core-react";

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
	onResizeStart?: () => void | boolean;
	onResizeEnd?: (newSize: SizeUnit) => void;
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

Custom.propTypes = {
	...commonProps,
	...{
		left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		isPositioned: PropTypes.bool,
		anchor: PropTypes.oneOf([AnchorType.Left, AnchorType.Top, AnchorType.Right, AnchorType.Bottom]),
		anchorSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		resizable: PropTypes.bool,
		handleSize: PropTypes.number,
		minimumSize: PropTypes.number,
		maximumSize: PropTypes.number,
		onResizeStart: PropTypes.func,
		onResizeEnd: PropTypes.func,
	},
};
