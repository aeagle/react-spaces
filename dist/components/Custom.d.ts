import { Type, SizeUnit, AnchorType, ResizeType } from "../core-types";
import * as React from "react";
import { IReactSpaceCommonProps } from "../core-react";
import { IAnchorProps } from "./Anchored";
declare type ICustomProps = Omit<IReactSpaceCommonProps & IAnchorProps, "size"> & {
    type?: Type;
    anchor?: AnchorType;
    anchorSize?: SizeUnit;
    left?: SizeUnit | undefined;
    top?: SizeUnit | undefined;
    right?: SizeUnit | undefined;
    bottom?: SizeUnit | undefined;
    width?: SizeUnit | undefined;
    height?: SizeUnit | undefined;
    resizeTypes?: ResizeType[];
};
export declare const Custom: React.FC<ICustomProps>;
export {};
