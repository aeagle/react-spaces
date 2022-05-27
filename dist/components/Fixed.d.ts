import { SizeUnit } from "../core-types";
import * as React from "react";
import { IReactSpaceCommonProps } from "../core-react";
interface IFixedProps extends IReactSpaceCommonProps {
    width?: SizeUnit;
    height: SizeUnit;
}
export declare const Fixed: React.FC<IFixedProps>;
export {};
