import * as React from "react";
import { ISpaceInfo } from "../types";
import { SpaceInfoContext } from "./Contexts";

interface IProps {
	children: (info: ISpaceInfo) => React.ReactNode;
}

export const Info: React.FC<IProps> = (props) => <SpaceInfoContext.Consumer>{(info) => props.children(info!)}</SpaceInfoContext.Consumer>;
