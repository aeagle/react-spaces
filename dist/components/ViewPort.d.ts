import { SizeUnit } from "../core-types";
import * as React from "react";
import { IReactSpaceCommonProps } from "../core-react";
interface IViewPortProps extends IReactSpaceCommonProps {
    left?: SizeUnit;
    right?: SizeUnit;
    top?: SizeUnit;
    bottom?: SizeUnit;
}
export declare const ViewPort: React.FC<IViewPortProps>;
export {};
