import { SizeUnit, ResizeType } from "../core-types";
import * as React from "react";
import { IReactSpaceCommonProps } from "../core-react";
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
export declare const Positioned: React.FC<IPositionedProps>;
export {};
